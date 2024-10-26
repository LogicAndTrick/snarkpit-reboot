<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\CombinedUpdate;
use App\Models\ForumThread;
use App\Models\Journal;
use App\Models\Map;
use App\Models\News;
use App\Models\Spotlight;
use App\Models\User;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class HomeController extends Controller
{
    public function index()
    {
        $news = News::with('user')
            ->orderByDesc('created_at')
            ->limit(3)
            ->get();
        $maps = Map::with(['user', 'status', 'game', 'images'])
            ->orderBy('created_at', 'desc')
            ->limit(8)
            ->get();
        $threads = ForumThread::with(['last_post', 'last_post.user', 'forum'])
            ->orderBy('last_post_at', 'desc')
            ->limit(10)
            ->get();
        $active_users = User::query()
            ->orderBy('last_access_time', 'desc')
            ->limit(10)
            ->get();
        $updates = CombinedUpdate::with(['user', 'game', 'article_category', 'download_category'])
            ->orderBy('updated_at', 'desc')
            ->limit(10)
            ->get();

        $spotlights = Spotlight::with(['item' => function (MorphTo $morphTo) {
                $morphTo->morphWith([
                    Article::class => ['current_version'],
                    Map::class => ['images']
                ]);
            }, 'item.user'])
            ->orderBy('position', 'asc')
            ->limit(10)
            ->get();
        $journals = Journal::with(['user'])
            ->orderBy('created_at', 'desc')
            ->limit(5)
            ->get();
        return view('home.index', [
            'news' => $news,
            'maps' => $maps,
            'threads' => $threads,
            'active_users' => $active_users,
            'updates' => $updates,
            'spotlights' => $spotlights,
            'journals' => $journals,
        ]);
    }
}
