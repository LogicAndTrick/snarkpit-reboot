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
            <h1>Community News</h1>
            @foreach($news as $n)
                <section>
                    <h2>{{ $n->subject }}</h2>
                    <h3 class="small">
                        {{ $n->created_at->format("D M jS Y \a\\t g:ia") }} by <a href="#">{{ $n->user->name }}</a>
                        @can('moderator')
                            | <a href="#">edit</a>
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
