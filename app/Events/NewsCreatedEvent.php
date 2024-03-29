<?php

namespace App\Events;

use App\Models\News;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class NewsCreatedEvent
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public News $news;

    /**
     * @param News $news
     */
    public function __construct(News $news)
    {
        $this->news = $news;
    }
}
