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
                        @can('super-admin')
                            <li><a href="{{ url('panel/edit-level', [$user->id]) }}"><span class="fa fa-key"></span> Change User's Access Level</a></li>
                        @endcan
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

<?php
    use Illuminate\Support\Facades\Gate;
    $split = [];
    $attribs = [
        'Registered' => $user->created_at->format('M jS Y'),
        'Email' => $user->show_email || Gate::allows('admin') ? $user->email : false,
        'Website' => $user->info_website,
        'Last seen' => $user->last_access_time ? $user->last_access_time->format('M jS Y') : false,
        'Location' => $user->info_location,
        'Occupation' => $user->info_occupation,
        'Interests' => $user->info_interests,
        'Languages' => $user->info_languages,
        'Steam profile' => $user->info_steam_profile,
        'Birthday' => $user->info_birthday_formatted,
        'split1' => Gate::allows('admin') ? $split : false,
        'Last IP' => Gate::allows('admin') ? $user->last_access_ip : false,
        'Last page' => Gate::allows('admin') ? $user->last_access_page : false,
        'split2' => $split,
        'Logins' => $user->stat_logins,
        'Snarkmarks' => $user->stat_snarks,
        'Forum posts' => $user->stat_forum_posts,
        'Profile views' => $user->stat_profile_hits,
        'Maps' => $user->stat_maps,
        'Journals' => $user->stat_journals,
        'Comments' => $user->stat_comments,
    ];
?>
    <h1>Profile: {{ $user->name }}</h1>
    <div class="row g-1">
        <div class="col-md-6">
            <section>
                <x-user-avatar-details :user="$user" :name="false" :details="false" :link="false" />
                <dl class="row">
                    @foreach($attribs as $label => $value)
                        @if ($value === $split)
                </dl>
                <dl class="row">
                    @elseif ($value)
                        <dt class="col-sm-3 text-sm-end">{{$label}}:</dt>
                        <dd class="col-sm-9">
                            @switch($label)
                                @case('Website')
                                    <a href="{{$value}}">{{$value}}</a>
                                    @break
                                @case('Email')
                                    <a href="mailto:{{$value}}">{{$value}}</a>
                                    @break
                                @case('Snarkmarks')
                                    <span class="text-success">{{$value}}</span>
                                    @break
                                @case('Steam profile')
                                    @if (is_numeric($value))
                                        <a target="_blank" href="http://steamcommunity.com/profiles/{{$value}}">{{$value}}</a>
                                    @else
                                        <a target="_blank" href="https://steamcommunity.com/id/{{$value}}">{{$value}}</a>
                                    @endif
                                    @break
                                @default
                                    {{$value}}
                                    @break
                            @endswitch
                        </dd>
                    @endif
                    @endforeach
                </dl>
            </section>
        </div>
        <div class="col-md-6">
            @if ($user->info_biography_html || $user->info_signature_html)
                <section>
                    @if ($user->info_biography_html)
                        <div class="bbcode">{!! $user->info_biography_html !!}</div>
                    @endif
                    @if ($user->info_biography_html)
                        @if ($user->info_biography_html)
                            <hr />
                        @endif
                        <div class="bbcode">{!! $user->info_signature_html !!}</div>
                    @endif
                </section>
            @endif
        </div>
    </div>

@endsection
