@extends('admin.layout')

@section('title', 'Page management')
@section('admin-page', 'Page management')

@section('admin-content')
    <section>
        <h4>Edit Page: {{ $page->title }}</h4>
        <form action="{{ url('admin/edit-page') }}" method="post">
            @csrf
            <x-hidden name="id" :value="$page->id" />
            <x-text type="text" name="title" label="Title:" :value="$page->title" />
            <x-text type="text" name="slug" label="Slug:" :value="$page->slug" />
            <x-textarea name="text" label="Content:" :bbcode="true" :value="$page->content_text" />
            <button type="submit">Save</button>
        </form>
    </section>
@endsection
