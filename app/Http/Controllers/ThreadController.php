<?php

namespace App\Http\Controllers;

use App\Events\ForumThreadCreatedEvent;
use App\Models\Forum;
use App\Models\ForumPoll;
use App\Models\ForumPollItem;
use App\Models\ForumPollItemVote;
use App\Models\ForumPost;
use App\Models\ForumThread;
use App\Models\UserSubscription;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Pagination\Paginator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class ThreadController extends Controller
{
    public function getView(Request $request, $id) {
        $thread = ForumThread::with(['user'])->findOrFail($id);
        $forum = Forum::findOrFail($thread->forum_id);

        // Update stats
        $thread->timestamps = false;
        $thread->markAsRead();
        $thread->stat_views++;
        $thread->save();
        $thread->timestamps = true;

        $page = intval($request->input('page')) ?: 1;
        $post_query = ForumPost::with('user')->where('thread_id', '=', $id)->whereNull('deleted_at')->orderBy('created_at');
        $count = $post_query->getQuery()->getCountForPagination();
        if ($request->input('page') == 'last') $page = ceil($count / 50);
        $posts = $post_query->skip(($page - 1) * 50)->take(50)->get();
        $pag = new LengthAwarePaginator($posts, $count, 50, $page, [ 'path' => Paginator::resolveCurrentPath() ]);

        $poll = null;
        $poll_vote = null;
        if ($thread->is_poll) {
            $poll = ForumPoll::with(['items'])->where('thread_id', '=', $id)->first();
            if ($poll && Auth::user()) {
                $poll_vote = ForumPollItemVote::where('forum_poll_id', '=', $poll->id)->where('user_id', '=', Auth::user()->id)->first();
            }
        }

        return view('thread.view', [
            'forum' => $forum,
            'thread' => $thread,
            'posts' => $pag,
            'poll' => $poll,
            'poll_vote' => $poll_vote,
            'subscription' => UserSubscription::getSubscription(Auth::user(), UserSubscription::FORUM_THREAD, $id, true)
        ]);
    }

    public function getSubscribeEmailToggle($id)
    {
        $sub = UserSubscription::getSubscription(Auth::user(), UserSubscription::FORUM_THREAD, $id);
        if ($sub) {
            $sub->send_email = !$sub->send_email;
            $sub->save();
        }
        return redirect('thread/view/'.$id);
    }

    public function getSubscribe($id)
    {
        $sub = UserSubscription::getSubscription(Auth::user(), UserSubscription::FORUM_THREAD, $id);
        if (!$sub) {
            $sub = UserSubscription::Create([
                'user_id' => Auth::id(),
                'item_type' => UserSubscription::FORUM_THREAD,
                'item_id' => intval($id, 10),
                'send_email' => Auth::user()->subscribe_topics
            ]);
        }
        return redirect('thread/view/'.$id);
    }

    public function getUnsubscribe($id)
    {
        $sub = UserSubscription::getSubscription(Auth::user(), UserSubscription::FORUM_THREAD, $id);
        if ($sub) {
            $sub->delete();
        }
        return redirect('thread/view/'.$id);
    }

    public function postVote(Request $request) {
        $this->loggedIn();
        $id = intval($request->input('id'));
        $poll = ForumPoll::findOrFail($id);
        $thread = ForumThread::findOrFail($poll->thread_id);
        if (!$thread->is_poll) abort(403);

        $request->validate([
            'vote' => [
                'required',
                'numeric',
                'integer',
                Rule::in($poll->items->map(fn($x) => $x->id))
            ]
        ]);

        $poll_vote = ForumPollItemVote::where('forum_poll_id', '=', $poll->id)->where('user_id', '=', Auth::user()->id)->first();
        if ($poll_vote) {
            // change the vote
            $poll_vote->update([
                'forum_poll_item_id' => intval($request->input('vote'))
            ]);
        } else {
            // cast the vote
            $poll_vote = ForumPollItemVote::create([
                'forum_poll_id' => $poll->id,
                'forum_poll_item_id' => intval($request->input('vote')),
                'user_id' => Auth::user()->id
            ]);
        }

        return redirect('thread/view/'.$thread->id.'?page=last');
    }

    public function getCreate($id)
    {
        $forum = Forum::findOrFail($id);
        return view('thread.create', [
            'forum' => $forum
        ]);
    }

    private static function validate_poll_options(string $attribute, string $value, callable $fail) {
        $options = array_map(fn($x) => trim($x), explode("\n", trim($value)));
        if (count($options) < 2) $fail('At least 2 options must be provided.');
        if (count($options) > 8) $fail('No more than 8 options can be provided.');
        foreach ($options as $opt) {
            if (strlen($opt) > 255) $fail('An option cannot be longer than 255 characters.');
        }
    }

    public function postCreate(Request $request) {
        $id = intval($request->input('forum_id'));
        $forum = Forum::findOrFail($id);
        $request->validate([
            'title' => ['required', 'max:200' ],
            'description' => ['max:200'],
            'text' => ['required', 'max:10000' ],
            'poll_question' => ['exclude_without:is_poll', 'required', 'max:255'],
            'poll_expiry' => ['exclude_without:is_poll', 'required', 'integer', 'numeric', 'between:1,60'],
            'poll_options' => ['exclude_without:is_poll', 'required', 'string', self::validate_poll_options(...)],
        ]);
        $is_poll = $request->boolean('is_poll');
        $thread = ForumThread::create([
            'forum_id' => $id,
            'user_id' => Auth::id(),
            'title' => $request->input('title'),
            'description' => $request->input('description'),
            'is_poll' => $is_poll
        ]);
        $post = ForumPost::create([
            'thread_id' => $thread->id,
            'forum_id' => $id,
            'user_id' => Auth::user()->id,
            'content_text' => $request->input('text'),
            'content_html' => bbcode($request->input('text')),
        ]);
        $sub = UserSubscription::Create([
            'user_id' => Auth::id(),
            'item_type' => UserSubscription::FORUM_THREAD,
            'item_id' => $thread->id,
            'send_email' => Auth::user()->subscribe_topics
        ]);

        if ($is_poll) {
            $poll = ForumPoll::create([
                'thread_id' => $thread->id,
                'title' => $request->input('poll_question'),
                'close_date' => Carbon::now()->addDays(intval($request->input('poll_expiry')))
            ]);
            $options = array_map(fn($x) => trim($x), explode("\n", trim($request->input('poll_options'))));
            foreach ($options as $opt) {
                ForumPollItem::create([
                    'forum_poll_id' => $poll->id,
                    'text' => $opt,
                    'stat_votes' => 0
                ]);
            }
        }

        ForumThreadCreatedEvent::dispatch($thread);

        return redirect('thread/view/'.$thread->id.'?page=last');
    }

    // Administrative Tasks

    public function getEdit($id) {
        $this->admin();
        $thread = ForumThread::with(['forum'])->findOrFail($id);
        return view('thread.edit', [
            'thread' => $thread
        ]);
    }

    public function postEdit(Request $request) {
        $this->admin();
        $id = intval($request->input('id'));
        $thread = ForumThread::findOrFail($id);
        $request->validate([
            'title' => 'required|max:200',
            'description' => 'max:200'
        ]);
        $thread->update([
            'title' => $request->input('title'),
            'description' => $request->input('description'),
            'is_open' => $request->boolean('is_open'),
            'is_sticky' => $request->boolean('is_sticky')
        ]);
        return redirect('/thread/view/' . $thread->id);
    }

    public function getDelete($id) {
        $this->admin();
        $thread = ForumThread::with(['forum'])->findOrFail($id);
        return view('thread.delete', [
            'thread' => $thread
        ]);
    }

    public function postDelete(Request $request) {
        $this->admin();
        $id = intval($request->input('id'));
        $thread = ForumThread::findOrFail($id);
        $thread->delete();
        return redirect('forum/view/'.$thread->forum_id);
    }
}
