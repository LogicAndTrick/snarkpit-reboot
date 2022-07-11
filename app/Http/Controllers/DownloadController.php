<?php

namespace App\Http\Controllers;

use App\Models\Download;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DownloadController extends Controller
{
    public function getIndex(Request $request)
    {
        $downloads = Download::with(['user', 'game', 'category']);

        // filtering
        $game = intval($request->get('game'));
        if ($game > 0) $downloads = $downloads->where('game_id', '=', $game);
        $cat = intval($request->get('cat'));
        if ($cat > 0) $downloads = $downloads->where('download_category_id', '=', $cat);

        // sorting
        $sort_exp = explode('.', $request->get('sort', ''));
        if (count($sort_exp) < 2) $sort_exp = ['', ''];
        [$sort_field, $sort_dir] = $sort_exp;
        if ($sort_dir != 'asc') $sort_dir = 'desc';
        if ($sort_field == 'downloads') $sort_field = 'stat_downloads';
        else if ($sort_field == 'name') $sort_field = 'name';
        else $sort_field = 'created_at';
        $downloads = $downloads->orderBy($sort_field, $sort_dir);

        $downloads = $downloads->paginate(12)->withQueryString();
        $cats = DB::select('
            select c.id, c.name, count(d.id) as count
            from downloads d
            inner join download_categories c on d.download_category_id = c.id
            ' . ($game > 0 ? "where d.game_id = $game" : '') . '
            group by c.id, c.name
            order by c.name
        ');
        $games = DB::select('
            select g.id, g.name, count(d.id) as count
            from downloads d
            inner join games g on d.game_id = g.id
            ' . ($cat > 0 ? "where d.download_category_id = $cat" : '') . '
            group by g.id, g.name
            order by g.name
        ');
        return view('download.index', [
            'downloads' => $downloads,
            'cats' => $cats,
            'games' => $games
        ]);
    }

    public function getDownload($id, Request $request) {
        $download = Download::findOrFail($id);
        $download->stat_downloads++;
        $download->save();
        $mirror = $request->get('mirror', asset($download->download_file));
        return redirect($mirror);
    }
}
