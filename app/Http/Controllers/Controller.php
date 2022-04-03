<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\Gate;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function moderator() {
        if (!Gate::allows('moderator')) abort(403);
    }

    public function admin() {
        if (!Gate::allows('admin')) abort(403);
    }

    public function superAdmin() {
        if (!Gate::allows('super-admin')) abort(403);
    }
}
