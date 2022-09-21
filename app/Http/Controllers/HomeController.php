<?php

namespace App\Http\Controllers;

use App\Models\ForumPost;
use App\Models\ForumThread;
use App\Models\Map;
use App\Models\News;
use Illuminate\Http\Request;

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
        return view('home.index', [
            'news' => $news,
            'maps' => $maps,
            'threads' => $threads
        ]);
    }
}
