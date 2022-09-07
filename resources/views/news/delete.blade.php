@section('title', 'Delete news post: '.$news->subject)
@extends('layouts.default')

@section('content')
    <h1>Delete news post: {{ $news->subject }}</h1>

    <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="{{ url('news/index') }}">News</a></li>
        <li class="breadcrumb-item"><a href="{{ url('news/view', [$news->id]) }}">{{ $news->subject }}</a></li>
        <li class="breadcrumb-item active">Delete</li>
    </ol>

    <section>
        <form method="POST" action="{{ url('news/delete') }}">
            @csrf
            <p>Are you sure you want to delete this news post?</p>
            <div class="well">
                <h2>{{ $news->subject }}</h2>
                <h3 class="small">
                    {{ $news->created_at->format("D M jS Y \a\\t g:ia") }} by <a href="{{ url('user/view', [ $news->user->id ]) }}">{{ $news->user->name }}</a>
                </h3>
                <div class="bbcode">{!! $news->content_html !!}</div>
            </div>
            <x-hidden name="id" :value="$news->id" />
            <button type="submit">Delete</button>
        </form>
    </section>

@endsection
