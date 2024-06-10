<?php

namespace App\Http\Controllers;

use App\Events\MapCreatedEvent;
use App\Events\RecalculateSnarkmarksEvent;
use App\Models\Forum;
use App\Models\ForumPost;
use App\Models\ForumThread;
use App\Models\Game;
use App\Models\Map;
use App\Models\MapImage;
use App\Models\MapRating;
use App\Models\MapStatus;
use App\Models\UserSubscription;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Pagination\Paginator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

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
        $user = intval($request->get('user'));
        if ($user > 0) $maps = $maps->where('user_id', '=', $user);

        // sorting
        $sort_exp = explode('.', $request->get('sort', ''));
        if (count($sort_exp) < 2) $sort_exp = ['', ''];
        [$sort_field, $sort_dir] = $sort_exp;
        if ($sort_dir != 'asc') $sort_dir = 'desc';
        if ($sort_field == 'views') $sort_field = 'stat_views';
        if ($sort_field == 'downloads') $sort_field = 'stat_downloads';
        else if ($sort_field == 'name') $sort_field = 'name';
        else if ($sort_field == 'rating') $sort_field = 'stat_rating';
        else if ($sort_field == 'modified') $sort_field = 'updated_at';
        else $sort_field = 'created_at';
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
        $pag = new LengthAwarePaginator($posts, $count, 10, $page, [ 'path' => Paginator::resolveCurrentPath(), 'fragment' => 'discussion' ]);

        return view('map.view', [
            'map' => $map,
            'posts' => $pag,
            'subscription' => UserSubscription::getSubscription(Auth::user(), UserSubscription::FORUM_THREAD, $map->thread_id, true)
        ]);
    }

    public function postEmbedInfo(Request $request) {
        $id = $request->integer('id');
        $download = Map::with(['user', 'status', 'game', 'images'])
            ->where('id', '=', $id)
            ->firstOrFail();
        return response()->json($download);
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
            $image_id = Str::uuid()->toString();
            $dir = public_path('uploads/maps/images');
            $img_name = $map->id . '_' . $image_id . '.' . strtolower($img->getClientOriginalExtension());
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
                "[mthumb]{$map->id}[/mthumb]\n\n" .
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

        MapCreatedEvent::dispatch($map);
        RecalculateSnarkmarksEvent::dispatch($map->user_id);

        return redirect('map/view/'.$map->id);
    }

    public function getEdit($id) {
        $this->loggedIn();

        $map = Map::with(['images'])->findOrFail($id);
        if (!$map->isEditable()) abort(403);

        $games = Game::query()->orderBy('name')->get();
        $statuses = MapStatus::query()->orderBy('id')->get();

        return view('map/edit', [
            'map' => $map,
            'games' => $games,
            'statuses' => $statuses
        ]);
    }

    public function postEdit(Request $request) {
        $this->loggedIn();
        $id = $request->input('id');

        $map = Map::with(['images'])->findOrFail($id);
        if (!$map->isEditable()) abort(403);

        // No file uploaded - same logic as create
        $file_valid = 'required_without:mirrors|';
        $mirrors_valid = 'required_without:file|';
        if ($map->download_file) {
            // File uploaded - file is optional, and mirrors is only required if we're removing the existing file
            $file_valid = '';
            $mirrors_valid = 'required_with:remove_existing|';
        }

        $image_valid = '';
        if ($map->images->count() == 0) {
            // No current images, first image is required
            $image_valid = 'required|';
        }

        $this->validate($request, [
            'name' => 'required|max:100',
            'game_id' => 'required',
            'status_id' => 'required',
            'file' => $file_valid.'max:102400|mimes:rar,zip',
            'mirrors' => $mirrors_valid.'max:1000',
            'image' => $image_valid.'max:4096|mimes:jpg,jpeg',
            'images.*' => 'mimes:jpg,jpeg|max:4096',
            'text' => 'required|max:10000',
        ]);

        $map->name = $request->input('name');
        $map->game_id = $request->input('game_id');
        $map->status_id = $request->input('status_id');
        $map->content_text = $request->input('text');
        $map->content_html = bbcode($request->input('text'));
        $map->mirrors = $request->input('mirrors') ?? '';

        // Upload the map file
        $file = $request->file('file');
        $remove_existing = $request->boolean('remove_existing');
        if ($file) {
            $dir = public_path('uploads/maps/files');
            $file_name = $map->id . '_map.' . strtolower($file->getClientOriginalExtension());
            $file->move($dir, $file_name);
            $map->download_file = 'uploads/maps/files/' . $file_name;
        } else if ($remove_existing) {
            $map->download_file = '';
        }

        // Handle first image
        $image = $request->file('image');
        $first_image = $map->images->sortBy('order_index')->first();
        if ($image) {
            $image_id = Str::uuid()->toString();
            $dir = public_path('uploads/maps/images');
            $img_name = $map->id . '_' . $image_id . '.' . strtolower($image->getClientOriginalExtension());
            $image->move($dir, $img_name);
            $first_image->image_file = 'uploads/maps/images/' . $img_name;
            $first_image->save();
        }

        // Handle additional images
        $change_additional_images = $request->boolean('change_additional_images');
        if ($change_additional_images) {
            $map->images->filter(fn($x) => $x != $first_image)->each(fn($x) => $x->delete());
            $images = $request->file('images') ?? [];
            $idx = $first_image->order_index + 1;
            foreach ($images as $img) {
                $image_id = Str::uuid()->toString();
                $dir = public_path('uploads/maps/images');
                $img_name = $map->id . '_' . $image_id . '.' . strtolower($img->getClientOriginalExtension());
                $img->move($dir, $img_name);
                MapImage::Create([
                    'map_id' => $map->id,
                    'image_file' => 'uploads/maps/images/' . $img_name,
                    'order_index' => $idx
                ]);
                $idx++;
            }
        }

        $map->save();

        return redirect('map/view/'.$map->id);
    }

    public function getDelete($id) {
        $this->loggedIn();

        $map = Map::with(['user'])->findOrFail($id);
        if (!$map->isEditable()) abort(403);

        return view('map/delete', [
            'map' => $map
        ]);
    }

    public function postDelete(Request $request) {
        $this->loggedIn();
        $id = $request->input('id');

        $map = Map::findOrFail($id);
        if (!$map->isEditable()) abort(403);

        $map->delete();
        RecalculateSnarkmarksEvent::dispatch($map->user_id);

        return redirect('map');
    }
}
