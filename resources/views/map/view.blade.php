@section('title', $map->name)
@extends('layouts.default')

<?php
    $rating = $map->ratings->where('user_id', '=', Auth::id())->first();
    $rating_num = $rating ? $rating->rating : -1;
?>

@section('content')

    <h1>
        {{$map->name}}
        by <a href="{{ url('user/view', [ $map->user->id ]) }}">{{$map->user->name}}</a>
    </h1>

    <nav class="nav-header">
        <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="{{ url('map/index') }}">Maps</a></li>
            <li class="breadcrumb-item"><a href="{{ url('map/index') }}?game={{ $map->game_id }}">{{$map->game->name}}</a></li>
            <li class="breadcrumb-item active">{{ $map->name }}</li>
        </ol>
        @if ($map->isEditable())
            <div class="btn-group">
                <a href="{{url('map/edit', [$map->id])}}" class="btn btn-outline-primary btn-sm"><span class="fa fa-pencil"></span> <span class="d-none d-md-inline">Edit</span></a>
                <a href="{{url('map/delete', [$map->id])}}" class="btn btn-outline-danger btn-sm"><span class="fa fa-times"></span> <span class="d-none d-md-inline">Delete</span></a>
            </div>
        @endif
    </nav>

    <div class="row">
        <div class="col-lg-6 image-cycler image-cycler-clickable">
            @forelse($map->images->sortBy('order_index') as $img)
                <img class="img-fluid {{ $loop->first ? '' : 'd-none' }}" src="{{ asset($img->image_file) }}" />
            @empty
                <img class="img-fluid" src="{{ asset('images/no_image.png') }}" />
            @endforelse
            <span class="controls"></span>
        </div>
        <div class="col-lg-6">
            <div class="row gx-1">
                <div class="col-4 d-flex flex-column">
                    <h1>Map Rating</h1>
                    <section class="flex-fill">
                        <ul class="list-unstyled text-center mb-2">
                            @if ($map->is_featured)
                                <li><img src="{{asset('/images/ratings/star_map.png')}}" alt="Star map!" ></li>
                            @endif
                            <li><img src="{{rating_image($map->stat_rating)}}" alt="{{$map->stat_rating}}" ></li>
                            <li>{{rating_summary($map->stat_rating, $map->stat_ratings)}}</li>
                        </ul>
                        @if (Auth::check() && $map->user_id !== Auth::id())
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
                        @endif
                    </section>
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
                <div class="col-8 d-flex flex-column">
                    <h1>Map Info</h1>
                    <section class="flex-fill">
                        <ul class="list-unstyled">
                            <li>{{ $map->stat_ratings }} rating{{ $map->stat_ratings == 1 ? '' : 's' }}</li>
                            <li>{{ $map->stat_views }} view{{ $map->stat_views == 1 ? '' : 's' }}</li>
                            <li>{{ $map->stat_downloads }} download{{ $map->stat_downloads == 1 ? '' : 's' }}</li>
                            <li>game: <a href="{{ url('map') }}?game={{$map->game_id}}">{{$map->game->name}}</a></li>
                            <li>added <x-date :date="$map->created_at" format="date" /></li>
                            <li>updated <x-date :date="$map->updated_at" format="date" /></li>
                        </ul>
                    </section>
                    @can('admin')
                        <section>
                            <form method="POST" action="{{ url('map/toggle-feature') }}" enctype="multipart/form-data">
                                @csrf
                                <x-hidden name="id" :value="$map->id" required />
                                <button class="btn" type="submit">
                                    <span class="fas fa-star"></span>
                                    {{ $map->is_featured ? 'Remove from star maps' : 'Add to star maps' }}
                                </button>
                            </form>
                        </section>
                    @endcan
                </div>
            </div>
            <h1>Map Description</h1>
            <section>
                <div class="bbcode">{!! $map->content_html !!}</div>
            </section>
        </div>
    </div>

    @if ($map->thread_id)
        <nav class="nav-header bg-body" id="discussion">
            <div class="btn-group">
                <a href="{{ url('thread/view', [ $map->thread_id ]) }}#reply" class="btn">Post reply</a>
                <a href="{{ url('thread/view', [ $map->thread_id ]) }}" class="btn">View topic</a>
            </div>
            {{ $posts->render() }}
            @auth
                <div class="btn-group ms-2">
                    @if ($subscription)
                        <a href="{{ url('thread/unsubscribe', [$map->thread_id]) }}" class="btn"><span class="fa fa-bell-slash"></span> Unsubscribe</a>
                        <a href="{{ url('thread/subscribe-email-toggle', [$map->thread_id]) }}" class="btn">
                            <span class="fa {{$subscription->send_email ? 'fa-check' : 'fa-times'}}"></span>
                            Currently {{$subscription->send_email ? 'sending' : 'not sending'}} emails
                        </a>
                    @else
                        <a href="{{ url('thread/subscribe', [$map->thread_id]) }}" class="btn"><span class="fa fa-bell"></span> Subscribe</a>
                    @endif
                </div>
            @endauth
        </nav>
        <h1>
            Discussion
        </h1>
        @forelse($posts as $post)
            <section>
                <div class="d-flex justify-content-between">
                    <div>
                        Posted by <a href="{{ url('user/view', [ $post->user->id ]) }}">{{$post->user->name}}</a> on <x-date :date="$post->created_at" format="full" />
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
        @empty
            <section>
                There are not yet any comments for this map
            </section>
        @endforelse
        <nav class="nav-header bg-body">
            <div class="btn-group">
                <a href="{{ url('thread/view', [ $map->thread_id ]) }}#reply" class="btn">Post reply</a>
                <a href="{{ url('thread/view', [ $map->thread_id ]) }}" class="btn">View topic</a>
            </div>
            {{ $posts->render() }}
        </nav>
    @endif
@endsection
