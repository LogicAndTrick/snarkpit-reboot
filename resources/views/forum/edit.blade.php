@section('title', 'Edit forum: '.$forum->name)

@extends('layouts.default')

@section('content')
    <h1>Edit forum: {{ $forum->name }}</h1>

    <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="{{ url('forum/index') }}">Forums</a></li>
        <li class="breadcrumb-item"><a href="{{ url('forum/view', [$forum->id]) }}">{{ $forum->name }}</a></li>
        <li class="breadcrumb-item active">Edit</li>
    </ol>

    <section>
        <form method="POST" action="{{ url('forum/edit') }}">
            @csrf
            <x-hidden name="id" :value="$forum->id" />
            <x-text name="name" label="Name:" :value="$forum->name" />
            <x-text name="description" label="Description:" :value="$forum->description" />
            <x-text name="order_index" label="Order:" type="number" :value="$forum->order_index" />
            <button type="submit">Edit</button>
        </form>
    </section>
@endsection
