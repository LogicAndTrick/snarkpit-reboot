<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SearchController extends Controller
{
    public function getIndex()
    {
        return response()->json([ 'hi' => 1 ]);
    }

    public function opensearchdescription()
    {
        return response()
            ->view('search.opensearchdescription', [])
            ->header('Content-Type', 'application/opensearchdescription+xml');
    }
}
