@props(['name', 'type' => 'checkbox', 'label', 'disabled' => false, 'value' => null])

<?php
    $id = $name . '_' . rand(10000, 99999);
?>
<div {!! $attributes->merge(['class' => 'form-group']) !!}>
    <label for="{{ $id }}" class="form-check">
        <input type="{{ $type }}"
               name="{{ $name }}"
               id="{{ $id }}"
                {{ $disabled ? 'disabled' : '' }}
                {!! $attributes->merge(['class' => 'form-check-input']) !!} />

        {{ $label }}
    </label>
    @if ($errors->has($name))
        <span class="text-danger">{{$errors->first($name)}}</span>
    @endif
</div>
