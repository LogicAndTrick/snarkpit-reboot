@section('title', 'Obliterate user: '. $user->name)
@extends('layouts.default')

@section('content')
    <h1>Obliterate user: {{$user->name}}</h1>

    <nav class="nav-header">
        <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="{{ url('panel/index', [ $user->id ]) }}">Control panel</a></li>
            <li class="breadcrumb-item active">Obliterate</li>
        </ol>
    </nav>

    <div class="card card-body text-danger">
        <h2 class="text-danger">Obliteration cannot be reversed!</h2>
        <p>
            Obliterating users should be reserved exclusively for spammers!
            It will delete all content that the user has ever posted,
            and will permanently ban the user's IP address.
            This is an extreme option and should not be taken lightly.
        </p>
        <p>
            This is an administration action.
        </p>
    </div>

    <section>
        <h2>Please confirm the obliteration of {{$user->name}}</h2>
        <form action="{{ url('panel/obliterate') }}" method="post">
            @csrf
            <x-hidden name="id" :value="$user->id" />
            <x-checkbox name="sure" label="I want to obliterate this user, which will delete all their data and ban them." />
            <x-checkbox name="sure_confirmation" label="Double check: I'm definitely sure that I want to obliterate this user!" />
            <button type="submit" class="bg-danger text-light">Obliterate User - THIS ACTION CANNOT BE REVERSED!</button>
        </form>
    </section>
@endsection
