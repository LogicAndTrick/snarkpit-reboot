@section('title', 'Links')
@extends('layouts.default')

@section('content')
    <h1>
        <span class="fa fa-link"></span>
        Snarkpit links
        @can('admin')
            <small>
                <a href="{{url('link').'?manage'}}" class="btn btn-outline-primary">Manage</a>
            </small>
        @endcan
    </h1>

    <section>

        @if($manage && Gate::allows('admin'))
            <div class="text-center mb-2">
                <a class="btn btn-primary" href="{{url('link/create')}}"><span class="fas fa-plus"></span> Add link</a>
            </div>
        @endif

        <div class="row">
            @foreach ($links->split(2) as $split)
                <div class="col-lg-6">
                    @foreach($split as $link)
                        <div class="d-flex mb-1">
                            <div class="flex-shrink-0">
                                <img src="{{asset($link->icon)}}" alt="{{$link->name}}">
                            </div>
                            <div class="flex-grow-1 ms-3">
                                @if($manage && Gate::allows('admin'))
                                    <small>
                                        <a class="btn btn-sm btn-outline-primary" href="{{url('link/edit', [ $link->id ])}}"><span class="fas fa-pencil"></span></a>
                                        <a class="btn btn-sm btn-outline-danger" href="{{url('link/delete', [ $link->id ])}}"><span class="fas fa-times"></span></a>
                                    </small>
                                @endif
                                <a href="{{$link->url}}">{{$link->name}}</a>
                                &ndash; {{$link->description}}
                            </div>
                        </div>
                    @endforeach
                </div>
            @endforeach
        </div>
    </section>

@endsection
