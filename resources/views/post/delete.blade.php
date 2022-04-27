@section('title', 'Delete post #'.$post->id . ' by ' . $post->user->name)

@extends('layouts.default')

@section('content')
    <h1>Delete post #{{ $post->id }} by {{$post->user->name}}</h1>

    <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="{{ url('forum/index') }}">Forums</a></li>
        <li class="breadcrumb-item"><a href="{{ url('forum/view', [$post->forum->id]) }}">{{ $post->forum->name }}</a></li>
        <li class="breadcrumb-item"><a href="{{ url('thread/view', [$post->thread->id]) }}">{{ $post->thread->title }}</a></li>
        <li class="breadcrumb-item active">Delete post</li>
    </ol>
    <section>
        <form method="POST" action="{{ url('post/delete') }}">
            @csrf
            <p>Are you sure you want to delete this post?</p>
            <div class="well">
                <div class="bbcode">{!! $post->content_html !!}</div>
            </div>
            <x-hidden name="id" :value="$post->id" />
            <button type="submit">Delete</button>
        </form>
    </section>
@endsection
