<?php

namespace App\Listeners;

use App\Events\RecalculateSnarkmarksEvent;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\DB;

class NotifyRecalculateSnarkmarks implements ShouldQueue
{
    public function __construct()
    {
        //
    }

    public function handle(RecalculateSnarkmarksEvent $event)
    {
        DB::statement('
            update users
            set stat_snarks = get_user_snarkmarks(id)
            where id = ?
        ', [ $event->userId ]);
    }
}
