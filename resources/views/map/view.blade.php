@section('title', $version->title)
@extends('layouts.default')

@section('content')
    <h1>
        <span class="fa fa-file-lines"></span>
        Snarkpit Maps
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
                    <a href="{{ url('map/view', [$version->slug]) }}">{{ $version->title }}</a>
                </h2>
                <h3 class="small">

                    @can('moderator')
                        | <a href="{{ url('map/edit', [$version->map->id]) }}">edit</a>
                        | <a href="{{ url('map/delete', [$version->map->id]) }}">delete</a>
                    @endcan
                </h3>
                <div class="bbcode">{{$version->description}}</div>
            </div>
            <div class="col-3">
                <ul class="list-unstyled">
                    <li>by <a href="#">{{ $version->map->user->name }}</a></li>
                    <li>in <a href="{{ url("map?game={$version->map->game_id}&cat={$version->map->map_category_id}") }}">{{ $version->map->game->name }} &raquo; {{ $version->map->category->name }}</a></li>
                    <li>updated {{ $version->map->created_at->format("D M jS Y") }}</li>
                    <li>viewed {{ $version->map->stat_views }} time{{ $version->map->stat_views == 1 ? '' : 's' }}</li>
                    <li><a href="{{ url('thread/view', $version->map->forum_thread_id) }}">Discussion topic &raquo;</a></li>
                </ul>
            </div>
        </div>
    </section>
    <section>
        <div class="bbcode">{!! $html !!}</div>
    </section>
@endsection
