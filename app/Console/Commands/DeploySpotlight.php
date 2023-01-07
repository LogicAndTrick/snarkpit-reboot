<?php

namespace App\Console\Commands;

use App\Models\News;
use App\Models\Spotlight;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class DeploySpotlight extends Command
{
    protected $signature = 'deploy:spotlight';

    protected $description = 'Deploy spotlights from the old database to the new one.';

    public function handle()
    {
        DB::unprepared("truncate table `snark3_reboot`.spotlight");
        $spotlights = DB::select('select * from snark3_snarkpit.spotlight');
        $this->withProgressBar($spotlights, function($spotlight) {

            $type = Spotlight::TYPE_MAP;
            if ($spotlight->item_type == 1) $type = Spotlight::TYPE_MAP;
            if ($spotlight->item_type == 2) $type = Spotlight::TYPE_DOWNLOAD;
            if ($spotlight->item_type == 3) $type = Spotlight::TYPE_ARTICLE;

            $spot = new Spotlight();
            $spot->id = $spotlight->id;
            $spot->item_id = $spotlight->item_id;
            $spot->item_type = $type;
            $spot->position = $spotlight->position;
            $spot->save();
        });
        return 0;
    }
}
