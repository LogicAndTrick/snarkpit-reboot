@props(['date', 'format' => 'nice', 'zone' => null])
<?php
    use Illuminate\Support\Facades\Auth;
    /** @var \Carbon\Carbon|null $date */
    /** @var string $format */
    /** @var mixed|null $zone */
    $raw = 'Never';
    $formatted = 'Never';
    if ($date) {
        if ($zone !== null) $date = $date->clone()->setTimezone($zone);
        else $date = $date->clone()->setTimezone(Auth::check() ? Auth::user()->timezone : 0);

        $raw = $date->format('Y-m-d H:i:s T');
        $formatted = match ($format) {
            'full' => $date->format("D M jS Y \a\\t g:ia"),
            'short-date' => $date->format("M jS Y"),
            'date' => $date->format("D M jS Y"),
            'short' => $date->diffForHumans(null, null, true),
            'nice' => $date->diffForHumans(null, null, false),
            'raw' => $raw,
            default => $format ? $date->format($format) : $raw,
        };
    }
?>
<span class="nice-date" title="{{$raw}}">
    {{ $formatted }}
</span>
