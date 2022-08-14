<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Download;
use App\Models\Map;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function getIndex() {

    }

    public function getView($id) {
        $user = User::query()->findOrFail($id);
        // todo journal
        // todo latest forum posts
        // todo link to all maps/articles/downloads/journals
        $maps = Map::with(['user', 'status', 'game', 'images'])
            ->where('user_id', '=', $id)
            ->orderBy('updated_at', 'desc')
            ->limit(3)
            ->get();
        $articles = Article::with(['user', 'game', 'category', 'current_version'])
            ->where('user_id', '=', $id)
            ->where('is_active', '=', 1)
            ->orderBy('updated_at', 'desc')
            ->limit(3)
            ->get();
        $downloads = Download::with(['user', 'game', 'category'])
            ->where('user_id', '=', $id)
            ->orderBy('updated_at', 'desc')
            ->limit(3)
            ->get();

        return view('user.view', [
            'user' => $user,
            'maps' => $maps,
            'articles' => $articles,
            'downloads' => $downloads,
        ]);
    }
}
