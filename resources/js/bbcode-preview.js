const parser = window.parser;

/**
 * Cheap jquery replacement
 * @param type String
 * @param cls String | undefined
 * @param contents HTMLElement | undefined
 * @param cback function
 * @returns HTMLElement
 */
function el(type, cls, contents = undefined, cback = undefined) {
    const element = document.createElement(type);
    if (cls) element.className = cls;
    if (contents) element.append(contents);
    if (cback) cback(element);
    return element;
}

/**
 *
 * @param textarea HTMLTextAreaElement
 * @param template String
 * @param cursor String
 * @param cursor2 String
 * @param force_newline Boolean
 */
function insertIntoInput(textarea, template, cursor, cursor2, force_newline) {
    let val = textarea.value || '',
        st = textarea.selectionStart || 0,
        end = textarea.selectionEnd || 0,
        prev = val.substring(0, st),
        is_newline = prev.length === 0 || prev[prev.length] === '\n',
        before = force_newline === true && !is_newline ? prev + '\n' : prev,
        between = val.substring(st, end),
        curVal = between || cursor,
        after = val.substring(end),
        c1i = template.indexOf('CUR1'),
        c2i = template.indexOf('CUR2'),
        cur = template.replace('CUR1', curVal).replace('CUR2', cursor2);
    textarea.value = before + cur + after;
    textarea.focus();

    if (c2i < 0) c2i = Number.MAX_VALUE;

    let cstart = before.length + c1i + (c2i < c1i ? cursor2.length - 4 : 0),
        cend = cstart + curVal.length;

    if (between && c2i <= val.length) {
        cstart = before.length + c2i + (c2i > c1i ? between.length - 4 : 0);
        cend = cstart + cursor2.length;
    }

    textarea.setSelectionRange(cstart, cend);
    textarea.dispatchEvent(new Event('change', { bubbles: true }))
}

