<footer>
    &copy; Snarkpit.net 2001 - {{ date('Y') }} &bull; <a href="{{ url('page/about-us') }}">about us</a>
    {{-- &bull; <a href="#">donate</a> --}}
    &bull; <a href="{{ url('page/contact') }}">contact</a>
    <br />
    Snarkpit <a href="{{ url('page/changelog') }}">v7.0</a> created this page in {{ round(microtime(true) - LARAVEL_START, 4) }} seconds.
</footer>
