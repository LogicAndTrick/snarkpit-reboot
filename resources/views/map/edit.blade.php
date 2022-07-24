@section('title', 'Edit map: ' . $map->name)
@extends('layouts.default')

@section('content')
    <h1>Edit map: {{$map->name}}</h1>

    <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="{{ url('map/index') }}">Maps</a></li>
        <li class="breadcrumb-item"><a href="{{ url('map/view', [$map->id]) }}">{{$map->name}}</a></li>
        <li class="breadcrumb-item active">Edit</li>
    </ol>

    <section>
        <form method="POST" action="{{ url('map/edit') }}" enctype="multipart/form-data">
            @csrf
            <x-hidden name="id" :value="$map->id" required />
            <x-text name="name" label="Map name:" :value="$map->name" required />
            <x-select name="game_id" label="Game:" :items="$games" :value="$map->game_id" required />
            <x-select name="status_id" label="Status:" :items="$statuses" :value="$map->status_id" required />
            <div class="row">
                <div class="col-md-6">
                    <div class="border p-2">
                        <h3>Files</h3>
                        <x-text type="file" name="file" label="File (leave blank to keep current file, zip or rar, maximum size 100mb):" accept=".zip,.rar" />
                        @if ($map->download_file)
                            <x-checkbox name="remove_existing" label="Remove current uploaded file" />
                            <script>
                            {
                                const rem = document.querySelector('input[name="remove_existing"]');
                                const fil = document.querySelector('input[name="file"]');
                                const updateFileStatus = () => fil.disabled = rem.checked;
                                rem.addEventListener('input', updateFileStatus);
                                updateFileStatus();
                            }
                            </script>
                        @endif
                        <x-textarea name="mirrors" label="Mirror links (one per line, at least one of file or mirrors must be specified):" class="small-textarea" :value="$map->mirrors" />
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="border p-2">
                        <h3>Images</h3>
                        <x-text type="file" name="image" label="First image (leave blank to keep current image, jpg only, maximum size: 4mb):" accept=".jpg,.jpeg" />

                        <x-checkbox name="change_additional_images" label="Change additional images" />
                        <div id="additional-images" class="d-none">
                            Additional images (up to 9 more allowed):
                            <div class="text-warning mb-1">
                                <span class="fas fa-warning"></span>
                                All your additional images will be replaced with this new selection,
                                leave the list empty to remove all additional images.
                            </div>
                            <div class="images-form-container">
                                <div class="text-center">
                                    <button type="button" class="btn btn-outline-primary">
                                        <span class="fas fa-plus"></span>
                                        Add another image
                                    </button>
                                </div>
                            </div>
                        </div>
                        <script>
                        {
                            const change = document.querySelector('input[name="change_additional_images"]');
                            const add = document.getElementById('additional-images');
                            const updateAdditional = () => add.classList.toggle('d-none', !change.checked);
                            change.addEventListener('input', updateAdditional);
                            updateAdditional();
                        }
                        </script>
                    </div>
                </div>
            </div>
            <x-textarea name="text" label="Description:" :bbcode="true" :value="$map->content_text" required />
            <button type="submit">Update</button>
        </form>
    </section>

@endsection
