<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Download;
use App\Models\ForumPost;
use App\Models\ForumThread;
use App\Models\Map;
use App\Models\User;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    public function getIndex(Request $request)
    {
        $search = trim($request->input('search'));
        $searched = !!$search;

        $users = null;
        $maps = null;
        $articles = null;
        $downloads = null;
        $threads = null;
        $posts = null;

        if ($searched) {
            $threads = ForumThread::with(['user', 'forum', 'last_post', 'last_post.user'])
                ->leftJoin('forums as f', 'f.id', '=', 'forum_threads.forum_id')
                ->whereRaw('(
                        MATCH (forum_threads.title) AGAINST (?)
                        OR forum_threads.title LIKE CONCAT(\'%\', ?, \'%\')
                    )', [ $search, $search ])
                ->select('forum_threads.*')
                ->orderBy('forum_threads.created_at', 'desc')
                ->paginate()
                ->appends($request->except('page'));

            $posts = ForumPost::with(['user', 'thread', 'forum'])
                ->leftJoin('forum_threads as t', 't.id', '=', 'forum_posts.thread_id')
                ->leftJoin('forums as f', 'f.id', '=', 'forum_posts.forum_id')
                ->whereRaw('MATCH (forum_posts.content_text) AGAINST (?)', [ $search ])
                ->whereRaw('t.deleted_at is null')
                ->orderBy('forum_posts.created_at', 'desc')
                ->select('forum_posts.*')
                ->paginate()
                ->appends($request->except('page'));

            $articles = Article::with(['user', 'current_version'])
                ->leftJoin('article_versions as av', 'av.id', '=', 'articles.current_version_id')
                ->where('articles.is_active', '=', 1)
                ->whereRaw('(
                        MATCH (av.content_text, title, description) AGAINST (?)
                    )', [ $search ])
                ->orderBy('articles.created_at', 'desc')
                ->select('articles.*')
                ->paginate()
                ->appends($request->except('page'));

            $downloads = Download::with(['user', 'category', 'game'])
                ->whereRaw('(
                        MATCH (downloads.content_text, downloads.name) AGAINST (?)
                        OR downloads.name LIKE CONCAT(\'%\', ?, \'%\')
                    )', [ $search, $search ])
                ->orderBy('downloads.created_at', 'desc')
                ->paginate()
                ->appends($request->except('page'));

            $maps = Map::with(['user', 'game'])
                ->whereRaw('(
                        MATCH (maps.content_text, maps.name) AGAINST (?)
                        OR maps.name LIKE CONCAT(\'%\', ?, \'%\')
                    )', [ $search, $search ])
                ->orderBy('maps.created_at', 'desc')
                ->paginate()
                ->appends($request->except('page'));

            $users = User::with([])
                ->whereRaw('(
                        MATCH (users.name, users.info_biography_text) AGAINST (?)
                        OR users.name LIKE CONCAT(\'%\', ?, \'%\')
                    )', [ $search, $search ])
                ->orderBy('users.name')
                ->paginate()
                ->appends($request->except('page'));

        }

        return view('search/index', [
            'searched' => $searched,
            'search' => $search,
            'results_threads' => $threads,
            'results_posts' => $posts,
            'results_articles' => $articles,
            'results_downloads'=> $downloads,
            'results_users' => $users,
            'results_maps' => $maps
        ]);
    }

    public function opensearchdescription()
    {
        return response()
            ->view('search.opensearchdescription', [])
            ->header('Content-Type', 'application/opensearchdescription+xml');
    }
}
