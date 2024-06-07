<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class CompatibilityRedirect
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
        function redir(string $path) {
            return response()->redirectTo(config('app.url') . $path, 308);
        }

        if (Str::startsWith($_SERVER['REQUEST_URI'], '/index.php?'))
        {
            parse_str($_SERVER['QUERY_STRING'], $query);
            $p = $query['p'] ?? '';
            $s = $query['s'] ?? '';

            // sections
            if ($s == 'main') {
                return redir('/');
            } else if ($s == 'maps') {
                $map = $query['map'] ?? $query['download'] ?? '';
                $uid = $query['uid'] ?? '';
                $game = $query['game'] ?? '';
                $q = '';
                if ($map) $q = '/view/' . $map;
                else if ($uid && $game) $q = '?user=' . $uid . '&game=' . $game;
                else if ($uid) $q = '?user=' . $uid;
                else if ($game) $q = '?game=' . $game;
                return redir('/map' . $q);
            } else if ($s == 'articles') {
                // most article pages use a different naming scheme, so we handle them separately
                $author = $query['author'] ?? '';
                if ($author) return redir('/article?user=' . $author);
                return redir('/article');
            } else if ($s == 'downloads') {
                $download = $query['download'] ?? '';
                if ($download) return redir('/download/view/' . $download);
                return redir('/download');
            } else if ($s == 'forums') {
                $f = $query['f'] ?? '';
                $t = $query['t'] ?? '';
                if ($t) return redir('/thread/view/' . $t);
                if ($f) return redir('/forum/view/' . $f);
                return redir('/forum');
            } else if ($s == 'links') {
                return redir('/link');
            }

            // pages - misc
            if ($p == 'hof') return redir('/map?game=&status=&sort=rating.desc');

            // pages - account
            if ($p == 'login') return redir('/account/login');
            if ($p == 'register') return redir('/account/register');
            if ($p == 'retrieve') return redir('/account/forgot-password');
            if ($p == 'viewprofile') return redir('/user/view/' . ($query['uid'] ?? ''));
            if ($p == 'cp') return redir('/panel');

            // pages - meta
            if ($p == 'about') return redir('/page/about-us');
            if ($p == 'search') return redir('/search');
            if ($p == 'contact') return redir('/page/contact');
            if ($p == 'version') return redir('/page/changelog');

            // everything else
            return redir('/');
        }
        return $next($request);
    }
}
