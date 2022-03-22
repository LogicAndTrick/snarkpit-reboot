@extends('layouts.default')

@section('content')
    <h1>User login</h1>
    <section>
        <form method="POST" action="{{ route('login') }}" class="d-flex flex-column align-items-center">
            @csrf
            <p>To continue, please login using the form below.</p>
            <x-text style="width: 12rem;" type="text" label="Username/Email:" name="name" required />
            <x-text style="width: 12rem;" type="password" label="Password:" name="password" required autocomplete="current-password" />
            <x-checkbox label="Remember me" name="remember" checked />
            <button type="submit">Log in</button>

            <small class="mt-4">
                (Forgotten your password? Click <a href="{{ route('password.request') }}">here</a>)
            </small>
        </form>
    </section>
@endsection
