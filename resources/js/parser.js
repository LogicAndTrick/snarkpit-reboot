const wcp = require('@logicandtrick/twhl-wikicode-parser');

class ArticleEmbedTag extends wcp.Tags.Tag {
    constructor() {
        super('athumb');
    }

    FormatResult(parser, data, state, scope, options, text) {
        const id = parseInt(text, 10);
        if (!id) return null;

        const before = '<div class="embedded article">'
            + '<div class="embed-container">'
            + '<div class="embed-content">'
            + '<div class="uninitialised" data-embed-type="article" data-article-id="' + id + '">Loading embedded content: Article #' + id + '</div>'
            + '</div>'
            + '</div>'
            + '</div>';
        const content = wcp.Nodes.PlainTextNode.Empty();
        const after = "\n";
        const ret = new wcp.Nodes.HtmlNode(before, content, after);
        ret.plainAfter = 'Article: ' + window.urls.view.article.replace('{slug}', id) + "\n";
        ret.isBlockNode = true;
        return ret;
    }
}

class DownloadEmbedTag extends wcp.Tags.Tag {
    constructor() {
        super('dlthumb');
    }

    FormatResult(parser, data, state, scope, options, text) {
        const id = parseInt(text, 10);
        if (!id) return null;

        const before = '<div class="embedded download">'
            + '<div class="embed-container">'
            + '<div class="embed-content">'
            + '<div class="uninitialised" data-embed-type="download" data-download-id="' + id + '">Loading embedded content: Download #' + id + '</div>'
            + '</div>'
            + '</div>'
            + '</div>';
        const content = wcp.Nodes.PlainTextNode.Empty();
        const after = "\n";
        const ret = new wcp.Nodes.HtmlNode(before, content, after);
        ret.plainAfter = 'Download: ' + window.urls.view.download.replace('{id}', id) + "\n";
        ret.isBlockNode = true;
        return ret;
    }
}

class MapEmbedTag extends wcp.Tags.Tag {
    constructor() {
        super('mthumb');
    }

    FormatResult(parser, data, state, scope, options, text) {
        const id = parseInt(text, 10);
        if (!id) return null;

        const before = '<div class="embedded map">'
            + '<div class="embed-container">'
            + '<div class="embed-content">'
            + '<div class="uninitialised" data-embed-type="map" data-map-id="' + id + '">Loading embedded content: Map #' + id + '</div>'
            + '</div>'
            + '</div>'
            + '</div>';
        const content = wcp.Nodes.PlainTextNode.Empty();
        const after = "\n";
        const ret = new wcp.Nodes.HtmlNode(before, content, after);
        ret.plainAfter = 'Map: ' + window.urls.view.map.replace('{id}', id) + "\n";
        ret.isBlockNode = true;
        return ret;
    }
}

const config = wcp.ParserConfiguration.Snarkpit();

config.Processors.forEach(x => {
    if (x.UrlFormatString) {
        x.UrlFormatString = window.urls.images.smiley_folder + '/{0}.gif';
    }
});

config.Tags.push(new ArticleEmbedTag());
config.Tags.push(new DownloadEmbedTag());
config.Tags.push(new MapEmbedTag());

window.parser = new wcp.Parser(config);
