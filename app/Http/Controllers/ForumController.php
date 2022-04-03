<?php

namespace App\Http\Controllers;

use App\Models\Forum;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ForumController extends Controller
{
    public function getIndex()
    {
        $forums = Forum::with(['last_post'])->orderBy('order_index')->get();
        return view('forum/index', [
            'forums' => $forums
        ]);
    }

    public function getView($id) {
        $forum = Forum::findOrFail($id);
        return view('forum/view', [
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
