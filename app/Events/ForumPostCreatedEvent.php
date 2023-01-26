<?php

namespace App\Events;

use App\Models\ForumPost;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class ForumPostCreatedEvent
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public ForumPost $post;

    /**
     * @param ForumPost $post
     */
    public function __construct(ForumPost $post)
    {
        $this->post = $post;
    }
}
