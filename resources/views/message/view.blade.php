@section('title', 'View message')
@extends('layouts.default')

@section('content')
    <h1>
        <span class="fa fa-message"></span>
        View message
    </h1>
    <section>
        <div class="text-center mb-3">
            <a class="mx-3" href="{{ url('message/index') }}">
                <span class="fas fa-inbox"></span>
                Inbox
            </a>
            &bull;
            <a class="mx-3" href="{{ url('message/sent') }}">
                <span class="fas fa-share"></span>
                Outbox
            </a>
            &bull;
            <a class="mx-3" href="{{ url('message/send') }}">
                <span class="fas fa-paper-plane"></span>
                New message
            </a>
        </div>

        <h2>{{$message->title}}</h2>
        <h3 class="small">
            From <a href="{{ url('user/view', [$message->from_user_id]) }}">{{ $message->from_user->name }}</a>
            @if ($message->to_user_id != Auth::id())
                To <a href="{{ url('user/view', [$message->to_user_id]) }}">{{ $message->to_user->name }}</a>
            @endif
            &bull;
            {{$message->created_at->format("D M jS Y \a\\t g:ia")}}
        </h3>
        <div class="card my-3">
            <div class="card-body bbcode">
                {!! $message->content_html !!}
            </div>
        </div>

        @if ($message->to_user_id == Auth::id())
            <h3>Send reply</h3>
            <form action="{{ url('message/send') }}" method="post">
                @csrf
<?php
                $reply_title = $message->title;
                if (!\Illuminate\Support\Str::startsWith(strtolower($reply_title), 're:')) {
                    $reply_title = 'Re: ' . $reply_title;
                }
                $reply_text = "\n\n\n[quote={$message->from_user->name}]\n{$message->content_text}\n[/quote]";
?>
                <x-hidden name="to" :value="$message->from_user->name" />
                <x-text name="title" label="Title:" :value="$reply_title" />
                <x-textarea name="text" label="Message:" :value="$reply_text" :bbcode="true" />
                <button type="submit">Send</button>
            </form>
        @endif

    </section>
@endsection
