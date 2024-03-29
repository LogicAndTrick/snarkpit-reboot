<?php namespace App\Providers;

use App\Helpers\BBCode\ArticleEmbedTag;
use App\Helpers\BBCode\DownloadEmbedTag;
use App\Helpers\BBCode\MapEmbedTag;
use Illuminate\Support\ServiceProvider;
use LogicAndTrick\WikiCodeParser\Parser;
use LogicAndTrick\WikiCodeParser\ParserConfiguration;
use LogicAndTrick\WikiCodeParser\Processors\SmiliesProcessor;

class BBCodeServiceProvider extends ServiceProvider {

    protected $defer = true;

	public function register()
	{
        $this->app->singleton('bbcode', function($app) {
            return new Parser($this->getConfig());
        });
	}

    public function provides()
    {
        return [
            'bbcode'
        ];
    }

    private function getConfig() : ParserConfiguration {
        $conf = ParserConfiguration::Snarkpit();

        foreach ($conf->processors as $p) {
            if ($p instanceof SmiliesProcessor) {
                $p->urlFormatString = '/images/smilies/{0}.gif';
            }
        }

        $conf->tags[] = new ArticleEmbedTag();
        $conf->tags[] = new DownloadEmbedTag();
        $conf->tags[] = new MapEmbedTag();

        return $conf;
    }
}
