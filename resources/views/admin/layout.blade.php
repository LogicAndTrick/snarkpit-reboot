@extends('layouts.default')

@section('title', 'Admin Panel')

<?php $admin_page_name = \Illuminate\Support\Facades\View::yieldContent('admin-page', ''); ?>

@section('content')
    <h1>Admin Panel</h1>
    <ol class="breadcrumb">
        @if($admin_page_name)
            <li class="breadcrumb-item"><a href="{{ url('admin') }}">Admin Panel</a></li>
            <li class="breadcrumb-item active">{{$admin_page_name}}</li>
        @else
            <li class="breadcrumb-item active">Admin Panel</li>
        @endif
    </ol>
    <div class="row gx-1">
        <div class="col-md-2">
            <section>
                @can('admin')
                    <strong>Admin sections</strong>
                    <ul>
                        <li><a href="{{ url('admin/users') }}">Users/bans</a></li>
                        <li><a href="{{ url('admin/spotlight') }}">Spotlight</a></li>
                        <li><a href="{{ url('admin/games') }}">Games</a></li>
                        <li><a href="{{ url('admin/article-categories') }}">Article categories</a></li>
                        <li><a href="{{ url('admin/download-categories') }}">Download categories</a></li>
                        <li><a href="{{ url('admin/pages') }}">Static pages</a></li>
                    </ul>
                @endcan
                {{--        @can('super-admin')--}}
                {{--            <strong>Super admin</h2>--}}
                {{--        @endcan--}}
            </section>
        </div>
        <div class="col-md-10">
            @yield('admin-content')
        </div>
    </div>
@endsection
