<?php

namespace App\Listeners;

use App\Events\JournalCreatedEvent;
use App\Mail\JournalCreatedEmail;
use App\Models\User;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Mail;

class NotifyJournalCreated implements ShouldQueue
{
    public function __construct()
    {
        //
    }

    public function handle(JournalCreatedEvent $event)
    {
        // Don't do anything if we're not in production
        if (!App::isProduction()) return;

        // send email to admins
        $recips = User::query()
            ->where('level', '>=', 3)
            ->where('id', '!=', 100) // snarkpit user
            ->where('id', '!=', $event->journal->user_id) // author
            ->where('email', '!=', '')
            ->where('notify_journals', '=', true)
            ->get();
        if (!$recips->count()) return; // nobody to send to

        Mail::bcc($recips->pluck('email')->toArray())
            ->send(new JournalCreatedEmail($event->journal));
    }
}
