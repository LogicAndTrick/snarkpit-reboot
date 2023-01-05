<!doctype html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <link rel="stylesheet" href="{{ asset('css/app.css') }}">
        <script type="text/javascript">
            window.urls = {
                images: {
                    root: '{{ asset('/') }}',
                    no_image: '{{ asset('images/no_image.png') }}',
                    smiley_folder: '{{ asset('images/smilies') }}'
                },
                api: {
                    format: '{{ url("api/format") }}'
                },
                embed: {
                    article: '{{ url('article/embed-info') }}'
                },
                list: {
                    article: '{{ url('article') }}',
                },
                view: {
                    article: '{{ url('article/view/{slug}') }}',
                    thread: '{{ url('thread/view/{id}') }}',
                    user: '{{ url('user/view/{id}') }}',
                }
            };
        </script>
        <script src="{{ asset('js/app.js') }}" defer></script>
        <title>@yield('title') - The Snarkpit</title>
    </head>
    <body>
        @include('layouts.header')
        <main class="container px-0">
            @yield('content')
        </main>
        @include('layouts.footer')
        @yield('scripts', false)
    </body>
</html>
