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
            <div class="d-md-none px-2">
                <small>Re: <a href="{{ url('thread/view', [$post->thread_id]) }}">{{$post->thread->title}}</a></small>
            </div>
            <header>
                @if($post->user->avatar_custom)
                    <img src="{{ asset('uploads/avatars/'.$post->user->avatar_file) }}" class="d-md-none me-2" />
                @elseif($post->user->avatar_file)
                    <img src="{{ asset('images/avatars/'.$post->user->avatar_file) }}" class="d-md-none me-2" />
                @endif
                <div class="me-auto">
                    <div class="d-none d-md-block">
                        <small>Re: <a href="{{ url('thread/view', [$post->thread_id]) }}">{{$post->thread->title}}</a></small>
                        <small class="d-block">Posted by <a href="{{ url('user/view', [ $post->user->id ]) }}">{{ $post->user->name }}</a> on <x-date :date="$post->created_at" format="full" /></small>
                    </div>
                    <div class="d-md-none">
                        <div class="d-flex flex-row align-items-baseline gap-3">
                            <h5 class="mb-0"><a href="{{ url('user/view', [ $post->user->id ]) }}">{{ $post->user->name }}</a></h5>
                            <small class="text-muted d-none d-sm-inline">{{$post->user->stat_forum_posts}} post{{ $post->user->stat_forum_posts === 1 ? '' : 's' }}</small>
                        </div>
                        <small>Posted <x-date :date="$post->created_at" format="datetime" /></small>
                    </div>
                </div>
                <div class="post-meta">
                    <span class="post-id">
                        <a href="{{ url('thread/locate-post', [$post->id]) }}">Post #{{$post->id}}</a>
                    </span>
                    <br class="d-block d-sm-none" />
                    @can('edit-post', $post, $post->thread)
                        <a href="{{ url('post/edit', $post->id) }}" class="btn btn-outline-primary" title="Edit post"><span class="fas fa-pencil"></span></a>
                    @endcan
                    @can('moderator')
                        <a href="{{ url('post/delete', $post->id) }}" class="btn btn-outline-danger" title="Delete post"><span class="fas fa-times"></span></a>
                    @endcan
                </div>
            </header>
            <div class="d-flex flex-row pb-2">
                <x-user-avatar-details :user="$post->user" class="d-none d-md-block" />
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
