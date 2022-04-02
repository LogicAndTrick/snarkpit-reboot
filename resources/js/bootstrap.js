window.$ = require('jquery');
window._ = require('lodash');

window.axios = require('axios');
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

require('./bbcode-preview');

const hljs = require('highlight.js/lib/core');
hljs.registerLanguage('php', require('highlight.js/lib/languages/php'));
hljs.registerLanguage('dos', require('highlight.js/lib/languages/dos'));
hljs.registerLanguage('css', require('highlight.js/lib/languages/css'));
hljs.registerLanguage('cpp', require('highlight.js/lib/languages/cpp'));
hljs.registerLanguage('csharp', require('highlight.js/lib/languages/csharp'));
hljs.registerLanguage('ini', require('highlight.js/lib/languages/ini'));
hljs.registerLanguage('json', require('highlight.js/lib/languages/json'));
hljs.registerLanguage('xml', require('highlight.js/lib/languages/xml'));
hljs.registerLanguage('angelscript', require('highlight.js/lib/languages/angelscript'));
hljs.registerLanguage('javascript', require('highlight.js/lib/languages/javascript'));
hljs.highlightAll();

$(document).on('click', '.video-content .uninitialised', function(event) {
    var $t = $(this),
        ytid = $t.data('youtube-id'),
        url = 'https://www.youtube.com/embed/' + ytid + '?autoplay=1&rel=0',
        frame = $('<iframe></iframe>').attr({ src: url, frameborder: 0, allowfullscreen: ''}).addClass('caption-body');
    $t.replaceWith(frame);
});
