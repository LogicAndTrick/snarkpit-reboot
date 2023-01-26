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

    public ForumPost $post;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(ForumPost $post)
    {
        $this->post = $post;
    }

    /**
     * Get the message envelope.
     *
     * @return \Illuminate\Mail\Mailables\Envelope
     */
    public function envelope()
    {
        return new Envelope(
            subject: '[snarkpit] Forum Reply: ' . $this->post->thread->title,
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
            markdown: 'mail.forum-post-created',
            with: [
                'post' => $this->post,
                'url' => url('thread/view/'.$this->post->thread_id.'?page=last')
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
