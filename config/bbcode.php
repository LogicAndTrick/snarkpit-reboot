<?php

// todo this is not fully configured for snarkpit's bbcode - it still needs list items and thumbnail embeds
return [
    'tags' => [
        // Standard inline
        [ 'class' => 'App\Helpers\BBCode\Tags\Tag',      'scopes' => [ 'inline', 'excerpt' ], 'token' => 'b',      'element' => 'strong'                                   ],
        [ 'class' => 'App\Helpers\BBCode\Tags\Tag',      'scopes' => [ 'inline', 'excerpt' ], 'token' => 'i',      'element' => 'em'                                       ],
        [ 'class' => 'App\Helpers\BBCode\Tags\Tag',      'scopes' => [ 'inline', 'excerpt' ], 'token' => 'u',      'element' => 'span', 'element_class' => 'underline'     ],
        [ 'class' => 'App\Helpers\BBCode\Tags\Tag',      'scopes' => [ 'inline', 'excerpt' ], 'token' => 's',      'element' => 'span', 'element_class' => 'strikethrough' ],

        // Standard block
        [ 'class' => 'App\Helpers\BBCode\Tags\PreTag',   'scopes' => [ ] ],
        [ 'class' => 'App\Helpers\BBCode\Tags\Tag',      'scopes' => [ ], 'token' => 'center', 'element' => 'div', 'element_class' => 'text-center'],
        [ 'class' => 'App\Helpers\BBCode\Tags\AlignTag', 'scopes' => [ ] ],
        [ 'class' => 'App\Helpers\BBCode\Tags\ListTag',  'scopes' => [ ] ],

        // Links
        [ 'class' => 'App\Helpers\BBCode\Tags\LinkTag',      'scopes' => [ 'excerpt' ], 'token' => 'url' ],
        [ 'class' => 'App\Helpers\BBCode\Tags\LinkTag',      'scopes' => [ 'excerpt' ], 'token' => 'email' ],
        [ 'class' => 'App\Helpers\BBCode\Tags\QuickLinkTag', 'scopes' => [ 'excerpt' ] ],

        // Embedded
        [ 'class' => 'App\Helpers\BBCode\Tags\ImageTag',     'scopes' => [ ], 'token' => 'img' ],
        [ 'class' => 'App\Helpers\BBCode\Tags\ImageTag',     'scopes' => [ ], 'token' => 'simg' ],
        [ 'class' => 'App\Helpers\BBCode\Tags\WikiImageTag', 'scopes' => [ ] ],

        [ 'class' => 'App\Helpers\BBCode\Tags\YoutubeTag',     'scopes' => [ ] ],
        [ 'class' => 'App\Helpers\BBCode\Tags\WikiYoutubeTag', 'scopes' => [ ] ],

        [ 'class' => 'App\Helpers\BBCode\Tags\VaultEmbedTag', 'scopes' => [ ] ],

        // Custom
        [ 'class' => 'App\Helpers\BBCode\Tags\QuoteTag',         'scopes' => [ ] ],
        [ 'class' => 'App\Helpers\BBCode\Tags\ColorTag',         'scopes' => [ 'inline', 'excerpt' ] ],
        [ 'class' => 'App\Helpers\BBCode\Tags\SizeTag',          'scopes' => [ 'inline', 'excerpt' ] ],
        [ 'class' => 'App\Helpers\BBCode\Tags\SpoilerTag',       'scopes' => [ 'inline', 'excerpt' ] ],
    ],
    'elements' => [
        [ 'class' => 'App\Helpers\BBCode\Elements\PreElement',       'scopes' => [ ] ],
        [ 'class' => 'App\Helpers\BBCode\Elements\MdLineElement',    'scopes' => [ ] ],
        [ 'class' => 'App\Helpers\BBCode\Elements\MdQuoteElement',   'scopes' => [ ] ],
    ],
    'text_processors' => [
        //[ 'class' => 'App\Helpers\BBCode\Processors\MarkdownTextProcessor', 'scopes' => [ 'inline', 'excerpt' ] ],
    ],
    'post_processors' => [
        [ 'class' => 'App\Helpers\BBCode\Processors\AutoLinkingProcessor', 'scopes' => [ 'excerpt' ] ],
        [
            'class' => 'App\Helpers\BBCode\Processors\SmiliesProcessor',
            'scopes' => [ 'inline', 'excerpt' ],
            'smilies' => [
                'icon_biggrin' => [ ':D' ],
                'sailor' => [ ':sailor:' ],
                'icon_smile' => [ ':)', ':-)' ],
                'dorky' => [ ':geek:' ],
                'sad0019' => [ ':(' ],
                'icon_eek' => [ ':-o' ],
                'grenade' => [ ':grenade:' ],
                'confused' => [ ':confused:' ],
                'icon_cool' => [ '-)' ],
                'kitty' => [ 'k1tt3h:' ],
                'laughing' => [ ':lol:' ],
                'leper' => [ ':leper:' ],
                'mad' => [ ':mad:' ],
                'tongue0010' => [ ':p' ],
                'popcorn' => [ ':popcorn:' ],
                'icon_redface' => [ ':oops:' ],
                'icon_cry' => [ ':cry:' ],
                'icon_twisted' => [ ':evil:' ],
                'rolleye0011' => [ ':roll:' ],
                'shocked' => [ ':scream:' ],
                'icon_wink' => [ '];)' ],
                'dead' => [ ':dead:' ],
                'pimp' => [ ':pimp:' ],
                'beerchug' => [ ':beer:' ],
                'chainsaw' => [ ':chainsaw:' ],
                'arse' => [ ':moonie:' ],
                'angel' => [ ':angel:' ],
                'bday' => [ ':bday:' ],
                'clap' => [ ':clap:' ],
                'computer' => [ ':computer:' ],
                'crash' => [ ':pccrash:' ],
                'dizzy' => [ ':dizzy:' ],
                'dodgy' => [ ':naughty:' ],
                'drink' => [ ':drink:' ],
                'facelick' => [ ':lick:' ],
                'frown' => [ '>:(' ],
                'heee' => [ ':hee:' ],
                'imwithstupid' => [ ':imwithstupid:' ],
                'jawdrop' => [ ':jawdrop:' ],
                'king' => [ ':king:' ],
                'ladysman' => [ ':ladysman:' ],
                'mrT' => [ ':mrt:' ],
                'nurse' => [ ':nurse:' ],
                'outtahere' => [ ':outtahere:' ],
                'aaatrigger' => [ ':aaatrigger:' ],
                'repuke' => [ ':repuke:' ],
                'rofl' => [ ':rofl:' ],
                'rolling' => [ ':rolling2:' ],
                'santa' => [ ':santa:' ],
                'smash' => [ ':smash:' ],
                'toilet' => [ ':toilet:' ],
                '44' => [ '~o)' ],
                'wavey' => [ ':wavey:' ],
                'upyours' => [ ':stfu:' ],
                'fart' => [ ':fart:' ],
                'trout' => [ ':trout:' ],
                'ar15firing' => [ ':machinegun:' ],
                'microwave' => [ ':microwave:' ],
                'guillotine' => [ ':guillotine:' ],
                'poke' => [ ':poke:' ],
                'sniper' => [ ':sniper:' ],
                'monkee' => [ ':monkee:' ],
                'bandit' => [ ':gringo:' ],
                'wtf' => [ ':wtf:' ],
                'azelito' => [ ':azelito:' ],
                'crate' => [ ':crate:' ],
                'argh' => [ ':-&amp;' ],
                'swear' => [ ':swear:' ],
                'rocketwhore' => [ ':launcher:' ],
                'skull' => [ ':skull:' ],
                'munky' => [ ':munky:' ],
                'evilgrin' => [ ':E' ],
                'banghead' => [ ':brickwall:' ],
                'wcc' => [ ':wcc:' ],
                'smiley_sherlock' => [ ':sherlock:' ],
                'nag' => [ ':nag:' ],
                'rolling_eyes' => [ ':rolling:' ],
                'angryfire' => [ ':flame:' ],
                'character' => [ ':ghost:' ],
                'character0007' => [ ':pirate:' ],
                'indifferent0016' => [ ':zzz:' ],
                'indifferent0002' => [ ':|' ],
                'love0012' => [ ':love:' ],
                'rolleye0006' => [ ':lookup:' ],
                'sad0006' => [ '];(' ],
                'scared0005' => [ ':scared:' ],
                'flail' => [ ':flail:' ],
                'emot-cowjump' => [ ':cowjump:' ],
                'emot-eng101' => [ ':teach:' ],
                'uncertain' => [ ':uncertain:' ],
                '1sm071potstir' => [ ':stirring:' ],
                'thumbs_up' => [ ':thumbsup:' ],
                'happy_open' => [ ':happy:' ],
                'snark_topic_icon' => [ ':snark:' ],
            ]
        ],
        [ 'class' => 'App\Helpers\BBCode\Processors\NewLineProcessor',     'scopes' => [ ] ],
    ]
];
