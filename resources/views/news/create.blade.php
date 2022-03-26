@title('Create news post')
@extends('layouts.default')

@section('content')
    <h1>Create news post</h1>

    <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="{{ url('news/index') }}">News</a></li>
        <li class="breadcrumb-item active">Create News</li>
    </ol>

    <section>
        <form method="POST" action="{{ url('news/create') }}">
            @csrf
            <x-text name="subject" label="Subject:" />
            <x-textarea name="text" label="Content:" :bbcode="true" />
            <button type="submit">Create</button>
        </form>
    </section>
@endsection
