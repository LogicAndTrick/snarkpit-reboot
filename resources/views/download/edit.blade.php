@section('title', 'Edit download')
@extends('layouts.default')

@section('content')
    <h1>
        <span class="fa fa-pencil"></span>
        Edit download: {{$download->name}}
    </h1>

    <section>
        <form method="POST" action="{{ url('download/edit') }}" enctype="multipart/form-data">
            @csrf
            <x-hidden name="id" :value="$download->id" required />
            <x-select name="download_category_id" label="Category:" :value="$download->download_category_id" :items="$categories" required />
            <x-select name="game_id" label="Game:" :value="$download->game_id" :items="$games" required />
            <x-text name="name" label="Name:" :value="$download->name" required />
            <x-text type="file" name="image" label="Thumbnail (leave blank to keep same icon):" accept=".jpg,.jpeg,.png" />
            <x-text type="file" name="file" label="File (leave blank to keep same file, zip or rar, maximum size 100mb):" accept=".zip,.rar" />
            @if ($download->download_file)
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
            <x-textarea name="mirrors" label="Mirror links (one per line, at least one of file or mirrors must be specified):" :value="$download->mirrors" class="small-textarea" />
            <x-textarea name="text" label="Description:" :value="$download->content_text" :bbcode="true" required />
            <button type="submit">Save</button>
        </form>
    </section>

@endsection
