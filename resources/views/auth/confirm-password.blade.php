@extends('layouts.default')
@section('title', 'Confirm password')
@section('content')
    <div>
        {{ __('This is a secure area of the application. Please confirm your password before continuing.') }}
    </div>

    <form method="POST" action="{{ route('password.confirm') }}">
        @csrf

        <x-text type="password" label="Password" name="password" required autocomplete="current-password" />

        <button>
            {{ __('Confirm') }}
        </button>
    </form>
@endsection
