<?php

namespace App\Listeners;

use App\Events\NewsCreatedEvent;
use App\Mail\NewsCreatedEmail;
use App\Models\User;
use Illuminate\Support\Facades\Mail;

class NotifyNewsCreated
{
    public function __construct()
    {
        //
    }

    public function handle(NewsCreatedEvent $event)
    {
        // send email to admins
        $recips = User::query()
            ->where('level', '>=', 3)
            ->where('id', '!=', 100) // snarkpit user
            ->where('id', '!=', $event->news->user_id) // author
            ->where('email', '!=', '')
            ->where('notify_news', '=', true)
            ->get();
        if (!$recips->count()) return; // nobody to send to

        Mail::bcc($recips->pluck('email')->toArray())
            ->send(new NewsCreatedEmail($event->news));
    }
}
