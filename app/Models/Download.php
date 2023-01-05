<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;

class Download extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'download_category_id',
        'user_id',
        'game_id',
        'thread_id',
        'name',
        'content_text',
        'content_html',
        'stat_downloads',
        'image_file',
        'download_file',
        'mirrors',
        'mirror_list',
        'file_size_readable'
    ];

    protected $appends = [
        'mirror_list',
        'file_size_readable'
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function category() {
        return $this->belongsTo(DownloadCategory::class, 'download_category_id');
    }

    public function game() {
        return $this->belongsTo(Game::class);
    }

    public function thread() {
        return $this->belongsTo(ForumThread::class, 'thread_id');
    }

    protected function getMirrorListAttribute() {
        return $this->getMirrors();
    }

    protected function getFileSizeReadableAttribute() {
        return $this->getFileSize();
    }

    public function getMirrors() {
        $files = [];
        if ($this->download_file) {
            $files[] = [
                'url' => url('download/download', $this->id),
                'text' => 'Download'
            ];
        }

        $mirrors = array_filter(array_map(fn($x) => trim($x), explode("\n", $this->mirrors)), fn($x) => $x && strlen($x) > 0);
        for ($i = 0; $i < count($mirrors); $i++) {
            $files[] = [
                'url' => url('download/download?mirror=' . urlencode($mirrors[$i]), $this->id),
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

    public function canEdit()
    {
        return Auth::id() == $this->user_id || Gate::allows('moderator');
    }
}
