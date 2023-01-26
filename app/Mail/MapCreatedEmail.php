<?php

namespace App\Mail;

use App\Models\Map;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class MapCreatedEmail extends Mailable
{
    use Queueable, SerializesModels;

    public Map $map;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(Map $map)
    {
        $this->map = $map;
    }

    /**
     * Get the message envelope.
     *
     * @return \Illuminate\Mail\Mailables\Envelope
     */
    public function envelope()
    {
        return new Envelope(
            subject: '[snarkpit] Map Created: ' . $this->map->name,
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
            markdown: 'mail.map-created',
            with: [
                'map' => $this->map,
                'url' => url('map/view', [ $this->map->id ])
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
