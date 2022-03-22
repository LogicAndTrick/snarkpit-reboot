<?php

function reverse_snarkpit_format($text)
{
    //$text = stripslashes($text);
    $text = str_replace("&amp;lt", "&lt", $text);
    $text = str_replace("&amp;gt", "&gt", $text);
    $text = str_replace("&lt;br /&gt;", "<br />", $text);
    $text = str_replace('\"', '"', $text);
    $text = str_replace("\'", "'", $text);
    $text = preg_replace('/<br \/><br \/><div class="text_edited">(.*?)<\/div>/', "", $text);
    $text = str_replace("<br />", "\n", $text);
    $text = preg_replace('/<BR>/i', "\n", $text);
    $text = str_replace("<br>", "\n", $text);
    $text = htmlspecialchars_decode($text);
    return $text;
}

if (!function_exists('format_filesize'))
{
    function format_filesize($bytes)
    {
        if ($bytes < 1024) return $bytes . 'b';
        $kbytes = $bytes / 1024;
        if ($kbytes < 1024) return round($kbytes, 2) . 'kb';
        $mbytes = $kbytes / 1024;
        if ($mbytes < 1024) return round($mbytes, 2) . 'mb';
        $gbytes = $mbytes / 1024;
        if ($gbytes < 1024) return round($gbytes, 2) . 'gb';
        $tbytes = $gbytes / 1024;
        if ($tbytes < 1024) return round($tbytes, 2) . 'tb';
        $pbytes = $tbytes / 1024;
        return round($pbytes, 2) . 'pb';
    }
}

if (!function_exists('ordinal'))
{
    function ordinal($number, $include_number = true)
    {
        $ends = array('th','st','nd','rd','th','th','th','th','th','th');
        $n = $include_number ? $number : '';
        if (($number % 100) >= 11 && ($number%100) <= 13) return $n . 'th';
        else return $n . $ends[$number % 10];
    }
}

function bbcode($text, $scope = '') {
    /** @var \App\Helpers\BBCode\Parser $parser */
    $parser = app('bbcode');
    return $parser->Parse($text, $scope);
}

function bbcode_result($text, $scope = '') {
    /** @var \App\Helpers\BBCode\Parser $parser */
    $parser = app('bbcode');
    return $parser->ParseResult($text, $scope);
}

function bbcode_excerpt($text, $length = 200, $scope = 'excerpt') {
    /** @var \App\Helpers\BBCode\Parser $parser */
    $parser = app('bbcode');
    return $parser->ParseExcerpt($text, $length, $scope);
}
