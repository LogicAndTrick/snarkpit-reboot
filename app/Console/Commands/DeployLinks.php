<?php

namespace App\Console\Commands;

use App\Models\Link;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class DeployLinks extends Command
{
    protected $signature = 'deploy:links';

    protected $description = 'Deploy links from the old database to the new one.';

    public function __construct()
    {
        parent::__construct();
    }

    public function handle()
    {
        DB::unprepared("truncate table `snark3_reboot`.links");
        $links = DB::select('select * from snark3_snarkpit.links order by id');
        $this->withProgressBar($links, function($link) {
            $links = new Link();
            $links->id = $link->id;
            $links->name = reverse_snarkpit_format($link->name);
            $links->url = reverse_snarkpit_format($link->url);
            $links->icon = 'uploads/links/' . reverse_snarkpit_format($link->icon);
            $links->description = reverse_snarkpit_format($link->description);
            $links->save();
        });
        return 0;
    }
}
