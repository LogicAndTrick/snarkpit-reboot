<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class UserSubscription extends Model
{
    public const FORUM_THREAD = 't';
    public const ARTICLE = 'a';
    public const MAP = 'm';
    public const NEWS = 'n';
    public const JOURNAL = 'j';
    public const DOWNLOAD = 'd';

    public static function getSubscription($user, $item_type, $item_id, $clear = false)
    {
        if (!$user || !$user->id) return null;

        $ty = $item_type;
        $sub = UserSubscription::whereUserId($user->id)
            ->whereItemType($ty)
            ->whereItemId($item_id)
            ->first();
        if ($sub && $clear) {
            DB::statement('CALL clear_user_notifications(?, ?, ?);', [$user->id, $ty, $item_id]);
        }
        return $sub;
    }

    protected $table = 'user_subscriptions';
    protected $fillable = [ 'user_id', 'item_type', 'item_id', 'send_email' ];
    public $visible = [ ];
    public $timestamps = false;

    protected $appends = ['type_description','link'];
    public function getTypeDescriptionAttribute() {
        switch ($this->item_type) {
            case UserSubscription::FORUM_THREAD: return 'Forum Thread';
            case UserSubscription::ARTICLE: return 'Article';
            case UserSubscription::MAP: return 'Map';
            case UserSubscription::NEWS: return 'News Post';
            case UserSubscription::JOURNAL: return 'Journal';
            case UserSubscription::DOWNLOAD: return 'Download';
            default: return 'Unknown';
        }
    }
    public function getLinkAttribute() {
        $id = $this->item_id;
        switch ($this->item_type) {
            case UserSubscription::FORUM_THREAD: return url('thread/view', [$id]).'?page=last';
            case UserSubscription::ARTICLE: return url('article/go', [$id]);
            case UserSubscription::MAP: return url('vault/index', [$id]);
            case UserSubscription::NEWS: return url('news/view', [$id]);
            case UserSubscription::JOURNAL: return url('journal/view', [$id]);
            case UserSubscription::DOWNLOAD: return url('poll/view', [$id]);
            default: return 'Unknown';
        }
    }

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function forum_thread() {
        return $this->belongsTo(ForumThread::class, 'item_id', 'id');
    }
}
