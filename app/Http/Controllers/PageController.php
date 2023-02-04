<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Download;
use App\Models\Map;
use App\Models\Page;
use App\Models\User;
use Illuminate\Http\Request;

class PageController extends Controller
{
    public function getPage(Request $request, $slug) {
        $page = Page::query()->where('slug', '=', $slug)->firstOrFail();
        return view('page.view', [
            'page' => $page
        ]);
    }
}
