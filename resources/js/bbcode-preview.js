
function insertIntoInput(textarea, template, cursor, cursor2, force_newline) {
    var val = textarea.val() || '',
        st = textarea[0].selectionStart || 0,
        end = textarea[0].selectionEnd || 0,
        prev = val.substr(0, st),
        is_newline = prev.length === 0 || prev[prev.length] === '\n',
        before = force_newline === true && !is_newline ? prev + '\n' : prev,
        between = val.substring(st, end),
        curVal = between || cursor,
        after = val.substr(end),
        c1i = template.indexOf('CUR1'),
        c2i = template.indexOf('CUR2'),
        cur = template.replace('CUR1', curVal).replace('CUR2', cursor2),
        newVal = before + cur + after;
    textarea.val(newVal).focus();

    if (c2i < 0) c2i = Number.MAX_VALUE;

    var cstart = before.length + c1i + (c2i < c1i ? cursor2.length - 4 : 0),
        cend = cstart + curVal.length;

    if (between && c2i <= val.length) {
        cstart = before.length + c2i + (c2i > c1i ? between.length - 4 : 0);
        cend = cstart + cursor2.length;
    }

    textarea[0].setSelectionRange(cstart, cend);
}

var buttons = [
    [
        { icon: 'bold', title: 'Bold text', template: '*CUR1*', cur1: 'bold text', cur2: '' },
        { icon: 'italic', title: 'Italic text', template: '/CUR1/', cur1: 'italic text', cur2: '' },
        { icon: 'underline', title: 'Underline text', template: '_CUR1_', cur1: 'underline text', cur2: '' },
        { icon: 'strikethrough', title: 'Strikethrough text', template: '~CUR1~', cur1: 'strikethrough text', cur2: '' },
        { icon: 'code', title: 'Code', template: '`CUR1`', cur1: 'code', cur2: '' },
    ], [
        { icon: 'header', text: '1', title: 'Header 1', template: '= CUR1', cur1: 'Header', cur2: '' },
        { icon: 'header', text: '2', title: 'Header 2', template: '== CUR1', cur1: 'Header', cur2: '' },
        { icon: 'header', text: '3', title: 'Header 3', template: '=== CUR1', cur1: 'Header', cur2: '' },
    ], [
        { icon: 'link', title: 'Link', template: '[CUR2|CUR1]', cur1: 'link text', cur2: 'http://example.com/' },
        { icon: 'image', title: 'Image', template: '[img:CUR2|CUR1]', cur1: 'caption text', cur2: 'http://example.com/image.jpg' },
        { icon: 'video-camera', title: 'Youtube', template: '[youtube:CUR2|CUR1]', cur1: 'caption text', cur2: 'youtube_id' },
        { icon: 'quote-right', title: 'Quote', template: '> CUR1', cur1: 'quoted text', cur2: '', force_newline: true },
    ], [
        { icon: 'list-ul', title: 'Unsorted List', template: '- CUR1', cur1: 'Item 1', cur2: '', force_newline: true },
        { icon: 'list-ol', title: 'Sorted List', template: '# CUR1', cur1: 'Item 1', cur2: '', force_newline: true },
    ]
];
const smilies = [
    { img: 'icon_biggrin', code: ':D' },
    { img: 'icon_smile', code: ':)' },
    { img: 'dorky', code: ':geek:' },
    { img: 'sad0019', code: ':(' },
    { img: 'icon_eek', code: ':-o' },
    { img: 'confused', code: ':confused:' },
    { img: 'icon_cool', code: '-)' },
    { img: 'kitty', code: 'k1tt3h:' },
    { img: 'laughing', code: ':lol:' },
    { img: 'leper', code: ':leper:' },
    { img: 'mad', code: ':mad:' },
    { img: 'tongue0010', code: ':p' },
    { img: 'icon_redface', code: ':oops:' },
    { img: 'icon_twisted', code: ':evil:' },
    { img: 'rolleye0011', code: ':roll:' },
    { img: 'shocked', code: ':scream:' },
    { img: 'icon_wink', code: '];)' },
    { img: 'dodgy', code: ':naughty:' },
    { img: 'heee', code: ':hee:' },
    { img: '44', code: '~o)' },
    { img: 'wcc', code: ':wcc:' },
    { img: 'smiley_sherlock', code: ':sherlock:' },
    { img: 'nag', code: ':nag:' },
    { img: 'rolling_eyes', code: ':rolling:' },
    { img: 'angryfire', code: ':flame:' },
    { img: 'character', code: ':ghost:' },
    { img: 'character0007', code: ':pirate:' },
    { img: 'indifferent0016', code: ':zzz:' },
    { img: 'indifferent0002', code: ':|' },
    { img: 'love0012', code: ':love:' },
    { img: 'rolleye0006', code: ':lookup:' },
    { img: 'sad0006', code: '];(' },
    { img: 'scared0005', code: ':scared:' },
    { img: 'flail', code: ':flail:' },
    { img: 'emot-cowjump', code: ':cowjump:' },
    { img: 'emot-eng101', code: ':teach:' },
    { img: 'uncertain', code: ':uncertain:' },
    { img: '1sm071potstir', code: ':stirring:' },
    { img: 'thumbs_up', code: ':thumbsup:' },
    { img: 'happy_open', code: ':happy:' },
];
const more_smilies = [
    { img: 'sailor', code: ':sailor:' },
    { img: 'grenade', code: ':grenade:' },
    { img: 'popcorn', code: ':popcorn:' },
    { img: 'icon_cry', code: ':cry:' },
    { img: 'dead', code: ':dead:' },
    { img: 'pimp', code: ':pimp:' },
    { img: 'beerchug', code: ':beer:' },
    { img: 'chainsaw', code: ':chainsaw:' },
    { img: 'arse', code: ':moonie:' },
    { img: 'angel', code: ':angel:' },
    { img: 'bday', code: ':bday:' },
    { img: 'clap', code: ':clap:' },
    { img: 'computer', code: ':computer:' },
    { img: 'crash', code: ':pccrash:' },
    { img: 'dizzy', code: ':dizzy:' },
    { img: 'drink', code: ':drink:' },
    { img: 'facelick', code: ':lick:' },
    { img: 'frown', code: '>:(' },
    { img: 'imwithstupid', code: ':imwithstupid:' },
    { img: 'jawdrop', code: ':jawdrop:' },
    { img: 'king', code: ':king:' },
    { img: 'ladysman', code: ':ladysman:' },
    { img: 'mrT', code: ':mrt:' },
    { img: 'nurse', code: ':nurse:' },
    { img: 'outtahere', code: ':outtahere:' },
    { img: 'aaatrigger', code: ':aaatrigger:' },
    { img: 'repuke', code: ':repuke:' },
    { img: 'rofl', code: ':rofl:' },
    { img: 'rolling', code: ':rolling2:' },
    { img: 'santa', code: ':santa:' },
    { img: 'smash', code: ':smash:' },
    { img: 'toilet', code: ':toilet:' },
    { img: 'wavey', code: ':wavey:' },
    { img: 'upyours', code: ':stfu:' },
    { img: 'fart', code: ':fart:' },
    { img: 'trout', code: ':trout:' },
    { img: 'ar15firing', code: ':machinegun:' },
    { img: 'microwave', code: ':microwave:' },
    { img: 'guillotine', code: ':guillotine:' },
    { img: 'poke', code: ':poke:' },
    { img: 'sniper', code: ':sniper:' },
    { img: 'monkee', code: ':monkee:' },
    { img: 'bandit', code: ':gringo:' },
    { img: 'wtf', code: ':wtf:' },
    { img: 'azelito', code: ':azelito:' },
    { img: 'crate', code: ':crate:' },
    { img: 'argh', code: ':-&amp;' },
    { img: 'swear', code: ':swear:' },
    { img: 'rocketwhore', code: ':launcher:' },
    { img: 'skull', code: ':skull:' },
    { img: 'munky', code: ':munky:' },
    { img: 'evilgrin', code: ':E' },
    { img: 'banghead', code: ':brickwall:' },
    { img: 'snark_topic_icon', code: ':snark:' },
];

