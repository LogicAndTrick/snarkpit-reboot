@extends('layouts.default')

@section('content')

    <form method="POST" action="{{ route('password.update') }}">
        @csrf

        <input type="hidden" name="token" value="{{ $request->route('token') }}">
        <x-text type="email" label="Email" name="email" required />
        <x-text type="password" label="Password" name="password" required autocomplete="new-password" />
        <x-text type="password" label="Confirm Password" name="password_confirmation" required />

        <div class="flex items-center justify-end mt-4">
            <button>
                {{ __('Reset Password') }}
            </button>
        </div>
    </form>
@endsection
