<?php

namespace App\Listeners;

use App\Events\MapCreatedEvent;
use App\Mail\MapCreatedEmail;
use App\Models\User;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Mail;

class NotifyMapCreated implements ShouldQueue
{
    public function __construct()
    {
        //
    }

    public function handle(MapCreatedEvent $event)
    {
        // Don't do anything if we're not in production
        if (!App::isProduction()) return;

        // send email to admins
        $recips = User::query()
            ->where('level', '>=', 3)
            ->where('id', '!=', 100) // snarkpit user
            ->where('id', '!=', $event->map->user_id) // author
            ->where('email', '!=', '')
            ->where('notify_maps', '=', true)
            ->get();
        if (!$recips->count()) return; // nobody to send to

        Mail::bcc($recips->pluck('email')->toArray())
            ->send(new MapCreatedEmail($event->map));
    }
}
