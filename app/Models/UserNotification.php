<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class UserNotification extends Model
{
    public const FORUM_THREAD = 't';
    public const ARTICLE = 'a';
    public const MAP = 'm';
    public const NEWS = 'n';
    public const JOURNAL = 'j';
    public const DOWNLOAD = 'd';

    protected $table = 'user_notifications';
    protected $fillable = [ 'user_id', 'item_type', 'item_id', 'is_unread' ];
    public $visible = [ ];
    protected $appends = ['type_description', 'link'];
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

    /**
     * Add a notification to all subscribers
     *
     * @param $notifying_user_id int The user who created the post. They will not be notified.
     * @param $item_type string The item type
     * @param $item_id int The item id
     */
    public static function AddNotification($notifying_user_id, $item_type, $item_id)
    {
        $type = $item_type;
        $id = $item_id;
        $user_id = $notifying_user_id;

        DB::statement('
            INSERT INTO user_notifications (user_id, item_type, item_id, is_unread, created_at, updated_at)
            SELECT US.user_id, US.item_type, US.item_id, 1, UTC_TIMESTAMP(), UTC_TIMESTAMP()
            FROM user_subscriptions US
            WHERE US.item_type = ? AND US.item_id = ? AND US.user_id != ?
            AND (
                SELECT COUNT(*)
                FROM user_notifications UN
                WHERE UN.user_id = US.user_id
                AND UN.item_id = US.item_id
                AND UN.item_type = US.item_type
                AND UN.is_unread = 1
            ) = 0
        ', [ $type, $id, $user_id ]);
    }
}
