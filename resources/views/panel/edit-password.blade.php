@section('title', 'Change password: '. $user->name)
@extends('layouts.default')

@section('content')
    <h1>
        <span class="fa fa-cogs"></span>
        Change password: {{ $user->name }}
    </h1>

    <nav class="nav-header">
        <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="{{ url('panel/index', [ $user->id ]) }}">Control panel</a></li>
            <li class="breadcrumb-item active">Change password</li>
        </ol>
    </nav>

    <form action="{{ url('panel/edit-password') }}" method="post">
        @csrf
        <x-hidden name="id" :value="$user->id" />
        <section>
            @if ($need_original)
                <x-text type="password" label="Current Password:" name="old_password" required />
            @endif

            <x-text type="password" label="New Password:" name="password" required autocomplete="new-password" />
            <x-text type="password" label="Confirm New Password:" name="password_confirmation" required />
            <button type="submit">Change password</button>
        </section>
    </form>
@endsection
