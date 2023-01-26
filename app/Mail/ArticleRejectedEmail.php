<?php

namespace App\Mail;

use App\Models\Article;
use App\Models\ArticleVersion;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ArticleRejectedEmail extends Mailable
{
    use Queueable, SerializesModels;

    private Article $article;
    private ArticleVersion $version;

    public function __construct(Article $article, ArticleVersion $version)
    {
        $this->article = $article;
        $this->version = $version;
    }

    /**
     * Get the message envelope.
     *
     * @return \Illuminate\Mail\Mailables\Envelope
     */
    public function envelope()
    {
        return new Envelope(
            subject: '[snarkpit] Article Not Approved: ' . $this->version->title,
        );
    }

    public function content()
    {
        return new Content(
            markdown: 'mail.article-rejected',
            with: [
                'article' => $this->article,
                'version' => $this->version,
                'url' => url('article/view', [ $this->version->id ])
            ]
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array
     */
    public function attachments()
    {
        return [];
    }
}
