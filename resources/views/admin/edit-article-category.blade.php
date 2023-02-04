@extends('admin.layout')

@section('title', 'Article category management')
@section('admin-page', 'Article category management')

@section('admin-content')
    <section>
        <h4>Edit Article Category: {{ $category->name }}</h4>
        <form action="{{ url('admin/edit-article-category') }}" method="post">
            @csrf
            <x-hidden name="id" :value="$category->id" />
            <x-text type="text" name="name" label="Name:" :value="$category->name" />
            <button type="submit">Save</button>
        </form>
    </section>
@endsection
