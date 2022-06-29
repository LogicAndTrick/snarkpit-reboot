<?php

namespace App\Console\Commands;

use App\Models\News;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class DeployNews extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'deploy:news';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Deploy news from the old database to the new one.';

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
        DB::unprepared("truncate table `snark3_reboot`.news");
        $posts = DB::select('select * from snark3_snarkpit.news_revamped where plan = 0');
        $this->withProgressBar($posts, function($post) {

            $news = new News();
            $news->id = $post->id;
            $news->user_id = $post->user_id <= 0 ? 100 : $post->user_id;
            $news->subject = $post->subject;
            $news->content_text = reverse_snarkpit_format($post->text);
            $news->content_html = bbcode($news->content_text);
            $news->created_at = Carbon::createFromTimestamp($post->date);
            $news->updated_at = Carbon::createFromTimestamp($post->date);
            $news->timestamps = false;
            $news->save();
        });
        return 0;
    }
}
