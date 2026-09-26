import { ParserConfiguration, Parser, Tag, PlainTextNode, HtmlNode, ParseData, State, INode, SmiliesProcessor } from '@logicandtrick/twhl-wikicode-parser';

class ArticleEmbedTag extends Tag {
    constructor() {
        super('athumb');
    }

    FormatResult(parser: Parser, data: ParseData, state: State, scope: string, options: Record<string, string>, text: string): INode {
        const id = parseInt(text, 10);
        if (!id) return null;

        const before = '<div class="embedded article">'
            + '<div class="embed-container">'
            + '<div class="embed-content">'
            + '<div class="uninitialised" data-embed-type="article" data-article-id="' + id + '">Loading embedded content: Article #' + id + '</div>'
            + '</div>'
            + '</div>'
            + '</div>';
        const content = PlainTextNode.Empty();
        const after = "\n";
        const ret = new HtmlNode(before, content, after);
        ret.PlainAfter = 'Article: ' + window.urls.view.article.replace('{slug}', id.toString()) + "\n";
        ret.IsBlockNode = true;
        return ret;
    }
}

class DownloadEmbedTag extends Tag {
    constructor() {
        super('dlthumb');
    }

    FormatResult(parser: Parser, data: ParseData, state: State, scope: string, options: Record<string, string>, text: string): INode {
        const id = parseInt(text, 10);
        if (!id) return null;

        const before = '<div class="embedded download">'
            + '<div class="embed-container">'
            + '<div class="embed-content">'
            + '<div class="uninitialised" data-embed-type="download" data-download-id="' + id + '">Loading embedded content: Download #' + id + '</div>'
            + '</div>'
            + '</div>'
            + '</div>';
        const content = PlainTextNode.Empty();
        const after = "\n";
        const ret = new HtmlNode(before, content, after);
        ret.PlainAfter = 'Download: ' + window.urls.view.download.replace('{id}', id.toString()) + "\n";
        ret.IsBlockNode = true;
        return ret;
    }
}

class MapEmbedTag extends Tag {
    constructor() {
        super('mthumb');
    }

    FormatResult(parser: Parser, data: ParseData, state: State, scope: string, options: Record<string, string>, text: string): INode {
        const id = parseInt(text, 10);
        if (!id) return null;

        const before = '<div class="embedded map">'
            + '<div class="embed-container">'
            + '<div class="embed-content">'
            + '<div class="uninitialised" data-embed-type="map" data-map-id="' + id + '">Loading embedded content: Map #' + id + '</div>'
            + '</div>'
            + '</div>'
            + '</div>';
        const content = PlainTextNode.Empty();
        const after = "\n";
        const ret = new HtmlNode(before, content, after);
        ret.PlainAfter = 'Map: ' + window.urls.view.map.replace('{id}', id.toString()) + "\n";
        ret.IsBlockNode = true;
        return ret;
    }
}

const config = ParserConfiguration.Snarkpit();

config.Processors.forEach(x => {
    if (x instanceof SmiliesProcessor) {
        x.UrlFormatString = window.urls.images.smiley_folder + '/{0}.gif';
    }
});

config.Tags.push(new ArticleEmbedTag());
config.Tags.push(new DownloadEmbedTag());
config.Tags.push(new MapEmbedTag());

export default new Parser(config);
