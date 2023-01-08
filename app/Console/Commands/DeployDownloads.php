<?php

namespace App\Console\Commands;

use App\Models\Download;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class DeployDownloads extends Command
{
    protected $signature = 'deploy:downloads';
    protected $description = 'Deploy downloads from the old database to the new one.';

    public function handle()
    {
        ini_set('memory_limit','64M');

        DB::unprepared("delete from `snark3_reboot`.downloads");
        $downloads = DB::select('select * from snark3_snarkpit.download_files f');
        $this->withProgressBar($downloads, function($download) {
            $image = '';
            $file = '';

            if ($download->image == 1) $image = 'uploads/downloads/images/download_' . $download->id . '.jpg';
            if ($download->hosted) $file  = 'uploads/downloads/files/download_' . $download->id . '.' . $download->hosted;

            $d = new Download();
            $d->id = $download->id;
            $d->download_category_id = $download->cat;
            $d->user_id = $download->user <= 0 ? 100 : $download->user;
            $d->game_id = $download->game == 0 ? 1 : $download->game;
            $d->thread_id = $download->topic;
            $d->name = reverse_snarkpit_format($download->name);
            $d->content_text = reverse_snarkpit_format($download->description);
            $d->content_html = bbcode($d->content_text);
            $d->stat_downloads = $download->downloads;
            $d->image_file = $image;
            $d->download_file = $file;
            $d->mirrors = $download->mirrors;
            $d->created_at = Carbon::createFromTimestamp($download->updated);
            $d->updated_at = Carbon::createFromTimestamp($download->updated);
            $d->timestamps = false;
            $d->save();
        });
        $this->output->writeln("\nDownloads done.");
        return 0;
    }
}
