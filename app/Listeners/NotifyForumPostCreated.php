<?php

namespace App\Listeners;

use App\Events\ForumPostCreatedEvent;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class NotifyForumPostCreated
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
     * @param  \App\Events\ForumPostCreatedEvent  $event
     * @return void
     */
    public function handle(ForumPostCreatedEvent $event)
    {
        //
    }
}
