@section('title', 'Journals')
@extends('layouts.default')

@section('content')
    <h1>
        <span class="fa fa-journal"></span>
        Snarkpit Member Journals
        @auth
            <small>
                <a href="{{url('journal/create')}}" class="btn btn-outline-primary">
                    <span class="fas fa-plus"></span>
                    Create new journal
                </a>
            </small>
        @endauth
    </h1>

    <div class="header-container">
        {!! $journals->render() !!}
    </div>

    @foreach ($journals as $journal)
        <section id="journal-{{ $journal->id }}">
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
    @endforeach

    <div class="footer-container">
        {!! $journals->render() !!}
    </div>
@endsection
