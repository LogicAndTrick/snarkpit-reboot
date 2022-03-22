@extends('layouts.default')

@section('content')
    <h1>User account registration</h1>
    <section>
        <form method="POST" action="{{ route('register') }}" class="d-flex flex-column align-items-center">
            @csrf
            <p>To register an account, please enter your details using the form below.</p>
            <x-text type="text" label="Username:" name="name" required />
            <x-text type="password" label="Password:" name="password" required autocomplete="new-password" />
            <x-text type="password" label="Confirm password" name="password_confirmation" required />
            <x-text type="email" label="Email address:" name="email" required />
            <x-text type="email" label="Confirm email address:" name="email_confirmation" required />
            TODO: security code/captcha
            <button type="submit">Register</button>
        </form>
    </section>
@endsection
