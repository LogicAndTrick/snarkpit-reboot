@extends('admin.layout')

@section('title', 'Spotlight management')
@section('admin-page', 'Spotlight management')

@section('admin-content')
    <section>
        <h4>Spotlights</h4>
        <table class="table table-bordered table-sm">
            <tr>
                <th>Item</th>
                <th class="d-none d-md-table-cell">By</th>
                <th>Position</th>
                <th></th>
            </tr>
            @foreach($spotlights as $spot)
                <tr>
                    <td>
                        @if ($spot->item_type == \App\Models\Spotlight::TYPE_MAP)
                            <span class="text-danger">[map]</span>
                            <a href="{{ url('map/view', [ $spot->item_id ]) }}">{{$spot->item->name}}</a>
                        @elseif ($spot->item_type == \App\Models\Spotlight::TYPE_DOWNLOAD)
                            <span class="text-danger">[download]</span>
                            <a href="{{ url('download/view', [ $spot->item_id ]) }}">{{$spot->item->name}}</a>
                        @elseif ($spot->item_type == \App\Models\Spotlight::TYPE_ARTICLE)
                            <span class="text-danger">[article]</span>
                            <a href="{{ url('article/view', [ $spot->item->current_version->slug ]) }}">{{$spot->item->current_version->title}}</a>
                        @endif
                    </td>
                    <td class="d-none d-md-table-cell">
                        <a href="{{ url('user/view', [ $spot->item->user->id ]) }}">{{$spot->item->user->name}}</a>
                    </td>
                    <td>
                        {{$spot->position}}
                    </td>
                    <td>
                        <form action="{{ url('admin/delete-spotlight') }}" method="post">
                            @csrf
                            <x-hidden name="id" :value="$spot->id" />
                            <button class="btn btn-danger btn-xs m-auto" type="submit">
                                <span class="fa fa-remove"></span>
                                Delete
                            </button>
                        </form>
                    </td>
                </tr>
            @endforeach
        </table>
        <h4>Add Spotlight</h4>
        <form action="{{ url('admin/create-spotlight') }}" method="post">
            @csrf
            <div class="form-group">
                <label for="item_type">Item type:</label>
                <select class="form-control form-select" id="item_type" name="item_type">
                    <option value="{{ \App\Models\Spotlight::TYPE_MAP }}">Map</option>
                    <option value="{{ \App\Models\Spotlight::TYPE_ARTICLE }}">Article</option>
                    <option value="{{ \App\Models\Spotlight::TYPE_DOWNLOAD }}">Download</option>
                </select>
            </div>
            <x-text type="number" min="1" step="1" name="item_id" label="Item ID:" />
            <x-text type="number" step="1" name="position" label="Position:" />
            <button type="submit">Add</button>
        </form>
    </section>
@endsection
