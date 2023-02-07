require('./parser');
require('./bbcode-preview');
require('./image-cycler');
require('./images-form');
require('./embed');

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
window.hljs = hljs;
