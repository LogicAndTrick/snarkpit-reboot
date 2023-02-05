@section('title', 'Manage snarks: '. $user->name)
@extends('layouts.default')

@section('content')
    <h1>
        <span class="fa fa-snark"></span>
        Manage bonus snarkmarks: {{ $user->name }}
    </h1>

    <nav class="nav-header">
        <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="{{ url('panel/index', [ $user->id ]) }}">Control panel</a></li>
            <li class="breadcrumb-item active">Manage bonus snarkmarks</li>
        </ol>
    </nav>

    <h1>Bonus snarkmarks</h1>
    <section>
        <table class="table">
            <tr>
                <th>Snarkmarks</th>
                <th>Description</th>
                <th>Added by</th>
                <th>Added</th>
                <th></th>
            </tr>
            @foreach ($snarks as $snark)
                <tr>
                    <td>{{ $snark->snarkmarks }}</td>
                    <td>{{ $snark->description }}</td>
                    <td>{{ $snark->added_user->name }}</td>
                    <td><x-date :date="$snark->created_at" format="nice" /></td>
                    <td>
                        <form action="{{ url('panel/delete-snark') }}" method="post">
                            @csrf
                            <x-hidden name="id" :value="$snark->id" />
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

    <h1>Give bonus snarkmarks</h1>
    <section>
        <form action="{{ url('panel/add-snark') }}" method="post">
            @csrf
            <x-hidden name="id" :value="$user->id" />
            <x-text type="number" step="1" name="snarkmarks" label="Number of snarkmarks (can be negative):" />
            <x-text type="text" name="description" label="Description:" />
            <button type="submit">Add bonus snarkmarks</button>
        </form>
    </section>
@endsection
