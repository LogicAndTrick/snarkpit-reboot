<?php

namespace App\Console\Commands;

use App\Models\Ban;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class DeployBans extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'deploy:bans';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Deploy bans from the old database to the new one.';

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
        DB::unprepared("truncate table `snark3_reboot`.bans");
        $bans = DB::select('select * from snark3_snarkpit.banned where expires = 0');
        $this->withProgressBar($bans, function($ban) {
            $b = new Ban();
            $b->user_id = $ban->banned_id;
            $b->ip = $ban->banned_ip;
            $b->ends_at = null;
            $b->reason = $ban->comments;
            $b->save();
        });
        $this->output->writeln("\nBans done.");
        return 0;
    }
}
