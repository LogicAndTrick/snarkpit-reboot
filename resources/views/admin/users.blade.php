@extends('admin.layout')

@section('title', 'User management')
@section('admin-page', 'User management')

@section('admin-content')
    <section>
        <h4>Elevated users</h4>
        <table class="table table-bordered table-sm">
            <tr>
                <th>Username</th>
                <th>Access level</th>
            </tr>
            @foreach($mods as $mod)
                <tr>
                    <td><a href="{{ url('panel/index', [$mod->id]) }}">{{ $mod->name }}</a></td>
                    <td>
                        {{$mod->level}}:
                        @switch($mod->level)
                            @case(\App\Models\User::LEVEL_MODERATOR)
                                <span class="text-warning">Moderator</span>
                                @break
                            @case(\App\Models\User::LEVEL_ADMIN)
                                <span class="text-danger">Admin</span>
                                @break
                            @case(\App\Models\User::LEVEL_SUPER_ADMIN)
                                <span class="text-danger">Super admin</span>
                                @break
                            @default
                                Unknown
                                @break
                        @endswitch
                    </td>
                </tr>
            @endforeach
        </table>
        <h4>Current bans</h4>
        <table class="table table-bordered table-sm">
            <tr>
                <th>Username</th>
                <th>Reason</th>
                <th>IP</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th></th>
            </tr>
            @foreach($bans as $ban)
                <tr>
                    <td>
                        @if($ban->user)
                            <a href="{{ url('panel/edit-bans', [$ban->user->id]) }}">{{ $ban->user->name }}</a>
                        @else
                            &mdash;
                        @endif
                    </td>
                    <td>{{$ban->reason}}</td>
                    <td>{{ $ban->ip }}</td>
                    <td>{{ $ban->created_at->format('Y-m-d H:i:s') }}Z ({{ $ban->created_at->diffForHumans() }})</td>
                    <td>{{ !$ban->ends_at ? 'Never' : $ban->ends_at->format('Y-m-d H:i:s') . 'Z (' . $ban->ends_at->diffForHumans() . ')' }}</td>
                    <td>
                        <form action="{{ url('admin/delete-ban') }}" method="post">
                            @csrf
                            <x-hidden name="id" :value="$ban->id" />
                            <button class="btn btn-danger btn-xs m-auto" type="submit">
                                <span class="fa fa-remove"></span>
                                Delete
                            </button>
                        </form>
                    </td>
                </tr>
            @endforeach
        </table>
        <h4>Add IP Ban</h4>
        <form action="{{ url('admin/create-ban') }}" method="post">
            @csrf
            <x-text type="text" name="ip" label="IPv4 Address:"></x-text>
            <x-text type="text" name="reason" label="Ban reason:"></x-text>
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
            <button type="submit">Ban this IP</button>
        </form>
    </section>
@endsection
