<?php

namespace App\Events;

use App\Models\Download;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class DownloadCreatedEvent
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public Download $download;

    /**
     * @param Download $download
     */
    public function __construct(Download $download)
    {
        $this->download = $download;
    }

}
