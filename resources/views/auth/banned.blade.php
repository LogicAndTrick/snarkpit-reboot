@section('title', 'Banned')
@extends('layouts.default')

@section('content')
    <h1>
        <span class="fa fa-ban"></span>
        You have been banned
    </h1>
    <section>
        <p>
            You have been banned from The Snarkpit.
            @if ($ban->reason)
                <br/>
                Reason: <strong>{{ $ban->reason }}</strong>
            @endif
            @if ($ban->ends_at)
                <br/>
                You will remain banned until:
                <strong>
                    <x-date :date="$ban->ends_at" format="raw" zone="utc" />
                    (<x-date :date="$ban->ends_at" />)
                </strong>
            @endif
        </p>
        <form action="{{ url('account/logout') }}" method="post">
            @csrf
            <button type="submit" class="btn btn-lg btn-primary">
                Log Out
            </button>
        </form>
    </section>
@endsection
