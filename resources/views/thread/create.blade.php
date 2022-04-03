@section('title', 'Create forum topic')

@extends('layouts.default')

@section('content')
    <h1>Create topic</h1>

    <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="{{ url('forum/index') }}">Forums</a></li>
        <li class="breadcrumb-item"><a href="{{ url('forum/view', [ $forum->id ]) }}">{{ $forum->name }}</a></li>
        <li class="breadcrumb-item active">Create Topic</li>
    </ol>

    <section>
        <form method="POST" action="{{ url('thread/create') }}">
            @csrf
            <x-hidden name="forum_id" :value="$forum->id" />
            <x-text name="title" label="Title:" />
            <x-text name="description" label="Description:" />
            <x-textarea name="text" label="Content:" :bbcode="true" />
            <button type="submit">Create</button>
        </form>
    </section>
@endsection
