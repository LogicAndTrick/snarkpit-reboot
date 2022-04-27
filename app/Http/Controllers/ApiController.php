<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ApiController extends Controller
{
    public function postFormat(Request $request) {
        $this->loggedIn();
        $field = $request->input('field') ?: 'text';
        $text = $request->input($field) ?: '';
        return bbcode($text);
    }
}
