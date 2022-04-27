<?php

namespace App\Console\Commands;

use App\Models\User;
use App\Models\Forum;
use App\Models\ForumPost;
use App\Models\ForumThread;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class DeployForums extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'deploy:forums';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Deploy forums from the old database to the new one.';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $dbname = env('DB_DATABASE');
        DB::unprepared("delete from `$dbname`.forum_posts");
        DB::unprepared("delete from `$dbname`.forum_threads");
        DB::unprepared("delete from `$dbname`.forums");

        $forums = DB::select('select * from snark3_snarkpit.forums');
        $topics = DB::select('
            select t.*
            from snark3_snarkpit.topics t
            inner join snark3_snarkpit.accounts u on u.id = t.topic_poster
            where u.id > 0
            order by t.topic_id asc
        ');
        $posts = DB::select('
            select p.*
            from snark3_snarkpit.posts p
            inner join snark3_snarkpit.topics t on p.topic_id = t.topic_id
            inner join snark3_snarkpit.accounts u on u.id = t.topic_poster
            inner join snark3_snarkpit.accounts u2 on u2.id = p.poster_id
            inner join snark3_snarkpit.forums f on p.forum_id = f.forum_id
            where u.id > 0
            and u2.id > 0
            order by p.post_id asc
        ');

        // forums
        // forum_id forum_name forum_desc forum_topics forum_posts support
        $this->withProgressBar($forums, function ($forum) {
            $f = new Forum();
            $f->id = $forum->forum_id;
            $f->name = html_entity_decode($forum->forum_name);
            $f->description = html_entity_decode($forum->forum_desc);
            $f->stat_threads = $forum->forum_topics;
            $f->stat_posts = $forum->forum_posts;
            $f->last_post_id = null;
            $f->order_index = $forum->forum_id + ($forum->support * 10);
            $f->save();
        });
        $this->output->writeln("\nForums done.");

        // todo forum_polls

        // topics
        // topic_id title topic_poster topic_time topic_replies first_post_id last_post_id forum_id topic_status topic_notify description section sticky map answered chapters topic_competition poll views
        $this->withProgressBar($topics, function ($topic) {
            $t = new ForumThread();
            if ($topic->topic_time == 0) $topic->topic_time = 946684800; // 2000-01-01
            $t->timestamps = false;
            $t->id = $topic->topic_id;
            $t->forum_id = $topic->forum_id;
            $t->user_id = $topic->topic_poster;
            $t->title = stripslashes(html_entity_decode($topic->title));
            $t->description = stripslashes(html_entity_decode($topic->description));
            $t->stat_views = $topic->views;
            $t->stat_posts = $topic->topic_replies;
            $t->last_post_id = $topic->last_post_id;
            $t->last_post_at = Carbon::createFromTimestamp($topic->topic_time);
            $t->is_open = $topic->topic_status == 0;
            $t->is_sticky = $topic->sticky;
            $t->is_poll = $topic->poll;
            $t->answered = $topic->answered;
            $t->created_at = Carbon::createFromTimestamp($topic->topic_time);
            $t->updated_at = Carbon::createFromTimestamp($topic->topic_time);
            $t->save();
        });
        $this->output->writeln("\nThreads done.");

        // posts
        DB::unprepared("DROP TRIGGER IF EXISTS forum_posts_update_statistics_on_update");
        DB::unprepared("DROP TRIGGER IF EXISTS forum_posts_update_statistics_on_insert");

        // post_id topic_id forum_id poster_id sig post_time type post_text notify answer
        $i = 0;
        $this->withProgressBar($posts, function ($post) use ($i) {
            $p = new ForumPost();
            if ($post->post_time == 0) $post->post_time = 946684800; // 2000-01-01
            $p->timestamps = false;
            $p->id = $post->post_id;
            $p->forum_id = $post->forum_id;
            $p->thread_id = $post->topic_id;
            $p->user_id = $post->poster_id;
            $p->content_text = reverse_snarkpit_format($post->post_text);
            if (strlen($p->content_text) > 10000) $p->content_text = substr($p->content_text, 0, 10000);
            $p->content_html = bbcode($p->content_text);
            $p->add_signature = $post->sig == 1 || str_contains($p->content_text, '[addsig]');
            $p->answer = $post->answer;
            $p->created_at = Carbon::createFromTimestamp($post->post_time);
            $p->updated_at = Carbon::createFromTimestamp($post->post_time);
            $p->save();
            $i++;
            if ($i % 100 === 0) sleep(1);
        });

        // update last post in forums and threads
        DB::unprepared("
            update forum_threads t
            inner join (
                select id, thread_id, created_at from (
                    select id, thread_id, created_at, row_number() over (partition by thread_id order by created_at desc, id desc) as rn
                    from forum_posts p
                ) q
                where q.rn = 1
            ) p on p.thread_id = t.id
            set t.last_post_id = p.id, t.last_post_at = p.created_at
        ");
        DB::unprepared("
            update forums f
            inner join (
                select id, forum_id from (
                    select id, forum_id, row_number() over (partition by forum_id order by created_at desc, id desc) as rn
                    from forum_posts p
                ) q
                where q.rn = 1
            ) p on p.forum_id = f.id
            set f.last_post_id = p.id
        ");

        DB::unprepared("
            CREATE TRIGGER forum_posts_update_statistics_on_insert AFTER INSERT ON forum_posts
            FOR EACH ROW BEGIN
                CALL update_thread_statistics(NEW.thread_id);
                CALL update_forum_statistics(NEW.forum_id);
                CALL update_user_forum_statistics(NEW.user_id);
            END;");

        DB::unprepared("
            CREATE TRIGGER forum_posts_update_statistics_on_update AFTER UPDATE ON forum_posts
            FOR EACH ROW BEGIN
                CALL update_thread_statistics(NEW.thread_id);
                CALL update_forum_statistics(NEW.forum_id);
                CALL update_user_forum_statistics(NEW.user_id);

                IF NEW.thread_id != OLD.thread_id THEN
                    CALL update_thread_statistics(OLD.thread_id);
                END IF;

                IF NEW.forum_id != OLD.forum_id THEN
                    CALL update_forum_statistics(OLD.forum_id);
                END IF;

                IF NEW.user_id != OLD.user_id THEN
                    CALL update_user_forum_statistics(OLD.user_id);
                END IF;
            END;");

        $this->output->writeln("\nPosts done.");
        return 0;
    }
}