function addButtons(container, textarea) {

    var toolbar = $('<div class="btn-toolbar hidden-xs-only"></div>').appendTo(container);

    for (var j = 0; j < buttons.length; j++) {
        var group = $('<div class="btn-group btn-group-xs mr-2"></div>').appendTo(toolbar);
        var a = buttons[j];
        for (var i = 0; i < a.length; i++) {
            var btn = a[i];
            var b = $('<button type="button" class="btn btn-outline-dark btn-xs"></button>');
            b.attr('title', btn.title);
            if (btn.icon) b.append($('<span></span>').addClass('fa fa-' + btn.icon));
            if (btn.text) b.append($('<span></span>').text(' ' + btn.text));
            group.append(b);
            b.on('click', insertIntoInput.bind(window, textarea, btn.template, btn.cur1, btn.cur2, btn.force_newline));
        }
    }
}

function addSmilies(container, textarea) {
    const wrap = $('<div class="editor-smilies"></div>').appendTo(container);
    wrap.append('<h2 class="text-center mb-2">Smilies</h2>');
    const sec = $('<section></section>').appendTo(wrap);

    const visDiv = $('<div></div>').appendTo(sec);

    for (let i = 0; i < smilies.length; i++) {
        const s = smilies[i];
        const sma = $('<a href="#" title="' + s.code + '"><img src="' + window.urls.images.smiley_folder + '/' + s.img + '.gif" /></a>');
        visDiv.append(sma);

        sma.on('click', function(event) {
            event.preventDefault();
            insertIntoInput(textarea, ' ' + $(event.currentTarget).attr('title') + ' CUR1', '', '');
        });
    }

    const moreLink = $('<a href="#">Show more</a>"');
    const moreLinkCon = $('<div class="more-link text-center"></div>').append(moreLink).appendTo(sec);
    const moreDiv = $('<div class="d-none"></div>').appendTo(sec);

    for (let i = 0; i < more_smilies.length; i++) {
        const s = more_smilies[i];
        const sma = $('<a href="#" title="' + s.code + '"><img src="' + window.urls.images.smiley_folder + '/' + s.img + '.gif" /></a>');
        moreDiv.append(sma);

        sma.on('click', function(event) {
            event.preventDefault();
            insertIntoInput(textarea, ' ' + $(event.currentTarget).attr('title') + ' CUR1', '', '');
        });
    }

    moreLink.on('click', event => {
        moreLink.text(moreDiv.hasClass('d-none') ? 'Show less' : 'Show more');
        moreDiv.toggleClass('d-none');
        event.preventDefault();
    });
}

