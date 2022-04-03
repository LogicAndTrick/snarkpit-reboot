@extends('layouts.default')

@section('title', 'Admin Panel')

@section('content')
    <h1>Deploy Updates</h1>
    <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="{{ url('admin/index') }}">Admin Panel</a></li>
        <li class="breadcrumb-item active">Deploy updates</li>
    </ol>
    <section>
        <p>The current version is: <code>{{ $version }}</code></p>
        <div class="row">
            <div class="col">
                <form action="{{ url('admin/deployment-execute') }}" method="post" target="update-frame" id="update-form">
                    @csrf
                    <input type="hidden" name="operation" value="update" />
                    <button type="submit" class="mb-2" id="update-button">Update to latest</button>
                </form>
            </div>
            <div class="col">
                <form action="{{ url('admin/deployment-execute') }}" method="post" target="update-frame" id="update-form">
                    @csrf
                    <input type="hidden" name="operation" value="other" />
                    <button type="submit" class="mb-2" id="update-button">Do something else...</button>
                </form>
            </div>
        </div>
        <script>
            let operation = null;
            function disableButtons(disabled) {
                document.querySelectorAll('form button').forEach(x => {
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
        <iframe name="update-frame" src="" id="update-frame" onload="disableButtons(false)" style="width: 100%; height: 10rem; border: 1px #900 solid; background: #111;">
        </iframe>
    </section>
@endsection
