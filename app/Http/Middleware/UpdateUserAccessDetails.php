<?php

namespace App\Http\Middleware;

use App\Models\User;
use Carbon\Carbon;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UpdateUserAccessDetails
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        if ($this->shouldUpdate($request)) {
            $this->update($request);
        }
        return $next($request);
    }

    /**
     * Check if we should update the user access details on this request.
     * AJAX and POST requests are excluded.
     * @param Request $request
     * @return bool
     */
    protected function shouldUpdate(Request $request)
    {
        $segments = $request->segments();
        return Auth::user() != null
            && !$request->isXmlHttpRequest()
            && $request->method() == 'GET'
            && (count($segments) === 0 || $segments[0] !== 'api');
    }

    /**
     * Update the logged in user details with the new request information.
     * @param Request $request
     */
    protected function update(Request $request)
    {
        /** @var User $user */
        $user = Auth::user();

        if (!$request->session()->has('login_time')) {
            $request->session()->put('login_time', Carbon::now());
            $request->session()->put('last_access_time', $user->last_access_time);
            $user->last_login_time = Carbon::now();
            $user->stat_logins++;
        }

        $user->last_access_time = Carbon::now();
        $user->last_access_page = $request->getPathInfo();
        $user->last_access_ip = $request->ip();
        $user->save();
    }
}
