@section('title', 'Edit news post: '.$news->subject)
@extends('layouts.default')

@section('content')
    <h1>Edit news post: {{ $news->subject }}</h1>

    <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="{{ url('news/index') }}">News</a></li>
        <li class="breadcrumb-item"><a href="{{ url('news/view', [$news->id]) }}">{{ $news->subject }}</a></li>
        <li class="breadcrumb-item active">Edit</li>
    </ol>

    <section>
        <form method="POST" action="{{ url('news/edit') }}">
            @csrf
            <x-hidden name="id" :value="$news->id" />
            <x-text name="subject" label="Subject:" :value="$news->subject" />
            <x-textarea name="text" label="Content:" :bbcode="true" :value="$news->content_text" />
            <button type="submit">Edit</button>
        </form>
    </section>
@endsection
