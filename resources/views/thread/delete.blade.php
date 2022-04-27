@section('title', 'Delete thread: '.$thread->title)
@extends('layouts.default')

@section('content')
    <h1>Delete thread: {{ $thread->title }}</h1>

    <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="{{ url('forum/index') }}">Forums</a></li>
        <li class="breadcrumb-item"><a href="{{ url('forum/view', [$thread->forum->id]) }}">{{ $thread->forum->name }}</a></li>
        <li class="breadcrumb-item"><a href="{{ url('thread/view', [$thread->id]) }}">{{ $thread->title }}</a></li>
        <li class="breadcrumb-item active">Delete</li>
    </ol>

    <section>
        <form method="POST" action="{{ url('thread/delete') }}">
            @csrf
            <p>Are you sure you want to delete this thread?</p>
            <div class="well">
                <h2>{{ $thread->title }}</h2>
            </div>
            <x-hidden name="id" :value="$thread->id" />
            <button type="submit">Delete</button>
        </form>
    </section>

@endsection
