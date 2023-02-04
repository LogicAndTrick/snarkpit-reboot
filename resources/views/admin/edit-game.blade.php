@extends('admin.layout')

@section('title', 'Game management')
@section('admin-page', 'Game management')

@section('admin-content')
    <section>
        <h4>Edit Game: {{ $game->name }}</h4>
        <form action="{{ url('admin/edit-game') }}" method="post">
            @csrf
            <x-hidden name="id" :value="$game->id" />
            <x-text type="text" name="name" label="Name:" :value="$game->name" />
            <x-text type="text" name="description" label="Description:" :value="$game->description" />
            <x-text type="text" name="url" label="URL:" :value="$game->url" />
            <x-text type="text" name="abbreviation" label="Abbreviation:" :value="$game->abbreviation" />
            <x-text type="number" step="1" name="order_index" label="Order:" :value="$game->order_index" />
            <button type="submit">Save</button>
        </form>
    </section>
@endsection
