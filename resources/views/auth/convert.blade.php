@extends('layouts.default')
@section('title', 'First time login')

@section('content')
    <h1>Welcome to Snarkpit v7!</h1>
    <section>
        <div class="row">
            <div class="col-md-4 offset-md-4">

                <div class="alert alert-info">
                    <p>
                        Welcome back to The Snarkpit! Please take a moment to confirm your details.
                        <strong>For security reasons, your password must be reset to use the site,</strong>
                        but you can use the same password if you want to.
                    </p>
                </div>

                <form method="POST" action="{{ route('convert') }}">
                    @csrf
                    <p class="text-info">
                        We will send a link to your email address for verification before you can use the site.
                        Please make sure it's correct!
                    </p>
                    <x-text type="email" label="Email address:" name="email" required />
                    <x-text type="password" label="Current Password:" name="old_password" required />
                    <x-text type="password" label="New Password:" name="password" required autocomplete="new-password" />
                    <x-text type="password" label="Confirm New Password:" name="password_confirmation" required />
                    <button type="submit">Continue</button>
                </form>
            </div>
        </div>
    </section>
@endsection
