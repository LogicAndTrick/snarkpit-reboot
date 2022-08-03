@section('title', 'Manage articles')
@extends('layouts.default')

@section('content')
    <h1>
        <span class="fa fa-file-lines"></span>
        Manage articles
    </h1>

    <section>
        <table class="table">
            <thead>
            <tr>
                <td>Name</td>
                <td>Author</td>
                <td>Status</td>
            </tr>
            </thead>
            <tbody>
            @forelse ($articles as $article)
<?php
                $version = $versions->where('article_id', '=', $article->id)->sortByDesc('created_at')->first();
?>
                @if (!$version)
                    @continue
                @endif
                <tr>
                    <td>
                        <a href="{{ url('article/view', [$version->id]) }}">{{ $version->title }}</a>
                    </td>
                    <td>
                        <a href="#">{{ $article->user->name }}</a>
                    </td>
                    <td>
                        {{$version->getStatus()}}
                    </td>
                </tr>
            @empty
                <tr>
                    <td colspan="3">No articles here!</td>
                </tr>
            @endforelse
            </tbody>
        </table>
    </section>
@endsection
