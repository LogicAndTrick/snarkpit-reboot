@props(['name', 'label' => '', 'disabled' => false, 'value' => null, 'items' => [], 'key' => 'id', 'value' => 'name'])

<?php
    $id = $name . '_' . rand(10000, 99999);
?>
<div {!! $attributes->merge(['class' => 'form-group']) !!}>
    <label for="{{ $id }}">
        {{$label}}
    </label>
        <select name="{{ $name }}"
               id="{{ $id }}"
               {{ $disabled ? 'disabled' : '' }}
               {!! $attributes->merge(['class' => 'form-select']) !!}>
        @foreach ($items as $v)
            <option value="{{$v->$key}}">{{$v->$value}}</option>
        @endforeach
        </select>
    @if ($errors->has($name))
        <span class="text-danger">{{$errors->first($name)}}</span>
    @endif
</div>
