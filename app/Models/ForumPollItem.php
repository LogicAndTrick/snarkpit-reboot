<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ForumPollItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'forum_poll_id',
        'text',
        'stat_votes'
    ];

    public $timestamps = false;

    public function poll()
    {
        return $this->belongsTo(ForumPoll::class);
    }

    public function votes()
    {
        return $this->hasMany(ForumPollItemVote::class);
    }
}
