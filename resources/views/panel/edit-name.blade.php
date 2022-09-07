@section('title', 'Update username: '. $user->name)
@extends('layouts.default')

@section('content')
    <h1>
        <span class="fa fa-cogs"></span>
        Update username: {{ $user->name }}
    </h1>

    <nav class="nav-header">
        <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="{{ url('panel/index', [ $user->id ]) }}">Control panel</a></li>
            <li class="breadcrumb-item active">Update username</li>
        </ol>
    </nav>

    <form action="{{ url('panel/edit-name') }}" method="post">
        @csrf
        <x-hidden name="id" :value="$user->id" />
        <section>
            <div class="text-danger">
                <strong>Careful!</strong>
                This is an administration action. Try not to change people's names too often. It's annoying.
            </div>
            <div class="form-group">
                <strong>Current Username</strong><br>
                {{ $user->name }}
            </div>
            <x-text type="text" name="new_name" label="New username:" :value="$user->name" />
            <button type="submit">Update username</button>
        </section>
    </form>
@endsection
