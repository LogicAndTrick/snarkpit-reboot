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
        foreach ($posts as $p) {
            if ($p->content_html == '' && $p->content_text != '') {
                $p->content_html = bbcode($p->content_text);
                $p->timestamps = false;
                $p->save();
            }
        }
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
        $forum = Forum::findOrFail($id);
        return view('forum/edit', [
            'forum' => $forum
        ]);
    }

    public function postEdit(Request $request) {
        $this->admin();
        $id = intval($request->input('id'));
        $forum = Forum::findOrFail($id);
        $request->validate([
            'name' => 'required|max:255',
            'description' => 'required|max:10000',
            'order_index' => 'numeric'
        ]);
        $forum->update([
            'name' => $request->input('name'),
            'description' => $request->input('description'),
            'order_index' => $request->input('order_index')
        ]);
        return redirect('/forum/view/' . $forum->id);
    }

    public function getDelete($id) {
        $this->admin();
        $forum = Forum::findOrFail($id);
        return view('forum/delete', [
            'forum' => $forum
        ]);
    }

    public function postDelete(Request $request) {
        $this->admin();
        $id = intval($request->input('id'));
        $forum = Forum::findOrFail($id);
        $forum->delete();
        return redirect('forum/');
    }
}
