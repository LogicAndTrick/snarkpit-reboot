<?php

namespace App\Http\Controllers;

use App\Models\Forum;
use App\Models\ForumPost;
use App\Models\ForumThread;
use App\Models\Game;
use App\Models\Map;
use App\Models\MapImage;
use App\Models\MapRating;
use App\Models\MapStatus;
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
        $map->timestamps = false;
        $map->save();
        $map->timestamps = true;

        $page = intval($request->input('page')) ?: 1;
        $post_query = ForumPost::with('user')->where('thread_id', '=', $map->thread_id)->whereNull('deleted_at')->orderByDesc('created_at')->orderByDesc('id');

        // Exclude the first post from the discussion thread
        $first_post = ForumPost::query()->where('thread_id', '=', $map->thread_id)->whereNull('deleted_at')->orderBy('id')->first();
        if ($first_post) $post_query = $post_query->where('id', '!=', $first_post->id);

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

        $map = Map::findOrFail($id);
        if ($map->user_id === Auth::id()) abort(403, "You can't rate your own map");

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

    public function getCreate() {
        $this->loggedIn();
        $games = Game::query()->orderBy('name')->get();
        $statuses = MapStatus::query()->orderBy('id')->get();
        return view('map/create', [
            'games' => $games,
            'statuses' => $statuses
        ]);
    }

    public function postCreate(Request $request) {
        $this->loggedIn();
        $this->validate($request, [
            'name' => 'required|max:100',
            'game_id' => 'required',
            'status_id' => 'required',
            'file' => 'required_without:mirrors|max:102400|mimes:rar,zip',
            'mirrors' => 'required_without:file|max:1000',
            'image' => 'required|max:4096|mimes:jpg,jpeg',
            'images.*' => 'mimes:jpg,jpeg|max:4096',
            'text' => 'required|max:10000',
        ]);

        $map = Map::Create([
            'name' => $request->input('name'),
            'user_id' => Auth::id(),
            'game_id' => $request->input('game_id'),
            'thread_id' => null,
            'status_id' => $request->input('status_id'),
            'is_featured' => false,
            'content_text' => $request->input('text'),
            'content_html' => bbcode($request->input('text')),
            'stat_views' => 0,
            'stat_downloads' => 0,
            'stat_rating' => 0,
            'stat_ratings' => 0,
            'download_file' => '',
            'mirrors' => $request->input('mirrors') ?? '',
        ]);

        // Upload the map file
        $file = $request->file('file');
        if ($file) {
            $dir = public_path('uploads/maps/files');
            $file_name = $map->id . '_map.' . strtolower($file->getClientOriginalExtension());
            $file->move($dir, $file_name);
            $map->download_file = 'uploads/maps/files/' . $file_name;
            $map->save();
        }

        // Upload the images
        $image = $request->file('image');
        $images = $request->file('images') ?? [];
        array_unshift($images, $image);
        $imgNum = 1;
        foreach ($images as $img) {
            $dir = public_path('uploads/maps/images');
            $img_name = $map->id . '_' . $imgNum . '.' . strtolower($img->getClientOriginalExtension());
            $img->move($dir, $img_name);
            MapImage::Create([
                'map_id' => $map->id,
                'image_file' => 'uploads/maps/images/' . $img_name,
                'order_index' => $imgNum - 1
            ]);
            $imgNum++;
        }

        // Create the thread
        $forum = Forum::query()->where('name', '=', 'Maps')->first();
        if ($forum) {
            $thread = ForumThread::create([
                'forum_id' => $forum->id,
                'user_id' => Auth::id(),
                'title' => '[map] ' . $map->name,
                'description' => '',
                'is_poll' => false
            ]);
            $post_text = "This is a a discussion topic for the map:\n\n" .
                "[mapthumbs]{$map->id}[/mapthumbs]\n\n" .
                "[b]Map description:[/b]\n\n" .
                $map->content_text;
            $post = ForumPost::create([
                'thread_id' => $thread->id,
                'forum_id' => $forum->id,
                'user_id' => Auth::id(),
                'content_text' => $post_text,
                'content_html' => bbcode($post_text),
            ]);
            $map->thread_id = $thread->id;
            $map->save();
        }

        return redirect('map/view/'.$map->id);
    }
}
