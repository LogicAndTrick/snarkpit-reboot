<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ConvertLegacyAccount
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
        if ($this->shouldCheckForLegacyAccount($request)) {
            if ($this->isLegacyAccount($request)) {
                return redirect('/account/convert');
            }
        }
        return $next($request);
    }

    protected function shouldCheckForLegacyAccount(Request $request) {
        return Auth::check()
            && !$request->isXmlHttpRequest()
            && $request->method() == 'GET'
            && !$request->is('account/*')
            && !$request->is('api/*')
            && !$request->is('ban/*');
    }

    protected function isLegacyAccount(Request $request) {
        $user = Auth::user();
        return !!$user->legacy_password;
    }
}
