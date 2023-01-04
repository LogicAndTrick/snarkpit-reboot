@section('title', $version->title)
@extends('layouts.default')

@section('content')
    <h1>
        <span class="fa fa-file-lines"></span>
        Snarkpit Articles
    </h1>

    <section>
        @switch($version->status)
            @case(\App\Models\ArticleVersion::STATUS_DRAFT)
                <div class="border m-2 p-2">
                    <h3>Draft article</h3>
                    <p>This is a draft article, it has not been submitted for review yet.</p>
                    <form method="post" action="{{url('article/status')}}">
                        @csrf
                        <x-hidden name="article_id" :value="$version->article_id" />
                        <x-hidden name="version_id" :value="$version->id" />
                        <x-hidden name="status" :value="\App\Models\ArticleVersion::STATUS_PENDING" />
                        <button type="submit">Submit for review</button>
                    </form>
                </div>
                @break
            @case(\App\Models\ArticleVersion::STATUS_PENDING)
                <div class="border m-2 p-2">
                    @can('moderator')
                        <div class="row">
                            <div class="col-md-6">
                                <h3>Pending review</h3>
                                <p>A moderator must approve this article before it will be published.</p>
                                <form method="post" action="{{url('article/status')}}">
                                    @csrf
                                    <x-hidden name="article_id" :value="$version->article_id" />
                                    <x-hidden name="version_id" :value="$version->id" />
                                    <x-hidden name="status" :value="\App\Models\ArticleVersion::STATUS_APPROVED" />
                                    <button type="submit">Approve</button>
                                </form>
                            </div>
                            <div class="col-md-6">
                                <form method="post" action="{{url('article/status')}}">
                                    @csrf
                                    <x-hidden name="article_id" :value="$version->article_id" />
                                    <x-hidden name="version_id" :value="$version->id" />
                                    <x-hidden name="status" :value="\App\Models\ArticleVersion::STATUS_REJECTED" />
                                    <x-textarea name="review" label="Reason for rejection:" class="small-textarea" required />
                                    <button type="submit">Reject</button>
                                </form>
                            </div>
                        </div>
                    @else
                        <h3>Pending review</h3>
                        <p>A moderator must approve this article before it will be published.</p>
                    @endcan
                </div>
                @break
            @case(\App\Models\ArticleVersion::STATUS_APPROVED)
                {{-- Nothing --}}
                @break
            @case(\App\Models\ArticleVersion::STATUS_ARCHIVED)
                <div class="border m-2 p-2">
                    <h3>Archived article</h3>
                    <p>This version of the article has been archived.</p>
                </div>
                @break
            @case(\App\Models\ArticleVersion::STATUS_REJECTED)
                <div class="border m-2 p-2">
                    <h3>Article was not approved</h3>
                    @if ($version->review_user_id)
                        <p>The article was not approved, changes have been requested by <a href="{{ url('user/view', [ $version->review_user->id ]) }}">{{$version->review_user->name}}</a>:</p>
                    @else
                        <p>The article was not approved, changes have been requested:</p>
                    @endif</p>
                    <hr/>
                    <div class="bbcode">{!! $version->review_html !!}</div>
                    <hr/>
                    <p>Edit the article to create a new draft and submit an updated version for review.</p>
                </div>
                @break
        @endswitch
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
                    @if ($version->canEdit())
                        <a href="{{ url('article/edit', [$version->article->id]) }}">edit</a>
                        @if ($version->canDelete())
                            | <a href="{{ url('article/delete', [$version->article->id]) }}">delete</a>
                        @endif
                    @endif
                </h3>
                <div class="bbcode">{{$version->description}}</div>
            </div>
            <div class="col-3">
                <ul class="list-unstyled">
                    <li>by <a href="{{ url('user/view', [ $version->article->user->id ]) }}">{{ $version->article->user->name }}</a></li>
                    <li>in <a href="{{ url("article?game={$version->article->game_id}&cat={$version->article->article_category_id}") }}">{{ $version->article->game->name }} &raquo; {{ $version->article->category->name }}</a></li>
                    <li>updated {{ $version->article->created_at->format("D M jS Y") }}</li>
                    <li>viewed {{ $version->article->stat_views }} time{{ $version->article->stat_views == 1 ? '' : 's' }}</li>
                    @if ($version->article->forum_thread_id)
                        <li><a href="{{ url('thread/view', $version->article->forum_thread_id) }}">Discussion topic &raquo;</a></li>
                    @endif
                    @if ($version->attachment_file)
                        <li class="mt-2">
                            <a href="{{asset($version->attachment_file)}}"><span class="fas fa-download"></span> Download example file</a>
                        </li>
                    @endif
                </ul>
            </div>
        </div>
    </section>
    <section>
        <div class="bbcode">{!! $html !!}</div>
        @if ($version->attachment_file)
            <div class="mt-2">
                <a href="{{asset($version->attachment_file)}}"><span class="fas fa-download"></span> Download example file</a>
            </div>
        @endif
    </section>

    @if ($version->article->forum_thread_id)
        <nav class="nav-header bg-body" id="discussion">
            <div class="btn-group">
                <a href="{{ url('thread/view', [ $version->article->forum_thread_id ]) }}#reply" class="btn">Post reply</a>
                <a href="{{ url('thread/view', [ $version->article->forum_thread_id ]) }}" class="btn">View topic</a>
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
                        Posted by <a href="{{ url('user/view', [ $post->user->id ]) }}">{{$post->user->name}}</a> on {{ $post->created_at->format("D M jS Y \a\\t g:ia") }}
                    </div>
                    <div>
                        @if ($post->user_id == $version->article->user_id)
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
                <a href="{{ url('thread/view', [ $version->article->forum_thread_id ]) }}#reply" class="btn">Post reply</a>
                <a href="{{ url('thread/view', [ $version->article->forum_thread_id ]) }}" class="btn">View topic</a>
            </div>
            {{ $posts->render() }}
        </nav>
    @endif
@endsection
