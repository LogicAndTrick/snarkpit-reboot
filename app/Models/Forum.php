<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Forum extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'order_index'
    ];

    protected $attributes = [
        'stat_threads' => 0,
        'stat_posts' => 0
    ];

    public function last_post() {
        return $this->hasOne(ForumPost::class, 'id', 'last_post_id');
    }

    public function threads()
    {
        return $this->hasMany(ForumThread::class);
    }

    public function posts()
    {
        return $this->hasMany(ForumPost::class);
    }

    /**
     * Checks if a forum has new posts or not. If the user is logged in, the last access time of the previous
     * session is used. Otherwise, anything less than a day old is new.
     * @return bool
     */
    public function hasNewPosts()
    {
        if ($this->last_post == null) return false;

        $last_access = session('last_access_time');
        if (!$last_access || !($last_access instanceof Carbon)) $last_access = Carbon::now()->addDays(1);

        return $this->last_post->updated_at > $last_access;
    }
}
