@section('title', 'Create download')
@extends('layouts.default')

@section('content')
    <h1>
        <span class="fa fa-plus"></span>
        Create download
    </h1>

    <section>
        <form method="POST" action="{{ url('download/create') }}" enctype="multipart/form-data">
            @csrf
            <x-select name="download_category_id" label="Category:" :items="$categories" required />
            <x-select name="game_id" label="Game:" :items="$games" required />
            <x-text name="name" label="Name:" required />
            <x-text type="file" name="image" label="Thumbnail (required):" accept=".jpg,.jpeg,.png" required />
            <x-text type="file" name="file" label="File (optional, zip or rar, maximum size 100mb):" accept=".zip,.rar" />
            <x-textarea name="mirrors" label="Mirror links (one per line, at least one of file or mirrors must be specified):" class="small-textarea" />
            <x-textarea name="text" label="Description:" :bbcode="true" required />
            <button type="submit">Create</button>
        </form>
    </section>

@endsection
