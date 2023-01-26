<?php

namespace App\Mail;

use App\Models\Journal;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class JournalCreatedEmail extends Mailable
{
    use Queueable, SerializesModels;

    public Journal $journal;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(Journal $journal)
    {
        $this->journal = $journal;
    }

    /**
     * Get the message envelope.
     *
     * @return \Illuminate\Mail\Mailables\Envelope
     */
    public function envelope()
    {
        return new Envelope(
            subject: '[snarkpit] Journal Created: ' . $this->journal->title,
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
            markdown: 'mail.journal-created',
            with: [
                'journal' => $this->journal,
                'url' => url('journal/view', [ $this->journal->id ])
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
