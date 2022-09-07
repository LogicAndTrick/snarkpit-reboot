@section('title', 'Delete map: ' . $map->name)
@extends('layouts.default')

@section('content')
    <h1>Delete map: {{$map->name}}</h1>

    <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="{{ url('map/index') }}">Maps</a></li>
        <li class="breadcrumb-item"><a href="{{ url('map/view', [$map->id]) }}">{{$map->name}}</a></li>
        <li class="breadcrumb-item active">Delete</li>
    </ol>

    <section>
        <form method="POST" action="{{ url('map/delete') }}" enctype="multipart/form-data">
            @csrf
            <x-hidden name="id" :value="$map->id" required />
            <div class="border text-center p-2">
                Are you sure you want to delete this map?<br/>
                <strong>{{$map->name}} by <a href="{{ url('user/view', [ $map->user->id ]) }}">{{$map->user->name}}</a></strong>
            </div>
            <button type="submit">Delete</button>
        </form>
    </section>

@endsection
