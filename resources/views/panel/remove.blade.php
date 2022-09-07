@section('title', 'Delete user: '. $user->name)
@extends('layouts.default')

@section('content')
    <h1>Delete user: {{$user->name}}</h1>

    <nav class="nav-header">
        <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="{{ url('panel/index', [ $user->id ]) }}">Control panel</a></li>
            <li class="breadcrumb-item active">Delete</li>
        </ol>
    </nav>

    <div class="card card-body text-danger">
        <h2 class="text-danger">This action cannot be reversed!</h2>
        <p>
            Deleting an account should only be done when the owner of the account
            has requested it. Before continuing with this, you should check
            the user's content to make sure nothing key to the site is lost.
        </p>
        <p>
            This action is different to obliteration - it will not ban the user
            or their IP address. They are free to create a new account. Some content
            from this user will remain, such as wiki edits. The account will not be
            deleted entirely, but will be anonymised and the majority of data will be
            deleted.
        </p>
        <p>
            This is an administration action.
        </p>
    </div>

    <section>
        <h2>Please confirm the deletion of {{$user->name}}</h2>
        <form action="{{ url('panel/remove') }}" method="post">
            @csrf
            <x-hidden name="id" :value="$user->id" />
            <x-checkbox name="sure" label="I want to delete this user, which will delete all their data." />
            <x-checkbox name="sure_confirmation" label="Double check: I'm definitely sure that I want to delete this user!" />
            <button type="submit">Delete User - THIS ACTION CANNOT BE REVERSED!</button>
        </form>
    </section>
@endsection
