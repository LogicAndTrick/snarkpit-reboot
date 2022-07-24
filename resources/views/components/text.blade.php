@props(['name', 'type' => 'text', 'label', 'disabled' => false, 'value' => null])

<?php
    $id = $name . '_' . rand(10000, 99999);
    $value = old($name, $value);
?>
<div {!! $attributes->merge(['class' => 'form-group']) !!}>
    <label for="{{ $id }}">
        {{ $label }}
    </label>

    <input type="{{ $type }}"
           name="{{ $name }}"
           value="{{ $value }}"
           id="{{ $id }}"
            {{ $disabled ? 'disabled' : '' }}
            {!! $attributes->merge(['class' => 'form-control']) !!} />
    @if ($errors->has($name))
        <span class="text-danger">{{$errors->first($name)}}</span>
    @endif
</div>
