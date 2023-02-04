<?php

namespace App\Http\Controllers;

use App\Events\ForumPostCreatedEvent;
use App\Events\RecalculateSnarkmarksEvent;
use App\Models\Forum;
use App\Models\ForumPost;
use App\Models\ForumThread;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;

class PostController extends Controller
{
    public function getIndex(Request $request)
    {
        $query = ForumPost::with(['thread'])
            ->orderBy('created_at', 'desc');

        $uid = $request->integer('user');
        if ($uid) $query = $query->where('user_id', '=', $uid);

        $posts = $query->paginate(50)->appends($request->except('page'));

        return view('post.index', [
            'posts' => $posts
        ]);
    }

    public function postCreate(Request $request) {
        $id = intval($request->input('thread_id'));
        $thread = ForumThread::findOrFail($id);
        if (!Gate::allows('create-post', [$thread])) abort(403);
        $request->validate([
            'text' => 'required|max:10000'
        ]);
        $post = ForumPost::Create([
            'thread_id' => $id,
            'forum_id' => $thread->forum_id,
            'user_id' => Auth::user()->id,
            'content_text' => $request->input('text'),
            'content_html' => bbcode($request->input('text')),
            'add_signature' => $request->boolean('add_signature')
        ]);

        ForumPostCreatedEvent::dispatch($post);
        RecalculateSnarkmarksEvent::dispatch($post->user_id);

        return redirect('thread/view/'.$thread->id.'?page=last');
    }

    public function getEdit(Request $request, $id) {
        $post = ForumPost::with(['thread', 'forum', 'user'])->findOrFail($id);
        if (!Gate::allows('edit-post', [$post, $post->thread])) abort(403);
        return view('post.edit', [
            'post' => $post
        ]);
    }

    public function postEdit(Request $request) {
        $id = intval($request->input('id'));
        $post = ForumPost::with(['thread'])->findOrFail($id);
        if (!Gate::allows('edit-post', [$post, $post->thread])) abort(403);
        $request->validate([
            'text' => 'required|max:10000'
        ]);
        $post->update([
            'content_text' => $request->input('text'),
            'content_html' => bbcode($request->input('text')),
        ]);
        // todo determine page to redirect to
        return redirect('thread/view/'.$post->thread_id);
    }

    public function getDelete(Request $request, $id) {
        $this->moderator();
        $post = ForumPost::with(['thread', 'forum', 'user'])->findOrFail($id);
        return view('post.delete', [
            'post' => $post
        ]);
    }

    public function postDelete(Request $request) {
        $this->moderator();
        $id = intval($request->input('id'));
        $post = ForumPost::with(['thread'])->findOrFail($id);
        $post->delete();
        RecalculateSnarkmarksEvent::dispatch($post->user_id);
        return redirect('thread/view/'.$post->thread_id);
    }
}
