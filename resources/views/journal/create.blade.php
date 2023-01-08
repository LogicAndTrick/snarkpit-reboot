@section('title', 'Create journal')
@extends('layouts.default')

@section('content')
    <h1>
        <span class="fa fa-plus"></span>
        Create journal
    </h1>

    <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="{{ url('journal') }}">Journals</a></li>
        <li class="breadcrumb-item active">Create journal</li>
    </ol>

    <section>
        <form method="POST" action="{{ url('journal/create') }}" enctype="multipart/form-data">
            @csrf
            <x-text name="title" label="Title:" required />
            <x-textarea name="text" label="Description:" :bbcode="true" required />
            <button type="submit">Create</button>
        </form>
    </section>

@endsection
