@props(['name', 'label' => '', 'disabled' => false, 'value' => null, 'items' => [], 'item_key' => 'id', 'item_value' => 'name'])

<?php
    $id = $name . '_' . rand(10000, 99999);
    $value = old($name, $value);
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
            <option value="{{$v->$item_key}}" {{$value==$v->$item_key ? 'selected':''}}>{{$v->$item_value}}</option>
        @endforeach
        </select>
    @if ($errors->has($name))
        <span class="text-danger">{{$errors->first($name)}}</span>
    @endif
</div>
