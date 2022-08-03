@section('title', 'Delete download')
@extends('layouts.default')

@section('content')
    <h1>
        <span class="fa fa-times"></span>
        Delete download: {{$download->name}}
    </h1>

    <section>
        <form method="POST" action="{{ url('download/delete') }}">
            @csrf
            <x-hidden name="id" :value="$download->id" required />
            <div class="border text-center p-2">
                Are you sure you want to delete this download?<br/>
                <strong>{{$download->name}}</strong><br/>
                <div class="bbcode">{!! $download->content_html !!}</div>
            </div>
            <button type="submit">Delete</button>
        </form>
    </section>

@endsection
