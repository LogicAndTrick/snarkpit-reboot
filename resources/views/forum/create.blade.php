@section('title', 'Create forum post')

@extends('layouts.default')

@section('content')
    <h1>Create forum</h1>

    <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="{{ url('forum/index') }}">Forums</a></li>
        <li class="breadcrumb-item active">Create Forum</li>
    </ol>

    <section>
        <form method="POST" action="{{ url('forum/create') }}">
            @csrf
            <x-text name="name" label="Name:" />
            <x-text name="description" label="Description:" />
            <x-text name="order_index" label="Order:" type="number" />
            <button type="submit">Create</button>
        </form>
    </section>
@endsection
