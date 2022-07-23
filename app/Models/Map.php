<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Map extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'name',
        'user_id',
        'game_id',
        'thread_id',
        'status_id',
        'is_featured',
        'content_text',
        'content_html',
        'stat_views',
        'stat_downloads',
        'stat_rating',
        'stat_ratings',
        'download_file',
        'mirrors',
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function status() {
        return $this->belongsTo(MapStatus::class, 'status_id');
    }

    public function game() {
        return $this->belongsTo(Game::class);
    }

    public function thread() {
        return $this->belongsTo(ForumThread::class, 'thread_id');
    }

    public function images() {
        return $this->hasMany(MapImage::class, 'map_id');
    }

    public function ratings() {
        return $this->hasMany(MapRating::class, 'map_id');
    }

    public function getMirrors() {
        $files = [];
        if ($this->download_file) {
            $files[] = [
                'url' => url('map/download', $this->id),
                'text' => 'Download'
            ];
        }

        $mirrors = array_filter(array_map(fn($x) => trim($x), explode("\n", $this->mirrors)), fn($x) => $x && strlen($x) > 0);
        for ($i = 0; $i < count($mirrors); $i++) {
            $files[] = [
                'url' => url('map/download?mirror=' . urlencode($mirrors[$i]), $this->id),
                'text' => 'Mirror ' . ($i + 1)
            ];
        }
        return $files;
    }

    public function getFileSize() {
        if ($this->download_file) {
            $fil = public_path($this->download_file);
            if (file_exists($fil)) return format_filesize(filesize($fil));
            return 'Unknown';
        }
        return null;
    }
}
