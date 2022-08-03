@section('title', 'Delete link')
@extends('layouts.default')

@section('content')
    <h1>
        <span class="fa fa-times"></span>
        Delete link: {{$link->name}}
    </h1>

    <section>
        <form method="POST" action="{{ url('link/delete') }}">
            @csrf
            <x-hidden name="id" :value="$link->id" required />
            <div class="border text-center p-2">
                Are you sure you want to delete this link?<br/>
                <img src="{{asset($link->icon)}}" alt="{{$link->name}}"><br/>
                <strong>{{$link->name}}</strong><br/>
                {{$link->description}}<br/>
                <a href="{{$link->url}}">{{$link->url}}</a>
            </div>
            <button type="submit">Delete</button>
        </form>
    </section>

@endsection
