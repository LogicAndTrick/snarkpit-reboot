<?php

namespace App\Helpers\BBCode\Tags;

class AlignTag extends Tag {

    function __construct()
    {
        $this->token = 'align';
        $this->element = 'div';
        $this->main_option = 'align';
        $this->options = array('align');
        $this->all_options_in_main = true;
    }

    public function FormatResult($result, $parser, $state, $scope, $options, $text)
    {
        $str = '<' . $this->element;
        $cls = $this->element_class . ' ';
        if (array_key_exists('align', $options) && AlignTag::IsValidAlign($options['align'])) {
            $cls .= 'text-' . AlignTag::ConvertAlign($options['align']);
        }
        $str .= ' class="' . $cls . '"';
        $str .= '>';
        $str .= $parser->ParseBBCode($result, $text, $scope, $this->block ? 'block' : 'inline');
        $str .= '</' . $this->element . '>';
        return $str;
    }

    public static function IsValidAlign($text)
    {
        return $text == 'left' || $text == 'right' || $text == 'center';
    }

    public static function ConvertAlign($text)
    {
        if ($text == 'left') return 'start';
        if ($text == 'right') return 'end';
        return 'center';
    }
}
