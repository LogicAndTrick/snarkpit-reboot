@section('title', 'Delete forum: '.$forum->name)
@extends('layouts.default')

@section('content')
    <h1>Delete forum: {{ $forum->name }}</h1>

    <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="{{ url('forum/index') }}">Forums</a></li>
        <li class="breadcrumb-item"><a href="{{ url('forum/view', [$forum->id]) }}">{{ $forum->name }}</a></li>
        <li class="breadcrumb-item active">Delete</li>
    </ol>

    <section>
        <form method="POST" action="{{ url('forum/delete') }}">
            @csrf
            <p>Are you sure you want to delete this forum?</p>
            <div class="well">
                <h2>{{ $forum->name }}</h2>
            </div>
            <x-hidden name="id" :value="$forum->id" />
            <button type="submit">Delete</button>
        </form>
    </section>

@endsection
