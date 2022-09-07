@section('title', 'Update username: '. $user->name)
@extends('layouts.default')

@section('content')
    <h1>
        <span class="fa fa-cogs"></span>
        Update access level: {{ $user->name }}
    </h1>

    <nav class="nav-header">
        <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="{{ url('panel/index', [ $user->id ]) }}">Control panel</a></li>
            <li class="breadcrumb-item active">Update access level</li>
        </ol>
    </nav>

<?php
    use \App\Models\User;

    $levels = [
        (object) [ 'id' => User::LEVEL_MEMBER, 'name' => 'member'],
        (object) [ 'id' => User::LEVEL_MODERATOR, 'name' => 'moderator'],
        (object) [ 'id' => User::LEVEL_ADMIN, 'name' => 'admin'],
        (object) [ 'id' => User::LEVEL_SUPER_ADMIN, 'name' => 'super admin'],
    ];
?>

    <form action="{{ url('panel/edit-level') }}" method="post">
        @csrf
        <x-hidden name="id" :value="$user->id" />
        <section>
            <div class="text-danger">
                <strong>Careful!</strong>
                This is an administration action.
            </div>
            <x-select name="new_level" label="Access level:" :items="$levels" :value="$user->level" required />
            <button type="submit">Update access level for {{$user->name}}</button>
        </section>
    </form>
@endsection
