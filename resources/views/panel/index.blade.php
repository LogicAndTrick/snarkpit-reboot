@section('title', 'Control panel: '. $user->name)
@extends('layouts.default')

@section('content')
    <h1>
        <span class="fa fa-cogs"></span>
        Control panel: {{ $user->name }}
    </h1>

    <nav class="nav-header">
        <ol class="breadcrumb">
            <li class="breadcrumb-item active">Control panel</li>
        </ol>
    </nav>

    <div class="row g-1">
        <div class="col-md-6">
            <h1>Links</h1>
            <section>
                <ul class="list-unstyled">
                    <li><a href="{{ url('user/view/'.$user->id) }}"><span class="fa fa-user"></span> View Profile</a></li>
                    <li><a href="{{ url('map/index').'?user='.$user->id }}"><span class="fa fa-map"></span> View Maps</a></li>
                    <li><a href="{{ url('article/index').'?user='.$user->id }}"><span class="fa fa-file-lines"></span> View Articles</a></li>
                    <li><a href="{{ url('download/index').'?user='.$user->id }}"><span class="fa fa-download"></span> View Downloads</a></li>
                    <li><a href="{{ url('journal/index').'?user='.$user->id }}"><span class="fa fa-book"></span> View Journals</a></li>
                    <li><a href="{{ url('thread/index').'?user='.$user->id }}"><span class="fa fa-list-alt"></span> View Forum Threads</a></li>
                    <li><a href="{{ url('post/index').'?user='.$user->id }}"><span class="fa fa-list"></span> View Forum Posts</a></li>
                    <li><a href="{{ url('message/index/'.$user->id) }}"><span class="fa fa-envelope"></span> View Private Messages</a></li>
                    <li><a href="{{ url('panel/notifications/'.$user->id) }}"><span class="fa fa-bell"></span> Notifications and Subscriptions</a></li>
                </ul>
            </section>
        </div>
        <div class="col-md-6">
            <h1>Actions</h1>
            <section>
                <ul class="list-unstyled">
                    <li><a href="{{ url('panel/edit-profile', [$user->id]) }}"><span class="fa fa-pencil"></span> Edit Profile</a></li>
                    <li><a href="{{ url('panel/edit-avatar', [$user->id]) }}"><span class="fa fa-image"></span> Change Avatar</a></li>
                    <li><a href="{{ url('panel/edit-email', [$user->id]) }}"><span class="fa fa-at"></span> Update Email</a></li>
                    <li><a href="{{ url('panel/edit-password', [$user->id]) }}"><span class="fa fa-lock"></span> Update Password</a></li>
                </ul>
                @can ('admin')
                    <hr />
                    <strong class="d-block text-center">Admin Actions</strong>
                    <ul class="list-unstyled">
                        <li><a href="{{ url('panel/edit-name', [$user->id]) }}"><span class="fa fa-user"></span> Change User's Name</a></li>
                        <li><a href="{{ url('panel/edit-permissions', [$user->id]) }}"><span class="fa fa-key"></span> Manage User's Permissions</a></li>
                        <li><a href="{{ url('panel/edit-bans', [$user->id]) }}"><span class="fa fa-ban"></span> Manage User's Bans</a></li>
                        @if ($user->id != Auth::id())
                            <li><a class="text-danger" href="{{ url('panel/remove', [$user->id]) }}"><span class="fa fa-user-times"></span> Delete User Account</a></li>
                            <li><a class="text-danger" href="{{ url('panel/obliterate', [$user->id]) }}"><span class="fa fa-trash"></span> Obliterate User</a></li>
                        @endif
                    </ul>
                @endcan
            </section>
        </div>
    </div>
@endsection
