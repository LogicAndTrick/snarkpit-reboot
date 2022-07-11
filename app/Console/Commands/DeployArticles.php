<?php

namespace App\Console\Commands;

use App\Models\Article;
use App\Models\ArticleVersion;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

class DeployArticles extends Command
{
    protected $signature = 'deploy:articles';
    protected $description = 'Deploy articles from the old database to the new one.';

    public function handle()
    {
        DB::unprepared("delete from `snark3_reboot`.article_versions");
        DB::unprepared("delete from `snark3_reboot`.articles");
        DB::unprepared("delete from `snark3_reboot`.article_categories");

        // Migrate categories (easy one)
        DB::unprepared('
            insert into `snark3_reboot`.article_categories (id, name)
            select id, name from `snark3_snarkpit`.articles_revamped_cats
        ');

        // id user cat game views updated status active topic
        // name description notes text images hosted thumbnail admin type ratings rating_calc
        $articles = DB::select('select * from snark3_snarkpit.articles_revamped where cat > 0');
        $saved_articles = Collection::make([]);
        $this->withProgressBar($articles, function($article) use (&$saved_articles) {
            $a = new Article();
            $a->id = $article->id;
            $a->user_id = $article->user <= 0 ? 100 : $article->user;
            $a->article_category_id = $article->cat;
            $a->game_id = $article->game == 0 ? 1 : $article->game;
            $a->forum_thread_id = $article->topic > 0 ? $article->topic : null;
            $a->current_version_id = $article->active;
            $a->is_active = $article->status == 0;
            $a->stat_views = $article->views;
            $a->created_at = Carbon::createFromTimestamp($article->updated);
            $a->updated_at = Carbon::createFromTimestamp($article->updated);
            $a->timestamps = false;
            $a->save();
            $saved_articles->push($a);
        });
        $this->output->writeln("\nArticles done.");

        $articles_old_file_dir = 'path/to/content/articles';
        $articles_new_file_dir = public_path('uploads/articles');
        $do_file_move = false;

        if ($do_file_move) {
            exec(sprintf("rd /s /q %s", escapeshellarg($articles_new_file_dir)));
            mkdir($articles_new_file_dir);
            mkdir($articles_new_file_dir . '/images');
            mkdir($articles_new_file_dir . '/files');
        }

        // id article_id updated description title text notes admin
        // approved cat game hosted
        $versions = DB::select('select * from snark3_snarkpit.articles_versions');
        $this->withProgressBar($versions, function ($version) use ($saved_articles, $articles_old_file_dir, $articles_new_file_dir, $do_file_move) {
            $article = $saved_articles->first(fn($x) => $x->id == $version->article_id);
            if (!$article) return;

            $aid = $article->id;
            $vid = $version->id;

            $thumb = '';
            $attach = '';

            $thumb_loc = "${articles_old_file_dir}/${aid}/${vid}/${aid}.jpg";
            if (file_exists($thumb_loc)) {
                $thumb = "uploads/articles/images/article_${aid}_${vid}_thumb.jpg";
                if ($do_file_move) {
                    copy($thumb_loc, "$articles_new_file_dir/images/article_${aid}_${vid}_thumb.jpg");
                }
            } else {
                $thumb = "uploads/articles/images/article_${aid}_${vid}_thumb.jpg";
            }
            if ($version->hosted) {
                // zip or jpg
            }

            $image = '';
            $file = '';

            //if ($version->image == 1) $image = 'uploads/articles/images/article_' . $version->id . '.jpg';
            //if ($version->hosted) $file  = 'uploads/articles/files/article_' . $version->id . '.' . $version->hosted;

            $status = ArticleVersion::STATUS_DRAFT;
            if ($article->is_active) $status = ArticleVersion::STATUS_APPROVED;

            $text = reverse_snarkpit_format($version->text);
            $images = $this->parse_images($article->id, $version->id, $articles_old_file_dir, $text);
            $text = $this->replace_images($text, $images);

            if ($do_file_move) {
                foreach ($images as $num => $path) {
                    $dest = "$articles_new_file_dir/images/article_${aid}_${vid}_${num}.jpg";
                    copy("$articles_old_file_dir/$path", $dest);
                }
            }

            $v = new ArticleVersion();
            $v->id = $version->id;
            $v->article_id = $version->article_id;
            $v->user_id = $article->user_id;
            $v->status = $status;
            $v->slug = ArticleVersion::CreateSlug(reverse_snarkpit_format($version->title));
            $v->title = reverse_snarkpit_format($version->title);
            $v->description = reverse_snarkpit_format($version->description);
            $v->attachment_file = $attach;
            $v->thumbnail_file = $thumb;
            $v->content_text = $text;
            $v->content_html = bbcode($v->content_text);
            $v->review_user_id = $version->admin > 0 ? $version->admin : null;
            $v->review_text = reverse_snarkpit_format($version->notes);
            $v->review_html = bbcode($v->review_text);
            $v->created_at = Carbon::createFromTimestamp($version->updated);
            $v->updated_at = Carbon::createFromTimestamp($version->updated);
            $v->timestamps = false;
            $v->save();
        });
        $this->output->writeln("\nVersions done.");

        $app = ArticleVersion::STATUS_APPROVED;
        $dra = ArticleVersion::STATUS_DRAFT;
        DB::unprepared("
            update articles a
            set current_version_id = (select id from article_versions v where v.article_id = a.id and v.status in ($app, $dra) order by v.created_at desc, v.id desc limit 1)
            where a.current_version_id = 0
        ");

        return 0;
    }

    function parse_images($article_id, $version_id, $folder, $text) {
        $images = [];
        preg_match_all('/\[image(\d+)\]/sim', $text, $result, PREG_PATTERN_ORDER);
        foreach ($result[1] as $number) {
            $num = intval($number);
            $location = "${article_id}/${version_id}/${article_id}_${num}.jpg";
            if (file_exists("$folder/$location")) $images[$num] = $location;
        }
        return $images;
    }

    function replace_images($text, $images) {
        return $text;
    }
}
