@section('title', 'Update email: '. $user->name)
@extends('layouts.default')

@section('content')
    <h1>
        <span class="fa fa-cogs"></span>
        Update email: {{ $user->name }}
    </h1>

    <nav class="nav-header">
        <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="{{ url('panel/index', [ $user->id ]) }}">Control panel</a></li>
            <li class="breadcrumb-item active">Update email</li>
        </ol>
    </nav>

    <form action="{{ url('panel/edit-email') }}" method="post">
        @csrf
        <x-hidden name="id" :value="$user->id" />
        <section>
            <div class="text-danger">
                This email is what The Snarkpit will use to communicate with you, including password resets.
                Be very careful that it's valid! If it's not, your account may not be recoverable.
            </div>
            <x-text type="email" name="email" label="Email address:" :value="$user->email" />
            <x-checkbox name="show_email" label="Show my email address on my public profile" :checked="$user->show_email" />
            <button type="submit">Save email</button>
        </section>
    </form>
@endsection
