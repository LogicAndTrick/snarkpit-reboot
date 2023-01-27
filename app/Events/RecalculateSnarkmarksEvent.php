<?php

namespace App\Events;

use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class RecalculateSnarkmarksEvent
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public int $userId;

    /**
     * @param int $userId
     */
    public function __construct(int $userId)
    {
        $this->userId = $userId;
    }
}
