@section('title', $searched ? 'Search results' : 'Search The SnarkPit')
@extends('layouts.default')

@section('content')
    <h1>
        <span class="fa fa-search"></span>
        {{ $searched ? 'Search results' : 'Search The SnarkPit' }}
    </h1>

    <section>
        <div class="text-center">
            Use this form to search The SnarkPit. It will search users, maps, articles, downloads, thread titles, and
            forum posts.
        </div>
        <form action="{{ url('search/index') }}" method="get">
            <div class="d-flex flex-row my-3">
                <span class="align-self-center mx-3"><span class="fa fa-search"></span></span>
                <div class="flex-fill">
                    <input type="text" class="form-control" name="search" placeholder="Search" value="{{ $search }}">
                </div>
                <button type="submit" class="mx-3 btn">Search</button>
            </div>
        </form>
    </section>

    <div class="search-results">
        @if ($searched)

            <style>
                .bbcode br {
                    display: none;
                }
            </style>

            <section>

                <p class="text-center">
                    This search uses basic full-word matching to try and find relevant results
                    for a search. However, it's not a very powerful search engine. If you are having
                    trouble finding something, you may get better results if you
                    <a href="https://www.google.com/#q=site:{{ url('/') }}+{{ urlencode($search) }}">
                    click here to repeat your search on The SnarkPit using Google</a>.
                </p>

                <nav class="nav-header">
                    <h2>Articles</h2>
                    {{ $results_articles->render() }}
                </nav>
                @if ($results_articles && $results_articles->count() > 0)
                    <table class="table table-sm table-striped table-bordered search-articles">
                        <thead>
                        <tr>
                            <th>Article</th>
                            <th class="hidden-sm-down">Last Modified</th>
                            <th class="hidden-md-down">Excerpt</th>
                        </tr>
                        </thead>
                        <tbody>
                        @foreach ($results_articles as $article)
                            <tr>
                                <td>
                                    <a href="{{ url('article/view', $article->current_version->slug) }}">{{ $article->current_version->title }}</a>
                                </td>
                                <td class="hidden-sm-down text-nowrap">
                                    {{ $article->current_version->created_at->diffForHumans() }}<br/>
                                    by <a href="{{url('user/view', [$article->user_id])}}">{{$article->user->name}}</a>
                                </td>
                                <td class="hidden-md-down">
                                    <div class="bbcode">{!! bbcode_excerpt($article->current_version->content_text) !!}</div>
                                </td>
                            </tr>
                        @endforeach
                        </tbody>
                    </table>
                @else
                    <p>No matching articles were found.</p>
                @endif

                <nav class="nav-header">
                    <h2>Downloads</h2>
                    {{ $results_downloads->render() }}
                </nav>

                @if ($results_downloads && $results_downloads->count() > 0)
                    <table class="table table-sm table-striped table-bordered search-downloads">
                        <thead>
                        <tr>
                            <th>Download</th>
                            <th class="hidden-sm-down">Game</th>
                            <th class="hidden-sm-down">Category</th>
                            <th class="hidden-sm-down">Uploaded By</th>
                            <th class="hidden-md-down">Excerpt</th>
                        </tr>
                        </thead>
                        <tbody>
                        @foreach ($results_downloads as $download)
                            <tr>
                                <td>
                                    <a href="{{ url('download/view', [$download->id]) }}">{{ $download->name }}</a>
                                </td>
                                <td class="hidden-sm-down text-nowrap">{{ $download->game->name }}</td>
                                <td class="hidden-sm-down text-nowrap">{{ $download->category->name }}</td>
                                <td class="hidden-sm-down text-nowrap">
                                    {{ $download->created_at->diffForHumans() }}<br/>
                                    by <a href="{{url('user/view', [$download->user_id])}}">{{$download->user->name}}</a>
                                </td>
                                <td class="hidden-md-down">
                                    <div class="bbcode">{!! bbcode_excerpt($download->content_text) !!}</div>
                                </td>
                            </tr>
                        @endforeach
                        </tbody>
                    </table>
                @else
                    <p>No matching downloads were found.</p>
                @endif

                <nav class="nav-header">
                    <h2>Thread titles</h2>
                    {{ $results_threads->render() }}
                </nav>

                @if ($results_threads && $results_threads->count() > 0)
                    <table class="table table-sm table-striped table-bordered search-threads">
                        <thead>
                        <tr>
                            <th>Title</th>
                            <th class="hidden-sm-down">Forum</th>
                            <th class="hidden-sm-down">Created</th>
                            <th class="hidden-md-down">Last Post</th>
                        </tr>
                        </thead>
                        <tbody>
                        @foreach ($results_threads as $thread)
                            <tr>
                                <td><a href="{{ url('thread/view', [$thread->id]) }}">{{ $thread->title }}</a></td>
                                <td class="hidden-sm-down"><a
                                        href="{{ url('forum/view', [$thread->forum_id]) }}">{{ $thread->forum->name }}</a>
                                </td>
                                <td class="hidden-sm-down text-nowrap">{{ $thread->created_at->diffForHumans() }}</td>
                                <td class="hidden-md-down">
                                    @if ($thread->last_post)
                                        <a href="{{ url('thread/view', [$thread->id]) }}?page=last#post-{{ $thread->last_post->id }}">{{ $thread->last_post->created_at->diffForHumans() }}</a>
                                        by <a
                                            href="{{url('user/view', [$thread->last_post->user_id])}}">{{$thread->last_post->user->name}}</a>
                                    @endif
                                </td>
                            </tr>
                        @endforeach
                        </tbody>
                    </table>
                @else
                    <p>No matching thread titles were found.</p>
                @endif

                <nav class="nav-header">
                    <h2>Forum posts</h2>
                    {{ $results_posts->render() }}
                </nav>

                @if ($results_posts && $results_posts->count() > 0)
                    <table class="table table-sm table-striped table-bordered search-posts">
                        <thead>
                        <tr>
                            <th>In Thread</th>
                            <th class="hidden-sm-down">Posted</th>
                            <th class="hidden-md-down">Excerpt</th>
                        </tr>
                        </thead>
                        <tbody>
                        @foreach ($results_posts as $post)
                            <tr>
                                <td>
                                    <a href="{{ url('thread/locate-post', [$post->id]) }}">{{ $post->thread->title }}</a><br/>
                                    in <a
                                        href="{{ url('forum/view', [$post->thread->forum->id]) }}">{{ $post->forum->name }}</a>
                                </td>
                                <td class="hidden-sm-down text-nowrap">
                                    {{ $post->created_at->diffForHumans() }}<br/>
                                    by <a href="{{url('user/view', [$post->user_id])}}">{{$post->user->name}}</a>
                                </td>
                                <td class="hidden-md-down">
                                    <div class="bbcode">{!! bbcode_excerpt($post->content_text) !!}</div>
                                </td>
                            </tr>
                        @endforeach
                        </tbody>
                    </table>
                @else
                    <p>No matching forum posts were found.</p>
                @endif

                <nav class="nav-header">
                    <h2>Maps</h2>
                    {{ $results_maps->render() }}
                </nav>

                @if ($results_maps && $results_maps->count() > 0)
                    <table class="table table-sm table-striped table-bordered search-maps">
                        <thead>
                        <tr>
                            <th>Map</th>
                            <th class="hidden-sm-down">Game</th>
                            <th class="hidden-sm-down">Uploaded By</th>
                            <th class="hidden-md-down">Excerpt</th>
                        </tr>
                        </thead>
                        <tbody>
                        @foreach ($results_maps as $map)
                            <tr>
                                <td>
                                    <a href="{{ url('map/view', [$map->id]) }}">{{ $map->name }}</a>
                                </td>
                                <td class="hidden-sm-down">{{ $map->game->name }}</td>
                                <td class="hidden-sm-down text-nowrap">
                                    {{ $map->created_at->diffForHumans() }}<br/>
                                    by <a href="{{url('user/view', [$map->user_id])}}">{{$map->user->name}}</a>
                                </td>
                                <td class="hidden-md-down">
                                    <div class="bbcode">{!! bbcode_excerpt($map->content_text) !!}</div>
                                </td>
                            </tr>
                        @endforeach
                        </tbody>
                    </table>
                @else
                    <p>No matching maps were found.</p>
                @endif

                <nav class="nav-header">
                    <h2>Users</h2>
                    {{ $results_users->render() }}
                </nav>

                @if ($results_users && $results_users->count() > 0)
                    <table class="table table-sm table-striped table-bordered search-users">
                        <thead>
                        <tr>
                            <th>User</th>
                            <th class="hidden-sm-down">Biography Excerpt</th>
                        </tr>
                        </thead>
                        <tbody>
                        @foreach ($results_users as $user)
                            <tr>
                                <td>
                                    <a href="{{url('user/view', [$user->id])}}">{{$user->name}}</a>
                                </td>
                                <td class="hidden-sm-down">
                                    <div class="bbcode">{!! bbcode_excerpt($user->info_biography_text) !!}</div>
                                </td>
                            </tr>
                        @endforeach
                        </tbody>
                    </table>
                @else
                    <p>No matching users were found.</p>
                @endif
            </section>
        @endif

    </div>
@endsection
