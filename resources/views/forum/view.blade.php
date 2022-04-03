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
                <a class="btn btn-outline-primary" href="{{ url('forum/edit', [ $forum->id ]) }}">
                    <span class="fa fa-pencil"></span>
                </a>
                <a class="btn btn-outline-danger" href="{{ url('forum/delete', [ $forum->id ]) }}">
                    <span class="fa fa-times"></span>
                </a>
            </div>
        @endcan
    </nav>

    <section id="forum-{{ $forum->id }}">
        <h2>{{ $forum->name }}</h2>
    </section>
@endsection
