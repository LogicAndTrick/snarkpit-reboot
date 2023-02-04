@extends('admin.layout')

@section('title', 'Game management')
@section('admin-page', 'Game management')

@section('admin-content')
    <section>
        <h4>Games</h4>
        <table class="table table-bordered table-sm">
            <tr>
                <th>Name</th>
                <th>Description</th>
                <th>URL</th>
                <th>Abbreviation</th>
                <th>Order</th>
                <th></th>
            </tr>
            @foreach($games as $game)
                <tr>
                    <td class="text-nowrap">
                        <img src="{{asset('images/games/' . $game->id . '.png')}}" alt="{{$game->name}}" />
                        {{$game->name}}
                    </td>
                    <td><div class="bbcode">{!! bbcode($game->description) !!}</div></td>
                    <td>{{$game->url}}</td>
                    <td>{{$game->abbreviation}}</td>
                    <td>{{$game->order_index}}</td>
                    <td>
                        <a href="{{ url('admin/edit-game', [$game->id]) }}" class="btn btn-outline-primary"><span class="fa fa-pencil"></span></a>
                    </td>
                </tr>
            @endforeach
        </table>
        <h4>Add Game</h4>
        <form action="{{ url('admin/create-game') }}" method="post">
            <div class="alert alert-info">
                After creating this game, you will need to add the icon to the website as well!<br/>
                The image path will be: <code>{{public_path('images/games/[new_game_id].png')}}</code><br/>
                (ideally, add the images to git and run <code>git pull</code> rather than uploading the image directly)
            </div>
            @csrf
            <x-text type="text" name="name" label="Name:" />
            <x-text type="text" name="description" label="Description:" />
            <x-text type="text" name="url" label="URL:" />
            <x-text type="text" name="abbreviation" label="Abbreviation:" />
            <x-text type="number" step="1" name="order_index" label="Order:" />
            <button type="submit">Add</button>
        </form>
    </section>
@endsection
