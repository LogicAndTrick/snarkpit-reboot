<?php

namespace App\Events;

use App\Models\Map;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class MapCreatedEvent
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public Map $map;

    /**
     * @param Map $map
     */
    public function __construct(Map $map)
    {
        $this->map = $map;
    }
}
