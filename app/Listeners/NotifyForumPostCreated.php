<?php

namespace App\Listeners;

use App\Events\ForumPostCreatedEvent;
use App\Mail\ForumPostCreatedEmail;
use App\Models\User;
use App\Models\UserNotification;
use App\Models\UserSubscription;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;

class NotifyForumPostCreated implements ShouldQueue
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  \App\Events\ForumPostCreatedEvent  $event
     * @return void
     */
    public function handle(ForumPostCreatedEvent $event)
    {
        UserNotification::AddNotification($event->post->user_id, UserNotification::FORUM_THREAD, $event->post->thread_id);

        // send email to admins and thread subscribers
        $admin_recips = User::query()
            ->where('level', '>=', 3)
            ->where('id', '!=', 100) // snarkpit user
            ->where('id', '!=', $event->post->user_id) // author
            ->where('email', '!=', '')
            ->where('notify_forum_posts', '=', true)
            ->get();

        $subscriber_recips = DB::table('user_subscriptions', 'us')
            ->join('users', 'users.id', '=', 'us.user_id')
            ->where('us.item_type', '=', UserSubscription::FORUM_THREAD)
            ->where('us.item_id', '=', $event->post->thread_id)
            ->where('us.user_id', '!=', 100) // snarkpit user
            ->where('us.user_id', '!=', $event->post->user_id) // author
            ->where('us.send_email', '=', true)
            ->where('users.email', '!=', '')
            ->select('users.email')
            ->distinct()
            ->get();

        if (!$admin_recips->count() && !$subscriber_recips->count()) return; // nobody to send to

        $recips = $admin_recips->pluck('email')->toArray();
        array_push($recips, ...$subscriber_recips->pluck('email')->toArray());

        $recips = filter_valid_emails(array_unique($recips));
        if (count($recips) == 0) return;

        Mail::bcc($recips)
            ->send(new ForumPostCreatedEmail($event->post));
    }
}
