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
                    smiley_folder: '{{ asset('images/smilies') }}'
                },
                api: {
                    format: '{{ url("api/posts/format") }}'
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
    </body>
</html>
