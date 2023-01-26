<?php

namespace App\Events;

use App\Models\Article;
use App\Models\ArticleVersion;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class ArticleStatusChangedEvent
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public Article $article;
    public ArticleVersion $version;

    /**
     * @param Article $article
     * @param ArticleVersion $version
     */
    public function __construct(Article $article, ArticleVersion $version)
    {
        $this->article = $article;
        $this->version = $version;
    }
}
