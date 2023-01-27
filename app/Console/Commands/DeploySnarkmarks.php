<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class DeploySnarkmarks extends Command
{
    protected $signature = 'deploy:snarkmarks';
    protected $description = 'Deploy snarkmarks';

    public function handle()
    {
        DB::unprepared('truncate table snark3_reboot.bonus_snarkmarks');
        DB::statement('
            update users
            set stat_maps = get_user_snarkmarks(id)
            where 1 = 1
        ');
        DB::statement('
            insert into bonus_snarkmarks (user_id, snarkmarks, added_user_id, description, created_at, updated_at)
            select id, stat_snarks - stat_maps, 100, \'Migration to Snarkpit v7\', UTC_DATE(), UTC_DATE()
            from users
            where stat_snarks > stat_maps;
        ');
        DB::statement('
            update users
            set stat_snarks = if(stat_snarks > stat_maps, stat_snarks, stat_maps), stat_maps = 0
            where 1 = 1
        ');
        return Command::SUCCESS;
    }
}
