<header class="container site-header px-0 d-flex flex-column">
    <div class="d-flex flex-row">
        <a href="{{ url('/') }}" class="home-link">
            <img src="{{ asset('images/header_logo.png') }}" alt="The Snarkpit" />
        </a>
        <div class="flex-fill"></div>
        <div class="d-flex flex-column align-items-end">
            <div class="quick-links-container">
                <div class="quick-links">
                    @auth
                        <a href="#">control panel</a>
                        <a href="#">messages</a>
                        <a href="#">updates</a>
                        @can('admin')
                            <a href="{{ url('admin') }}">admin</a>
                        @endcan
                        <form method="post" action="{{ route('logout') }}">
                            @csrf
                            <button>logout</button>
                        </form>
                    @else
                        <a href="{{ route('login') }}">login</a>
                        <a href="{{ route('register') }}">register</a>
                    @endauth
                    {{--<a href="#">theme</a>--}}
                    <a href="#">search</a>
                </div>
            </div>
            <div class="member-info d-flex flex-row">
                @auth
                    <div class="me-4">
                        Welcome, <a href="#">{{ Auth::user()->name }}</a>!
                    </div>
                @endauth
                <div class="flex-fill"></div>
                @if (isset($latest_user))
                    <div>
                        Say hi to our newest member, <a href="#">{{ $latest_user->name }}</a>!
                    </div>
                @endif
            </div>
        </div>
    </div>
    <div class="main-links">
        <a href="{{ url('/') }}">Home</a>
        <a href="{{ url('map') }}">Maps</a>
        <a href="{{ url('article') }}">Articles</a>
        <a href="{{ url('download') }}">Downloads</a>
        <a href="{{ url('forum') }}">Forums</a>
        <a href="{{ url('link') }}">Links</a>
    </div>
</header>
