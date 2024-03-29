<?php

namespace App\Events;

use App\Models\Journal;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class JournalCreatedEvent
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public Journal $journal;

    /**
     * @param Journal $journal
     */
    public function __construct(Journal $journal)
    {
        $this->journal = $journal;
    }
}
