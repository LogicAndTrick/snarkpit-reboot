@section('title', 'News posts')
@extends('layouts.default')

@section('content')
    <h1>
        <span class="fa fa-newspaper"></span>
        News posts
        @can('admin')
            <small>
                <a class="btn btn-outline-primary btn-xs" href="{{ url('news/create') }}"><span class="fa fa-plus"></span> Create new news post</a>
            </small>
        @endcan
    </h1>

    <nav class="nav-header">
        <ol class="breadcrumb">
            <li class="breadcrumb-item active">News</li>
        </ol>
        {!! $newses->render() !!}
    </nav>

    @foreach ($newses as $news)
        <section id="news-{{ $news->id }}">
            <h2>
                <a href="{{ url('news/view', [$news->id]) }}">{{ $news->subject }}</a>
            </h2>
            <h3 class="small">
                {{ $news->created_at->format("D M jS Y \a\\t g:ia") }} by <a href="{{ url('user/view', [ $news->user->id ]) }}">{{ $news->user->name }}</a>
                @can('moderator')
                    | <a href="{{ url('news/edit', [$news->id]) }}">edit</a>
                    | <a href="{{ url('news/delete', [$news->id]) }}">delete</a>
                @endcan
            </h3>
            <div class="bbcode">{!! $news->content_html !!}</div>
        </section>
    @endforeach

    <div class="footer-container">
        {!! $newses->render() !!}
    </div>
@endsection
