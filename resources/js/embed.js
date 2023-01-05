// Youtube
$(document).on('click', '.video-content .uninitialised', function(event) {
    var $t = $(this),
        ytid = $t.data('youtube-id'),
        url = 'https://www.youtube.com/embed/' + ytid + '?autoplay=1&rel=0',
        frame = $('<iframe></iframe>').attr({ src: url, frameborder: 0, allowfullscreen: ''}).addClass('caption-body');
    $t.replaceWith(frame);
});

// Articles & Maps
function esc(text) {
    const e = document.createElement('div');
    e.textContent = text;
    return e.innerHTML;
}

const embed_callbacks = {
    article: function(element, json) {
        const thread_link = json.forum_thread_id ?
            `<li><a href="${window.urls.view.thread.replace('{id}', json.forum_thread_id)}">Discussion topic &raquo;</a></li>`
            : '';
        const template = `
            <div class="row">
                <div class="col-3 text-center">
                    <img class="img-fluid" src="${window.urls.images.root}${json.current_version.thumbnail_file || 'images/no_image.png'}" alt="Article thumbnail" />
                </div>
                <div class="col-6">
                    <h2>
                        <a href="${window.urls.view.article.replace('{slug}', json.current_version.slug)}">${esc(json.current_version.title)}</a>
                    </h2>
                    <div class="bbcode">${esc(json.current_version.description)}</div>
                </div>
                <div class="col-3">
                    <ul class="list-unstyled">
                        <li>by <a href="${window.urls.view.user.replace('{id}', json.user_id)}">${json.user.name}</a></li>
                        <li>in <a href="${window.urls.list.article}?game=${json.game_id}&cat=${json.article_category_id}">${json.game.name} &raquo; ${json.category.name}</a></li>
                        <li>updated ${new Date(json.created_at).toLocaleDateString()}</li>
                        <li>viewed ${json.stat_views} time${json.stat_views == 1 ? '' : 's'}</li>
                        ${thread_link}
                    </ul>
                </div>
            </div>
        `.trim();

        console.log(element, template);
        const embed = document.createElement('div');
        embed.innerHTML = template;
        element.replaceWith(embed.children[0]);
    }
};

const embed_cache = {};

async function load_embed(el) {
    el.textContent = 'Loading...';
    const par = el.parentElement;
    const typ = el.getAttribute('data-embed-type');
    const id = el.getAttribute('data-' + typ + '-id');
    const url = window.urls.embed[typ];

    if (el.getAttribute('data-stop')) return;
    el.setAttribute('data-stop', 'true');

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
        json = await resp.json();
        embed_cache[cacheKey] = json;
    }
    embed_callbacks[typ].call(window, el, json);
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
