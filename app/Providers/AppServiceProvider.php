<?php

namespace App\Providers;

use App\Helpers\UserProvider;
use App\Models\User;
use Illuminate\Pagination\Paginator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Paginator::useBootstrap();
        Auth::provider('snarkpit', function($app, array $config)
        {
            return new UserProvider($app['hash'], User::class);
        });
    }
}
