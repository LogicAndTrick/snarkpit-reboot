@section('title', $page->title)
@extends('layouts.default')

@section('content')
    <h1>
        {{$page->title}}
        @can('admin')
            <a href="{{ url('admin/edit-page', [ $page->id ]) }}" class="btn btn-sm btn-outline-primary"><span class="fa fa-pencil"></span></a>
            <a href="{{ url('admin/delete-page', [ $page->id ]) }}" class="btn btn-sm btn-outline-danger"><span class="fa fa-times"></span></a>
        @endcan
    </h1>
    <section>
        <div class="bbcode">{!! $page->content_html !!}</div>
    </section>
@endsection
