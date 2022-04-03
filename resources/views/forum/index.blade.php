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

    <section class="px-0">
        <table class="table table-striped">
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
                        <td class="text-muted">{{ $forum->stat_threads }}</td>
                        <td class="text-muted">{{ $forum->stat_posts }}</td>
                        <td>?</td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    </section>


@endsection
