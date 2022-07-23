<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;

class ForumThread extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $dates = ['deleted_at'];
    protected $fillable = [
        'forum_id',
        'user_id',
        'title',
        'description',
        'is_open',
        'is_sticky',
        'is_poll',
        'answered'
    ];

    protected $attributes = [
        'stat_views' => 0,
        'stat_posts' => 0,
        'is_open' => true,
        'is_sticky' => false,
        'is_poll' => false
    ];

    const THREAD_LOCK_DAYS = 365;

    protected $table = 'forum_threads';

    public function forum()
    {
        return $this->belongsTo(Forum::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function posts()
    {
        return $this->hasMany(ForumPost::class, 'thread_id');
    }

    public function last_post()
    {
        return $this->hasOne(ForumPost::class, 'id', 'last_post_id');
    }

    private $firstPost = false;

    public function getFirstPost() {
        if ($this->firstPost === false) {
            $this->firstPost = $this->posts()->orderBy('created_at', 'asc')->first();
        }
        return $this->firstPost;
    }

    /**
     * Returns true if the thread can be posted in
     * @param $check_forum bool Set to true to also check the forum permissions, false by default
     * @return bool
     */
    public function isPostable($check_forum = false)
    {
        if ($check_forum) {
            if (!Forum::find($this->forum_id)) return false;
        }

        // To post in a thread:

        // 1. User must be logged in
        $user = Auth::user();
        if (!$user) return false;

        // 2. moderators can proceed from here
        if (Gate::allows('moderator')) return true;

        // 3. The thread must be open
        if (!$this->is_open) return false;

        // 4a. If the thread is sticky, it can always be posted in
        if ($this->is_sticky) return true;

        // 4b. Empty threads can't be posted in
        if (!$this->last_post) return false;

        // 4c. Normal threads are closed if they are over ForumThread::THREAD_LOCK_DAYS days old
        /** @var Carbon $updated_at */
        $updated_at = $this->last_post->updated_at;
        if ($updated_at->diffInDays(Carbon::now()) > ForumThread::THREAD_LOCK_DAYS) return false;

        return true;
    }

    /**
     * Returns the reason why the thread cannot be posted in. Doesn't check for forum access.
     * @return null|string
     */
    public function getUnpostableReason()
    {
        if (!Auth::user()) return 'You must be logged in to post a response.';
        if (!$this->is_open) return 'This thread has been closed, responses cannot be posted.';
        if (!$this->last_post) return 'This thread has no posts, probably caused by older versions of the forum software. You cannot post in it.';
        /** @var Carbon $updated_at */
        $updated_at = $this->last_post->updated_at;
        if ($updated_at->diffInDays(Carbon::now()) > ForumThread::THREAD_LOCK_DAYS) return 'This thread has automatically been locked because it has been idle for over ' . ForumThread::THREAD_LOCK_DAYS . ' days.';
        return null;
    }

    /**
     * Checks if a forum has new posts or not. If the user is logged in, the last access time of the previous
     * session is used. Otherwise, anything less than a day old is new. The session is used to keep track of
     * threads the user has visited recently.
     * @return bool
     */
    public function hasNewPosts()
    {
        if ($this->last_post == null) return false;

        $last_access = session('last_access_time');
        if (!$last_access || !($last_access instanceof Carbon)) $last_access = Carbon::now()->addDays(1);

        $thread_read = session('thread_persistance_data');
        if ($thread_read && is_array($thread_read) && array_key_exists($this->id, $thread_read)) {
            $read = $thread_read[$this->id];
            if ($read instanceof Carbon && $read > $last_access) $last_access = $read;
        }

        return $this->last_post->updated_at > $last_access;
    }

    public function markAsRead()
    {
        $thread_read = session('thread_persistance_data');
        if (!$thread_read || !is_array($thread_read)) $thread_read = [];
        $thread_read[$this->id] = Carbon::now();
        session(['thread_persistance_data' => $thread_read]);
    }

    public function getIcons()
    {
        $icons = [];

        if (!$this->is_open) $icons[] = 'locked';
        else if ($this->hasNewPosts()) $icons[] = 'unread';
        else $icons[] = 'read';

        if ($this->is_sticky) $icons[] = 'sticky';
        if ($this->is_poll) $icons[] = 'poll';

        return $icons;
    }
}
