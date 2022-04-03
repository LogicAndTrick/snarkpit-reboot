@section('title', 'Forums')
@extends('layouts.default')

@section('content')
    <h1>
        <span class="fa fa-comments"></span>
        Forums
        @can('admin')
            <small>
                <a class="btn btn-outline-primary btn-xs" href="{{ url('forum/create') }}"><span
                        class="fa fa-plus"></span> Create new forum</a>
            </small>
        @endcan
    </h1>

    <nav class="nav-header">
        <ol class="breadcrumb">
            <li class="breadcrumb-item active">Forums</li>
        </ol>
    </nav>

    <section class="p-0">
        <table class="table table-striped table-hover m-0">
            <thead>
                <tr class="text-center">
                    <th>Forum name</th>
                    <th>Topics</th>
                    <th>Posts</th>
                    <th>Last post</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($forums as $forum)
                    <tr>
                        <td>
                            <a href="{{ url('forum/view', [$forum->id]) }}">{{ $forum->name }}</a>
                            <span class="d-block">{{ $forum->description }}</span>
                        </td>
                        <td class="text-center text-muted">{{ $forum->stat_threads }}</td>
                        <td class="text-center text-muted">{{ $forum->stat_posts }}</td>
                        <td class="text-end">
                            @if ($forum->last_post)
                                <span class="d-block">in <a href="#">{{ $forum->last_post->thread->title }}</a></span>
                                <span class="d-block">
                                    {{ $forum->last_post->created_at->format("D M jS Y \a\\t g:ia") }}
                                    by <a href="">{{ $forum->last_post->user->name }}</a>
                                </span>
                            @else
                                No posts yet!
                            @endif
                        </td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    </section>


@endsection
