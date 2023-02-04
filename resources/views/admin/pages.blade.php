@extends('admin.layout')

@section('title', 'Page management')
@section('admin-page', 'Page management')

@section('admin-content')
    <section>
        <h4>Pages</h4>
        <table class="table table-bordered table-sm">
            <tr>
                <th>Title</th>
                <th>Slug</th>
                <th></th>
            </tr>
            @foreach($pages as $page)
                <tr>
                    <td>
                        <a href="{{ url('page', [$page->slug]) }}">{{$page->title}}</a>
                    </td>
                    <td>{{$page->slug}}</td>
                    <td>
                        <a href="{{ url('admin/edit-page', [$page->id]) }}" class="btn btn-outline-primary"><span class="fa fa-pencil"></span></a>
                        <a href="{{ url('admin/delete-page', [$page->id]) }}" class="btn btn-outline-danger"><span class="fa fa-times"></span></a>
                    </td>
                </tr>
            @endforeach
        </table>
        <h4>Add Page</h4>
        <form action="{{ url('admin/create-page') }}" method="post">
            @csrf
            <x-text type="text" name="title" label="Title:" />
            <x-text type="text" name="slug" label="Slug:" />
            <x-textarea name="text" label="Content:" :bbcode="true" />
            <button type="submit">Add</button>
        </form>
    </section>
@endsection
