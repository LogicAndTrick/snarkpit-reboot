@section('title', 'Upload a map')
@extends('layouts.default')

@section('content')
    <h1>Upload map</h1>

    <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="{{ url('map/index') }}">Maps</a></li>
        <li class="breadcrumb-item active">Upload map</li>
    </ol>

    <section>
        <form method="POST" action="{{ url('map/create') }}" enctype="multipart/form-data">
            @csrf
            <x-text name="name" label="Map name:" />
            <x-select name="game_id" label="Game:" :items="$games" />
            <x-select name="status_id" label="Status:" :items="$statuses" />
            <div class="row">
                <div class="col-md-6">
                    <div class="border p-2">
                        <h3>Files</h3>
                        <x-text type="file" name="file" label="File (optional, zip or rar, maximum size 100mb):" accept=".zip,.rar" />
                        <x-textarea name="mirrors" label="Mirror links (one per line, at least one of file or mirrors must be specified):" class="small-textarea" />
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="border p-2">
                        <h3>Images</h3>
                        <x-text type="file" name="image" label="First image (required, jpg only, maximum size: 4mb):" accept=".jpg,.jpeg" />

                        Additional images (up to 9 more allowed):
                        <div class="images-form-container">
                            {{--
                                <div class="d-flex flex-row">
                                    <input class="flex-fill my-1" type="file" name="image1">
                                    <a class="align-self-center px-2" href="#">
                                        <span class="fas fa-times"></span>
                                    </a>
                                </div>
                            --}}
                            <div class="text-center">
                                <button type="button" class="btn btn-outline-primary">
                                    <span class="fas fa-plus"></span>
                                    Add another image
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <x-textarea name="text" label="Content:" :bbcode="true" />
            <button type="submit">Upload</button>
        </form>
    </section>

@endsection
