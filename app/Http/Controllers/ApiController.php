<?php

namespace App\Http\Controllers;

use App\Models\ForumPost;
use Illuminate\Http\Request;

class ApiController extends Controller
{
    public function postGetPost(Request $request) {
        $this->loggedIn();
        $id = $request->integer('id');
        return response()->json(ForumPost::with(['user:id,name'])->select(['id', 'user_id', 'content_text'])->findOrFail($id));
    }

    public function postFormat(Request $request) {
        $this->loggedIn();
        $field = $request->input('field') ?: 'text';
        $text = $request->input($field) ?: '';
        return bbcode($text);
    }
}
