<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;

class ArticleVersion extends Model
{
    use HasFactory;

    public const STATUS_DRAFT = 1;
    public const STATUS_PENDING = 2;
    public const STATUS_APPROVED = 3;
    public const STATUS_ARCHIVED = 4;
    public const STATUS_REJECTED = 5;

    protected $fillable = [
	    'article_id',
	    'user_id',
	    'status',
	    'slug',
	    'title',
	    'description',
	    'attachment_file',
	    'thumbnail_file',
        'image_files_base',
	    'content_text',
	    'content_html',
	    'review_user_id',
	    'review_text',
	    'review_html',
    ];

    public function article() {
        return $this->belongsTo(Article::class);
    }

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function review_user() {
        return $this->belongsTo(User::class, 'review_user_id');
    }

    public function getStatus() {
        switch ($this->status) {
            case self::STATUS_APPROVED:
                return 'Approved';
            case self::STATUS_DRAFT:
                return 'Draft';
            case self::STATUS_PENDING:
                return 'Pending approval';
            case self::STATUS_REJECTED:
                return 'Not approved';
            case self::STATUS_ARCHIVED:
                return 'Archived';
        }
        return 'Unknown';
    }

    public function canView() {
        switch ($this->status) {
            case self::STATUS_APPROVED:
                return true;
            case self::STATUS_DRAFT:
            case self::STATUS_PENDING:
            case self::STATUS_REJECTED:
            case self::STATUS_ARCHIVED:
                return $this->canEdit();
        }
        return false;
    }

    public function canEdit() {
        return Gate::allows('moderator') || Auth::id() == $this->user_id;
    }

    public function canDelete() {
        return Gate::allows('moderator')
            || (Auth::id() == $this->user_id &&
                ($this->status == self::STATUS_DRAFT || $this->status == self::STATUS_REJECTED)
            );
    }

    public static function CreateSlug($text) {
        $text = str_ireplace(' ', '_', $text);
        $text = preg_replace('/[^-$_.+!*\'"(),:;<>^{}|~0-9a-z[\]]/si', '', $text);
        return $text;
    }
}
