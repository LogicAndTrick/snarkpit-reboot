@section('title', 'Sent messages')
@extends('layouts.default')

@section('content')
    <h1>
        <span class="fa fa-message"></span>
        Sent messages: {{$user->name}}
    </h1>

    <div class="header-container">
        {!! $messages->render() !!}
    </div>

    <section>
        <div class="text-center mb-3">
            <a class="mx-3" href="{{ url('message/index', [ $user->id ]) }}">
                <span class="fas fa-inbox"></span>
                Inbox
            </a>
            &bull;
            <strong class="mx-3">
                <span class="fas fa-share"></span>
                Outbox
            </strong>
            &bull;
            <a class="mx-3" href="{{ url('message/send') }}">
                <span class="fas fa-paper-plane"></span>
                New message
            </a>
        </div>

        <table class="table table-bordered">
            <thead>
            <tr>
                <th>Title</th>
                <th>To</th>
                <th>Sent</th>
            </tr>
            </thead>
            <tbody>
            @foreach ($messages as $message)
                <tr class="{{ $message->is_read ? '' : 'table-primary' }}">
                    <td>
                        @if (!$message->is_read)
                            <span class="fas fa-circle-exclamation"></span>
                        @endif
                        <a href="{{ url('message/view', [ $message->id ]) }}">{{$message->title}}</a>
                    </td>
                    <td><a href="{{ url('user/view', [ $message->to_user->id ]) }}">{{ $message->to_user->name }}</a></td>
                    <td><x-date :date="$message->created_at" format="full" /></td>
                </tr>
            @endforeach
            </tbody>
        </table>
    </section>

    <div class="footer-container">
        {!! $messages->render() !!}
    </div>
@endsection
