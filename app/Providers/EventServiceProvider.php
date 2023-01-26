<?php

namespace App\Providers;

use App\Listeners\NotifyArticleStatusChanged;
use App\Listeners\NotifyDownloadCreated;
use App\Listeners\NotifyForumPostCreated;
use App\Listeners\NotifyForumThreadCreated;
use App\Listeners\NotifyJournalCreated;
use App\Listeners\NotifyMapCreated;
use App\Listeners\NotifyMessageCreated;
use App\Listeners\NotifyNewsCreated;
use Illuminate\Auth\Events\Registered;
use Illuminate\Auth\Listeners\SendEmailVerificationNotification;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Event;

use App\Events\ArticleStatusChangedEvent;
use App\Events\DownloadCreatedEvent;
use App\Events\ForumThreadCreatedEvent;
use App\Events\ForumPostCreatedEvent;
use App\Events\JournalCreatedEvent;
use App\Events\MapCreatedEvent;
use App\Events\MessageCreatedEvent;
use App\Events\NewsCreatedEvent;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event listener mappings for the application.
     *
     * @var array<class-string, array<int, class-string>>
     */
    protected $listen = [
        Registered::class => [
            SendEmailVerificationNotification::class,
        ],
        ArticleStatusChangedEvent::class => [
            NotifyArticleStatusChanged::class,
        ],
        DownloadCreatedEvent::class => [
            NotifyDownloadCreated::class,
        ],
        ForumThreadCreatedEvent::class => [
            NotifyForumThreadCreated::class,
        ],
        ForumPostCreatedEvent::class => [
            NotifyForumPostCreated::class,
        ],
        JournalCreatedEvent::class => [
            NotifyJournalCreated::class,
        ],
        MapCreatedEvent::class => [
            NotifyMapCreated::class,
        ],
        MessageCreatedEvent::class => [
            NotifyMessageCreated::class,
        ],
        NewsCreatedEvent::class => [
            NotifyNewsCreated::class,
        ],
    ];

    /**
     * Register any events for your application.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
