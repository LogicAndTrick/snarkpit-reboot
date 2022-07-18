<?php

namespace App\Console\Commands;

use App\Models\Map;
use App\Models\MapImage;
use App\Models\MapRating;
use App\Models\MapStatus;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class DeployMaps extends Command
{
    protected $signature = 'deploy:maps';

    protected $description = 'Deploy maps from the old database to the new one.';

    public function __construct()
    {
        parent::__construct();
    }

    public function handle()
    {
        DB::unprepared("delete from `snark3_reboot`.map_ratings");
        DB::unprepared("delete from `snark3_reboot`.map_images");
        DB::unprepared("delete from `snark3_reboot`.maps");

        // id name mirrors images description ratings rating_calc user downloads views added updated beta reports hosted legacy type topic game featured star
        $maps = DB::select('
            select m.*, t.topic_id as topic_id
            from snark3_snarkpit.maps_revamped m
            left join snark3_snarkpit.topics t on t.topic_id = m.topic
        ');

        $this->withProgressBar($maps, function($map) {
            $userid = $map->user;
            if ($userid <= 0) $userid = 100;

            $statusid = MapStatus::STATUS_COMPLETE;
            if ($map->beta === 1) $statusid = MapStatus::STATUS_BETA;
            if ($map->beta === 2) $statusid = MapStatus::STATUS_ABANDONED;

            $file = '';
            if ($map->hosted) $file  = 'uploads/maps/files/' . $map->id . '_map.' . $map->hosted;

            $m = new Map();
            $m->id = $map->id;
            $m->name = $map->name;
            $m->user_id = $userid;
            $m->game_id = $map->game;
            $m->thread_id = $map->topic_id;
            $m->status_id = $statusid;
            $m->is_featured = $map->star === 1;
            $m->content_text = reverse_snarkpit_format($map->description);
            $m->content_html = bbcode($m->content_text);
            $m->stat_views = $map->views;
            $m->stat_downloads = $map->downloads;
            $m->download_file = $file;
            $m->stat_rating = 0;
            $m->stat_ratings = 0;
            $m->mirrors = str_replace('|', "\n",$map->mirrors ?? '');
            $m->created_at = Carbon::createFromTimestamp($map->added ? $map->added : 1062184897);
            $m->updated_at = Carbon::createFromTimestamp($map->updated ? $map->updated : 1062184897);
            $m->deleted_at = null;
            $m->save();

            $num_images = $map->images;
            for ($i = 1; $i <= $num_images; $i++) {
                $mi = new MapImage();
                $mi->map_id = $map->id;
                $mi->image_file = 'uploads/maps/images/' . $map->id . '_' . $i . '.jpg';
                $mi->order_index = $i - 1;
                $mi->save();
            }

            if ($map->ratings && strlen($map->ratings) > 0) {
                $ratings = explode('-', trim($map->ratings, '-'));
                for ($i = 0; $i < count($ratings); $i += 2) {
                    try {
                        MapRating::Create([
                            'user_id' => intval($ratings[$i]),
                            'map_id' => $map->id,
                            'rating' => intval($ratings[$i + 1]),
                        ]);
                    } catch (\Exception $e) {
                        // user doesn't exist, probably
                    }
                }
            }
        });
        return 0;
    }
}
