<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ForumPoll extends Model
{
    use HasFactory;

    protected $fillable = [
        'thread_id',
        'title',
        'close_date'
    ];

    protected $casts = [
        'close_date' => 'datetime',
    ];

    public function thread()
    {
        return $this->belongsTo(ForumThread::class);
    }

    public function items()
    {
        return $this->hasMany(ForumPollItem::class);
    }

    public function votes()
    {
        return $this->hasMany(ForumPollItemVote::class);
    }

    public function isOpen() {
        return !$this->isClosed();
    }

    public function isClosed() {
        return $this->close_date->diffInSeconds(null, false) > 0;
    }
}
