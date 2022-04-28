<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ForumPollItemVote extends Model
{
    use HasFactory;

    protected $fillable = [
        'forum_poll_id',
        'forum_poll_item_id',
        'user_id'
    ];

    public $timestamps = false;

    public function poll()
    {
        return $this->belongsTo(ForumPoll::class);
    }

    public function poll_item()
    {
        return $this->belongsTo(ForumPollItem::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
