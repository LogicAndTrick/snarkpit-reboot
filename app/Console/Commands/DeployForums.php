<?php

namespace App\Console\Commands;

use App\Models\User;
use App\Models\Forum;
use App\Models\ForumPost;
use App\Models\ForumThread;
use App\Models\UserSubscription;
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
        ini_set('memory_limit','256M');

        DB::unprepared("delete from `snark3_reboot`.forum_poll_item_votes");
        DB::unprepared("delete from `snark3_reboot`.forum_poll_items");
        DB::unprepared("delete from `snark3_reboot`.forum_polls");
        DB::unprepared("delete from `snark3_reboot`.forum_posts");
        DB::unprepared("delete from `snark3_reboot`.forum_threads");
        DB::unprepared("delete from `snark3_reboot`.forums");

        // forums
        $forums = DB::select('select * from snark3_snarkpit.forums');

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
        $topics = DB::select('
            select t.*
            from snark3_snarkpit.topics t
            inner join snark3_snarkpit.accounts u on u.id = if(t.topic_poster = 0, -1, t.topic_poster)
            order by t.topic_id asc
        ');

        // topic_id title topic_poster topic_time topic_replies first_post_id last_post_id forum_id topic_status topic_notify description section sticky map answered chapters topic_competition poll views
        $this->withProgressBar($topics, function ($topic) {
            $t = new ForumThread();
            if (!$topic->topic_time) $topic->topic_time = 946684800; // 2000-01-01
            $t->timestamps = false;
            $t->id = $topic->topic_id;
            $t->forum_id = $topic->forum_id;
            $t->user_id = $topic->topic_poster <= 0 ? 100 : $topic->topic_poster;
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

        DB::insert('
            insert into snark3_reboot.user_subscriptions (user_id, item_type, item_id, send_email)
            select topic_poster as user_id, ? as item_type, topic_id as item_id, 1 as send_email
            from snark3_snarkpit.topics
            where topic_notify = 1
            and topic_poster > 0
        ', [ UserSubscription::FORUM_THREAD ]);

        // posts
        $post_count = DB::selectOne('
            select count(*) as c
            from snark3_snarkpit.posts p
            inner join snark3_snarkpit.topics t on p.topic_id = t.topic_id
            inner join snark3_snarkpit.accounts u on u.id = if(t.topic_poster = 0, -1, t.topic_poster)
            inner join snark3_snarkpit.accounts u2 on u2.id = if(p.poster_id = 0, -1, p.poster_id)
            inner join snark3_snarkpit.forums f on p.forum_id = f.forum_id
        ')->c;
        $post_chunk_size = 1000;
        $num_chunks = ceil($post_count / $post_chunk_size);

        DB::unprepared("DROP TRIGGER IF EXISTS forum_posts_update_statistics_on_update");
        DB::unprepared("DROP TRIGGER IF EXISTS forum_posts_update_statistics_on_insert");

        $bar = $this->output->createProgressBar($num_chunks);
        $bar->start();
        for ($offs = 0; $offs < $post_count; $offs += $post_chunk_size) {

            // post_id topic_id forum_id poster_id sig post_time type post_text notify answer
            $posts = DB::select("
                select p.*
                from snark3_snarkpit.posts p
                inner join snark3_snarkpit.topics t on p.topic_id = t.topic_id
                inner join snark3_snarkpit.accounts u on u.id = if(t.topic_poster = 0, -1, t.topic_poster)
                inner join snark3_snarkpit.accounts u2 on u2.id = if(p.poster_id = 0, -1, p.poster_id)
                inner join snark3_snarkpit.forums f on p.forum_id = f.forum_id
                order by p.post_id asc
                limit {$post_chunk_size} offset {$offs}
            ");

            foreach ($posts as $post) {
                $p = new ForumPost();
                if (!$post->post_time) $post->post_time = 946684800; // 2000-01-01
                $p->timestamps = false;
                $p->id = $post->post_id;
                $p->forum_id = $post->forum_id;
                $p->thread_id = $post->topic_id;
                $p->user_id = $post->poster_id <= 0 ? 100 : $post->poster_id;
                $p->content_text = reverse_snarkpit_format($post->post_text);
                if (strlen($p->content_text) > 10000) $p->content_text = substr($p->content_text, 0, 10000);
                $p->content_html = bbcode($p->content_text);
                $p->add_signature = $post->sig == 1 || str_contains($p->content_text, '[addsig]');
                $p->answer = $post->answer;
                $p->created_at = Carbon::createFromTimestamp($post->post_time);
                $p->updated_at = Carbon::createFromTimestamp($post->post_time);
                $p->save();
            }

            $bar->advance();
            usleep(333333); // one third of a second
        }
        $bar->finish();

        // update last post in forums and threads
        DB::unprepared("
            update forum_threads t
            set last_post_id = (select id from forum_posts where thread_id = t.id order by created_at desc, id desc limit 1),
            last_post_at = (select created_at from forum_posts where thread_id = t.id order by created_at desc, id desc limit 1)
            where 1 = 1
        ");
        DB::unprepared("
            update forums f
            set last_post_id = (select id from forum_posts where forum_id = f.id order by created_at desc, id desc limit 1)
            where 1 = 1
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
