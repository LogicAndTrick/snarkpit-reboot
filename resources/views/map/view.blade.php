@section('title', $map->name)
@extends('layouts.default')

<?php
    $rating = $map->ratings->where('user_id', '=', Auth::id())->first();
    $rating_num = $rating ? $rating->rating : -1;
?>

@section('content')
    <h1>
        {{$map->name}}
        by <a href="#">{{$map->user->name}}</a>
    </h1>

    <div class="row">
        <div class="col-md-6 image-cycler">
            @forelse($map->images as $img)
                <img class="img-fluid {{ $loop->first ? '' : 'd-none' }}" src="{{ asset($img->image_file) }}" />
            @empty
                <img class="img-fluid" src="{{ asset('images/no_image.png') }}" />
            @endforelse
            <span class="controls"></span>
        </div>
        <div class="col-md-6">
            <div class="row gx-1">
                <div class="col-4 d-flex flex-column">
                    <h1>Map Download</h1>
                    <section class="flex-fill">
                        <ul class="list-unstyled text-center">
                            @foreach($map->getMirrors() as $mirror)
                                <li class="mb-1">
                                    <a target="_blank" href="{{$mirror['url']}}" class="btn btn-primary">{{$mirror['text']}}</a>
                                </li>
                            @endforeach
                            @if ($map->download_file)
                                <li>Size: {{$map->getFileSize()}}</li>
                            @endif
                        </ul>
                    </section>
                </div>
                <div class="col-4 d-flex flex-column">
                    <h1>Map Rating</h1>
                    <section class="flex-fill">
                        <ul class="list-unstyled text-center">
                            <li><img src="{{rating_image($map->stat_rating)}}" alt="{{$map->stat_rating}}" ></li>
                            <li>{{rating_summary($map->stat_rating, $map->stat_ratings)}}</li>
                        </ul>
                        @auth
                            <form method="post" action="{{url('map/rate')}}" class="d-flex flex-column align-items-center" id="rating-form">
                                @csrf
                                <input type="hidden" name="id" value="{{$map->id}}">
                                <select name="rating">
                                    <option>Rate this map...</option>
                                    {{-- <option value="0">(remove my rating)</option>--}}
                                    <option value="1" {{$rating_num == 1 ? 'selected': ''}}>⭐</option>
                                    <option value="2" {{$rating_num == 2 ? 'selected': ''}}>⭐⭐</option>
                                    <option value="3" {{$rating_num == 3 ? 'selected': ''}}>⭐⭐⭐</option>
                                    <option value="4" {{$rating_num == 4 ? 'selected': ''}}>⭐⭐⭐⭐</option>
                                    <option value="5" {{$rating_num == 5 ? 'selected': ''}}>⭐⭐⭐⭐⭐</option>
                                </select>
                                <noscript>
                                    <button type="submit">Rate</button>
                                </noscript>
                                @if ($rating)
                                    <small>Your current rating: {{$rating_num}} star{{$rating_num == 1 ? '' : 's'}}</small>
                                @else
                                    <small>(please download first!)</small>
                                @endif
                            </form>
                            <script>
                                const form = document.getElementById('rating-form');
                                const selects = form.querySelectorAll('select');
                                for (const select of selects) {
                                    select.addEventListener('change', () => form.submit());
                                }
                            </script>
                        @endauth
                    </section>
                </div>
                <div class="col-4 d-flex flex-column">
                    <h1>Map Info</h1>
                    <section class="flex-fill">
                        <ul class="list-unstyled">
                            <li>{{ $map->stat_ratings }} rating{{ $map->stat_ratings == 1 ? '' : 's' }}</li>
                            <li>{{ $map->stat_views }} view{{ $map->stat_views == 1 ? '' : 's' }}</li>
                            <li>{{ $map->stat_downloads }} downloads{{ $map->stat_downloads == 1 ? '' : 's' }}</li>
                            <li>game: <a href="#">{{$map->game->name}}</a></li>
                            <li>added {{ $map->created_at->format("D M jS Y") }}</li>
                            <li>updated {{ $map->updated_at->format("D M jS Y") }}</li>
                        </ul>
                    </section>
                </div>
            </div>
            <h1>Map Description</h1>
            <section>
                <div class="bbcode">{!! $map->content_html !!}</div>
            </section>
        </div>
    </div>

    <nav class="nav-header bg-body">
        <div class="btn-group">
            <a href="{{ url('thread/view', [ $map->thread_id ]) }}#reply" class="btn">Post reply</a>
            <a href="{{ url('thread/view', [ $map->thread_id ]) }}" class="btn">View topic</a>
        </div>
        {{ $posts->render() }}
    </nav>
    <h1>
        Discussion
    </h1>
    @foreach($posts as $post)
        <section>
            <div class="d-flex justify-content-between">
                <div>
                    Posted by <a href="#">{{$post->user->name}}</a> on {{ $post->created_at->format("D M jS Y \a\\t g:ia") }}
                </div>
                <div>
                    @if ($post->user_id == $map->user_id)
                        <strong class="text-danger">[Author]</strong>
                    @elseif ($rating)
                        <img src="{{rating_image($rating->rating)}}" alt="{{$rating->rating}}" />
                    @endif
                </div>
            </div>
            <hr class="my-1"/>
            <div class="bbcode">
                {!! $post->content_html !!}
            </div>
        </section>
    @endforeach
@endsection
