<?php

namespace App\Listeners;

use App\Events\MessageCreatedEvent;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

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
        //
    }
}
