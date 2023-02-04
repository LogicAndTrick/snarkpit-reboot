<?php
    $creating = !$version->id;
?>
@section('title', 'Delete article: '. $version->title)
@extends('layouts.default')

@section('content')
    <h1>
        Delete article: {{$version->title}}
    </h1>

    <section>
        <form method="POST" action="{{ url('article/delete') }}">
            @csrf
            <x-hidden name="id" :value="$article->id" required />
            <div class="border text-center p-2">
                Are you sure you want to delete this article?<br/>
                <strong>{{$version->title}} by <a href="{{ url('user/view', [ $version->user->id ]) }}">{{$version->user->name}}</a></strong>
            </div>
            <button type="submit">Delete article</button>
        </form>
    </section>
@endsection
