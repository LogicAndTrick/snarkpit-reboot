<?php

namespace App\Http\Controllers;

use App\Models\Forum;
use App\Models\ForumThread;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Pagination\Paginator;
use Illuminate\Support\Facades\Auth;

class ForumController extends Controller
{
    public function getIndex()
    {
        $forums = Forum::with(['last_post', 'last_post.thread', 'last_post.user'])->orderBy('order_index')->get();
        return view('forum/index', [
            'forums' => $forums
        ]);
    }

    public function getView(Request $request, $id) {
        $forum = Forum::findOrFail($id);
        $page = intval($request->input('page')) ?: 1;
        $thread_query = ForumThread::where('forum_id', '=', $forum->id)
            ->with(['last_post', 'last_post.user', 'user'])
            ->orderBy('is_sticky', 'desc')
            ->orderBy('last_post_at', 'desc')
            ->orderBy('updated_at', 'desc');
        $count = $thread_query->getQuery()->getCountForPagination();
        $threads = $thread_query->skip(($page - 1) * 50)->take(50)->get();
        $pag = new LengthAwarePaginator($threads, $count, 50, $page, [ 'path' => Paginator::resolveCurrentPath() ]);
        return view('forum.view', [
            'threads' => $pag,
            'forum' => $forum
        ]);
    }

    // Administrative Tasks

    public function getCreate() {
        $this->admin();
        return view('forum/create', [

        ]);
    }

    public function postCreate(Request $request) {
        $this->admin();
        $request->validate([
            'name' => 'required|max:255',
            'description' => 'required|max:10000',
            'order_index' => 'numeric'
        ]);
        $forum = Forum::Create([
            'name' => $request->input('name'),
            'description' => $request->input('description'),
            'order_index' => $request->input('order_index')
        ]);
        return redirect('/forum/view/' . $forum->id);
    }

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
