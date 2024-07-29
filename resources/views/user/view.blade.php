@section('title', $user->name)
@extends('layouts.default')

@section('content')
    <h1>
        <span class="fa fa-user"></span>
        User profile
        @can('admin')
            <a href="{{ url('panel/index', [ $user->id ]) }}" class="btn btn-outline-primary">Control panel</a>
        @endcan
    </h1>

<?php
use Illuminate\Support\Facades\Gate;
$split = [];
$attribs = [
    'Registered' => $user->created_at,
    'Email' => $user->show_email || Gate::allows('admin') ? $user->email : false,
    'Website' => $user->info_website,
    'Last seen' => $user->last_access_time,
    'Location' => $user->info_location,
    'Occupation' => $user->info_occupation,
    'Interests' => $user->info_interests,
    'Languages' => $user->info_languages,
    'Steam profile' => $user->info_steam_profile,
    'Birthday' => $user->info_birthday_formatted,
    'split1' => Gate::allows('admin') ? $split : false,
    'Last IP' => Gate::allows('admin') ? $user->last_access_ip : false,
    'Last page' => Gate::allows('admin') ? $user->last_access_page : false,
    'split2' => $split,
    'Logins' => $user->stat_logins,
    'Snarkmarks' => $user->stat_snarks,
    'Forum posts' => $user->stat_forum_posts,
    'Profile views' => $user->stat_profile_hits,
    'Maps' => $user->stat_maps,
    'Journals' => $user->stat_journals,
    'Comments' => $user->stat_comments,
];
?>

    <div class="row g-1">
        <div class="col-md-6">
            <h1>
                {{$user->name}}
            </h1>
            <section>
                <x-user-avatar-details :user="$user" :name="false" :details="false" :link="false" />
                @auth
                    <div class="text-center mb-2">
                        <a class="btn btn-outline-primary" href="{{ url('message/send') }}?to={{ $user->name }}">
                            Send message
                        </a>
                    </div>
                @endauth
                <dl class="row">
                @foreach($attribs as $label => $value)
                    @if ($value === $split)
                </dl>
                <dl class="row">
                    @elseif ($value)
                        <dt class="col-sm-3 text-sm-end">{{$label}}:</dt>
                        <dd class="col-sm-9">
                            @switch($label)
                                @case('Registered')
                                    <x-date :date="$value" format="date" />
                                    @break
                                @case('Last seen')
                                    <x-date :date="$value" format="date" />
                                    @break
                                @case('Website')
                                    <a href="{{$value}}">{{$value}}</a>
                                    @break
                                @case('Email')
                                    <a href="mailto:{{$value}}">{{$value}}</a>
                                    @break
                                @case('Snarkmarks')
                                    <span class="text-success">{{$value}}</span>
                                    @break
                                @case('Steam profile')
                                    @if (is_numeric($value))
                                        <a target="_blank" href="http://steamcommunity.com/profiles/{{$value}}">{{$value}}</a>
                                    @else
                                        <a target="_blank" href="https://steamcommunity.com/id/{{$value}}">{{$value}}</a>
                                    @endif
                                    @break
                                @default
                                    {{$value}}
                                    @break
                            @endswitch
                        </dd>
                    @endif
                @endforeach
                </dl>
            </section>
            @if ($user->info_biography_html || $user->info_signature_html)
                <h1>Profile</h1>
                <section>
                    @if ($user->info_biography_html)
                        <div class="bbcode">{!! $user->info_biography_html !!}</div>
                    @endif
                    @if ($user->info_biography_html)
                        @if ($user->info_biography_html)
                            <hr />
                        @endif
                        <div class="bbcode">{!! $user->info_signature_html !!}</div>
                    @endif
                </section>
            @endif
        </div>
        <div class="col-md-6">
            @if ($maps->count() > 0)
                <h1>Maps</h1>
                <div class="row map-list">
                    @foreach ($maps as $map)
                        <div class="col-12 col-xl-4" id="map-{{ $map->id }}">
                            <section>
                                <div class="info">
                                    <div class="d-flex align-items-start w-100">
                                        <a href="{{ url("map?game=$map->game_id") }}" class="me-2">
                                            <img src="{{asset('images/games/' . $map->game_id . '.png')}}" alt="{{$map->game->name}}" />
                                        </a>
                                        <a href="{{url('map/view', $map->id)}}" class="flex-fill text-center">
                                            {{$map->name}}
                                        </a>
                                        <span class="game-image-filler"></span>
                                    </div>
                                </div>
                                <div class="info text-center">
                                    <img src="{{rating_image($map->stat_rating)}}" alt="{{$map->stat_rating}}" class="m-auto" >
                                </div>
                                <div class="image">
                                    <a href="{{url('map/view', $map->id)}}" class="stretched-link">
                                        @if(!$map->images->isEmpty())
                                            <img class="img-fluid" src="{{ asset($map->images->sortBy('order_index')->get(0)->image_file) }}" />
                                        @else
                                            <img class="img-fluid" src="{{ asset('images/no_image.png') }}" />
                                        @endif
                                    </a>
                                    @if ($map->is_featured)
                                        <img class="overlay" src="{{asset('images/maps/star.gif')}}" alt="Star map!" />
                                    @elseif ($map->status_id == \App\Models\MapStatus::STATUS_BETA)
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
            @endif
            @if ($articles->count() > 0)
                <h1>Articles</h1>
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
                            <div class="col-9">
                                <h2>
                                    <a href="{{ url('article/view', [$article->current_version->slug]) }}">{{ $article->current_version->title }}</a>
                                </h2>
                                <h3 class="small">
                                    in <a href="{{ url("article?game=$article->game_id&cat=$article->article_category_id") }}">{{ $article->game->name }} &raquo; {{ $article->category->name }}</a>
                                </h3>
                                <div class="bbcode">{{$article->current_version->description}}</div>
                            </div>
                        </div>
                    </section>
                @endforeach
            @endif
            @if ($downloads->count() > 0)
                <h1>Downloads</h1>
                @foreach ($downloads as $download)
                    <section id="download-{{ $download->id }}">
                        <div class="row">
                            <div class="col-3 text-center">
                                @if($download->image_file)
                                    <img class="img-fluid" src="{{ asset($download->image_file) }}" />
                                @else
                                    <img class="img-fluid" src="{{ asset('images/no_image.png') }}" />
                                @endif

                                <ul class="list-unstyled mt-2">
                                    @foreach($download->getMirrors() as $mirror)
                                        <li class="mb-1">
                                            <a target="_blank" href="{{$mirror['url']}}" class="btn btn-primary">{{$mirror['text']}}</a>
                                        </li>
                                    @endforeach
                                    @if ($download->download_file)
                                        <li>Size: {{$download->getFileSize()}}</li>
                                    @endif
                                </ul>
                            </div>
                            <div class="col-9">
                                <h2>{{ $download->name }}</h2>
                                <h3 class="small">
                                    in <a href="{{ url("download?game=$download->game_id&cat=$download->download_category_id") }}">{{ $download->game->name }} &raquo; {{ $download->category->name }}</a>
                                </h3>
                                <div class="bbcode">{!! $download->content_html !!}</div>
                            </div>
                        </div>
                    </section>
                @endforeach
            @endif
        </div>
    </div>
@endsection
