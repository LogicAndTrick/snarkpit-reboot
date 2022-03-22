<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class EnsureVerified extends \Illuminate\Auth\Middleware\EnsureEmailIsVerified
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle($request, Closure $next, $redirectToRoute = null)
    {
        if (!$this->shouldCheckForVerifiedEmail($request)) {
            return $next($request);
        }
        return parent::handle($request, $next, $redirectToRoute);
    }

    protected function shouldCheckForVerifiedEmail(Request $request) {
        return Auth::check()
            && !$request->isXmlHttpRequest()
            && $request->method() == 'GET'
            && !$request->is('account/*')
            && !$request->is('api/*')
            && !$request->is('ban/*');
    }
}
