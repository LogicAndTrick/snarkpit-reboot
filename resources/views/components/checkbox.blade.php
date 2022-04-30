@props(['name', 'type' => 'checkbox', 'label' => '', 'disabled' => false, 'value' => null, 'checked' => false])

<?php
    $id = $name . '_' . rand(10000, 99999);
?>
<div {!! $attributes->merge(['class' => 'form-group']) !!}>
    <label for="{{ $id }}" class="form-check">
        <input type="{{ $type }}"
               name="{{ $name }}"
               id="{{ $id }}"
               {{ $checked || old($name) ? 'checked' : '' }}
               {{ $disabled ? 'disabled' : '' }}
               {!! $attributes->merge(['class' => 'form-check-input']) !!} />

        {{ $label }}
    </label>
    @if ($errors->has($name))
        <span class="text-danger">{{$errors->first($name)}}</span>
    @endif
</div>
