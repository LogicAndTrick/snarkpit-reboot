<?php

namespace App\Listeners;

use App\Events\DownloadCreatedEvent;
use App\Mail\DownloadCreatedEmail;
use App\Models\User;
use Illuminate\Support\Facades\Mail;

class NotifyDownloadCreated
{
    public function __construct()
    {
        //
    }

    public function handle(DownloadCreatedEvent $event)
    {
        // send email to admins
        $recips = User::query()
            ->where('level', '>=', 3)
            ->where('id', '!=', 100) // snarkpit user
            ->where('id', '!=', $event->download->user_id) // author
            ->where('email', '!=', '')
            ->where('notify_downloads', '=', true)
            ->get();
        if (!$recips->count()) return; // nobody to send to

        Mail::bcc($recips->pluck('email')->toArray())
            ->send(new DownloadCreatedEmail($event->download));
    }
}
