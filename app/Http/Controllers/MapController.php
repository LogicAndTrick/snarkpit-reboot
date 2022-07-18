<?php

namespace App\Http\Controllers;

use App\Models\ForumPost;
use App\Models\Map;
use App\Models\MapImage;
use App\Models\MapRating;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Pagination\Paginator;
use Illuminate\Support\Facades\Auth;
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
        $map = Map::with(['user', 'status', 'game', 'images', 'ratings'])
            ->findOrFail($id);

        $map->stat_views++;
        $map->save();

        $page = intval($request->input('page')) ?: 1;
        $post_query = ForumPost::with('user')->where('thread_id', '=', $map->thread_id)->whereNull('deleted_at')->orderByDesc('created_at')->orderByDesc('id');
        $count = $post_query->getQuery()->getCountForPagination();
        $posts = $post_query->skip(($page - 1) * 10)->take(10)->get();
        $pag = new LengthAwarePaginator($posts, $count, 10, $page, [ 'path' => Paginator::resolveCurrentPath() ]);

        return view('map.view', [
            'map' => $map,
            'posts' => $pag
        ]);
    }

    public function getDownload($id, Request $request) {
        $map = Map::findOrFail($id);
        $map->stat_downloads++;
        $map->save();
        $mirror = $request->get('mirror', asset($map->download_file));
        return redirect($mirror);
    }

    public function postRate(Request $request) {
        $this->loggedIn();
        $id = $request->input('id');
        $r = $request->input('rating');
        $rating = MapRating::where('map_id', '=', $id)->where('user_id', '=', Auth::id())->first();
        if ($r == 0) {
            if ($rating) $rating->delete();
        } else {
            if (!$rating) {
                $rating = new MapRating();
                $rating->map_id = $id;
                $rating->user_id = Auth::id();
            }
            $rating->rating = $r;
            $rating->save();
        }
        return redirect('map/view/'.$id);
    }
}
