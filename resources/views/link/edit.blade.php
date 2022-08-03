@section('title', 'Edit link')
@extends('layouts.default')

@section('content')
    <h1>
        <span class="fa fa-pencil"></span>
        Edit link: {{$link->name}}
    </h1>

    <section>
        <form method="POST" action="{{ url('link/edit') }}" enctype="multipart/form-data">
            @csrf
            <x-hidden name="id" :value="$link->id" required />
            <x-text name="name" label="Name:" :value="$link->name" required />
            <x-text name="url" label="URL:" :value="$link->url" required />
            <x-text name="description" label="Description:" :value="$link->description" required />
            <x-text type="file" name="icon" label="Icon (leave blank to keep same icon, recommended size: 100 x 32)" accept=".jpg,.jpeg,.png" />
            <button type="submit">Save</button>
        </form>
    </section>

@endsection
