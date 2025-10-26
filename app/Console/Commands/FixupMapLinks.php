<?php

namespace App\Console\Commands;

use App\Models\Map;
use App\Models\MapImage;
use App\Models\MapRating;
use App\Models\MapStatus;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class FixupMapLinks extends Command
{
    protected $signature = 'fixup:map-links';

    protected $description = 'Fixup map links that contain hyphen characters.';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $maps = DB::select('
            select m.*
            from snark3_snarkpit.maps m
            WHERE map_url like "%-%";
        ');

        $num_same = 0;
        $num_different = 0;
        foreach ($maps as $map) {
            $revamped_map = DB::selectOne("select * from snark3_snarkpit.maps_revamped where id = {$map->map_id}");
            if (!$revamped_map) continue;

            $new_map = Map::query()->find($map->map_id);
            if (!$new_map) continue;

            if ($map->map_url == $new_map->mirrors) continue;

            $before_url = $map->map_url;
            $before_url = str_ireplace('-', '|', $before_url);
            $before_url = str_ireplace('\\', '', $before_url);
            $before_url = htmlspecialchars_decode($before_url);

            $after_url = $revamped_map->mirrors;
            $after_url = str_ireplace('-', '|', $after_url);
            $after_url = trim($after_url, " \r\n\t|");
            $after_url = htmlspecialchars_decode($after_url);

            if ($before_url != $after_url) {
                $this->output->writeln("DIFFERENT: https://snarkpit.net/map/view/" . $map->map_id);
            } else {
                $new_map->mirrors = $map->map_url;
                $new_map->save();
                $this->output->writeln('Updated map #' . $map->map_id . ' to ' . $map->map_url);
                $num_same++;
            }
        }
        $this->output->writeln("SAME: $num_same ; DIFFERENT: $num_different");
        return 0;
    }
}
