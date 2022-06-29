<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ArticleVersion extends Model
{
    use HasFactory;

    public const STATUS_DRAFT = 1;
    public const STATUS_PENDING = 2;
    public const STATUS_APPROVED = 3;
    public const STATUS_ARCHIVED = 4;
    public const STATUS_REJECTED = 5;

    public function article() {
        return $this->belongsTo(Article::class);
    }

    public static function CreateSlug($text) {
        $text = str_ireplace(' ', '_', $text);
        $text = preg_replace('/[^-$_.+!*\'"(),:;<>^{}|~0-9a-z[\]]/si', '', $text);
        return $text;
    }
}
