@section('title', 'Forum posts')
@extends('layouts.default')

@section('content')
    <h1>
        Forum Posts
    </h1>

    <nav class="nav-header">
        <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="{{ url('forum/index') }}">Forums</a></li>
            <li class="breadcrumb-item active">Posts</li>
        </ol>
    </nav>

    <nav class="nav-header bg-body">
        <div class="btn-group">
        </div>
        {{ $posts->render() }}
    </nav>

    @foreach ($posts as $post)
        <section class="forum-post" id="post-{{$post->id}}">
            <header>
                <div class="me-auto">
                    <small>Re: <a href="{{ url('thread/view', [$post->thread_id]) }}">{{$post->thread->title}}</a></small>
                    <small>Posted by <a href="{{ url('user/view', [ $post->user->id ]) }}">{{ $post->user->name }}</a> on {{$post->created_at->format('D M jS Y \a\\t g:ia')}}</small>
                </div>
                <div class="mt-1">
                    <span class="post-id">
                        <a href="{{ url('thread/locate-post', [$post->id]) }}">Post #{{$post->id}}</a>
                    </span>
                    @can('edit-post', $post, $post->thread)
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
        </div>
        {{ $posts->render() }}
    </nav>
@endsection
