<?php

namespace App\Http\Controllers;

use App\Models\Link;
use Illuminate\Http\Request;

class LinksController extends Controller
{
    public function getIndex()
    {
        $links = Link::orderBy('name')->get();
        return view('links/index', [
            'links' => $links
        ]);
    }
}
