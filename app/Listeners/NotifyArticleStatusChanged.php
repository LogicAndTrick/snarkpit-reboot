<?php

namespace App\Listeners;

use App\Events\ArticleStatusChangedEvent;
use App\Mail\ArticleApprovedEmail;
use App\Mail\ArticleRejectedEmail;
use App\Mail\ArticleSubmittedForReviewEmail;
use App\Models\ArticleVersion;
use App\Models\User;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Mail;

class NotifyArticleStatusChanged implements ShouldQueue
{
    public function __construct()
    {
        //
    }

    public function handle(ArticleStatusChangedEvent $event)
    {
        // Don't do anything if we're not in production
        if (!App::isProduction()) return;

        switch ($event->version->status)
        {
            case ArticleVersion::STATUS_PENDING:
                $this->submittedForReview($event);
                break;
            case ArticleVersion::STATUS_APPROVED:
                $this->approved($event);
                break;
            case ArticleVersion::STATUS_REJECTED:
                $this->rejected($event);
                break;
        }
    }

    private function submittedForReview(ArticleStatusChangedEvent $event)
    {
        // send email to admins
        $recips = User::query()
            ->where('level', '>=', 3)
            ->where('id', '!=', 100) // snarkpit user
            ->where('id', '!=', $event->version->user_id) // author
            ->where('email', '!=', '')
            ->where('notify_article_review', '=', true)
            ->get();
        if (!$recips->count()) return; // nobody to send to

        Mail::bcc($recips->pluck('email')->toArray())
            ->send(new ArticleSubmittedForReviewEmail($event->article, $event->version));
    }

    private function approved(ArticleStatusChangedEvent $event)
    {
        // send email to author
        $email = $event->version->user->email;
        if ($email == '') return;

        Mail::to($email)->send(new ArticleApprovedEmail($event->article, $event->version));
    }

    private function rejected(ArticleStatusChangedEvent $event)
    {
        // send email to author
        $email = $event->version->user->email;
        if ($email == '') return;

        Mail::to($email)->send(new ArticleRejectedEmail($event->article, $event->version));
    }
}
