@props(['user', 'details' => true, 'link' => true])

<?php
    $level_name = 'member';
    $level_class = '';
    switch ($user->level) {
        case \App\Models\User::LEVEL_SUPER_ADMIN:
            $level_class = 'text-danger';
            $level_name = 'super admin';
            break;
        case \App\Models\User::LEVEL_ADMIN:
            $level_class = 'text-danger';
            $level_name = 'admin';
            break;
        case \App\Models\User::LEVEL_MODERATOR:
            $level_class = 'text-warning';
            $level_name = 'moderator';
            break;
        case -1:
            $level_class = 'text-secondary';
            $level_name = 'super banned';
            break;
    }
?>
<div {!! $attributes->merge(['class' => 'user-avatar-details']) !!}>
    <div class="text-center">
        @if ($link)
            <a href="{{ url('user/view', [ $user->id ]) }}">
        @endif
        @if($user->avatar_custom)
            <img src="{{ asset('uploads/avatars/'.$user->avatar_file) }}" />
        @elseif($user->avatar_file)
            <img src="{{ asset('images/avatars/'.$user->avatar_file) }}" />
        @endif
        @if ($link)
            {{ $user->name }}
            </a>
        @endif
        @if ($user->title_custom)
            <div>{{ $user->title_text }}</div>
        @endif
        <div class="mb-1 {{ $level_class }}">{{ $level_name }}</div>
    </div>
    @if ($details)
        <span>{{$user->stat_forum_posts}} post{{ $user->stat_forum_posts === 1 ? '' : 's' }}</span>
        <span><span class="text-success">{{ $user->stat_snarks }}</span> snarkmarks</span>
        <span><span class="text-muted">Registered:</span> <x-date :date="$user->created_at" format="short-date" /></span>
        @if ($user->info_occupation)
            <span><span class="text-muted">Occupation:</span> {{$user->info_occupation}}</span>
        @endif
        @if ($user->info_location)
            <span><span class="text-muted">Location:</span> {{$user->info_location}}</span>
        @endif
    @endif
</div>
