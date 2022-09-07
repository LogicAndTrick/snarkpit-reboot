@section('title', 'Downloads')
@extends('layouts.default')

@section('content')
    <h1>
        <span class="fa fa-download"></span>
        Snarkpit Downloads Archive
        @auth
            <small>
                <a href="{{url('download/create')}}" class="btn btn-outline-primary">
                    <span class="fas fa-plus"></span>
                    Submit new download
                </a>
            </small>
        @endauth
    </h1>

<?php
    $total_cat = 0;
    $total_game = 0;
    foreach ($cats as $cat) $total_cat += $cat->count;
    foreach ($games as $game) $total_game += $game->count;
?>
    <nav class="nav-header">
        <form action="{{ url('download') }}" method="get" id="downloads-filter-form">
            <select name="game">
                <option value="" {{request()->get('game') == '' ? 'selected' : ''}}>All games ({{$total_game}})</option>
                @foreach($games as $game)
                    <option value="{{$game->id}}" {{request()->get('game') == $game->id ? 'selected' : ''}}>{{$game->name}} ({{$game->count}})</option>
                @endforeach
            </select>
            <select name="cat" {{request()->get('cat') == '' ? 'selected' : ''}}>
                <option value="">All categories ({{$total_cat}})</option>
                @foreach($cats as $cat)
                    <option value="{{$cat->id}}" {{request()->get('cat') == $cat->id ? 'selected' : ''}}>{{$cat->name}} ({{$cat->count}})</option>
                @endforeach
            </select>
            <select name="sort">
                <option value="date.desc" {{request()->get('sort') == 'date.desc' ? 'selected' : ''}}>Newest first</option>
                <option value="date.asc" {{request()->get('sort') == 'date.asc' ? 'selected' : ''}}>Oldest first</option>
                <option value="downloads.desc" {{request()->get('sort') == 'downloads.desc' ? 'selected' : ''}}>Most downloads</option>
                <option value="downloads.asc" {{request()->get('sort') == 'downloads.asc' ? 'selected' : ''}}>Fewest downloads</option>
                <option value="name.asc" {{request()->get('sort') == 'name.asc' ? 'selected' : ''}}>Name A-Z</option>
                <option value="name.desc" {{request()->get('sort') == 'name.desc' ? 'selected' : ''}}>Name Z-A</option>
            </select>
            <noscript>
                <button type="submit">Filter</button>
            </noscript>
        </form>
        {!! $downloads->render() !!}
    </nav>
    <script>
        const form = document.getElementById('downloads-filter-form');
        const selects = form.querySelectorAll('select');
        for (const select of selects) {
            select.addEventListener('change', () => form.submit());
        }
    </script>

    @foreach ($downloads as $download)
        <section id="download-{{ $download->id }}">
            <div class="row">
                <div class="col-3 text-center">
                    @if($download->image_file)
                        <img class="img-fluid" src="{{ asset($download->image_file) }}" />
                    @else
                        <img class="img-fluid" src="{{ asset('images/no_image.png') }}" />
                    @endif
                </div>
                <div class="col-6">
                    <h2>{{ $download->name }}</h2>
                    <h3 class="small">

                        @if($download->canEdit())
                            <a href="{{ url('download/edit', [$download->id]) }}">edit</a>
                            | <a href="{{ url('download/delete', [$download->id]) }}">delete</a>
                        @endif
                    </h3>
                    <div class="bbcode">{!! $download->content_html !!}</div>
                </div>
                <div class="col-3">
                    <ul class="list-unstyled">
                        @foreach($download->getMirrors() as $mirror)
                            <li class="mb-1">
                                <a target="_blank" href="{{$mirror['url']}}" class="btn btn-primary">{{$mirror['text']}}</a>
                            </li>
                        @endforeach
                        @if ($download->download_file)
                            <li>Size: {{$download->getFileSize()}}</li>
                        @endif
                        <li>by <a href="{{ url('user/view', [ $download->user->id ]) }}">{{ $download->user->name }}</a></li>
                        <li>in <a href="#">{{ $download->game->name }} &raquo; {{ $download->category->name }}</a></li>
                        <li>updated {{ $download->created_at->format("D M jS Y") }}</li>
                        <li>downloaded {{ $download->stat_downloads }} time{{ $download->stat_downloads == 1 ? '' : 's' }}</li>
                        <li><a href="{{ url('thread/view', $download->thread_id) }}">Discussion topic &raquo;</a></li>
                    </ul>
                </div>
            </div>
        </section>
    @endforeach

    <div class="footer-container">
        {!! $downloads->render() !!}
    </div>
@endsection
