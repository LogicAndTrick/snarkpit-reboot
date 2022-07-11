@section('title', $version->title)
@extends('layouts.default')

@section('content')
    <h1>
        <span class="fa fa-file-lines"></span>
        Snarkpit Articles
    </h1>

    <section>
        <div class="row">
            <div class="col-3 text-center">
                @if($version->thumbnail_file)
                    <img class="img-fluid" src="{{ asset($version->thumbnail_file) }}" />
                @else
                    <img class="img-fluid" src="{{ asset('images/no_image.png') }}" />
                @endif
            </div>
            <div class="col-6">
                <h2>
                    <a href="{{ url('article/view', [$version->slug]) }}">{{ $version->title }}</a>
                </h2>
                <h3 class="small">

                    @can('moderator')
                        | <a href="{{ url('article/edit', [$version->article->id]) }}">edit</a>
                        | <a href="{{ url('article/delete', [$version->article->id]) }}">delete</a>
                    @endcan
                </h3>
                <div class="bbcode">{{$version->description}}</div>
            </div>
            <div class="col-3">
                <ul class="list-unstyled">
                    <li>by <a href="#">{{ $version->article->user->name }}</a></li>
                    <li>in <a href="{{ url("article?game={$version->article->game_id}&cat={$version->article->article_category_id}") }}">{{ $version->article->game->name }} &raquo; {{ $version->article->category->name }}</a></li>
                    <li>updated {{ $version->article->created_at->format("D M jS Y") }}</li>
                    <li>viewed {{ $version->article->stat_views }} time{{ $version->article->stat_views == 1 ? '' : 's' }}</li>
                    <li><a href="{{ url('thread/view', $version->article->forum_thread_id) }}">Discussion topic &raquo;</a></li>
                </ul>
            </div>
        </div>
    </section>
    <section>
        <div class="bbcode">{!! $html !!}</div>
    </section>
@endsection
