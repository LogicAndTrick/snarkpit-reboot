@props(['name', 'label', 'disabled' => false, 'value' => null, 'bbcode' => false])

<?php
    $id = $name . '_' . rand(10000, 99999);
    $cls = $bbcode ? 'bbcode-input' : '';
    $value = old($name, $value);
?>
<div {!! $attributes->merge(['class' => 'form-group']) !!}>
    <label for="{{ $id }}">
        {{ $label }}
    </label>

    <div class="{{ $cls }}">
        <textarea
               name="{{ $name }}"
               id="{{ $id }}"
               {{ $disabled ? 'disabled' : '' }}
            {!! $attributes->merge(['class' => 'form-control']) !!}>{{$value}}</textarea>
        @if ($errors->has($name))
            <span class="text-danger">{{$errors->first($name)}}</span>
        @endif
    </div>
</div>
