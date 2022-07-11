@section('title', 'Articles')
@extends('layouts.default')

@section('content')
    <h1>
        <span class="fa fa-file-lines"></span>
        Snarkpit Articles Archive
    </h1>

<?php
    $total_cat = 0;
    $total_game = 0;
    foreach ($cats as $cat) $total_cat += $cat->count;
    foreach ($games as $game) $total_game += $game->count;
?>

    <nav class="nav-header">
        <form action="{{ url('article') }}" method="get" id="articles-filter-form">
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
                <option value="views.desc" {{request()->get('sort') == 'views.desc' ? 'selected' : ''}}>Most views</option>
                <option value="views.asc" {{request()->get('sort') == 'views.asc' ? 'selected' : ''}}>Fewest views</option>
                <option value="name.asc" {{request()->get('sort') == 'name.asc' ? 'selected' : ''}}>Name A-Z</option>
                <option value="name.desc" {{request()->get('sort') == 'name.desc' ? 'selected' : ''}}>Name Z-A</option>
            </select>
            <noscript>
                <button type="submit">Filter</button>
            </noscript>
        </form>
        {!! $articles->render() !!}
    </nav>
    <script>
        const form = document.getElementById('articles-filter-form');
        const selects = form.querySelectorAll('select');
        for (const select of selects) {
            select.addEventListener('change', () => form.submit());
        }
    </script>

    @foreach ($articles as $article)
        <section id="article-{{ $article->id }}">
            <div class="row">
                <div class="col-3 text-center">
                    @if($article->current_version->thumbnail_file)
                        <img class="img-fluid" src="{{ asset($article->current_version->thumbnail_file) }}" />
                    @else
                        <img class="img-fluid" src="{{ asset('images/no_image.png') }}" />
                    @endif
                </div>
                <div class="col-6">
                    <h2>
                        <a href="{{ url('article/view', [$article->current_version->slug]) }}">{{ $article->current_version->title }}</a>
                    </h2>
                    <h3 class="small">

                        @can('moderator')
                            | <a href="{{ url('article/edit', [$article->id]) }}">edit</a>
                            | <a href="{{ url('article/delete', [$article->id]) }}">delete</a>
                        @endcan
                    </h3>
                    <div class="bbcode">{{$article->current_version->description}}</div>
                </div>
                <div class="col-3">
                    <ul class="list-unstyled">
                        <li>by <a href="#">{{ $article->user->name }}</a></li>
                        <li>in <a href="{{ url("article?game=$article->game_id&cat=$article->article_category_id") }}">{{ $article->game->name }} &raquo; {{ $article->category->name }}</a></li>
                        <li>updated {{ $article->created_at->format("D M jS Y") }}</li>
                        <li>viewed {{ $article->stat_views }} time{{ $article->stat_views == 1 ? '' : 's' }}</li>
                        <li><a href="{{ url('thread/view', $article->forum_thread_id) }}">Discussion topic &raquo;</a></li>
                    </ul>
                </div>
            </div>
        </section>
    @endforeach

    <div class="footer-container">
        {!! $articles->render() !!}
    </div>
@endsection
