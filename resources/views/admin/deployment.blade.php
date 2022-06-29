@extends('layouts.default')

@section('title', 'Admin Panel')

@section('content')
    <h1>Deploy Updates</h1>
    <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="{{ url('admin/index') }}">Admin Panel</a></li>
        <li class="breadcrumb-item active">Deploy updates</li>
    </ol>
    <section>
<?php
    $operations = [
        'update' => 'Update code (no database)',
        'migrate' => 'Update database (no code)',
        'update-migrate' => 'Update code + database',
        'refresh' => 'Wipe database + deploy users',
        'deploy-news' => 'Deploy news',
        'deploy-forums' => 'Deploy forums (takes ages!)',
        'deploy-games' => 'Deploy games',
        'deploy-downloads' => 'Deploy downloads',
        'deploy-links' => 'Deploy links',
        'deploy-articles' => 'Deploy articles',
    ];
?>
        <p>The current version is: <code>{{ $version }}</code></p>
        <div class="row">
            <div class="col-auto">
                @foreach($operations as $name => $desc)
                    <div class="mb-2">
                        <form action="{{ url('admin/deployment-execute') }}" method="post" target="update-frame" class="update-form">
                            @csrf
                            <input type="hidden" name="operation" value="{{ $name }}" />
                            <button type="submit" class="d-block w-100" id="update-button">{{ $desc }}</button>
                        </form>
                    </div>
                @endforeach
            </div>
            <div class="col mt-2">
                <iframe name="update-frame" src="" id="update-frame" onload="disableButtons(false)" style="width: 100%; height: 10rem; border: 1px #900 solid; background: #111;">
                </iframe>
            </div>
        </div>
        <script>
            let operation = null;
            function disableButtons(disabled) {
                document.querySelectorAll('.update-form button').forEach(x => {
                    x.disabled = disabled;
                    if (disabled) {
                        x._cachedText = x.innerText;
                        x.innerText = 'Please wait... Running: ' + operation;
                    } else if (x._cachedText) {
                        x.innerText = x._cachedText;
                    }
                });
            }
            document.addEventListener('submit', event => {
                const fd = new FormData(event.target);
                operation = fd.get('operation');
                disableButtons(true);
            });
        </script>
    </section>
@endsection
