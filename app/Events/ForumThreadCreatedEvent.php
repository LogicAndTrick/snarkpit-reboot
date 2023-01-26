<?php

namespace App\Events;

use App\Models\ForumThread;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class ForumThreadCreatedEvent
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public ForumThread $thread;

    /**
     * @param ForumThread $thread
     */
    public function __construct(ForumThread $thread)
    {
        $this->thread = $thread;
    }
}
