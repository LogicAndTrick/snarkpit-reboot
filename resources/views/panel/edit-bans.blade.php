@section('title', 'Manage bans: '. $user->name)
@extends('layouts.default')

@section('content')
    <h1>
        <span class="fa fa-ban"></span>
        Manage bans: {{ $user->name }}
    </h1>

    <nav class="nav-header">
        <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="{{ url('panel/index', [ $user->id ]) }}">Control panel</a></li>
            <li class="breadcrumb-item active">Manage bans</li>
        </ol>
    </nav>

    <h1>Ban History</h1>
    <section>
        <table class="table">
            <tr>
                <th>Status</th>
                <th>Reason</th>
                <th>IP</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th></th>
            </tr>
            @foreach ($bans as $ban)
                <tr>
                    <td>{{ $ban->isActive() ? 'Active Ban' : 'Expired Ban' }}</td>
                    <td>{{ $ban->reason }}</td>
                    <td>{{ $ban->ip }}</td>
                    <td><x-date :date="$ban->created_at" /></td>
                    <td><x-date :date="$ban->ends_at" /></td>
                    <td>
                        <form action="{{ url('panel/delete-ban') }}" method="post">
                            @csrf
                            <x-hidden name="id" :value="$ban->id" />
                            <button class="btn btn-danger btn-xs" type="submit">
                                <span class="fa fa-remove"></span>
                                Delete
                            </button>
                        </form>
                    </td>
                </tr>
            @endforeach
        </table>
    </section>

    <h1>Ban This User</h1>
    <section>
        <div class="alert alert-danger">
            <strong>Careful!</strong>
            This is an administration action.
            Banning people shouldn't be done without good reason. Make sure the reason
            clearly explains why the user was banned.
        </div>
        <form action="{{ url('panel/add-ban') }}" method="post">
            @csrf
            <x-hidden name="id" :value="$user->id" />
            <x-text type="text" name="reason" label="Ban reason:" />
            <x-text type="number" min="1" step="1" name="duration" label="Number of units:" />
            <div class="form-group">
                <label for="unit">Unit</label>
                <select class="form-control" id="unit" name="unit">
                    <option value="1">Hour</option>
                    <option value="24" selected>Day</option>
                    <option value="{{ 24 * 7 }}">Week</option>
                    <option value="{{ 24 * 30 }}">Month</option>
                    <option value="{{ 24 * 365 }}">Year</option>
                    <option value="-1">Forever</option>
                </select>
            </div>
            <x-checkbox name="ip_ban" label="Also ban by IP address (prevent anonymous log in)" />
            <button type="submit">Ban {{$user->name}}</button>
        </form>
    </section>
@endsection
