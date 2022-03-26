@props(['name', 'label', 'value'])

<input type="hidden" name="{{ $name }}" value="{{ $value }}" {!! $attributes !!} />
