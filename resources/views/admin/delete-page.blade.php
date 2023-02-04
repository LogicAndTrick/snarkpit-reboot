@extends('admin.layout')

@section('title', 'Page management')
@section('admin-page', 'Page management')

@section('admin-content')
    <section>
        <h4>Delete Page: {{ $page->title }}</h4>
        <form action="{{ url('admin/delete-page') }}" method="post">
            @csrf
            <x-hidden name="id" :value="$page->id" />
            <div class="border text-center p-2">
                Are you sure you want to delete this page?<br/>
                <strong>{{$page->title}}</strong> at route <code>/page/{{ $page->slug }}</code>
                <hr />
                <div class="bbcode">{!! $page->content_html !!}</div>
            </div>
            <button type="submit">Delete</button>
        </form>
    </section>
@endsection
