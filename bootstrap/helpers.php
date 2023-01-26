<?php

use Illuminate\Support\Facades\Validator;

function reverse_snarkpit_format($text)
{
    //$text = stripslashes($text);
    $text = str_replace("&amp;lt", "&lt", $text);
    $text = str_replace("&amp;gt", "&gt", $text);
    $text = str_replace("&lt;br /&gt;", "<br />", $text);
    $text = html_entity_decode($text);
    $text = htmlspecialchars_decode($text);
    $text = str_replace("\\\\\"", '"', $text);
    $text = str_replace("\\\"", '"', $text);
    $text = str_replace("\\\\'", "'", $text);
    $text = str_replace("\\'", "'", $text);
    $text = preg_replace('/<br \/><br \/><div class="text_edited">(.*?)<\/div>/', "", $text);
    $text = str_replace("<br />", "\n", $text);
    $text = preg_replace('/<BR>/i', "\n", $text);
    $text = str_replace("<br>", "\n", $text);
    $text = preg_replace('/\s*\[addsig\]\s*/', '', $text);

    // size tags
    $text = preg_replace_callback('%\[size=(.*?)\](.*?)\[/size\]%im', function ($matches) {
        $size = $matches[1];
        if ($size && is_numeric($size)) {
            switch ($size) {
                case '1': $size = '10'; break;
                case '2': $size = '13'; break;
                case '3': $size = '16'; break;
                case '4': $size = '18'; break;
                case '5': $size = '24'; break;
                case '6': $size = '32'; break;
                default : $size = '40'; break;
            }
        }
        return "[size=$size]{$matches[2]}[/size]";
    }, $text);

    // page tags (used in articles, replace with headings)
    $text = preg_replace('/\[page=(.*?)\]\s*/im', "[size=24][b]\$1[/b][/size]\n---\n\n", $text);
    $text = str_ireplace('[/page]', '', $text);

    // mapthumbs -> mthumb
    $text = str_ireplace("[mapthumbs]", "[mthumb]", $text);
    $text = str_ireplace("[/mapthumbs]", "[/mthumb]", $text);

    if (str_contains($text, '<')) {
        // The text probably contains html...

        $text = preg_replace('/<!--quote-->\s*/si', '', $text);
        $text = preg_replace('%<!--/quote-->\s*%si', '', $text);
        // Nested quotes
        while (true) {
            // yikes
            $new_text = preg_replace('%<table[^>]*>\s*(?:<tbody>)?\s*<tr>\s*<td[^>]*>(?:<font[^>]*>)?[^<]*(?:<b>)?(?:<a[^>]*>)?(?:<font[^>]*>)?([^<]*)(?:</font>)?(?:</a>)?(?:</b>)?(?:</font>)?</td>(?:</tr>)?\s*<tr>\s*<td[^>]*>\s*(?:<P><FONT size=2>)?((?:(?!<table).)*?)\s*(?:</font>)?(?:</p>)?</td></tr>(?:</tbody>)?</table>\s*%si', "[quote=\\1]\n\\2\n[/quote]\n\n", $text);
            $new_text = preg_replace('%<table[^>]*>\s*<tr>\s*<td[^>]*>[^<]*</td></tr><tr>\s*<td[^>]*>\s*((?:(?!<table).)*?)\s*</td></tr></table>\s*%simx', "[quote]\n\\1\n[/quote]\n\n", $new_text);
            $new_text = preg_replace('%<div class="quote">\s*<div class="quotetitle">. (?:quot(?:ing|e):? (?:.b.)*(?:<a[^>]*>)?(?:<span[^>]*>)?([^<]*?)(?:</span>)?(?:</a>)?(?:./b.)*|[^<]*)\s*(?:<br>)*\s*</div>\s*<div class="quotetext">((?:(?!<div class="quote").)*?)</div></div>%sim', '[quote=\1]\2[/quote]', $new_text);

            if ($new_text == $text) break;
            $text = $new_text;
        }
        $text = str_replace('[quote=]', '[quote]', $text);
        $text = str_ireplace('<blockquote>', '[quote]', $text);
        $text = str_ireplace('</blockquote>', '[/quote]', $text);

        // Nested paragraphs
        while (true) {
            $new_text = preg_replace('%<p[^>]*>((?:(?!<p).)*)</p>%si', "\\1\n\n", $text);
            if ($new_text == $text) break;
            $text = $new_text;
        }
        $text = preg_replace('%<p>%sim', "\n\n", $text); // unbalanced
        $text = preg_replace('%</p>%sim', "\n\n", $text); // unbalanced

        // Smiley images
        $text = preg_replace('/src=\'\\\\\\\\"(.*?)\\\\\\\\"\'/sim', 'src="\1"', $text);
        $text = preg_replace('% *<img[^>]* src=["\']+(?:http://www.snarkpit.com)?/?images/smiles/+icon_(.*?)\.gif["\']+[^>]*> *%si', ' :\1: ', $text);
        $text = preg_replace('% *<img[^>]* src=["\']+(?:http://www.snarkpit.com)?/?images/smiles/+(.*?)\.gif["\']+[^>]*> *%si', ' :\1: ', $text);
        $text = preg_replace('% *<img[^>]* src=["\']+(?:http://www.snarkpit.com)?/?images/smiles/+["\']+[^>]*> *%si', '', $text);

        // Other images
        $text = preg_replace('/<img[^>]*? src=["\']+([^"]*?)["\']+[^>]*>/sim', '[simg]\1[/simg]', $text);

        // Lists
        $text = preg_replace('%<ul>[\r\n]*(.*?)</ul>[\r\n]*%sim', "[list]\n\\1[/list]\n\n", $text);
        $text = preg_replace('%<ol>(.*?)</ol>%sim', "[list]\n\\1[/list]\n", $text);
        $text = preg_replace("%<li>(.*?)(?:</li>|\n)[\r\n]*%sim", "[*] \\1\n", $text);


        // Links
        $text = preg_replace('%<a[^>]*? href="([^"]+)"[^>]*?></a>%sim', '[url]\1[/url]', $text); // empty
        $text = preg_replace('%<a[^>]*? href="([^"]+)"[^>]*?>\g{1}</a>%si', '[url]\1[/url]', $text);
        $text = preg_replace('%<a[^>]*? href="([^"]+)"[^>]*?>(.*?)</a>%si', '[url=\1]\2[/url]', $text);

        // Nested font tags
        while (true) {
            $new_text = preg_replace_callback('%<font([^>]*?)>((?:(?!</?font).)*)</font>%sim', function ($matches) {
                $props = explode(' ', trim($matches[1] ?: ''));
                $size = '';
                $color = '';
                foreach ($props as $prop) {
                    if (preg_match('/(.*?)=([\'"]*)(.*)\g{2}/sim', $prop, $m)) {
                        if ($m[1] == 'color') $color = $m[3];
                        else if ($m[1] == 'size') $size = $m[3];
                    }
                }
                if ($size && is_numeric($size)) {
                    switch ($size) {
                        case '1': $size = '10'; break;
                        case '2': $size = '13'; break;
                        case '3': $size = '16'; break;
                        case '4': $size = '18'; break;
                        case '5': $size = '24'; break;
                        case '6': $size = '32'; break;
                        default : $size = '40'; break;
                    }
                }
                $in = $matches[2];
                if ($size && $color) $in = "[size=$size][color=$color]{$in}[/color][/size]";
                else if ($size) $in = "[size=$size]{$in}[/size]";
                else if ($color) $in = "[color=$color]{$in}[/color]";
                return $in;
            }, $text);
            if ($new_text == $text) break;
            $text = $new_text;
        }

        // Text stuff
        $text = preg_replace('%<strong>(.*?)</strong>%sim', '[b]\1[/b]', $text);
        $text = preg_replace('%<b>(.*?)</b>%sim', '[b]\1[/b]', $text);
        $text = preg_replace('%<em>(.*?)</em>%sim', '[i]\1[/i]', $text);
        $text = preg_replace('%<i>(.*?)</i>%sim', '[i]\1[/i]', $text);
        $text = preg_replace('%<u>(.*?)</u>%sim', '[u]\1[/u]', $text);
        $text = preg_replace('%<font[^>]*>%sim', '', $text); // unbalanced
        $text = preg_replace('%</font>%sim', '', $text); // unbalanced

        $text = preg_replace('%<span[^>]*>((?:(?!<span).)*?)</span>%simx', '\1', $text);
    }

    // Newline cleanup
    $text = str_replace("\r", '', $text);
    $text = preg_replace('/(?:\s*\n){2,}/sim', "\n\n", $text);

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
    /** @var LogicAndTrick\WikiCodeParser\Parser $parser */
    $parser = app('bbcode');
    $result = $parser->ParseResult($text, $scope);
    return $result->ToHtml();
}

function bbcode_result($text, $scope = '') {
    /** @var LogicAndTrick\WikiCodeParser\Parser $parser */
    $parser = app('bbcode');
    $result = $parser->ParseResult($text, $scope);
    return $result;
}

/**
 * @param $avg float
 * @return string
 */
function rating_image($avg) {
    $avg = round($avg);
    if ($avg < 0) $avg = 0;
    if ($avg > 5) $avg = 5;
    return asset('images/ratings/'.$avg.'.gif');
}

/**
 * @param $avg float
 * @param $num integer
 * @return string
 */
function rating_summary($avg, $num) {
    if ($num == 0) return 'unrated';

    $avg = round($avg, 2);
    if ($avg < 0) $avg = 0;
    if ($avg > 5) $avg = 5;
    return $num . ' rating' . ($num == 1 ? '' : 's')
        . ' / '
        . $avg . ' star' . ($avg == 1 ? '' : 's');
}

/**
 * Removes invalid emails from an array of email addresses
 * @param array $array
 * @return array
 */
function filter_valid_emails($array) {
    $validator = Validator::make([], []);
    return array_filter($array, fn($x) => $validator->validateEmail(null, $x, ['rfc']));
}
