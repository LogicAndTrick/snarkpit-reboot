@section('title', 'Links')
@extends('layouts.default')

@section('content')
    <h1>
        <span class="fa fa-link"></span>
        Snarkpit links
    </h1>

    <section>
        <div class="row">
            @foreach ($links->split(2) as $split)
                <div class="col-lg-6">
                    @foreach($split as $link)
                        <div class="d-flex mb-1">
                            <div class="flex-shrink-0">
                                <img src="{{asset('/images/links/'.$link->icon)}}" alt="{{$link->name}}">
                            </div>
                            <div class="flex-grow-1 ms-3">
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
