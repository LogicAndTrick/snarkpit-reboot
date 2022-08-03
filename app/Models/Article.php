<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;

class Article extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'article_category_id',
        'game_id',
        'forum_thread_id',
        'current_version_id',
        'is_active',
        'stat_views'
    ];

    public function current_version() {
        return $this->belongsTo(ArticleVersion::class, 'current_version_id');
    }

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function category() {
        return $this->belongsTo(ArticleCategory::class, 'article_category_id');
    }

    public function game() {
        return $this->belongsTo(Game::class);
    }

    public function thread() {
        return $this->belongsTo(ForumThread::class, 'forum_thread_id');
    }

    public function canEdit() {
        return Auth::id() === $this->user_id || Gate::allows('moderator');
    }
}
