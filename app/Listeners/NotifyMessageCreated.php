<?php

namespace App\Listeners;

use App\Events\MessageCreatedEvent;
use App\Mail\ArticleApprovedEmail;
use App\Mail\MessageCreatedEmail;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Mail;

class NotifyMessageCreated
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  MessageCreatedEvent  $event
     * @return void
     */
    public function handle(MessageCreatedEvent $event)
    {
        // send email to the recipient
        $email = $event->message->to_user->email;
        if ($email == '') return;

        Mail::to($email)->send(new MessageCreatedEmail($event->message));
    }
}
