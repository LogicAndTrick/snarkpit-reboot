@section('title', 'Delete journal')
@extends('layouts.default')

@section('content')
    <h1>
        <span class="fa fa-times"></span>
        Delete journal: {{$journal->title}}
    </h1>

    <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="{{ url('journal') }}">Journals</a></li>
        <li class="breadcrumb-item active">Delete: {{$journal->title}}</li>
    </ol>

    <section>
        <form method="POST" action="{{ url('journal/delete') }}">
            @csrf
            <x-hidden name="id" :value="$journal->id" required />
            <div class="border text-center p-2">
                Are you sure you want to delete this journal?<br/>
                <strong>{{$journal->title}}</strong><br/>
                <div class="bbcode">{!! $journal->content_html !!}</div>
            </div>
            <button type="submit">Delete</button>
        </form>
    </section>

@endsection