$(function() {
    $('.bbcode-input').each(function() {
        var $t = $(this),
            group = $('<div class="form-group"></div>'),
            heading = $('<h4 class="d-flex"><span class="me-auto">Message preview</span></h4>)'),
            btn = $('<button type="button" class="btn btn-info btn-xs">Update Preview</button>'),
            card = $('<div class="card"></div>'),
            panel = $('<div class="card-body bbcode"></div>'),
            form = $t.closest('form'),
            ta = $t.find('textarea'),
            name = ta.attr('name'),
            //help = $('<a class="pull-right" target="_blank" href="' + window.urls.wiki.formatting_guide + '">Formatting help</a>'),
            btnCon = $('<div class="mb-1"></div>'),
            row = $('<div class="row"></div>'),
            colLeft = $('<div class="col-9"></div>'),
            colRight = $('<div class="col-3"></div>');

        row.append(colLeft);
        row.append(colRight);

        colLeft.append($t.children());
        $t.append(row);

        heading.append(btn);
        card.append(panel);
        group.append(heading).append(card);
        colLeft.append(group);
        //ta.parent().prepend(help);

        ta.before(btnCon);
        addButtons(btnCon, ta);
        addSmilies(colRight, ta);

        var refresh = function() {
            panel.html('Loading...');
            $.post(window.urls.api.format + '?field=' + name, form.serializeArray(), async function(data) {
                const event = new CustomEvent('bbcode-preview-updating', {
                    detail: { html: data, element: panel }
                });
                ta[0].dispatchEvent(event);
                panel.html(await Promise.resolve(event.detail.html));
                panel.find('pre code').each(function() {
                    hljs.highlightElement(this);
                });
                ta[0].dispatchEvent(new CustomEvent('bbcode-preview-updated', {
                    detail: { element: panel[0] }
                }));
            });
        };

        btn.on('click', refresh);
    });

    document.addEventListener('paste', async event => {
        const active = document.activeElement;
        if (!active || !$(active).closest('.bbcode-input').length) return;

        const data = event.clipboardData;
        if (!data.getData || data.items.length !== 1) return;

        const item = data.items[0];

        const fileData = item.getAsFile();
        if (!fileData || !(fileData instanceof File)) return;

        let fileName;
        switch (item.type) {
            case "image/gif":
                fileName = "image.gif";
                break;
            case "image/png":
                fileName = "image.png";
                break;
            case "image/jpeg":
                fileName = "image.jpg"
                break;
            default:
                return;
        }

        event.preventDefault();

        const form = new FormData();
        form.append('image', fileData, fileName);

        const $t = $(active);
        const id = Date.now();

        const tempText = 'uploading image ' + id + '...';
        insertIntoInput($t, '[img:' + tempText + ']', '', '', true);

        const response = await fetch(window.urls.api.image_upload, { method: 'post', body: form });
        const json = await response.json();

        let replace;

        if (!response.ok) {
            replace = 'Error: ' + json.image[0];
        } else {
            replace = json.url;
        }
        let text = $t.val();
        if (text.indexOf(tempText) >= 0) {
            text = text.replace(tempText, replace);
        } else {
            text += '\n[img:' + replace + ']';
        }
        $t.val(text);
    });
});
