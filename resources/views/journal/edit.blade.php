@section('title', 'Edit journal')
@extends('layouts.default')

@section('content')
    <h1>
        <span class="fa fa-pencil"></span>
        Edit journal: {{$journal->name}}
    </h1>

    <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="{{ url('journal') }}">Journals</a></li>
        <li class="breadcrumb-item active">Edit: {{$journal->title}}</li>
    </ol>

    <section>
        <form method="POST" action="{{ url('journal/edit') }}" enctype="multipart/form-data">
            @csrf
            <x-hidden name="id" :value="$journal->id" required />
            <x-text name="title" label="Title:" :value="$journal->title" required />
            <x-textarea name="text" label="Description:" :value="$journal->content_text" :bbcode="true" required />
            <button type="submit">Save</button>
        </form>
    </section>

@endsection
