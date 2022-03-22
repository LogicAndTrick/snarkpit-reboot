<?php

namespace App\Helpers\BBCode\Tags;
 
class ImageTag extends Tag {

    function __construct()
    {
        $this->token = 'img';
        $this->element = 'span';
        $this->main_option = 'url';
        $this->options = array('url');
    }

    public function FormatResult($result, $parser, $state, $scope, $options, $text)
    {
        $url = $text;
        if (array_key_exists('url', $options)) {
            $url = $options['url'];
        }
        if (!preg_match('%^([a-z]{2,10}://)%i', $url)) {
            $url = 'http://' . $url;
        }

        $classes = ['embedded', 'image'];
        if ($this->element_class) $classes[] = $this->element_class;
        if ($this->token == 'simg') $classes[] = 'inline';

        $el = 'span';

        // Non-inline images should eat any whitespace after them
        if (!array_search('inline', $classes)) {
            $state->SkipWhitespace();
            $el = 'div';
        }

        return ' <' . $el . ' class="' . implode(' ', $classes) . '"><span class="caption-panel">'
             . '<img class="caption-body" src="' . $parser->CleanUrl($url) . '" alt="User posted image" />'
             . '</span></' . $el . '> ';
    }

    public function Validate($options, $text)
    {
        $url = $text;
        if (array_key_exists('url', $options)) $url = $options['url'];
        return stristr($url, '<script') === false && preg_match('%^([a-z]{2,10}://)?([^]"\n ]+?)$%i', $url);
    }
}
