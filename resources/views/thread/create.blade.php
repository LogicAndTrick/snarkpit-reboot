@section('title', 'Create forum topic')

@extends('layouts.default')

@section('scripts')
    <script>
        const pollCheckbox = document.querySelector('input[name="is_poll"]');
        const pollForm = document.getElementById('poll-form');
        pollCheckbox.addEventListener('input', event => {
            pollForm.classList.toggle('d-none', !pollCheckbox.checked);
        });
        pollForm.classList.toggle('d-none', !pollCheckbox.checked);
    </script>
@endsection

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
            <x-checkbox name="is_poll" label="Create poll" />
            <div class="well" id="poll-form">
                <x-text name="poll_question" label="Poll question:" />
                <x-text name="poll_expiry" label="Open for (days, maximum 60):" type="number" />
                <x-textarea name="poll_options" label="Poll options (one per line):" />
            </div>
            <x-textarea name="text" label="Content:" :bbcode="true" />
            <button type="submit">Create</button>
        </form>
    </section>
@endsection
