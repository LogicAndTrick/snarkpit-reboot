<?php

namespace App\Mail;

use App\Models\ForumPost;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ForumPostCreatedEmail extends Mailable
{
    use Queueable, SerializesModels;

    public ForumPost $forumPost;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(ForumPost $forumPost)
    {
        $this->forumPost = $forumPost;
    }

    /**
     * Get the message envelope.
     *
     * @return \Illuminate\Mail\Mailables\Envelope
     */
    public function envelope()
    {
        return new Envelope(
            subject: '[snarkpit] ForumPost Created: ' . $this->forumPost->name,
        );
    }

    /**
     * Get the message content definition.
     *
     * @return \Illuminate\Mail\Mailables\Content
     */
    public function content()
    {
        return new Content(
            view: 'view.name',
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
