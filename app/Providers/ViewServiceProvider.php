<?php

namespace App\Providers;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\View;
use Illuminate\Support\ServiceProvider;

class ViewServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        View::composer('layouts.header', function ($view) {
            $view->with('latest_user', User::query()->orderByDesc('id')->first());

            $num_unread = 0;
            if (Auth::check()) {
                // Check if the user has any unread private messages
                $num_unread = DB::selectOne('
                    select count(*) c
                    from messages m
                    where m.deleted_at is null
                    and m.to_user_id = ?
                    and m.is_read = 0
                ', [Auth::id()])->c;
            }
            $view->with('num_unread_messages', $num_unread);
        });
    }
}
