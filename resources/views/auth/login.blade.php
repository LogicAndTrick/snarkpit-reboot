@extends('layouts.default')
@section('title', 'Login')
@section('content')
    <h1>User login</h1>
    <section>
        <div class="row">
            <div class="col-md-4 offset-md-4">
            <form method="POST" action="{{ route('login') }}" class="d-flex flex-column align-items-center">
                @csrf
                <p>To continue, please login using the form below.</p>
                <x-text type="text" label="Username/Email:" name="email" required />
                <x-text type="password" label="Password:" name="password" required autocomplete="current-password" />
                <x-checkbox label="Remember me" name="remember" checked />
                <button type="submit">Log in</button>

                <small class="mt-4">
                    (Forgotten your password? Click <a href="{{ route('password.request') }}">here</a>)
                </small>
            </form>
            </div>
        </div>
    </section>
@endsection
