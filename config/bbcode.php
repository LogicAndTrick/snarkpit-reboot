<?php

use LogicAndTrick\WikiCodeParser\ParserConfiguration;
use LogicAndTrick\WikiCodeParser\Processors\SmiliesProcessor;

$conf = ParserConfiguration::Snarkpit();

foreach ($conf->processors as $p) {
    if ($p instanceof SmiliesProcessor) {
        $p->urlFormatString = '/images/smilies/{0}.gif';
    }
}

return $conf;
