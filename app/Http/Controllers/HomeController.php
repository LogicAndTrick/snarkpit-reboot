<?php

namespace App\Http\Controllers;

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
        return view('home.index', [
            'news' => $news
        ]);
    }
}