var buttons = [
    [
        { icon: 'bold', title: 'Bold text', template: '*CUR1*', cur1: 'bold text', cur2: '' },
        { icon: 'italic', title: 'Italic text', template: '/CUR1/', cur1: 'italic text', cur2: '' },
        { icon: 'underline', title: 'Underline text', template: '_CUR1_', cur1: 'underline text', cur2: '' },
        { icon: 'strikethrough', title: 'Strikethrough text', template: '~CUR1~', cur1: 'strikethrough text', cur2: '' },
        { icon: 'code', title: 'Code', template: '`CUR1`', cur1: 'code', cur2: '' },
        { icon: 'palette', title: 'Colour', template: '[color=CUR2]CUR1[/color]', cur1: 'text', cur2: 'red' }
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

    const toolbar = el('div', 'btn-toolbar d-none d-md-flex');
    container.append(toolbar);

    for (let j = 0; j < buttons.length; j++) {
        const group = el('div', 'btn-group btn-group-xs mr-2');
        toolbar.append(group);
        const a = buttons[j];
        for (let i = 0; i < a.length; i++) {
            const btn = a[i];
            const b = el('button', 'btn btn-outline-dark btn-xs');
            b.setAttribute('title', btn.title);
            if (btn.icon) b.append(el('span', 'fa fa-' + btn.icon));
            if (btn.text) b.append(el('span', '',' ' + btn.text));
            group.append(b);
            b.addEventListener('click', event => {
                insertIntoInput(textarea, btn.template, btn.cur1, btn.cur2, btn.force_newline);
                event.preventDefault();
            });
        }
    }
}

function addSmilies(container, textarea) {
    const wrap = el('div', 'editor-smilies');
    container.append(wrap);
    wrap.append(el('h2', 'text-center mb-2', 'Smilies'));
    const sec = el('section', '');
    wrap.append(sec);

    const visDiv = el('div', '');
    sec.append(visDiv);

    for (let i = 0; i < smilies.length; i++) {
        const s = smilies[i];

        const img = document.createElement('img');
        img.src = window.urls.images.smiley_folder + '/' + s.img + '.gif';
        img.alt = s.code;

        const sma = document.createElement('a');
        sma.href = '#';
        sma.title = s.code;

        sma.append(img);
        visDiv.append(sma);

        sma.addEventListener('click', function(event) {
            event.preventDefault();
            insertIntoInput(textarea, ' ' + event.currentTarget.getAttribute('title') + ' CUR1', '', '');
        });
    }

    const moreLink = el('a', '', 'Show more', x => x.href = '#');
    const moreLinkCon = el('div', 'more-link text-center', moreLink);
    sec.append(moreLinkCon);
    const moreDiv = el('div', 'd-none');
    sec.append(moreDiv);

    for (let i = 0; i < more_smilies.length; i++) {
        const s = more_smilies[i];

        const img = document.createElement('img');
        img.src = window.urls.images.smiley_folder + '/' + s.img + '.gif';
        img.alt = s.code;

        const sma = document.createElement('a');
        sma.href = '#';
        sma.title = s.code;

        sma.append(img);
        moreDiv.append(sma);

        sma.addEventListener('click', function(event) {
            event.preventDefault();
            insertIntoInput(textarea, ' ' + event.currentTarget.getAttribute('title') + ' CUR1', '', '');
        });
    }

    moreLink.addEventListener('click', event => {
        moreLink.textContent = moreDiv.classList.contains('d-none') ? 'Show less' : 'Show more';
        moreDiv.classList.toggle('d-none');
        event.preventDefault();
    });
}

window.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.bbcode-input').forEach(input => {
        let group = el('div', 'form-group'),
            heading = el('div', 'mb-1 d-flex align-items-center', el('h4', 'me-auto', 'Message preview')),
            btn = el('button', 'btn btn-info btn-xs ms-2', 'Update Preview', x => x.type = 'button'),
            card = el('div', 'card'),
            panel = el('div', 'card-body bbcode'),
            form = input.closest('form'),
            ta = input.querySelector('textarea'),
            name = ta.getAttribute('name'),
            help = el('a', 'float-end btn btn-outline-secondary mb-1', 'Formatting help', x => { x.target = '_blank'; x.href = window.urls.formatting_help; }),
            btnCon = el('div', 'mb-1'),
            row = el('div', 'row'),
            colLeft = el('div', 'col-9'),
            colRight = el('div', 'col-3'),
            livePreviewInput = el('input', 'form-check-input', undefined, x => { x.type = 'checkbox'; }),
            livePreviewLabel = el('label', 'form-check w-auto', 'Live preview');

        row.append(colLeft);
        row.append(colRight);

        colLeft.append(...input.children);
        input.append(row);

        livePreviewInput.checked = !document.cookie.split(';').some(x => x.includes('live_preview=no'));
        livePreviewLabel.prepend(livePreviewInput);

        heading.append(livePreviewLabel);
        heading.append(btn);
        card.append(panel);
        group.append(heading, card);
        colLeft.append(group);
        ta.parentElement.prepend(help);

        ta.before(btnCon);
        addButtons(btnCon, ta);
        addSmilies(colRight, ta);

        const refresh = async function() {
            const formData = new FormData(form);
            const result = parser.ParseResult(formData.get(name));
            const data = result.ToHtml();

            // panel.innerText = 'Loading...';
            // const resp = await fetch(window.urls.api.format + '?field=' + name, {
            //     method: 'post',
            //     body: formData
            // });
            // const data = await resp.text();
            const event = new CustomEvent('bbcode-preview-updating', {
                detail: { html: data, element: panel }
            });
            ta.dispatchEvent(event);
            panel.innerHTML = await Promise.resolve(event.detail.html);
            panel.querySelectorAll('pre code').forEach(x => {
                hljs.highlightElement(x);
            });
            ta.dispatchEvent(new CustomEvent('bbcode-preview-updated', {
                detail: { element: panel }
            }));
        };

        btn.addEventListener('click', refresh);

        let timeout = undefined;
        const liveRefresh = function() {
            clearTimeout(timeout);
            if (!livePreviewInput.checked) return;

            timeout = setTimeout(() => {
                refresh();
            }, 250);
        };
        input.addEventListener('input', liveRefresh);
        input.addEventListener('change', liveRefresh);
        livePreviewInput.addEventListener('change', () => {
            btn.classList.toggle('d-none', livePreviewInput.checked);
            document.cookie = `live_preview=${livePreviewInput.checked?'yes':'no'}; expires=Fri, 31 Dec 9999 23:59:59 GMT;`;
            liveRefresh();
        });

        refresh();
        btn.classList.toggle('d-none', livePreviewInput.checked);
    });

    document.addEventListener('paste', async event => {
        const active = document.activeElement;
        if (!active || !active.closest('.bbcode-input')) return;

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

        const id = Date.now();

        const tempText = 'uploading image ' + id + '...';
        insertIntoInput(active, '[img:' + tempText + ']', '', '', true);

        const response = await fetch(window.urls.api.image_upload, { method: 'post', body: form });
        const json = await response.json();

        let replace;

        if (!response.ok) {
            replace = 'Error: ' + json.image[0];
        } else {
            replace = json.url;
        }
        let text = active.value;
        if (text.indexOf(tempText) >= 0) {
            text = text.replace(tempText, replace);
        } else {
            text += '\n[img:' + replace + ']';
        }
        active.value = text;
    });
});
