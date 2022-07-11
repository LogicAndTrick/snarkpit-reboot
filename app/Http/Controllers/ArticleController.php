<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\ArticleVersion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ArticleController extends Controller
{
    public function getIndex(Request $request)
    {
        $articles = Article::with(['user', 'game', 'category', 'current_version'])->where('is_active', '=', 1);

        // filtering
        $game = intval($request->get('game'));
        if ($game > 0) $articles = $articles->where('game_id', '=', $game);
        $cat = intval($request->get('cat'));
        if ($cat > 0) $articles = $articles->where('article_category_id', '=', $cat);

        // sorting
        $sort_exp = explode('.', $request->get('sort', ''));
        if (count($sort_exp) < 2) $sort_exp = ['', ''];
        [$sort_field, $sort_dir] = $sort_exp;
        if ($sort_dir != 'asc') $sort_dir = 'desc';
        if ($sort_field == 'views') $sort_field = 'stat_views';
        else if ($sort_field == 'name') $sort_field = 'name';
        else $sort_field = 'created_at';
        $articles = $articles->orderBy($sort_field, $sort_dir);

        $articles = $articles->paginate(12)->withQueryString();
        $cats = DB::select('
            select c.id, c.name, count(d.id) as count
            from articles d
            inner join article_categories c on d.article_category_id = c.id
            ' . ($game > 0 ? "where d.game_id = $game" : '') . '
            group by c.id, c.name
            order by c.name
        ');
        $games = DB::select('
            select g.id, g.name, count(d.id) as count
            from articles d
            inner join games g on d.game_id = g.id
            ' . ($cat > 0 ? "where d.article_category_id = $cat" : '') . '
            group by g.id, g.name
            order by g.name
        ');
        return view('article.index', [
            'articles' => $articles,
            'cats' => $cats,
            'games' => $games
        ]);
    }

    public function getView(Request $request, $id)
    {
        $version = ArticleVersion::with(['article', 'article.user', 'article.category', 'article.game'])
            ->where('slug', '=', $id)
            ->firstOrFail();

        $html = $version->content_html;
        $aid = $version->article_id;
        $vid = $version->id;
        $html = preg_replace_callback('/\[image(\d+)\]/sim', function($match) use ($aid, $vid) {
            $num = $match[1];
            $path = "uploads/articles/images/article_${aid}_${vid}_${num}.jpg";
            $location = public_path($path);
            if (file_exists($location)) {
                $url = asset($path);
                return ' <div class="embedded image"><span class="caption-panel">'
                    . '<img class="caption-body" src="' . $url . '" alt="Article image" />'
                    . '</span></div> ';
            }
            return $match[0];
        }, $html);

        return view('article.view', [
            'version' => $version,
            'html' => $html
        ]);
    }
}
