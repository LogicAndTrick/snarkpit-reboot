@section('title', $download->name)
@extends('layouts.default')

@section('content')
    <h1>
        <span class="fa fa-download"></span>
        Snarkpit Downloads Archive
    </h1>

    <section class="download">
        <div class="row">
            <div class="col-3 text-center">
                @if($download->image_file)
                    <img class="img-fluid" src="{{ asset($download->image_file) }}" />
                @else
                    <img class="img-fluid" src="{{ asset('images/no_image.png') }}" />
                @endif
            </div>
            <div class="col-6">
                <h2><a href="{{ url('download/view', [ $download->id ]) }}">{{ $download->name }}</a></h2>
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
                    <li>in <a href="{{ url("download?game=$download->game_id&cat=$download->download_category_id") }}">{{ $download->game->name }} &raquo; {{ $download->category->name }}</a></li>
                    <li>updated <x-date :date="$download->created_at" format="date" /></li>
                    <li>downloaded {{ $download->stat_downloads }} time{{ $download->stat_downloads == 1 ? '' : 's' }}</li>
                    <li><a href="{{ url('thread/view', $download->thread_id) }}">Discussion topic &raquo;</a></li>
                </ul>
            </div>
        </div>
    </section>

    @if ($download->thread_id)
        <nav class="nav-header bg-body" id="discussion">
            <div class="btn-group">
                <a href="{{ url('thread/view', [ $download->thread_id ]) }}#reply" class="btn">Post reply</a>
                <a href="{{ url('thread/view', [ $download->thread_id ]) }}" class="btn">View topic</a>
            </div>
            {{ $posts->render() }}
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
                        @if ($post->user_id == $download->user_id)
                            <strong class="text-danger">[Author]</strong>
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
                <a href="{{ url('thread/view', [ $download->thread_id ]) }}#reply" class="btn">Post reply</a>
                <a href="{{ url('thread/view', [ $download->thread_id ]) }}" class="btn">View topic</a>
            </div>
            {{ $posts->render() }}
        </nav>
    @endif
@endsection
