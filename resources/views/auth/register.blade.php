@extends('layouts.default')
@section('title', 'Register account')
@section('scripts')
    {!! ReCaptcha::htmlScriptTagJsApi() !!}
@endsection

@section('content')
    <h1>User account registration</h1>
    <section>
        <div class="row">
            <div class="col-md-4 offset-md-4">
                <form method="POST" action="{{ route('register') }}">
                    @csrf
                    <p>To register an account, please enter your details using the form below.</p>
                    <x-text type="text" label="Username:" name="name" required />
                    <x-text type="password" label="Password:" name="password" required autocomplete="new-password" />
                    <x-text type="password" label="Confirm password" name="password_confirmation" required />
                    <p class="text-info mt-3">
                        We will send a link to your email address for verification before you can use the site.
                        Please make sure it's correct!
                    </p>
                    <x-text type="email" label="Email address:" name="email" required />
                    <x-text type="email" label="Confirm email address:" name="email_confirmation" required />

                    <div class="d-flex justify-content-center my-3">
                        {!! ReCaptcha::htmlFormSnippet() !!}
                    </div>
                    @error('g-recaptcha-response')
                        <p class="help-block text-danger">Please check the box to prove that you're not a robot.</p>
                    @enderror
                    <button type="submit">Register</button>
                </form>
            </div>
        </div>
    </section>
@endsection
