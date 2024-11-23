@section('title', 'Forum threads')
@extends('layouts.default')

@section('content')

    <h1>Forum threads</h1>

    <nav class="nav-header">
        <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="{{ url('forum/index') }}">Forums</a></li>
            <li class="breadcrumb-item active">Threads</li>
        </ol>
        {{ $threads->render() }}
    </nav>

    <section class="p-0 thread-listing thread-index">
        <table class="table table-striped table-hover m-0">
            <thead>
            <tr class="text-center">
                <th class="col-title">Topic</th>
                <th class="col-created-by">Posted by</th>
                <th class="col-forum">Forum</th>
                <th class="col-stat col-posts">Posts</th>
                <th class="col-stat col-views">Views</th>
                <th class="col-last-post">Last post</th>
            </tr>
            </thead>
            <tbody>
            @foreach ($threads as $thread)
                <?php
                $cls = '';
                $next = $threads->get($loop->index + 1);
                if ($thread->is_sticky && $next && !$next->is_sticky) {
                    $cls = 'border-bottom';
                }
                ?>
                <tr class="{{$cls}}">
                    <td class="col-title">
                        <div class="d-flex flex-row">
                            <div class="text-nowrap">
                                @foreach($thread->getIcons() as $icon)
                                    <img src="{{ asset('/images/topic/'.$icon.'.gif') }}" alt="{{$icon}}" class="me-2 d-block d-lg-inline-block" title="{{ $icon }}" />
                                @endforeach
                            </div>
                            <div>
                                <span class="d-block"><a href="{{ url('thread/view', [ $thread->id ]) }}">{{ $thread->title }}</a></span>
                                @if($thread->description)
                                    <small class="d-block">{{ $thread->description }}</small>
                                @endif
                            </div>
                        </div>
                    </td>
                    <td class="col-created-by">
                        <a href="{{ url('user/view', [ $thread->user->id ]) }}">{{ $thread->user->name }}</a>
                    </td>
                    <td class="col-forum">
                        <a href="{{ url('forum/view', [ $thread->forum_id ]) }}">{{ $thread->forum->name }}</a>
                    </td>
                    <td class="col-stat col-posts text-muted">{{ $thread->stat_posts }}</td>
                    <td class="col-stat col-views text-muted">{{ $thread->stat_views }}</td>
                    <td class="col-last-post">
                        @if ($thread->last_post)
                            <span class="d-block"><x-date :date="$thread->last_post->created_at" format="full" /></span>
                            <span>by <a href="{{ url('user/view', [ $thread->last_post->user->id ]) }}">{{ $thread->last_post->user->name }}</a></span>
                        @endif
                    </td>
                </tr>
            @endforeach
            </tbody>
        </table>
    </section>

    <nav class="nav-header bg-body mb-3">
        <ol class="breadcrumb">
        </ol>
        {{ $threads->render() }}
    </nav>
@endsection
