@section('title', 'Edit post #'.$post->id . ' by ' . $post->user->name)

@extends('layouts.default')

@section('content')
    <h1>Edit post #{{ $post->id }} by {{$post->user->name}}</h1>

    <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="{{ url('forum/index') }}">Forums</a></li>
        <li class="breadcrumb-item"><a href="{{ url('forum/view', [$post->forum->id]) }}">{{ $post->forum->name }}</a></li>
        <li class="breadcrumb-item"><a href="{{ url('thread/view', [$post->thread->id]) }}">{{ $post->thread->title }}</a></li>
        <li class="breadcrumb-item active">Edit post</li>
    </ol>

    <section>
        <form method="POST" action="{{ url('post/edit') }}">
            @csrf
            <x-hidden name="id" :value="$post->id" />
            <x-textarea name="text" label="Content:" :bbcode="true" :value="$post->content_text" />
            <button type="submit">Edit</button>
        </form>
    </section>
@endsection
