@extends('layouts.default')

@section('title', 'Admin Panel')

@section('content')
    <h1>Admin Panel</h1>
    <ol class="breadcrumb">
        <li class="breadcrumb-item active">Admin Panel</li>
    </ol>
    <section>
        @can('super-admin')
            <h2>Super admin options</h2>
            <a href="{{ url('admin/deployment') }}">Deploy updates</a>
        @endcan
    </section>
@endsection
