<?php

namespace App\Helpers\BBCode\Tags;

class ListTag extends Tag {

    function __construct()
    {
        $this->token = 'list';
        $this->element = 'ul';
        $this->block = true;
    }

    public function Validate($options, $text)
    {
        $items = array_filter(array_map(fn($x) => trim($x), explode('[*]', $text)), fn($x) => $x && strlen($x) > 0);
        return count($items) > 0 && parent::Validate($options, $text);
    }

    public function FormatResult($result, $parser, $state, $scope, $options, $text)
    {
        $str = '<' . $this->element;
        if ($this->element_class) $str .= ' class="' . $this->element_class . '"';
        $str .= '>';
        $items = array_filter(array_map(fn($x) => trim($x), explode('[*]', $text)), fn($x) => $x && strlen($x) > 0);
        foreach ($items as $item) {
            $str .= '<li>';
            $str .= $parser->ParseBBCode($result, $item, $scope, $this->block ? 'block' : 'inline');
            $str .= '</li>';
        }
        $str .= '</' . $this->element . '>';
        return $str;
    }
}
