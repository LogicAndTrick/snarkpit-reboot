@section('title', $journal->title)
@extends('layouts.default')

@section('content')
    <h1>
        <span class="fa fa-journal"></span>
        Snarkpit Member Journals
    </h1>

    <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="{{ url('journal') }}">Journals</a></li>
        <li class="breadcrumb-item active">{{$journal->title}}</li>
    </ol>

    <section>
        <h2><a href="{{ url('journal/view', [ $journal->id ]) }}">{{ $journal->title }}</a></h2>
        <h3 class="small">
            Posted {{$journal->updated_at->fromNow(null, true)}}
            by <a href="{{ url('user/view', [ $journal->user_id ]) }}">{{$journal->user->name}}</a>
            @if($journal->canEdit())
                | <a href="{{ url('journal/edit', [$journal->id]) }}">edit</a>
                | <a href="{{ url('journal/delete', [$journal->id]) }}">delete</a>
            @endif
        </h3>
        <hr/>
        <div class="bbcode">{!! $journal->content_html !!}</div>
    </section>

@endsection
