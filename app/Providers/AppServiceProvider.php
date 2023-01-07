<?php

namespace App\Providers;

use App\Helpers\UserProvider;
use App\Models\Article;
use App\Models\Download;
use App\Models\Map;
use App\Models\Spotlight;
use App\Models\User;
use Illuminate\Database\Eloquent\Relations\Relation;
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
        Relation::enforceMorphMap([
            Spotlight::TYPE_ARTICLE => Article::class,
            Spotlight::TYPE_MAP => Map::class,
            Spotlight::TYPE_DOWNLOAD => Download::class,
        ]);
    }
}
