@section('title', 'Update profile: '. $user->name)
@extends('layouts.default')

@section('content')
    <h1>
        <span class="fa fa-cogs"></span>
        Update profile: {{ $user->name }}
    </h1>

    <nav class="nav-header">
        <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="{{ url('panel/index', [ $user->id ]) }}">Control panel</a></li>
            <li class="breadcrumb-item active">Update profile</li>
        </ol>
    </nav>

<?php
use Carbon\Carbon;

$zones = [];
$now = new Carbon(null, 'UTC');
for ($i = -12; $i <= 12; $i++) {
    $offset = $now->copy()->addHours($i);
    $zones[] = (object) [
        'id' => $i,
        'name' => 'UTC'.($i >= 0 ? '+' : '').$i.' - '.$offset->format('H:i')
    ];
}
?>

    <form action="{{ url('panel/edit-profile') }}" method="post">
        @csrf
        <x-hidden name="id" :value="$user->id" />
        <h1>Preferences</h1>
        <section>
            <x-checkbox name="show_email" label="Show my email address on my public profile" :checked="$user->show_email" />
            <x-checkbox name="show_signature" label="Show my signature on forum posts by default" :checked="$user->show_signature" />
            <x-checkbox name="subscribe_topics" label="Send me emails for replies to subscribed forum topics" :checked="$user->subscribe_topics" />
            <x-checkbox name="notify_messages" label="Send me emails for private messages" :checked="$user->notify_messages" />
            <x-select name="timezone" label="Time zone:" :items="$zones" :value="$user->timezone" required />
            <div class="form-text">
                If you're not sure what time zone you live in, <a href="https://www.timeanddate.com/time/map/" target="_blank" rel="noopener noreferrer"><strong>use this map</strong></a> to find out.
                Snarkpit doesn't support daylight savings time, so you should change your time zone manually if you want it to change.
            </div>
        </section>
        <h1>Details</h1>
        <section>
            <div class="row">
                <div class="col-12 col-lg-6">
                    <x-text name="title_text" label="Custom title (appears underneath your avatar):" :value="$user->title_text" />
                    <x-text name="info_name" label="Real or preferred name:" :value="$user->info_name" />
                    <x-text name="info_website" label="Website link:" :value="$user->info_website" />
                    <x-text name="info_occupation" label="Occupation or field of study:" :value="$user->info_occupation" />
                    <x-text name="info_interests" label="What interests you:" :value="$user->info_interests" />
                </div>
                <div class="col-12 col-lg-6">
                    <x-text name="info_location" label="Country/area where you live:" :value="$user->info_location" />
                    <x-text name="info_languages" label="Languages you speak:" :value="$user->info_languages" />
                    <x-text name="info_birthday_formatted" label="Your birthday: (format: DD/MM)" :value="$user->info_birthday_formatted" />
                    <x-text name="info_steam_profile" label="Your Steam profile:" :value="$user->info_steam_profile" />
                    <div class="form-text">
                        To find your Steam name, go to "Edit Profile" in Steam. Set up a custom URL and enter the same value in the box above.
                        Not the full link, just the name -
                        i.e. <span class="text-secondary">https://steamcommunity.com/id/</span><span class="text-warning">your_profile_name</span>
                    </div>
                </div>
            </div>
        </section>
        <h1>Profile</h1>
        <section>
            <x-textarea name="info_biography_text" label="Content:" :bbcode="true" :value="$user->info_biography_text" />
        </section>
        <h1>Forum signature</h1>
        <section>
            <x-textarea name="info_signature_text" label="Content:" :bbcode="true" :value="$user->info_signature_text" />
            <button type="submit">Save profile</button>
        </section>
    </form>
@endsection
