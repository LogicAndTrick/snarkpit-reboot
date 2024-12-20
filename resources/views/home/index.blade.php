@extends('layouts.default')

@section('content')

    <div class="row gx-1">
        <div class="col-md-3 order-3 order-md-1 d-flex flex-column">
            <div class="order-3 order-md-1">
                <h1>Spotlight</h1>
                <div class="row spotlight-list">
                    @foreach($spotlights as $spot)
                        <div class="col-4 col-md-12 spotlight {{$loop->index >= 3 ? 'd-none d-md-block' : ''}}">
                            <section class="card">
                                <div class="card-header">
                                    @if ($spot->item_type == \App\Models\Spotlight::TYPE_MAP)
                                        <span class="text-danger">[map]</span>
                                        <a href="{{ url('map/view', [ $spot->item_id ]) }}">{{$spot->item->name}}</a>
                                    @elseif ($spot->item_type == \App\Models\Spotlight::TYPE_DOWNLOAD)
                                        <span class="text-danger">[download]</span>
                                        <a href="{{ url('download/view', [ $spot->item_id ]) }}">{{$spot->item->name}}</a>
                                    @elseif ($spot->item_type == \App\Models\Spotlight::TYPE_ARTICLE)
                                        <span class="text-danger">[article]</span>
                                        <a href="{{ url('article/view', [ $spot->item->current_version->slug ]) }}">{{$spot->item->current_version->title}}</a>
                                    @endif
                                    <br />
                                    by
                                    <a href="{{ url('user/view', [ $spot->item->user->id ]) }}">{{$spot->item->user->name}}</a>
                                </div>
                                <div class="card-body">
                                    @if ($spot->item_type == \App\Models\Spotlight::TYPE_MAP)
                                        <div class="image-cycler">
                                            <a href="{{ url('map/view', [ $spot->item_id ]) }}">
                                            @forelse($spot->item->images->sortBy('order_index') as $img)
                                                <img class="img-fluid {{ $loop->first ? '' : 'd-none' }}" src="{{ asset($img->image_file) }}" />
                                            @empty
                                                <img class="img-fluid" src="{{ asset('images/no_image.png') }}" />
                                            @endforelse
                                            </a>
                                            <span class="controls small"></span>
                                        </div>
                                    @elseif ($spot->item_type == \App\Models\Spotlight::TYPE_DOWNLOAD)
                                        <div class="bbcode mb-0">
                                            <a class="d-block w-50 float-start pe-2" href="{{ url('download/view', [ $spot->item_id ]) }}">
                                                @if($spot->item->image_file)
                                                    <img class="img-fluid" src="{{ asset($spot->item->image_file) }}" />
                                                @else
                                                    <img class="img-fluid" src="{{ asset('images/no_image.png') }}" />
                                                @endif
                                            </a>
                                            {!! $spot->item->content_html !!}
                                        </div>
                                    @elseif ($spot->item_type == \App\Models\Spotlight::TYPE_ARTICLE)
                                        <div class="bbcode mb-0">
                                            <a class="d-block w-50 float-start pe-2" href="{{ url('article/view', [ $spot->item->current_version->slug ]) }}">
                                                @if($spot->item->current_version->thumbnail_file)
                                                    <img class="img-fluid" src="{{ asset($spot->item->current_version->thumbnail_file) }}" />
                                                @else
                                                    <img class="img-fluid" src="{{ asset('images/no_image.png') }}" />
                                                @endif
                                            </a>
                                            {{ $spot->item->current_version->description }}
                                        </div>
                                    @endif
                                </div>
                            </section>
                        </div>
                    @endforeach
                </div>
            </div>
            <div class="order-1 order-md-3">
                <h1>Recent Forum Posts</h1>
                @foreach($threads as $thread)
                    <section class="px-1 py-0">
                        <div class="d-flex flex-row">
                            <div class="text-nowrap d-flex align-items-center">
                                @foreach($thread->getIcons(true) as $icon)
                                    <img src="{{ asset('/images/topic/'.$icon.'.gif') }}" alt="{{$icon}}" class="me-2" title="{{ $icon }}" />
                                @endforeach
                            </div>
                            <div class="flex-fill" style="min-width: 0;">
                                <span class="d-block text-nowrap overflow-hidden" style="text-overflow: ellipsis">
                                    <a href="{{ url('thread/view', [ $thread->id ]) }}?page=last">{{ $thread->title }}</a>
                                </span>
                                <small class="d-flex justify-content-between flex-row flex-md-column flex-xxl-row">
                                    <span>in {{ $thread->forum->name }}</span>
                                    <span>
                                        <x-date :date="$thread->last_post->created_at" format="short" />
                                        by <a href="{{ url('user/view', [ $thread->last_post->user->id ]) }}">{{$thread->last_post->user->name}}</a>
                                    </span>
                                </small>
                            </div>
                        </div>
                    </section>
                @endforeach
            </div>
            <div class="order-4 order-md-4">
                <h1>Active Users</h1>
                @foreach($active_users as $user)
                    <section class="py-1">
                        <div class="d-flex flex-row">
                            <div class="flex-fill">
                                @if($user->avatar_custom)
                                    <img src="{{ asset('uploads/avatars/'.$user->avatar_file) }}" style="max-height: 1.4em;" />
                                @elseif($user->avatar_file)
                                    <img src="{{ asset('images/avatars/'.$user->avatar_file) }}" style="max-height: 1.4em;" />
                                @endif
                                <a href="{{ url('user/view', [ $user->id ]) }}">{{$user->name}}</a>
                            </div>
                            <x-date :date="$user->last_access_time" format="nice" />
                        </div>
                    </section>
                @endforeach
            </div>
            <div class="order-5 order-md-5">
                <h1>Recent Updates</h1>
                @foreach($updates as $update)
                    <section class="px-1 py-0">
                        <span class="d-block text-nowrap overflow-hidden" style="text-overflow: ellipsis">
                            <span class="text-danger">[{{$update->type}}]</span>
                            @if ($update->type == 'download')
                                <a href="{{ url('download/view', [ $update->id ]) }}">{{ $update->name }}</a>
                            @elseif ($update->type == 'article')
                                <a href="{{ url('article/view', [ $update->slug ]) }}">{{ $update->name }}</a>
                            @else
                                <a href="{{ url($update->type.'/view', [ $update->id ]) }}">{{ $update->name }}</a>
                            @endif
                        </span>
                        <div class="text-end">
                            <small>
                                <x-date :date="$update->updated_at" format="short" />
                                by <a href="{{ url('user/view', [ $update->user_id ]) }}">{{$update->user->name}}</a>
                            </small>
                        </div>
                    </section>
                @endforeach
            </div>
        </div>
        <div class="col-md-6 order-1 order-md-3">
            <h1><a href="{{ url('news') }}">Community News</a></h1>
            @foreach($news as $n)
                <section class="{{$loop->index >= 1 ? 'd-none d-md-block' : ''}}">
                    <h2>{{ $n->subject }}</h2>
                    <h3 class="small">
                        <x-date :date="$n->created_at" format="full" /> by <a href="{{ url('user/view', [ $n->user->id ]) }}">{{ $n->user->name }}</a>
                        @can('moderator')
                            | <a href="{{ url('news/edit', [$n->id]) }}">edit</a>
                            | <a href="{{ url('news/delete', [$n->id]) }}">delete</a>
                        @endcan
                    </h3>
                    <div class="bbcode">{!! $n->content_html !!}</div>
                </section>
            @endforeach
        </div>
        <div class="col-md-3 order-5 order-md-5 d-flex flex-column">
            <div>
                <h1>
                    <a href="{{ url('map') }}">Latest Maps</a>
                </h1>
                <div class="row map-list">
                    @foreach ($maps as $map)
                        <div class="col-3 col-md-12" id="map-{{ $map->id }}">
                            <section>
                                <div class="info">
                                    <div class="d-flex align-items-start w-100 overflow-hidden">
                                        <a href="{{ url("map?game=$map->game_id") }}" class="me-2">
                                            <img src="{{asset('images/games/' . $map->game_id . '.png')}}" alt="{{$map->game->name}}" />
                                        </a>
                                        <a href="{{url('map/view', $map->id)}}" class="flex-fill text-center">
                                            {{$map->name}}
                                        </a>
                                        <span class="game-image-filler"></span>
                                    </div>
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
                                        <img class="overlay d-none d-md-block" src="{{asset('images/maps/star.gif')}}" alt="Star map!" />
                                    @elseif ($map->status_id == \App\Models\MapStatus::STATUS_BETA)
                                        <img class="overlay d-none d-md-block" src="{{asset('images/maps/beta.gif')}}" alt="Beta" />
                                    @elseif ($map->status_id == \App\Models\MapStatus::STATUS_ABANDONED)
                                        <img class="overlay d-none d-md-block" src="{{asset('images/maps/abandoned.gif')}}" alt="Abandoned" />
                                    @endif
                                    <div class="description autosize">
                                        <span class="d-block text-nowrap overflow-hidden">by <a href="{{ url('user/view', [ $map->user->id ]) }}">{{$map->user->name}}</a></span>
                                        <span class="d-block text-nowrap overflow-hidden">for <a href="{{ url("map?game=$map->game_id") }}">{{$map->game->name}}</a></span>
                                        <span class="d-block text-nowrap overflow-hidden">rating: <img src="{{rating_image($map->stat_rating)}}" alt="{{$map->stat_rating}}" class="m-auto" ></span>
                                    </div>
                                </div>
                            </section>
                        </div>
                    @endforeach
                </div>
            </div>
            <div>
                <h1>
                    <a href="{{ url('journal') }}">Latest Journals</a>
                </h1>
                @foreach($journals as $journal)
                    <section class="px-1 py-0">
                        <span class="d-block text-nowrap overflow-hidden" style="text-overflow: ellipsis">
                            <a href="{{ url('journal/view', [ $journal->id ]) }}">{{ $journal->title }}</a>
                        </span>
                        <div>
                            <small>
                                <x-date :date="$journal->updated_at" format="short" />
                                by <a href="{{ url('user/view', [ $journal->user_id ]) }}">{{$journal->user->name}}</a>
                            </small>
                        </div>
                    </section>
                @endforeach
            </div>
        </div>
    </div>

@endsection
