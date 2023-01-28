<header class="container site-header-mobile px-0 d-lg-none">
    <nav class="navbar navbar-dark bg-dark p-0">
        <div class="container-fluid p-0 m-0">
            <span class="navbar-brand p-0">
                <img src="{{ asset('images/header_logo.png') }}" alt="The Snarkpit" />
            </span>
            <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#mobile-menu">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="offcanvas offcanvas-end text-bg-dark" tabindex="-1" id="mobile-menu">
                <div class="offcanvas-header">
                    <h5 class="offcanvas-title">The Snarkpit</h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas"></button>
                </div>
                <div class="offcanvas-body">
                    <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
                        @auth
                            <li class="nav-item">
                                <a class="nav-link" href="{{ url('panel') }}">control panel</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="{{ url('message') }}">
                                    @if ($num_unread_messages > 0)
                                        <strong class="text-danger">messages ({{$num_unread_messages}})</strong>
                                    @else
                                        messages
                                    @endif
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="{{ url('panel/notifications') }}">
                                    @if ($num_unread_notifications > 0)
                                        <strong class="text-danger">updates ({{$num_unread_notifications}})</strong>
                                    @else
                                        updates
                                    @endif
                                </a>
                            </li>
                            @can('admin')
                                <li class="nav-item">
                                    <a class="nav-link" href="{{ url('admin') }}">admin</a>
                                </li>
                            @endcan
                            <li class="nav-item">
                                <form method="post" action="{{ route('logout') }}">
                                    @csrf
                                    <button class="nav-link">logout</button>
                                </form>
                            </li>
                        @else
                            <li class="nav-item">
                                <a class="nav-link" href="{{ route('login') }}">login</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="{{ route('register') }}">register</a>
                            </li>
                        @endauth
                        <li class="nav-item">
                            <hr/>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="{{ url('/') }}">Home</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="{{ url('map') }}">Maps</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="{{ url('article') }}">Articles</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="{{ url('download') }}">Downloads</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="{{ url('forum') }}">Forums</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="{{ url('link') }}">Links</a>
                        </li>
                    </ul>
                    <form class="d-flex mt-3" role="search">
                        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                        <button class="btn btn-success" type="submit">Search</button>
                    </form>
                </div>
            </div>
        </div>
    </nav>
</header>

<header class="container site-header px-0 d-none d-lg-flex flex-column">
    <div class="d-flex flex-row">
        <a href="{{ url('/') }}" class="home-link">
            <img src="{{ asset('images/header_logo.png') }}" alt="The Snarkpit" />
        </a>
        <div class="flex-fill"></div>
        <div class="d-flex flex-column align-items-end">
            <div class="quick-links-container">
                <div class="quick-links">
                    @auth
                        <a href="{{ url('panel') }}">control panel</a>
                        <a href="{{ url('message') }}">
                            @if ($num_unread_messages > 0)
                                <strong class="text-danger">messages ({{$num_unread_messages}})</strong>
                            @else
                                messages
                            @endif
                        </a>
                        <a href="{{ url('panel/notifications') }}">
                            @if ($num_unread_notifications > 0)
                                <strong class="text-danger">updates ({{$num_unread_notifications}})</strong>
                            @else
                                updates
                            @endif
                        </a>
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
                    <a href="{{ url('search') }}">search</a>
                </div>
            </div>
            <div class="member-info d-flex flex-row">
                @auth
                    <div class="me-4">
                        Welcome, <a href="{{ url('user/view', [ Auth::id() ]) }}">{{ Auth::user()->name }}</a>!
                    </div>
                @endauth
                <div class="flex-fill"></div>
                @if (isset($latest_user))
                    <div>
                        Say hi to our newest member, <a href="{{ url('user/view', [ $latest_user->id ]) }}">{{ $latest_user->name }}</a>!
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
