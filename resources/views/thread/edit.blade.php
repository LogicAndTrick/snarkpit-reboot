@section('title', 'Edit thread: '.$thread->title)

@extends('layouts.default')

@section('content')
    <h1>Edit thread: {{ $thread->title }}</h1>

    <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="{{ url('forum/index') }}">Forums</a></li>
        <li class="breadcrumb-item"><a href="{{ url('forum/view', [$thread->forum->id]) }}">{{ $thread->forum->name }}</a></li>
        <li class="breadcrumb-item"><a href="{{ url('thread/view', [$thread->id]) }}">{{ $thread->title }}</a></li>
        <li class="breadcrumb-item active">Edit</li>
    </ol>

    <section>
        <form method="POST" action="{{ url('thread/edit') }}">
            @csrf
            <x-hidden name="id" :value="$thread->id" />
            <x-text name="title" label="Title:" :value="$thread->title" />
            <x-text name="description" label="Description:" :value="$thread->description" />
            <x-checkbox name="is_open" label="Is open" :checked="$thread->is_open" />
            <x-checkbox name="is_sticky" label="Is sticky" :checked="$thread->is_sticky" />
            <button type="submit">Edit</button>
        </form>
    </section>
@endsection
