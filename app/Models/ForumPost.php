<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;

class ForumPost extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $casts = ['created_at', 'updated_at', 'deleted_at'];
    protected $fillable = [
        'forum_id',
        'thread_id',
        'user_id',
        'content_text',
        'content_html',
        'add_signature',
        'answer'
    ];

    protected $attributes = [
        'add_signature' => true,
    ];

    protected $table = 'forum_posts';

    public function forum()
    {
        return $this->belongsTo(Forum::class);
    }

    public function thread()
    {
        return $this->belongsTo(ForumThread::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Returns true if this post is editable by the current user.
     * @param ForumThread|null $thread The thread the post belongs to. If null, the thread will be fetched.
     * @return bool
     */
    public function isEditable(ForumThread $thread = null) : bool
    {
        // To edit a post:

        // 1. User must be logged in
        $user = Auth::user();
        if (!$user) return false;

        // 2. moderators can proceed from here
        if (Gate::allows('moderator')) return true;

        // 3. The user must own the post
        if ($user->id != $this->user_id) return false;

        if (!$thread) $thread = $this->thread;

        // 4. The post's thread must be postable
        if (!$thread->isPostable()) return false;

        // 5a. Posts less than an hour old are always editable
        /** @var Carbon $created_at */
        $created_at = $this->created_at;
        if ($created_at->diffInMinutes(Carbon::now()) <= 60) return true;

        // 5b. The last post in a thread is always editable
        if ($this->id == $thread->last_post_id) return true;

        // 5c. The first post in a thread is always editable
        $fp = $thread->getFirstPost();
        if ($fp && $fp->id == $this->id) return true;

        // Otherwise, the post isn't editable.
        return false;
    }
}
