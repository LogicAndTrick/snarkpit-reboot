@extends('admin.layout')

@section('title', 'Article category management')
@section('admin-page', 'Article category management')

@section('admin-content')
    <section>
        <h4>Article Categories</h4>
        <table class="table table-bordered table-sm">
            <tr>
                <th>Name</th>
                <th></th>
            </tr>
            @foreach($categories as $cat)
                <tr>
                    <td class="text-nowrap">
                        {{$cat->name}}
                    </td>
                    <td>
                        <a href="{{ url('admin/edit-article-category', [$cat->id]) }}" class="btn btn-outline-primary"><span class="fa fa-pencil"></span></a>
                    </td>
                </tr>
            @endforeach
        </table>
        <h4>Add Article Category</h4>
        <form action="{{ url('admin/create-article-category') }}" method="post">
            @csrf
            <x-text type="text" name="name" label="Name:" />
            <button type="submit">Add</button>
        </form>
    </section>
@endsection
