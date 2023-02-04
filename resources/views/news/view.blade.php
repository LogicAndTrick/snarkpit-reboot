@section('title', $news->subject)
@extends('layouts.default')

@section('content')
    <h1>
        {{ $news->subject }}
    </h1>

    <nav class="nav-header">
        <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="{{ url('news/index') }}">News</a></li>
            <li class="breadcrumb-item active">{{ $news->subject }}</li>
        </ol>
    </nav>

    <section id="news-{{ $news->id }}">
        <h2>{{ $news->subject }}</h2>
        <h3 class="small">
            {{ $news->created_at->format("D M jS Y \a\\t g:ia") }} by <a href="{{ url('user/view', [ $news->user->id ]) }}">{{ $news->user->name }}</a>
            @can('moderator')
                | <a href="{{ url('news/edit', [$news->id]) }}">edit</a>
                | <a href="{{ url('news/delete', [$news->id]) }}">delete</a>
            @endcan
        </h3>
        <div class="bbcode">{!! $news->content_html !!}</div>
    </section>
@endsection
