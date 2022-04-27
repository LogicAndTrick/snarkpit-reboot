@props(['user'])

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
        <a href="#">
            @if($user->avatar_custom)
                <img src="{{ asset('uploads/avatars/'.$user->avatar_file) }}" />
            @endif
            {{ $user->name }}
        </a>
        @if ($user->title_custom)
            <div>{{ $user->title_text }}</div>
        @endif
        <div class="{{ $level_class }}">{{ $level_name }}</div>
    </div>
    <span>{{$user->stat_forum_posts}} post{{ $user->stat_forum_posts === 1 ? '' : 's' }}</span>
    <span><span class="text-success">{{ $user->stat_snarks }}</span> snarkmarks</span>
    <span><span class="text-muted">Registered:</span> {{$user->created_at->format('M jS Y')}}</span>
    @if ($user->info_occupation)
        <span><span class="text-muted">Occupation:</span> {{$user->info_occupation}}</span>
    @endif
    @if ($user->info_location)
        <span><span class="text-muted">Location:</span> {{$user->info_location}}</span>
    @endif
</div>
