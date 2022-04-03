@section('title', 'Forum posts')
@extends('layouts.default')

@section('content')
    <h1>
        {{ $forum->subject }}
    </h1>

    <nav class="nav-header">
        <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="{{ url('forum/index') }}">Forums</a></li>
            <li class="breadcrumb-item active">{{ $forum->name }}</li>
        </ol>
        @can('admin')
            <div class="btn-group">
                <a class="btn btn-outline-primary btn-sm" href="{{ url('forum/edit', [ $forum->id ]) }}">
                    <span class="fa fa-pencil"></span>
                </a>
                <a class="btn btn-outline-danger btn-sm" href="{{ url('forum/delete', [ $forum->id ]) }}">
                    <span class="fa fa-times"></span>
                </a>
            </div>
        @endcan
    </nav>

    <h2 class="text-center">
        {{ $forum->name }}
    </h2>

    <nav class="nav-header bg-body">
        <div class="btn-group">
            <a class="btn" href="">
                <span class="fa fa-plus"></span> New Topic
            </a>
        </div>
        {{ $threads->render() }}
    </nav>

    <section class="p-0">
        <table class="table table-striped table-hover m-0">
            <thead>
            <tr class="text-center">
                <th>Topic</th>
                <th>Posted by</th>
                <th>Posts</th>
                <th>Views</th>
                <th>Last post</th>
            </tr>
            </thead>
            <tbody>
            @foreach ($threads as $thread)
                <tr>
                    <td>
                    </td>
                    <td>
                    </td>
                    <td class="text-center text-muted">{{ $thread->stat_threads }}</td>
                    <td class="text-center text-muted">{{ $thread->stat_posts }}</td>
                    <td class="text-end">
                        @if ($thread->last_post)
                            <span class="d-block">{{ $forum->last_post->created_at->format("D M jS Y \a\\t g:ia") }}</span>
                            <span>by <a href="">{{ $forum->last_post->user->name }}</a></span>
                        @endif
                    </td>
                </tr>
            @endforeach
            </tbody>
        </table>
    </section>
@endsection
