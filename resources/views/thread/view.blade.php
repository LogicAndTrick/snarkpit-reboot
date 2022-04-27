@section('title', 'Forum posts')
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
        {{ $forum->subject }}
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

    <nav class="nav-header bg-body">
        <div class="btn-group">
            @auth
                <a class="btn" href="#reply">
                    <span class="fa fa-plus"></span> Post Reply
                </a>
            @endauth
        </div>
        {{ $posts->render() }}
    </nav>

    @foreach ($posts as $post)
        <section class="forum-post">
            <header>
                <div class="me-auto">
                    <small>Re: {{$thread->title}}</small>
                    <small>Posted by <a href="#">{{ $post->user->name }}</a> on {{$post->created_at->format('D M jS Y \a\\t g:ia')}}</small>
                </div>
                <div class="mt-1">
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
