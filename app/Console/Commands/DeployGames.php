<?php

namespace App\Console\Commands;

use App\Models\Game;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class DeployGames extends Command
{
    protected $signature = 'deploy:games';
    protected $description = 'Deploy games from the old database to the new one.';

    public function handle()
    {
        DB::unprepared("delete from `snark3_reboot`.games");
        $games = DB::select('select * from snark3_snarkpit.games');
        $this->withProgressBar($games, function($game) {
            $g = new Game();
            $g->id = $game->id;
            $g->name = $game->title;
            $g->description = reverse_snarkpit_format($game->description);
            $g->url = $game->url;
            $g->abbreviation = '';
            $g->order_index = $game->id;
            $g->save();
        });
        return 0;
    }
}
