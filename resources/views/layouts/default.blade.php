<!doctype html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <link rel="stylesheet" href="{{ asset('css/app.css') }}">
        <script type="text/javascript">
            window.urls = {
                formatting_help: '{{ url('page/formatting-help') }}',
                images: {
                    root: '{{ asset('/') }}',
                    no_image: '{{ asset('images/no_image.png') }}',
                    smiley_folder: '{{ '/images/smilies' }}'
                },
                api: {
                    format: '{{ url("api/format") }}',
                    image_upload: '{{ url("api/image-upload") }}',
                    get_post: '{{ url('api/get-post') }}'
                },
                embed: {
                    article: '{{ url('article/embed-info') }}',
                    download: '{{ url('download/embed-info') }}',
                    map: '{{ url('map/embed-info') }}',
                },
                list: {
                    article: '{{ url('article') }}',
                    download: '{{ url('download') }}',
                    map: '{{ url('map') }}',
                },
                view: {
                    article: '{{ url('article/view/{slug}') }}',
                    download: '{{ url('download/view/{id}') }}',
                    map: '{{ url('map/view/{id}') }}',
                    thread: '{{ url('thread/view/{id}') }}',
                    user: '{{ url('user/view/{id}') }}',
                }
            };
        </script>
        <script src="{{ asset('js/app.js') }}" defer></script>
        <?php $page_title = htmlspecialchars_decode(\Illuminate\Support\Facades\View::yieldContent('title')); ?>
        <title>{{$page_title ? $page_title.' - ' : ''}}The SnarkPit - Half-Life maps, downloads, tutorials</title>
        <meta content="The SnarkPit" property="og:site_name">
        @if (isset($meta_description) && strlen($meta_description) > 0)
            <?php $meta_description = str_replace("\n", ' ', substr($meta_description, 0, 300)) . (strlen($meta_description) > 300 ? '...' : ''); ?>
            <meta property="og:description" content="{{$meta_description}}">
        @else
            <meta property="og:description" content="View this page on The SnarkPit">
        @endif
        <meta property="og:type" content="website">
        @if (isset($meta_title) && strlen($meta_title) > 0)
            <meta property="og:title" content="{{$meta_title}}">
        @else
            <meta property="og:title" content="{{$page_title}}">
        @endif
        @if (isset($meta_images) && count($meta_images) > 0)
            @foreach ($meta_images as $img)
                <meta property="og:image" content="{{asset($img)}}">
            @endforeach
            <meta name="twitter:card" content="summary_large_image">
        @else
            <meta property="og:image" content="{{asset('images/snark-logo.png')}}">
        @endif
        <meta property="og:url" content="{{Request::url()}}">
        <meta name="theme-color" content="#B0281B">
        <link rel="shortcut icon" href="{{ asset('favicon.ico') }}" />
        <link rel="search" type="application/opensearchdescription+xml" href="{{ url('/opensearch.xml') }}" title="The SnarkPit">
    </head>
<?php
    $body_classes = '';
    if (isset($_GET['snow']) || date('m') == '12') $body_classes = 'snow';
?>
    <body class="{{$body_classes}}">
        @include('layouts.header')
        <main class="container px-0">
            @yield('content')
        </main>
        @include('layouts.footer')
        @yield('scripts', false)
    </body>
</html>
