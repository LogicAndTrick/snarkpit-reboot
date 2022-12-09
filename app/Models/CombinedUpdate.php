<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CombinedUpdate extends Model
{
    protected $table = 'combined_updates';

    public const TYPE_MAP = 'map';
    public const TYPE_DOWNLOAD = 'download';
    public const TYPE_ARTICLE = 'article';

    // select 'map' as type, m.id, m.user_id, m.name, m.updated_at, m.game_id, null as download_category_id, null as article_category_id
    protected $dates = [
        'updated_at'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function game()
    {
        return $this->belongsTo(Game::class, 'game_id');
    }

    public function article_category()
    {
        return $this->belongsTo(ArticleCategory::class, 'article_category_id');
    }

    public function download_category()
    {
        return $this->belongsTo(DownloadCategory::class, 'download_category_id');
    }

    public function thread()
    {
        return $this->belongsTo(ForumThread::class, 'thread_id');
    }
}
