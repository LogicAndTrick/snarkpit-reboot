<?php

namespace App\Helpers\BBCode\Tags;

class SizeTag extends Tag {

    function __construct()
    {
        $this->token = 'size';
        $this->element = 'span';
        $this->main_option = 'size';
        $this->options = array('size');
        $this->all_options_in_main = true;
    }

    public function FormatResult($result, $parser, $state, $scope, $options, $text)
    {
        $str = '<' . $this->element;
        if ($this->element_class) $str .= ' class="' . $this->element_class . '"';
        if (array_key_exists('size', $options)) {
            $str .= ' style="';
            if (array_key_exists('size', $options) && SizeTag::IsValidSize($options['size'])) $str .= 'font-size: ' . $options['size'] . 'px;';
            $str .= '"';
        }
        $str .= '>';
        $str .= $parser->ParseBBCode($result, $text, $scope, $this->block ? 'block' : 'inline');
        $str .= '</' . $this->element . '>';
        return $str;
    }

    public static function IsValidSize($text)
    {
        return is_numeric($text) && $text >= 6 && $text <= 40;
    }
}
