<?php
    // show users in the last 10 minutes as online, refresh once a minute
    $num_online = cache()->remember('footer_activeusercount', 60, function () {
        $expiry = \Carbon\Carbon::now('utc')->subMinutes(10);
        return \App\Models\User::query()->where('last_access_time', '>=', $expiry)->count();
    });
?>
<footer>
    &copy; Snarkpit.net 2001 - {{ date('Y') }} &bull; <a href="{{ url('page/about-us') }}">about us</a>
    {{-- &bull; <a href="#">donate</a> --}}
    &bull; <a href="{{ url('page/contact') }}">contact</a>
    <br />
    {{$num_online}} registered user{{$num_online == 1 ? ' is' : 's are'}} currently online.
    <br />
    Snarkpit <a href="{{ url('page/changelog') }}">v7.0</a> created this page in {{ round(microtime(true) - LARAVEL_START, 4) }} seconds.
</footer>
