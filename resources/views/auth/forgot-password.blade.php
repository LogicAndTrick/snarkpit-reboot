@extends('layouts.default')
@section('content')

    <div class="mb-4 text-sm text-gray-600">
        {{ __('Forgot your password? No problem. Just let us know your email address and we will email you a password reset link that will allow you to choose a new one.') }}
    </div>

    <form method="POST" action="{{ route('password.email') }}">
        @csrf
        <x-text type="email" label="Email" name="email" required />

        <button>
            {{ __('Email Password Reset Link') }}
        </button>
    </form>
@endsection
