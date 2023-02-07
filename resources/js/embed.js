// Youtube
document.addEventListener('click', event => {
    const target = event.target;
    if (!target) return;

    const uninit = event.target.matches('.uninitialised') ? event.target : target.closest('.uninitialised');
    if (!uninit) return;

    const yt = uninit.closest('.video-content');
    if (!yt) return;

    const ytid = target.getAttribute('data-youtube-id');
    const url = 'https://www.youtube.com/embed/' + ytid + '?autoplay=1&rel=0';

    const frame = document.createElement('iframe');
    frame.setAttribute('src', url);
    frame.setAttribute('frameborder', '0');
    frame.setAttribute('allowfullscreen', '');
    frame.classList.add('caption-body');

    target.replaceWith(frame);
});

// Articles & Maps
function esc(text) {
    const e = document.createElement('div');
    e.textContent = text;
    return e.innerHTML;
}

function attr_esc(text) {
    text = (text || '').toString();
    return text.replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

const embed_callbacks = {
    error: function(element, json) {
        const template = `<div class="text-center">
            <h2><span class="fa fa-warning"></span> Error: Unable to load ${json.type}.</h2>
        </div>`;
        console.log(template);
        const embed = document.createElement('div');
        embed.innerHTML = template;
        element.replaceWith(embed.children[0]);
    },
    article: function(element, json) {
        const thread_link = json.forum_thread_id ?
            `<li><a href="${attr_esc(window.urls.view.thread.replace('{id}', json.forum_thread_id))}">Discussion topic &raquo;</a></li>`
            : '';
        const template = `
            <div class="row">
                <div class="col-3 text-center">
                    <img class="img-fluid" src="${attr_esc(window.urls.images.root)}${attr_esc(json.current_version.thumbnail_file || 'images/no_image.png')}" alt="Article thumbnail" />
                </div>
                <div class="col-6">
                    <h2>
                        <a href="${attr_esc(window.urls.view.article.replace('{slug}', json.current_version.slug))}">${esc(json.current_version.title)}</a>
                    </h2>
                    <div class="bbcode">${esc(json.current_version.description)}</div>
                </div>
                <div class="col-3">
                    <ul class="list-unstyled">
                        <li>by <a href="${attr_esc(window.urls.view.user.replace('{id}', json.user_id))}">${json.user.name}</a></li>
                        <li>in <a href="${attr_esc(window.urls.list.article)}?game=${attr_esc(json.game_id)}&cat=${attr_esc(json.article_category_id)}">${esc(json.game.name)} &raquo; ${esc(json.category.name)}</a></li>
                        <li>updated ${esc(new Date(json.created_at).toLocaleDateString())}</li>
                        <li>viewed ${esc(json.stat_views)} time${json.stat_views == 1 ? '' : 's'}</li>
                        ${thread_link}
                    </ul>
                </div>
            </div>
        `.trim();
        const embed = document.createElement('div');
        embed.innerHTML = template;
        element.replaceWith(embed.children[0]);
    },
    download: function(element, json) {
        const mirrors = json.mirror_list.map(x => `<li class="mb-1"><a target="_blank" href="${attr_esc(x.url)}" class="btn btn-primary">${esc(x.text)}</a></li>`).join('');
        const size = json.file_size_readable ? `<li>Size: ${json.file_size_readable}</li>` : '';
        const template = `
            <div class="row">
                <div class="col-3 text-center">
                    <img class="img-fluid" src="${attr_esc(window.urls.images.root)}${attr_esc(json.image_file || 'images/no_image.png')}" alt="Article thumbnail" />
                </div>
                <div class="col-6">
                    <h2>
                        <a href="${attr_esc(window.urls.view.download.replace('{id}', json.id))}">${esc(json.name)}</a>
                    </h2>
                    <div class="bbcode">${json.content_html}</div>
                </div>
                <div class="col-3">
                    <ul class="list-unstyled">
                        ${mirrors}
                        ${size}
                        <li>by <a href="${attr_esc(window.urls.view.user.replace('{id}', json.user_id))}">${esc(json.user.name)}</a></li>
                        <li>in <a href="${attr_esc(window.urls.list.download)}?game=${attr_esc(json.game_id)}&cat=${attr_esc(json.download_category_id)}">${esc(json.game.name)} &raquo; ${esc(json.category.name)}</a></li>
                        <li>updated ${esc(new Date(json.created_at).toLocaleDateString())}</li>
                        <li>downloaded ${esc(json.stat_downloads)} time${json.stat_downloads == 1 ? '' : 's'}</li>
                        <li><a href="${attr_esc(window.urls.view.thread.replace('{id}', json.thread_id))}">Discussion topic &raquo;</a></li>
                    </ul>
                </div>
            </div>
        `.trim();
        const embed = document.createElement('div');
        embed.innerHTML = template;
        element.replaceWith(embed.children[0]);
    },
    map: function(element, json) {
        const images = json.images.length
            ? json.images.map((x, i) => `<img class="img-fluid ${i==0?'':'d-none'}" src="${attr_esc(window.urls.images.root+x.image_file)}" />`).join('')
            : `<img class="img-fluid" src="${attr_esc(window.urls.images.no_image)}" />`;
        const template = `
            <div>
                <h1 class="d-flex align-items-start">
                    <a href="${attr_esc(window.urls.list.map)}?game=${attr_esc(json.game_id)}">
                        <img src="${attr_esc(window.urls.images.root + 'images/games/' + json.game_id + '.png')}" alt="${json.game.name}" />
                    </a>
                    <span class="flex-fill">
                        <a href="${attr_esc(window.urls.view.map.replace('{id}', json.id))}">
                            ${esc(json.name)}
                        </a>
                        by
                        <a href="${attr_esc(window.urls.view.user.replace('{id}', json.user_id))}">
                            ${esc(json.user.name)}
                        </a>
                    </span>
                    <span class="game-image-filler"></span>
                </h1>
                <div class="image-cycler m-auto">
                    ${images}
                    <span class="controls"></span>
                </div>
            </div>
        `.trim();
        const embed = document.createElement('div');
        embed.innerHTML = template;
        element.replaceWith(embed.children[0]);
    }
};

const embed_cache = {};

async function load_embed(el) {
    el.textContent = 'Loading...';
    const par = el.parentElement;
    let typ = el.getAttribute('data-embed-type');
    const id = el.getAttribute('data-' + typ + '-id');
    const url = window.urls.embed[typ];

    if (el.getAttribute('data-stop')) return;
    el.setAttribute('data-stop', 'true');
    observer.unobserve(el);

    let json;
    const cacheKey = `${typ}:${id}`;
    if (embed_cache[cacheKey]) {
        json = embed_cache[cacheKey];
    } else {
        const resp = await fetch(url, {
            method: 'post',
            body: JSON.stringify({ id }),
            headers: { 'Content-Type': 'application/json' }
        });
        if (resp.ok) {
            json = await resp.json();
            embed_cache[cacheKey] = json;
        } else {
            json = { resp, type: typ };
            embed_cache[cacheKey] = json;
            typ = 'error';
        }
    }
    embed_callbacks[typ].call(window, el, json);
    init_all_image_cyclers(document);
}

const observer = new IntersectionObserver((entries, options) => {
    entries.forEach(x => {
        if (!x.isIntersecting) return;
        load_embed(x.target);
    });
}, {
    threshold: 0.1
});

function addEmbedInit(el) {
    el.querySelectorAll('.embed-content .uninitialised').forEach(x => {
        observer.observe(x);
    });
}

document.querySelectorAll('.bbcode-input textarea').forEach(x => {
    x.addEventListener('bbcode-preview-updated', event => {
        addEmbedInit(event.detail.element);
    });
});

addEmbedInit(document);
