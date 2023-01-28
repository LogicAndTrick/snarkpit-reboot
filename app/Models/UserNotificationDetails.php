<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserNotificationDetails extends Model
{
    protected $table = 'user_notification_details';
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
}
