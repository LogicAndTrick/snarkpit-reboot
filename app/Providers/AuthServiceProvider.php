<?php

namespace App\Providers;

use App\Models\ForumPost;
use App\Models\ForumThread;
use App\Models\User;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        // 'App\Models\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        // Generic permissions
        Gate::define('moderator', function (User $user) {
            return $user->level >= User::LEVEL_MODERATOR;
        });

        Gate::define('admin', function (User $user) {
            return $user->level >= User::LEVEL_ADMIN;
        });

        Gate::define('super-admin', function (User $user) {
            return $user->level >= User::LEVEL_SUPER_ADMIN;
        });

        // Specific permissions
        // example
        // Gate::define('update-post', function (User $user, Post $post) {
        //     return $user->id === $post->user_id;
        // });

        Gate::define('create-post', function (User $user, ForumThread $thread) {
            return $thread->isPostable();
        });

        Gate::define('edit-post', function (User $user, ForumPost $post, ForumThread $thread = null) {
            return $user->level >= User::LEVEL_MODERATOR || $post->isEditable($thread);
        });
    }
}
