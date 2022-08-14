@section('title', 'Change avatar: '. $user->name)
@extends('layouts.default')

@section('content')
    <h1>
        <span class="fa fa-cogs"></span>
        Change avatar: {{ $user->name }}
    </h1>

    <nav class="nav-header">
        <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="{{ url('panel/index', [ $user->id ]) }}">Control panel</a></li>
            <li class="breadcrumb-item active">Change avatar</li>
        </ol>
    </nav>

    <section>
        <p>You may upload a custom avatar below.</p>
        <ul>
            <li>The maximum avatar size is 100 x 100, your image will be resized if it is too large.</li>
            <li>The recommended format is PNG, with an alpha channel if required.</li>
            <li>Inappropriate content will be deleted and may lead to your account being banned.</li>
        </ul>
        <form action="{{ url('panel/edit-avatar') }}" method="post" enctype="multipart/form-data">
            @csrf
            <x-hidden name="id" :value="$user->id" />
            <input type="hidden" name="type" value="upload" />
            <x-text type="file" name="upload" label="Image (jpg or png, maximum size 4mb):" accept=".jpg,.jpeg,.png" />
            <button type="submit">Submit</button>
        </form>
        <p>Or you may choose a default avatar from our gallery:</p>
        <p>Click any of the below images to use the avatar.</p>

<?php
    $sel = $user->avatar_custom ? '' : $user->avatar_file;
?>
        <div class="row avatar-preset-chooser">
        @foreach ($presets as $preset)
            <div class="col-md-2 col-sm-3 col-xs-6 mb-3">
                <form action="{{ url('panel/edit-avatar') }}" method="post">
                    @csrf
                    <x-hidden name="id" :value="$user->id" />
                    <input type="hidden" name="type" value="preset" />
                    <input type="hidden" name="preset" value="{{ $preset }}" />
                    <button class="btn not-submit btn-{{ $preset == $sel ? 'outline-primary' : 'outline-secondary' }}" style="cursor: pointer;" type="submit">
                        <img src="{{ asset('images/avatars/'.$preset) }}" alt="Preset Avatar" />
                    </button>
                </form>
            </div>
        @endforeach
        </div>
        <p>Or you can remove your avatar and have none at all:</p>
        <form action="{{ url('panel/edit-avatar') }}" method="post">
            @csrf
            <x-hidden name="id" :value="$user->id" />
            <input type="hidden" name="type" value="erase" />
            <button type="submit">Use no avatar</button>
        </form>
    </section>
@endsection
