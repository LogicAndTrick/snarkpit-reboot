<?php

namespace App\Mail;

use App\Models\Download;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class DownloadCreatedEmail extends Mailable
{
    use Queueable, SerializesModels;

    public Download $download;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(Download $download)
    {
        $this->download = $download;
    }

    /**
     * Get the message envelope.
     *
     * @return \Illuminate\Mail\Mailables\Envelope
     */
    public function envelope()
    {
        return new Envelope(
            subject: '[snarkpit] Download Created: ' . $this->download->name,
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
            markdown: 'mail.download-created',
            with: [
                'download' => $this->download,
                'url' => url('download/view', [ $this->download->id ])
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
