<?php

namespace App\Http\Controllers;

use App\Events\ArticleStatusChangedEvent;
use App\Models\Article;
use App\Models\ArticleCategory;
use App\Models\ArticleVersion;
use App\Models\Forum;
use App\Models\ForumPost;
use App\Models\ForumThread;
use App\Models\Game;
use App\Models\MapImage;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Pagination\Paginator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Str;

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
        $user = intval($request->get('user'));
        if ($user > 0) $articles = $articles->where('user_id', '=', $user);

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

    public function getManage() {
        $this->loggedIn();

        $versions = ArticleVersion::with(['user']);

        if (!Gate::allows('moderator')) {
            $versions = $versions->where('user_id', '=', Auth::id());
        } else {
            // Show pending & rejected articles for moderators
            $versions = $versions->whereRaw('(status = ? or user_id = ?)', [
                ArticleVersion::STATUS_PENDING,
                Auth::id()
            ]);
        }

        $versions = $versions->get();
        $articles = Article::query()->whereIn('id', $versions->map(fn($x) => $x->article_id))->get();

        return view('article.manage', [
            'articles' => $articles,
            'versions' => $versions
        ]);
    }

    public function getGo(Request $request, $id) {
        $article = Article::with(['current_version'])->findOrFail($id);
        return redirect(url('article/view', [$article->current_version->slug]));
    }

    public function getView(Request $request, $id)
    {
        $version = ArticleVersion::with(['article', 'article.user', 'article.category', 'article.game']);
        if (is_numeric($id)) {
            $version = $version->where('id', '=', $id);
        } else {
            $version = $version->where('slug', '=', $id)->where('status', '=', ArticleVersion::STATUS_APPROVED);
        }
        $version = $version->orderByDesc('id')->firstOrFail();

        if (!$version->canView()) abort(404);

        $html = $version->content_html;
        $aid = $version->article_id;
        $vid = $version->id;
        $html = preg_replace_callback('/\[image(\d+)\]/sim', function($match) use ($version) {
            $num = $match[1];
            $path = $version->image_files_base . "_${num}.jpg";
            $location = public_path($path);
            $url = asset('images/no_image.png');
            if (file_exists($location)) {
                $url = asset($path);
            }
            return ' <div class="embedded image"><span class="caption-panel">'
                . '<img class="caption-body" src="' . $url . '" alt="Article image" />'
                . '</span></div> ';
        }, $html);

        if ($version->status === ArticleVersion::STATUS_APPROVED) {
            $version->article->stat_views++;
            $version->article->timestamps = false;
            $version->article->save();
            $version->article->timestamps = true;
        }

        $page = intval($request->input('page')) ?: 1;
        $post_query = ForumPost::with('user')->where('thread_id', '=', $version->article->forum_thread_id)->whereNull('deleted_at')->orderByDesc('created_at')->orderByDesc('id');

        // Exclude the first post from the discussion thread
        $first_post = ForumPost::query()->where('thread_id', '=', $version->article->forum_thread_id)->whereNull('deleted_at')->orderBy('id')->first();
        if ($first_post) $post_query = $post_query->where('id', '!=', $first_post->id);

        $count = $post_query->getQuery()->getCountForPagination();
        $posts = $post_query->skip(($page - 1) * 10)->take(10)->get();
        $pag = new LengthAwarePaginator($posts, $count, 10, $page, [ 'path' => Paginator::resolveCurrentPath(), 'fragment' => 'discussion' ]);

        return view('article.view', [
            'version' => $version,
            'html' => $html,
            'posts' => $pag
        ]);
    }

    public function postEmbedInfo(Request $request) {
        $id = $request->integer('id');
        $article = Article::with(['user', 'category', 'game', 'current_version'])
            ->where('id', '=', $id)
            ->orderByDesc('id')
            ->firstOrFail();
        if (!$article->current_version || !$article->current_version->canView()) abort(404);
        return response()->json($article);
    }

    public function postStatus(Request $request) {
        $this->loggedIn();

        $article = Article::findOrFail($request->get('article_id'));
        $version = ArticleVersion::findOrFail($request->get('version_id'));
        $status = $request->get('status');

        // If not the article creator, must be a moderator
        if ($version->user_id !== Auth::id()) $this->moderator();

        // If not changing from pending or draft, must be a moderator
        if ($status != ArticleVersion::STATUS_PENDING && $status != ArticleVersion::STATUS_DRAFT) $this->moderator();
        if ($version->status != ArticleVersion::STATUS_PENDING && $version->status != ArticleVersion::STATUS_DRAFT) $this->moderator();

        // If changing to approved, change the current version and activate the article
        if ($status == ArticleVersion::STATUS_APPROVED) {

            if (!$article->forum_thread_id) {
                // Create the forum thread
                $forum = Forum::query()->where('name', '=', 'Articles & Downloads')->first();
                if ($forum) {
                    $thread = ForumThread::create([
                        'forum_id' => $forum->id,
                        'user_id' => Auth::id(),
                        'title' => '[article] ' . $version->title,
                        'description' => 'An article for ' . $article->game->name . ' > ' . $article->category->name,
                        'is_poll' => false
                    ]);
                    $post_text = "This is a a discussion topic for the article:\n\n" .
                        "[athumb]{$article->id}[/athumb]\n\n" .
                        "[b]Article description:[/b]\n\n" .
                        $version->description;
                    $post = ForumPost::create([
                        'thread_id' => $thread->id,
                        'forum_id' => $forum->id,
                        'user_id' => Auth::id(),
                        'content_text' => $post_text,
                        'content_html' => bbcode($post_text),
                    ]);
                    $article->forum_thread_id = $thread->id;
                }
            }

            $article->current_version_id = $version->id;
            $article->is_active = true;
            $article->save();
        }
        // If changing from approved and the version is the current version, deactivate the article
        else if ($version->status == ArticleVersion::STATUS_APPROVED && $article->current_version_id === $version->id) {
            $article->is_active = false;
            $article->save();
        }

        // If we're not setting status to archived, then archive all pending/draft/rejected versions of this article
        if ($status != ArticleVersion::STATUS_ARCHIVED) {
            DB::update('
                update article_versions
                set status = ?
                where id != ? and article_id = ?
                and status in (?, ?, ?)
            ', [
                ArticleVersion::STATUS_ARCHIVED,
                $version->id, $article->id,
                ArticleVersion::STATUS_DRAFT, ArticleVersion::STATUS_PENDING, ArticleVersion::STATUS_REJECTED
            ]);
        }

        $review = $request->get('review');
        if ($review) {
            $version->review_text = $review;
            $version->review_html = bbcode($review);
            $version->review_user_id = Auth::id();
        }

        $version->status = $status;
        $version->save();

        ArticleStatusChangedEvent::dispatch($article, $version);

        if ($status == ArticleVersion::STATUS_APPROVED) return redirect('article/view/'.$version->slug);
        return redirect('article/view/'.$version->id);
    }

    public function getCreate() {
        $this->loggedIn();

        $categories = ArticleCategory::query()->orderBy('name')->get();
        $games = Game::query()->orderBy('name')->get();

        return view('article.edit', [
            'article' => new Article(),
            'version' => new ArticleVersion(),
            'categories' => $categories,
            'games' => $games
        ]);
    }

    public function getEdit($id) {
        $this->loggedIn();
        $article = Article::findOrFail($id);
        $version = $article->current_version;
        if (!$version) $version = ArticleVersion::query()->where('article_id', '=', $id)->orderByDesc('id')->firstOrFail();
        abort_unless($article->canEdit(), 403);

        $categories = ArticleCategory::query()->orderBy('name')->get();
        $games = Game::query()->orderBy('name')->get();

        return view('article.edit', [
            'article' => $article,
            'version' => $version,
            'categories' => $categories,
            'games' => $games
        ]);
    }

    public function postCreate(Request $request) {
        $this->loggedIn();

        $id = $request->id;
        $this->validate($request, [
            'title' => 'required|max:200',
            'article_category_id' => 'required',
            'game_id' => 'required',
            'description' => 'required|max:1000',
            'thumbnail_file' => ($id ? '' : 'required|') . 'max:4096|mimes:jpg,jpeg,png',
            'attachment_file' => 'max:10240|mimes:jpg,jpeg,png,7z,rar,zip',
            'images.*' => 'mimes:jpg,jpeg|max:4096',
            'text' => 'required|max:65535',
        ]);

        $last_version = null;
        if ($id) {
            $article = Article::findOrFail($id);
            $last_version = ArticleVersion::query()->where('article_id', '=', $id)->orderByDesc('id')->firstOrFail();

            $article->update([
                'article_category_id' => $request->get('article_category_id'),
                'game_id' => $request->get('game_id')
            ]);
        } else {
            $article = Article::Create([
                'user_id' => Auth::id(),
                'article_category_id' => $request->get('article_category_id'),
                'game_id' => $request->get('game_id'),
                'forum_thread_id' => null,
                'current_version_id' => 0,
                'is_active' => false,
                'stat_views' => 0
            ]);
        }

        $version = ArticleVersion::Create([
            'article_id' => $article->id,
            'user_id' => Auth::id(),
            'status' => ArticleVersion::STATUS_DRAFT,
            'slug' => ArticleVersion::CreateSlug($request->get('title')),
            'title' => $request->get('title'),
            'description' => $request->get('description'),
            'attachment_file' => '',
            'thumbnail_file' => '',
            'image_files_base' => '',
            'content_text' => $request->get('text'),
            'content_html' => bbcode($request->get('text')),
            'review_user_id' => null,
            'review_text' => '',
            'review_html' => '',
        ]);

        // Upload thumbnail
        // uploads/articles/images/article_{aid}_{vid}_thumb.ext
        $thumbnail_file = $request->file('thumbnail_file');
        if ($thumbnail_file) {
            $dir = public_path('uploads/articles/images');
            $file_name = 'article_' . $article->id . '_' . $version->id . '_thumb.' . strtolower($thumbnail_file->getClientOriginalExtension());
            $thumbnail_file->move($dir, $file_name);
            $version->thumbnail_file = 'uploads/articles/images/' . $file_name;
        } else if ($last_version) {
            $version->thumbnail_file = $last_version->thumbnail_file;
        }

        // Upload attachment
        // uploads/articles/files/article_{aid}_{vid}_example.ext
        $attachment_file = $request->file('attachment_file');
        if ($attachment_file) {
            $dir = public_path('uploads/articles/files');
            $file_name = 'article_' . $article->id . '_' . $version->id . '_example.' . strtolower($attachment_file->getClientOriginalExtension());
            $attachment_file->move($dir, $file_name);
            $version->attachment_file = 'uploads/articles/files/' . $file_name;
        } else if ($last_version) {
            $version->attachment_file = $last_version->attachment_file;
        }

        // Upload images
        // uploads/articles/images/article_{aid}_{vid}_{imgnum}.ext
        $change_additional_images = $request->boolean('change_additional_images');
        if (!$id || $change_additional_images) {
            $version->image_files_base = 'uploads/articles/images/article_' . $article->id . '_' . $version->id;
            $images = $request->file('images') ?? [];
            $imgNum = 1;
            foreach ($images as $img) {
                $dir = public_path('uploads/articles/images');
                $file_name = 'article_' . $article->id . '_' . $version->id . '_' . $imgNum . '.jpg';
                $img->move($dir, $file_name);
                $imgNum++;
            }
        } else if ($last_version) {
            $version->image_files_base = $last_version->image_files_base;
        }

        $version->save();

        // Don't create forum thread yet - article isn't approved
        return redirect('article/view/'.$version->id);
    }
}
