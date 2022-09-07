@extends('layouts.default')

@section('title', 'Page Title')

@section('content')

    <div class="row gx-1">
        <div class="col-md-3">
            <h1>Spotlight</h1>
            <section>
                ...
            </section>
            <h1>Recent Forum Posts</h1>
            <section>
                ...
            </section>
            <h1>Recent Updates</h1>
            <section>
                ...
            </section>
        </div>
        <div class="col-md-6">
            <h1><a href="{{ url('news') }}">Community News</a></h1>
            @foreach($news as $n)
                <section>
                    <h2>{{ $n->subject }}</h2>
                    <h3 class="small">
                        {{ $n->created_at->format("D M jS Y \a\\t g:ia") }} by <a href="{{ url('user/view', [ $n->user->id ]) }}">{{ $n->user->name }}</a>
                        @can('moderator')
                            | <a href="{{ url('news/edit', [$n->id]) }}">edit</a>
                            | <a href="{{ url('news/delete', [$n->id]) }}">delete</a>
                        @endcan
                    </h3>
                    <div class="bbcode">{!! $n->content_html !!}</div>
                </section>
            @endforeach
        </div>
        <div class="col-md-3">
            <h1>
                <a href="#">Latest Maps</a>
            </h1>
            <section>
                ...
            </section>
        </div>
    </div>

@endsection
