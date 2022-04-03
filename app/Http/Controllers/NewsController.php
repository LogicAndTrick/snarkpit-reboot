<?php

namespace App\Http\Controllers;

use App\Models\News;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class NewsController extends Controller
{
    public function getIndex()
    {
        $newses = News::with(['user'])->orderBy('created_at', 'desc')->paginate(10);
        return view('news/index', [
            'newses' => $newses
        ]);
    }

    public function getView($id) {
        $news = News::findOrFail($id);
        return view('news/view', [
            'news' => $news
        ]);
    }

    // Administrative Tasks

    public function getCreate() {
        $this->admin();
        return view('news/create', [

        ]);
    }

    public function postCreate(Request $request) {
        $this->admin();
        $request->validate([
            'subject' => 'required|max:255',
            'text' => 'required|max:10000'
        ]);
        $news = News::Create([
            'user_id' => Auth::user()->id,
            'subject' => $request->input('subject'),
            'content_text' => $request->input('text'),
            'content_html' => bbcode($request->input('text'))
        ]);
        return redirect('/news/view/' . $news->id);
    }

    public function getEdit($id) {
        $this->admin();
        $news = News::findOrFail($id);
        return view('news/edit', [
            'news' => $news
        ]);
    }

    public function postEdit(Request $request) {
        $this->admin();
        $id = intval($request->input('id'));
        $news = News::findOrFail($id);
        $request->validate([
            'subject' => 'required|max:255',
            'text' => 'required|max:10000'
        ]);
        $news->update([
            'subject' => $request->input('subject'),
            'content_text' => $request->input('text'),
            'content_html' => bbcode($request->input('text'))
        ]);
        return redirect('/news/view/' . $news->id);
    }

    public function getDelete($id) {
        $this->admin();
        $news = News::findOrFail($id);
        return view('news/delete', [
            'news' => $news
        ]);
    }

    public function postDelete(Request $request) {
        $this->admin();
        $id = intval($request->input('id'));
        $news = News::findOrFail($id);
        $news->delete();
        return redirect('news/');
    }
}
