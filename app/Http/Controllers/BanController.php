<?php

namespace App\Http\Controllers;

use App\Models\Ban;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

class BanController extends Controller
{
    public function getIndex()
    {
        $request = \request();
        $id = !Auth::user() ? -1 : Auth::user()->id;
        $ip = $request->ip();
        $now = Carbon::now();

        $activeBan = Ban::where('created_at', '<=', $now)
            ->whereRaw('(ends_at IS NULL OR ends_at >= ?)', [$now])
            ->whereRaw('(user_id = ? OR ip = ?)', [$id, $ip])
            ->first();

        if (!$activeBan) return redirect('/');
        return view('auth.banned', [
            'ban' => $activeBan
        ]);
    }
}
