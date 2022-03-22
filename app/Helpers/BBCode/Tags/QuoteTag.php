<?php

namespace App\Helpers\BBCode\Tags;
 
class QuoteTag extends Tag {

    function __construct()
    {
        $this->token = 'quote';
        $this->element = 'blockquote';
        $this->nested = true;
        $this->block = true;
        $this->main_option = 'name';
        $this->options = array('name');
        $this->all_options_in_main = true;
    }

    public function FormatResult($result, $parser, $state, $scope, $options, $text)
    {
        $str = '<' . $this->element;
        if ($this->element_class) $str .= ' class="' . $this->element_class . '"';
        $str .= '>';
        if (array_key_exists('name', $options)) $str .= '<strong class="quote-name">' . $options['name'] . ' said:</strong>';
        $str .= $parser->ParseBBCode($result, $text, $scope, $this->block ? 'block' : 'inline');
        $str .= '</' . $this->element . '>';
        return $str;
    }
}
