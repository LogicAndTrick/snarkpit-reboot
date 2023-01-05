<?php

namespace App\Helpers\BBCode;

use LogicAndTrick\WikiCodeParser\Nodes\HtmlNode;
use LogicAndTrick\WikiCodeParser\Nodes\INode;
use LogicAndTrick\WikiCodeParser\Nodes\PlainTextNode;
use LogicAndTrick\WikiCodeParser\ParseData;
use LogicAndTrick\WikiCodeParser\Parser;
use LogicAndTrick\WikiCodeParser\State;
use LogicAndTrick\WikiCodeParser\Tags\Tag;

class ArticleEmbedTag extends Tag
{

    public function __construct()
    {
        parent::__construct('athumb');
    }

    public function FormatResult(Parser $parser, ParseData $data, State $state, string $scope, array $options, string $text): INode|null
    {
        if (!is_numeric($text)) return null;
        $id = intval($text);

        $before = '<div class="embedded article">'
                . '<div class="embed-container">'
                . '<div class="embed-content">'
                . '<div class="uninitialised" data-embed-type="article" data-article-id="' . $id . '">Loading embedded content: Article #' . $id . '</div>'
                . '</div>'
                . '</div>'
                . '</div>';
        $content = PlainTextNode::Empty();
        $after = "</div>\n";
        $ret = new HtmlNode($before, $content, $after);
        $ret->plainAfter = 'Article: ' . url('article/view', [ $text ]) . "\n";
        return $ret;
    }
}
