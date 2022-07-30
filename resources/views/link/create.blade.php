@section('title', 'Create link')
@extends('layouts.default')

@section('content')
    <h1>
        <span class="fa fa-plus"></span>
        Create link
    </h1>

    <section>
        <form method="POST" action="{{ url('link/create') }}" enctype="multipart/form-data">
            @csrf
            <x-text name="name" label="Name:" required />
            <x-text name="url" label="URL:" required />
            <x-text name="description" label="Description:" required />
            <x-text type="file" name="icon" label="Icon (recommended size: 100 x 32)" accept=".jpg,.jpeg,.png" required />
            <button type="submit">Create</button>
        </form>
    </section>

@endsection
