@extends('admin.layout')

@section('title', 'Download category management')
@section('admin-page', 'Download category management')

@section('admin-content')
    <section>
        <h4>Edit Download Category: {{ $category->name }}</h4>
        <form action="{{ url('admin/edit-download-category') }}" method="post">
            @csrf
            <x-hidden name="id" :value="$category->id" />
            <x-text type="text" name="name" label="Name:" :value="$category->name" />
            <button type="submit">Save</button>
        </form>
    </section>
@endsection
