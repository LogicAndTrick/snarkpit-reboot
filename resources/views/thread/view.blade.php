@section('title', $thread->title)
@extends('layouts.default')

@section('scripts')
    <script>
        document.querySelectorAll("a[href='#reply']").forEach(x => {
            x.addEventListener('click', event => {
                event.preventDefault();
                const el = document.getElementById('reply');
                if (el) {
                    el.scrollIntoView();
                    el.querySelector('textarea').focus();
                }
            });
        });
    </script>
@endsection

@section('content')
    <h1>
        {{ $thread->title }}
    </h1>

    <nav class="nav-header">
        <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="{{ url('forum/index') }}">Forums</a></li>
            <li class="breadcrumb-item"><a href="{{ url('forum/view', [$forum->id]) }}">{{$forum->name}}</a></li>
            <li class="breadcrumb-item active">{{ $thread->title }}</li>
        </ol>
        @can('admin')
            <div class="btn-group">
                <a class="btn btn-outline-primary btn-sm" href="{{ url('thread/edit', [ $thread->id ]) }}">
                    <span class="fa fa-pencil"></span>
                </a>
                <a class="btn btn-outline-danger btn-sm" href="{{ url('thread/delete', [ $thread->id ]) }}">
                    <span class="fa fa-times"></span>
                </a>
            </div>
        @endcan
    </nav>

    <h2 class="text-center">
        {{ $thread->title }}
    </h2>

    @if ($thread->is_poll && $poll)
<?php
    $can_vote = Auth::user() && $poll->isOpen() && !$poll_vote;
    $total_votes = $poll->items->map(fn($x) => $x->stat_votes)->sum();
    $total_votes = max(1, $total_votes); // if we have no votes, just change this to 1
    $colours = ['danger', 'success', 'primary', 'light', 'info', 'warning', 'secondary' ];
?>
        <section>
            <div class="text-center mb-2">
                <h4 class="mb-0">{{$poll->title}}</h4>
                @if ($poll->isClosed())
                    <small>(poll ended on {{$poll->close_date->format('D M jS Y \a\\t g:ia')}})</small>
                @else
                    <small>(poll open until {{$poll->close_date->format('D M jS Y \a\\t g:ia')}})</small>
                @endif
            </div>
            <form method="POST" action="{{ url('thread/vote') }}">
                @csrf
                <x-hidden name="id" :value="$poll->id" />
                @foreach($poll->items as $item)
<?php
                    $pct = round(($item->stat_votes / $total_votes) * 100, 1);
                    $col = $colours[$loop->index % count($colours)];
?>
                    <div class="mb-2 text-{{$col}}">
                        @if ($can_vote)
                            <label class="form-check">
                                <input type="radio" name="vote" class="form-check-input" value="{{ $item->id }}" />
                                {{ $item->text }}
                            </label>
                        @else
                            @if ($poll_vote && $poll_vote->forum_poll_item_id === $item->id)
                                <span class="fas fa-check"></span>
                            @endif
                            {{ $item->text }}
                        @endif
                        @if ($item->stat_votes === 1)
                            (1 vote)
                        @else
                            ({{ $item->stat_votes }} votes)
                        @endif
                        <div class="d-flex flex-row align-items-baseline">
                            <div class="progress bg-transparent" style="height: 8px; width: {{max($pct, 0.25)}}%;">
                                <div class="progress-bar bg-{{$col}}" style="width: 100%;"></div>
                            </div>
                            <div style="width: 50px;" class="ms-2">
                                {{$pct}}%
                            </div>
                        </div>
                    </div>
                @endforeach
                @if ($can_vote)
                    <button type="submit">Vote</button>
                @endif
            </form>
        </section>
    @endif

    <nav class="nav-header bg-body">
        <div class="btn-group me-auto">
            @auth
                <a class="btn" href="#reply">
                    <span class="fa fa-plus"></span> Post Reply
                </a>
            @endauth
        </div>
        {{ $posts->render() }}
        @auth
            <div class="btn-group ms-2">
                @if ($subscription)
                    <a href="{{ url('thread/unsubscribe', [$thread->id]) }}" class="btn"><span class="fa fa-bell-slash"></span> Unsubscribe</a>
                    <a href="{{ url('thread/subscribe-email-toggle', [$thread->id]) }}" class="btn">
                        <span class="fa {{$subscription->send_email ? 'fa-check' : 'fa-times'}}"></span>
                        Currently {{$subscription->send_email ? 'sending' : 'not sending'}} emails
                    </a>
                @else
                    <a href="{{ url('thread/subscribe', [$thread->id]) }}" class="btn"><span class="fa fa-bell"></span> Subscribe</a>
                @endif
            </div>
        @endauth
    </nav>

    @foreach ($posts as $post)
        <section class="forum-post" id="post-{{$post->id}}">
            <header>
                <div class="me-auto">
                    <small>Re: {{$thread->title}}</small>
                    <small>Posted by <a href="{{ url('user/view', [ $post->user->id ]) }}">{{ $post->user->name }}</a> on {{$post->created_at->format('D M jS Y \a\\t g:ia')}}</small>
                </div>
                <div class="mt-1">
                    <span class="post-id">
                        <a href="{{ url('thread/locate-post', [$post->id]) }}">Post #{{$post->id}}</a>
                    </span>
                    <a href="#" class="btn" title="Quote post"><span class="fas fa-quote-left"></span></a>
                    @can('edit-post', $post, $thread)
                        <a href="{{ url('post/edit', $post->id) }}" class="btn btn-outline-primary" title="Edit post"><span class="fas fa-pencil"></span></a>
                    @endcan
                    @can('moderator')
                        <a href="{{ url('post/delete', $post->id) }}" class="btn btn-outline-danger" title="Delete post"><span class="fas fa-times"></span></a>
                    @endcan
                </div>
            </header>
            <div class="d-flex flex-row pb-2">
                <x-user-avatar-details :user="$post->user" />
                <div class="flex-fill m-2 my-0 bbcode">
                        {!! $post->content_html !!}
                    @if ($post->add_signature && $post->user->info_signature_html)
                        <hr />
                        {!! $post->user->info_signature_html !!}
                    @endif
                </div>
            </div>
        </section>
    @endforeach

    <nav class="nav-header bg-body mb-3">
        <div class="btn-group">
            @auth
                <a class="btn" href="#reply">
                    <span class="fa fa-plus"></span> Post Reply
                </a>
            @endauth
        </div>
        {{ $posts->render() }}
    </nav>

    @can('create-post', $thread)
        <div id="reply">
            <h1>Post a reply</h1>
            <section>
                <form method="POST" action="{{ url('post/create') }}">
                    @csrf
                    <x-hidden name="thread_id" :value="$thread->id" />
                    <x-textarea name="text" label="Content:" :bbcode="true" />
                    <x-checkbox name="add_signature" label="Add signature" :checked="Auth::user()->add_signature" />
                    <button type="submit">Reply</button>
                </form>
            </section>
        </div>
    @endcan
@endsection
