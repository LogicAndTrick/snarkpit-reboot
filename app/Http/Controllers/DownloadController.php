<?php

namespace App\Http\Controllers;

use App\Models\Download;
use App\Models\DownloadCategory;
use App\Models\Forum;
use App\Models\ForumPost;
use App\Models\ForumThread;
use App\Models\Game;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Pagination\Paginator;
use Illuminate\Support\Facades\Auth;
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
        $user = intval($request->get('user'));
        if ($user > 0) $downloads = $downloads->where('user_id', '=', $user);

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

    public function getView(Request $request, $id)
    {
        $download = Download::with(['user', 'category', 'game'])
            ->where('id', '=', $id)
            ->firstOrFail();

        $page = intval($request->input('page')) ?: 1;
        $post_query = ForumPost::with('user')->where('thread_id', '=', $download->thread_id)->whereNull('deleted_at')->orderByDesc('created_at')->orderByDesc('id');

        // Exclude the first post from the discussion thread
        $first_post = ForumPost::query()->where('thread_id', '=', $download->thread_id)->whereNull('deleted_at')->orderBy('id')->first();
        if ($first_post) $post_query = $post_query->where('id', '!=', $first_post->id);

        $count = $post_query->getQuery()->getCountForPagination();
        $posts = $post_query->skip(($page - 1) * 10)->take(10)->get();
        $pag = new LengthAwarePaginator($posts, $count, 10, $page, [ 'path' => Paginator::resolveCurrentPath(), 'fragment' => 'discussion' ]);

        return view('download.view', [
            'download' => $download,
            'posts' => $pag
        ]);
    }

    public function postEmbedInfo(Request $request) {
        $id = $request->integer('id');
        $download = Download::with(['user', 'category', 'game'])
            ->where('id', '=', $id)
            ->firstOrFail();
        return response()->json($download);
    }

    public function getDownload($id, Request $request) {
        $download = Download::findOrFail($id);
        $download->stat_downloads++;
        $download->save();
        $mirror = $request->get('mirror', asset($download->download_file));
        return redirect($mirror);
    }

    public function getCreate() {
        $this->loggedIn();
        $categories = DownloadCategory::query()->orderBy('name')->get();
        $games = Game::query()->orderBy('name')->get();
        return view('download.create', [
            'categories' => $categories,
            'games' => $games
        ]);
    }

    public function postCreate(Request $request) {
        $this->loggedIn();
        $this->validate($request, [
            'download_category_id' => 'required',
            'game_id' => 'required',
            'name' => 'required|max:255',
            'image' => 'required|max:4096|mimes:jpg,jpeg,png',
            'file' => 'required_without:mirrors|max:102400|mimes:rar,zip',
            'mirrors' => 'required_without:file|max:1000',
            'text' => 'required|max:2000'
        ]);

        $download = Download::Create([
            'download_category_id' => $request->input('download_category_id'),
            'user_id' => Auth::id(),
            'game_id' => $request->input('game_id'),
            'thread_id' => null,
            'name' => $request->input('name'),
            'content_text' => $request->input('text'),
            'content_html' => bbcode($request->input('text')),
            'stat_downloads' => 0,
            'image_file' => '',
            'download_file' => '',
            'mirrors' => $request->input('mirrors'),
        ]);

        // Create the forum thread
        $forum = Forum::query()->where('name', '=', 'Articles & Downloads')->first();
        if ($forum) {
            $thread = ForumThread::create([
                'forum_id' => $forum->id,
                'user_id' => Auth::id(),
                'title' => '[download] ' . $request->input('name'),
                'description' => 'A download for ' . $download->game->name . ' > ' . $download->category->name,
                'is_poll' => false
            ]);
            $post_text = "This is a a discussion topic for the download:\n\n" .
                "[dlthumb]{$download->id}[/dlthumb]\n\n" .
                "[b]Download description:[/b]\n\n" .
                $download->content_text;
            $post = ForumPost::create([
                'thread_id' => $thread->id,
                'forum_id' => $forum->id,
                'user_id' => Auth::id(),
                'content_text' => $post_text,
                'content_html' => bbcode($post_text),
            ]);
            $download->thread_id = $thread->id;
        }

        // Upload the image file
        $image_file = $request->file('image');
        $dir = public_path('uploads/downloads/images');
        $icon = 'download_' . $download->id . '.' . strtolower($image_file->getClientOriginalExtension());
        $image_file->move($dir, $icon);
        $download->image_file = 'uploads/downloads/images/' . $icon;

        // Upload the download file
        $download_file = $request->file('file');
        if ($download_file) {
            $dir = public_path('uploads/downloads/files');
            $file = 'download_' . $download->id . '.' . strtolower($download_file->getClientOriginalExtension());
            $download_file->move($dir, $file);
            $download->download_file = 'uploads/downloads/files/' . $file;
        }

        $download->save();

        return redirect('download');
    }

    public function getEdit($id) {
        $this->loggedIn();

        $download = Download::findOrFail($id);
        if (!$download->canEdit()) abort(403);

        $categories = DownloadCategory::query()->orderBy('name')->get();
        $games = Game::query()->orderBy('name')->get();

        return view('download.edit', [
            'download' => $download,
            'categories' => $categories,
            'games' => $games
        ]);
    }

    public function postEdit(Request $request) {
        $this->loggedIn();

        $id = $request->get('id');
        $download = Download::findOrFail($id);
        if (!$download->canEdit()) abort(403);

        // No file uploaded - same logic as create
        $file_valid = 'required_without:mirrors|';
        $mirrors_valid = 'required_without:file|';
        if ($download->download_file) {
            // File uploaded - file is optional, and mirrors is only required if we're removing the existing file
            $file_valid = '';
            $mirrors_valid = 'required_with:remove_existing|';
        }

        $this->validate($request, [
            'download_category_id' => 'required',
            'game_id' => 'required',
            'name' => 'required|max:255',
            'image' => 'max:4096|mimes:jpg,jpeg,png',
            'file' => $file_valid.'max:102400|mimes:rar,zip',
            'mirrors' => $mirrors_valid.'max:1000',
            'text' => 'required|max:2000'
        ]);

        $download->download_category_id = $request->input('download_category_id');
        $download->game_id = $request->input('game_id');
        $download->name = $request->input('name');
        $download->content_text = $request->input('text');
        $download->content_html = bbcode($request->input('text'));
        $download->mirrors = $request->input('mirrors');

        // Upload the image file
        $image_file = $request->file('image');
        if ($image_file) {
            $dir = public_path('uploads/downloads/images');
            $icon = 'download_' . $download->id . '.' . strtolower($image_file->getClientOriginalExtension());
            $image_file->move($dir, $icon);
            $download->image_file = 'uploads/downloads/images/' . $icon;
        }

        // Upload the download file
        $download_file = $request->file('file');
        $remove_existing = $request->boolean('remove_existing');
        if ($download_file) {
            $dir = public_path('uploads/downloads/files');
            $file = 'download_' . $download->id . '.' . strtolower($download_file->getClientOriginalExtension());
            $download_file->move($dir, $file);
            $download->download_file = 'uploads/downloads/files/' . $file;
        } else if ($remove_existing) {
            $download->download_file = '';
        }

        $download->save();

        return redirect('download');
    }

    public function getDelete($id) {
        $this->loggedIn();

        $download = Download::findOrFail($id);
        if (!$download->canEdit()) abort(403);

        return view('download.delete', [
            'download' => $download
        ]);
    }

    public function postDelete(Request $request) {
        $this->loggedIn();

        $id = $request->get('id');
        $download = Download::findOrFail($id);
        if (!$download->canEdit()) abort(403);

        $download->delete();
        return redirect('download');
    }
}
