@section('title', 'Notifications and subscriptions: '. $user->name)
@extends('layouts.default')

@section('content')
    <h1>
        <span class="fa fa-bell"></span>
        Notifications and subscriptions: {{ $user->name }}
    </h1>

    <nav class="nav-header">
        <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="{{ url('panel/index', [$user->id]) }}">Control Panel</a></li>
            <li class="breadcrumb-item active">Notifications and subscriptions</li>
        </ol>
    </nav>

    <h1>
        <span class="fa fa-bell"></span> Notifications
        @if (Auth::id() == $user->id)
            <a href="{{ url('panel/clear-notifications') }}" class="btn btn-xs btn-outline-primary">
                <span class="fa fa-check"></span> Mark all as read
            </a>
        @endif
    </h1>
    <section>
        <table class="table">
            <thead>
                <tr>
                    <th class="col-30p">Type</th>
                    <th>Article</th>
                    <th class="col-30p">Time</th>
                </tr>
            </thead>
            <tbody>
                @foreach($notifications as $notify)
                    <tr class="{{ $notify->is_unread ? 'unread' : '' }}">
                        <td class="col-30p">
                            @if ($notify->is_unread)
                                <span class="badge badge-success">{{ $notify->stat_hits }}</span>
                            @endif
                            {{ $notify->type_description }}
                        </td>
                        <td><a href="{{ $notify->link }}">{{ $notify->title && strlen($notify->title) > 0 ? $notify->title : '[No title]' }}</a></td>
                        <td>{{ $notify->created_at->format('Y-m-d H:i:s') }}Z ({{ $notify->created_at->diffForHumans() }})</td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    </section>

    <h1>
        <span class="fa fa-bell-o"></span> Subscriptions
    </h1>
    <section>
        <table class="table">
            <thead>
                <tr>
                    <th class="col-30p">Type</th>
                    <th>Item</th>
                    <th class="col-15p">Send Email?</th>
                    <th class="col-15p"></th>
                </tr>
            </thead>
            <tbody>
                @foreach($subscriptions as $subscription)
                    <tr>
                        <td class="col-30p">{{ $subscription->type_description }}</td>
                        <td><a href="{{ $subscription->link }}">{{ $subscription->title && strlen($subscription->title) > 0 ? $subscription->title : '[No title]' }}</a></td>
                        <td class="col-15p">{{ $subscription->send_email ? 'Yes' : 'No' }}</td>
                        <td class="text-right col-15p">
                            <a href="{{ url('panel/delete-subscription', [$subscription->id]) }}" class="btn btn-xs btn-outline-danger"><span class="fa fa-remove"></span> Unsubscribe</a>
                        </td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    </section>
@endsection
