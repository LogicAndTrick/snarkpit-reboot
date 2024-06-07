@section('title', 'Maps')
@extends('layouts.default')

@section('content')
    <h1>
        <span class="fa fa-map"></span>
        Snarkpit Maps Archive
        @auth
            <small>
                <a href="{{url('map/create')}}" class="btn btn-outline-primary">
                    <span class="fas fa-plus"></span>
                    Upload a map
                </a>
            </small>
        @endauth
    </h1>

<?php
    $total_status = 0;
    $total_game = 0;
    foreach ($statuses as $status) $total_status += $status->count;
    foreach ($games as $game) $total_game += $game->count;
?>

    <nav class="nav-header">
        <form action="{{ url('map') }}" method="get" id="maps-filter-form">
            <select name="game">
                <option value="" {{request()->get('game') == '' ? 'selected' : ''}}>All games ({{$total_game}})</option>
                @foreach($games as $game)
                    <option value="{{$game->id}}" {{request()->get('game') == $game->id ? 'selected' : ''}}>{{$game->name}} ({{$game->count}})</option>
                @endforeach
            </select>
            <select name="status" {{request()->get('cat') == '' ? 'selected' : ''}}>
                <option value="">All statuses ({{$total_status}})</option>
                @foreach($statuses as $status)
                    <option value="{{$status->id}}" {{request()->get('status') == $status->id ? 'selected' : ''}}>{{$status->name}} ({{$status->count}})</option>
                @endforeach
            </select>
            <select name="sort">
                <option value="date.desc" {{request()->get('sort') == 'date.desc' ? 'selected' : ''}}>Newest first</option>
                <option value="date.asc" {{request()->get('sort') == 'date.asc' ? 'selected' : ''}}>Oldest first</option>
                <option value="views.desc" {{request()->get('sort') == 'views.desc' ? 'selected' : ''}}>Most views</option>
                <option value="views.asc" {{request()->get('sort') == 'views.asc' ? 'selected' : ''}}>Fewest views</option>
                <option value="downloads.desc" {{request()->get('sort') == 'downloads.desc' ? 'selected' : ''}}>Most downloads</option>
                <option value="downloads.asc" {{request()->get('sort') == 'downloads.asc' ? 'selected' : ''}}>Fewest downloads</option>
                <option value="rating.desc" {{request()->get('sort') == 'rating.desc' ? 'selected' : ''}}>Best rating</option>
                <option value="rating.asc" {{request()->get('sort') == 'rating.asc' ? 'selected' : ''}}>Worst rating</option>
                <option value="name.asc" {{request()->get('sort') == 'name.asc' ? 'selected' : ''}}>Name A-Z</option>
                <option value="name.desc" {{request()->get('sort') == 'name.desc' ? 'selected' : ''}}>Name Z-A</option>
            </select>
            <noscript>
                <button type="submit">Filter</button>
            </noscript>
        </form>
        {!! $maps->render() !!}
    </nav>
    <script>
        const form = document.getElementById('maps-filter-form');
        const selects = form.querySelectorAll('select');
        for (const select of selects) {
            select.addEventListener('change', () => form.submit());
        }
    </script>

    <div class="row map-list">
        @foreach ($maps as $map)
            <div class="col-12 col-md-6 col-lg-4" id="map-{{ $map->id }}">
                <h1 class="d-flex align-items-start">
                    <a href="{{ url("map?game=$map->game_id") }}">
                        <img src="{{asset('images/games/' . $map->game_id . '.png')}}" alt="{{$map->game->name}}" />
                    </a>
                    <a href="{{url('map/view', $map->id)}}" class="flex-fill">
                        {{$map->name}}
                    </a>
                    <span class="game-image-filler"></span>
                </h1>
                <section>
                    <div class="info">
                        <span>for <a href="{{ url("map?game=$map->game_id") }}">{{$map->game->name}}</a></span>
                        <img src="{{rating_image($map->stat_rating)}}" alt="{{$map->stat_rating}}" >
                    </div>
                    <div class="info">
                        <span>by <a href="{{ url('user/view', [ $map->user->id ]) }}">{{$map->user->name}}</a></span>
                    </div>
                    <div class="image">
                        <a href="{{url('map/view', $map->id)}}" class="stretched-link">
                            @if(!$map->images->isEmpty())
                                <img class="img-fluid" src="{{ asset($map->images->sortBy('order_index')->get(0)->image_file) }}" />
                            @else
                                <img class="img-fluid" src="{{ asset('images/no_image.png') }}" />
                            @endif
                        </a>
                        @if ($map->status_id == \App\Models\MapStatus::STATUS_BETA)
                            <img class="overlay" src="{{asset('images/maps/beta.gif')}}" alt="Beta" />
                        @elseif ($map->status_id == \App\Models\MapStatus::STATUS_ABANDONED)
                            <img class="overlay" src="{{asset('images/maps/abandoned.gif')}}" alt="Abandoned" />
                        @endif
                        <div class="description bbcode">
                            {!! $map->content_html !!}
                        </div>
                    </div>
                </section>
            </div>
        @endforeach
    </div>

    <div class="footer-container">
        {!! $maps->render() !!}
    </div>
@endsection
