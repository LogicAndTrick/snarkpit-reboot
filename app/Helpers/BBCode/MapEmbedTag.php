<?php

namespace App\Helpers\BBCode;

use LogicAndTrick\WikiCodeParser\Nodes\HtmlNode;
use LogicAndTrick\WikiCodeParser\Nodes\INode;
use LogicAndTrick\WikiCodeParser\Nodes\PlainTextNode;
use LogicAndTrick\WikiCodeParser\ParseData;
use LogicAndTrick\WikiCodeParser\Parser;
use LogicAndTrick\WikiCodeParser\State;
use LogicAndTrick\WikiCodeParser\Tags\Tag;

class MapEmbedTag extends Tag
{

    public function __construct()
    {
        parent::__construct('mthumb');
    }

    public function FormatResult(Parser $parser, ParseData $data, State $state, string $scope, array $options, string $text): INode|null
    {
        if (!is_numeric($text)) return null;
        $id = intval($text);

        $before = '<div class="embedded map">'
                . '<div class="embed-container">'
                . '<div class="embed-content">'
                . '<div class="uninitialised" data-embed-type="map" data-map-id="' . $id . '">Loading embedded content: Map #' . $id . '</div>'
                . '</div>'
                . '</div>'
                . '</div>';
        $content = PlainTextNode::Empty();
        $after = "</div>\n";
        $ret = new HtmlNode($before, $content, $after);
        $ret->plainAfter = 'Map: ' . url('map/view', [ $text ]) . "\n";
        return $ret;
    }
}
