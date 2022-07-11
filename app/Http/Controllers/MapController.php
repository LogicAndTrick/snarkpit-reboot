<?php

namespace App\Http\Controllers;

use App\Models\Map;
use App\Models\MapImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MapController extends Controller
{
    public function getIndex(Request $request)
    {
        $maps = Map::with(['user', 'status', 'game', 'images']);

        // filtering
        $game = intval($request->get('game'));
        if ($game > 0) $maps = $maps->where('game_id', '=', $game);
        $status = intval($request->get('status'));
        if ($status > 0) $maps = $maps->where('status_id', '=', $status);

        // sorting
        $sort_exp = explode('.', $request->get('sort', ''));
        if (count($sort_exp) < 2) $sort_exp = ['', ''];
        [$sort_field, $sort_dir] = $sort_exp;
        if ($sort_dir != 'asc') $sort_dir = 'desc';
        if ($sort_field == 'views') $sort_field = 'stat_views';
        if ($sort_field == 'downloads') $sort_field = 'stat_downloads';
        else if ($sort_field == 'name') $sort_field = 'name';
        else if ($sort_field == 'rating') $sort_field = 'stat_rating';
        else $sort_field = 'updated_at';
        $maps = $maps->orderBy($sort_field, $sort_dir);

        $maps = $maps->paginate(12)->withQueryString();
        $statuses = DB::select('
            select c.id, c.name, count(d.id) as count
            from maps d
            inner join map_statuses c on d.status_id = c.id
            ' . ($game > 0 ? "where d.game_id = $game" : '') . '
            group by c.id, c.name
            order by c.name
        ');
        $games = DB::select('
            select g.id, g.name, count(d.id) as count
            from maps d
            inner join games g on d.game_id = g.id
            ' . ($status > 0 ? "where d.status_id = $status" : '') . '
            group by g.id, g.name
            order by g.name
        ');
        return view('map.index', [
            'maps' => $maps,
            'statuses' => $statuses,
            'games' => $games
        ]);
    }

    public function getView(Request $request, $id)
    {
        $version = MapVersion::with(['map', 'map.user', 'map.category', 'map.game'])
            ->where('slug', '=', $id)
            ->firstOrFail();

        $html = $version->content_html;
        $aid = $version->map_id;
        $vid = $version->id;
        $html = preg_replace_callback('/\[image(\d+)\]/sim', function($match) use ($aid, $vid) {
            $num = $match[1];
            $path = "uploads/maps/images/map_${aid}_${vid}_${num}.jpg";
            $location = public_path($path);
            if (file_exists($location)) {
                $url = asset($path);
                return ' <div class="embedded image"><span class="caption-panel">'
                    . '<img class="caption-body" src="' . $url . '" alt="Map image" />'
                    . '</span></div> ';
            }
            return $match[0];
        }, $html);

        return view('map.view', [
            'version' => $version,
            'html' => $html
        ]);
    }
}
