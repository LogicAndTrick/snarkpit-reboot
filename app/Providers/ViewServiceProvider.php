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
            $num_notifications = 0;
            if (Auth::check()) {
                $num_unread = Auth::user()->unreadPrivateMessageCount();
                $num_notifications = Auth::user()->unreadNotificationCount();
            }
            $view->with('num_unread_messages', $num_unread);
            $view->with('num_unread_notifications', $num_notifications);
        });
    }
}
