@extends('layouts.default')
@section('title', 'Account activation')

@section('content')
    <h1>Account activation</h1>
    <section>
        <div class="row">
            <div class="col-md-4 offset-4">
                <p>Your account has not yet been activated!</p>
                <p>You must activate your account before you can log in. To do so, use the activation link in your account confirmation email.</p>
                <p>If you did not receive such an email, use the "retrieve password" link on the login page to receive a new activation code.</p>

                <form method="POST" action="{{ route('verification.send') }}" class="text-center">
                    @csrf
                    <button type="submit">Resend Verification Email</button>

                    @if (session('status') == 'verification-link-sent')
                        <p class="text-success">A new verification link has been sent to your email address.</p>
                    @endif
                </form>

                <form method="POST" action="{{ route('logout') }}" class="text-center">
                    @csrf
                    <button type="submit">Log Out</button>
                </form>

                <p>If you continue to experience difficulties, please <a href="#">contact</a> a site admin for further assistance.</p>
            </div>
        </div>
    </section>
@endsection
