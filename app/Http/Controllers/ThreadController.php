<?php

namespace App\Http\Controllers;

use App\Models\Forum;
use App\Models\ForumPost;
use App\Models\ForumThread;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Pagination\Paginator;
use Illuminate\Support\Facades\Auth;

class ThreadController extends Controller
{
    public function getView(Request $request, $id) {
        $thread = ForumThread::with(['user'])->findOrFail($id);
        $forum = Forum::findOrFail($thread->forum_id);

        // Update stats
        $thread->timestamps = false;
        $thread->markAsRead();
        $thread->stat_views++;
        $thread->save();
        $thread->timestamps = true;

        $page = intval($request->input('page')) ?: 1;
        $post_query = ForumPost::with('user')->where('thread_id', '=', $id)->whereNull('deleted_at')->orderBy('created_at');
        $count = $post_query->getQuery()->getCountForPagination();
        if ($request->input('page') == 'last') $page = ceil($count / 50);
        $posts = $post_query->skip(($page - 1) * 50)->take(50)->get();
        $pag = new LengthAwarePaginator($posts, $count, 50, $page, [ 'path' => Paginator::resolveCurrentPath() ]);

        return view('thread.view', [
            'forum' => $forum,
            'thread' => $thread,
            'posts' => $pag,
            //'subscription' => UserSubscription::getSubscription(Auth::user(), UserSubscription::FORUM_THREAD, $id, true)
        ]);
    }

    public function getCreate($id)
    {
        $forum = Forum::findOrFail($id);
        return view('thread.create', [
            'forum' => $forum
        ]);
    }

    public function postCreate(Request $request) {
        $id = intval($request->input('forum_id'));
        $forum = Forum::findOrFail($id);
        $request->validate([
            'title' => 'required|max:200',
            'description' => 'max:200',
            'text' => 'required|max:10000'
        ]);
        $thread = ForumThread::Create([
            'forum_id' => $id,
            'user_id' => Auth::id(),
            'title' => $request->input('title'),
            'description' => $request->input('description'),
        ]);
        $post = ForumPost::Create([
            'thread_id' => $thread->id,
            'forum_id' => $id,
            'user_id' => Auth::user()->id,
            'content_text' => $request->input('text'),
            'content_html' => bbcode($request->input('text')),
        ]);
        return redirect('thread/view/'.$thread->id.'?page=last');
    }

    // Administrative Tasks

    public function getEdit($id) {
        $this->admin();
        $thread = ForumThread::with(['forum'])->findOrFail($id);
        return view('thread.edit', [
            'thread' => $thread
        ]);
    }

    public function postEdit(Request $request) {
        $this->admin();
        $id = intval($request->input('id'));
        $thread = ForumThread::findOrFail($id);
        $request->validate([
            'title' => 'required|max:200',
            'description' => 'max:200'
        ]);
        $thread->update([
            'title' => $request->input('title'),
            'description' => $request->input('description'),
            'is_open' => $request->boolean('is_open'),
            'is_sticky' => $request->boolean('is_sticky')
        ]);
        return redirect('/thread/view/' . $thread->id);
    }

    public function getDelete($id) {
        $this->admin();
        $thread = ForumThread::with(['forum'])->findOrFail($id);
        return view('thread.delete', [
            'thread' => $thread
        ]);
    }

    public function postDelete(Request $request) {
        $this->admin();
        $id = intval($request->input('id'));
        $thread = ForumThread::findOrFail($id);
        $thread->delete();
        return redirect('forum/view/'.$thread->forum_id);
    }
}
