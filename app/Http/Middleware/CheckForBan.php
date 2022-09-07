<?php

namespace App\Http\Middleware;

use App\Models\Ban;
use Carbon\Carbon;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CheckForBan
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse|\Illuminate\Http\JsonResponse
     */
    public function handle(Request $request, Closure $next)
    {
        if ($this->shouldCheckForBan($request)) {
            if ($this->isBanned($request)) {
                if (($request->ajax() && ! $request->pjax()) || $request->wantsJson()) {
                    return response()->json([
                        'message' => 'This account is banned.'
                    ])->setStatusCode(422);
                }
                return redirect('/ban/index');
            }
        }
        return $next($request);
    }

    /**
     * Check if we should check for a ban.
     * The ban controller is excluded so we don't get into a loop
     * @param Request $request
     * @return bool
     */
    protected function shouldCheckForBan(Request $request)
    {
        return !$request->is('ban/*') && !$request->is('account/logout');
    }

    /**
     * Check if the current client is banned (either by user id, or by IP address)
     * @param Request $request
     * @return bool
     */
    protected function isBanned(Request $request)
    {
        $id = !Auth::user() ? -1 : Auth::user()->id;
        $ip = $request->ip();
        $now = Carbon::now();

        $activeBan = Ban::query()
            ->where('created_at', '<=', $now)
            ->whereRaw('(ends_at IS NULL OR ends_at >= ?)', [$now])
            ->whereRaw('(user_id = ? OR ip = ?)', [$id, $ip])
            ->first();

        return $activeBan != null;
    }
}
