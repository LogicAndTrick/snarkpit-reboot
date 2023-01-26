<?php

namespace App\Mail;

use App\Models\ForumThread;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ForumThreadCreatedEmail extends Mailable
{
    use Queueable, SerializesModels;

    public ForumThread $thread;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(ForumThread $thread)
    {
        $this->thread = $thread;
    }

    /**
     * Get the message envelope.
     *
     * @return \Illuminate\Mail\Mailables\Envelope
     */
    public function envelope()
    {
        return new Envelope(
            subject: '[snarkpit] Forum Thread Created: ' . $this->thread->title,
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
            markdown: 'mail.forum-thread-created',
            with: [
                'thread' => $this->thread,
                'url' => url('thread/view', [ $this->thread->id ])
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
