<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\ArticleCategory;
use App\Models\Ban;
use App\Models\DownloadCategory;
use App\Models\Game;
use App\Models\Map;
use App\Models\Page;
use App\Models\Spotlight;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function getIndex() {
        $this->admin();
        return view('admin.index');
    }

    public function getUsers() {
        $this->admin();
        $mods = User::query()->where('level', '>=', User::LEVEL_MODERATOR)->orderBy('level', 'desc')->get();

        $now = Carbon::now();
        $bans = Ban::with(['user'])
            ->where('created_at', '<=', $now)
            ->whereRaw('(ends_at IS NULL OR ends_at >= ?)', [$now])
            ->get();
        return view('admin.users', [
            'mods' => $mods,
            'bans' => $bans
        ]);
    }

    public function postCreateBan(Request $request) {
        $this->admin();

        $this->validate($request->instance(), [
            'ip' => 'required|ipv4',
            'reason' => 'required|max:255',
            'duration' => 'required|integer',
            'unit' => 'required|integer'
        ]);

        $hours = $request->integer('duration') * $request->integer('unit');
        $ban = Ban::create([
            'ip' => $request->string('ip'),
            'ends_at' => $hours < 0 ? null : Carbon::now()->addHours($hours),
            'reason' => $request->input('reason')
        ]);

        return redirect('admin/users');
    }

    public function postDeleteBan(Request $request) {
        $this->admin();
        $id = $request->input('id');
        $ban = Ban::findOrFail($id);
        $ban->delete();
        return redirect('admin/users');
    }

    public function getSpotlight() {
        $this->admin();
        $spotlights = Spotlight::with(['item' => function (MorphTo $morphTo) {
                $morphTo->morphWith([
                    Article::class => ['current_version'],
                    Map::class => ['images']
                ]);
            }, 'item.user'])
            ->orderBy('position', 'asc')
            ->get();
        return view('admin.spotlight', [
            'spotlights' => $spotlights
        ]);
    }

    public function postCreateSpotlight(Request $request) {
        $this->admin();

        $this->validate($request->instance(), [
            'item_type' => 'required|in:m,a,d',
            'item_id' => 'required|integer',
            'position' => 'required|integer'
        ]);

        $spot = Spotlight::create([
            'item_type' => $request->string('item_type'),
            'item_id' => $request->integer('item_id'),
            'position' => $request->integer('position')
        ]);

        return redirect('admin/spotlight');
    }

    public function postDeleteSpotlight(Request $request) {
        $this->admin();
        $id = $request->input('id');
        $ban = Spotlight::findOrFail($id);
        $ban->delete();
        return redirect('admin/spotlight');
    }

    public function getGames() {
        $this->admin();
        $games = Game::query()
            ->orderBy('order_index', 'asc')
            ->get();
        return view('admin.games', [
            'games' => $games
        ]);
    }

    public function getEditGame($id) {
        $this->admin();
        $game = Game::query()->findOrFail($id);
        return view('admin.edit-game', [
            'game' => $game
        ]);
    }

    public function postEditGame(Request $request) {
        $this->admin();
        $id = $request->integer('id');
        $game = Game::query()->findOrFail($id);

        $this->validate($request->instance(), [
            'name' => 'required|string',
            'description' => 'string',
            'url' => 'url',
            'abbreviation' => 'string',
            'order_index' => 'required|integer'
        ]);

        $game->update([
            'name' => $request->string('name'),
            'description' => $request->string('description'),
            'url' => $request->string('url'),
            'abbreviation' => $request->string('abbreviation'),
            'order_index' => $request->integer('order_index')
        ]);

        return redirect('admin/games');
    }

    public function postCreateGame(Request $request) {
        $this->admin();

        $this->validate($request->instance(), [
            'name' => 'required|string',
            'description' => 'string',
            'url' => 'url',
            'abbreviation' => 'string',
            'order_index' => 'required|integer'
        ]);

        $game = Game::create([
            'name' => $request->string('name'),
            'description' => $request->string('description'),
            'url' => $request->string('url'),
            'abbreviation' => $request->string('abbreviation'),
            'order_index' => $request->integer('order_index')
        ]);

        return redirect('admin/games');
    }

    public function getArticleCategories() {
        $this->admin();
        $article_categories = ArticleCategory::query()
            ->orderBy('name', 'asc')
            ->get();
        return view('admin.article-categories', [
            'categories' => $article_categories
        ]);
    }

    public function getEditArticleCategory($id) {
        $this->admin();
        $article_category = ArticleCategory::query()->findOrFail($id);
        return view('admin.edit-article-category', [
            'category' => $article_category
        ]);
    }

    public function postEditArticleCategory(Request $request) {
        $this->admin();
        $id = $request->integer('id');
        $articlecategory = ArticleCategory::query()->findOrFail($id);

        $this->validate($request->instance(), [
            'name' => 'required|string'
        ]);

        $articlecategory->update([
            'name' => $request->string('name'),
        ]);

        return redirect('admin/article-categories');
    }

    public function postCreateArticleCategory(Request $request) {
        $this->admin();

        $this->validate($request->instance(), [
            'name' => 'required|string'
        ]);

        $article_category = ArticleCategory::create([
            'name' => $request->string('name')
        ]);

        return redirect('admin/article-categories');
    }

    public function getDownloadCategories() {
        $this->admin();
        $download_categories = DownloadCategory::query()
            ->orderBy('name', 'asc')
            ->get();
        return view('admin.download-categories', [
            'categories' => $download_categories
        ]);
    }

    public function getEditDownloadCategory($id) {
        $this->admin();
        $download_category = DownloadCategory::query()->findOrFail($id);
        return view('admin.edit-download-category', [
            'category' => $download_category
        ]);
    }

    public function postEditDownloadCategory(Request $request) {
        $this->admin();
        $id = $request->integer('id');
        $downloadcategory = DownloadCategory::query()->findOrFail($id);

        $this->validate($request->instance(), [
            'name' => 'required|string'
        ]);

        $downloadcategory->update([
            'name' => $request->string('name'),
        ]);

        return redirect('admin/download-categories');
    }

    public function postCreateDownloadCategory(Request $request) {
        $this->admin();

        $this->validate($request->instance(), [
            'name' => 'required|string'
        ]);

        $download_category = DownloadCategory::create([
            'name' => $request->string('name')
        ]);

        return redirect('admin/download-categories');
    }

    public function getPages() {
        $this->admin();
        $pages = Page::query()
            ->orderBy('title', 'asc')
            ->get();
        return view('admin.pages', [
            'pages' => $pages
        ]);
    }

    public function getEditPage($id) {
        $this->admin();
        $page = Page::query()->findOrFail($id);
        return view('admin.edit-page', [
            'page' => $page
        ]);
    }

    public function postEditPage(Request $request) {
        $this->admin();
        $id = $request->integer('id');
        $page = Page::query()->findOrFail($id);

        $this->validate($request->instance(), [
            'title' => 'required|max:200',
            'slug' => 'required|max:40|alpha_dash:ascii',
            'text' => 'required|max:10000'
        ]);

        $page->update([
            'title' => $request->string('title'),
            'slug' => $request->string('slug'),
            'content_text' => $request->string('text'),
            'content_html' => bbcode($request->string('text')),
        ]);

        return redirect('page/'.$page->slug);
    }

    public function postCreatePage(Request $request) {
        $this->admin();

        $this->validate($request->instance(), [
            'title' => 'required|max:200',
            'slug' => 'required|max:40|alpha_dash:ascii',
            'text' => 'required|max:10000'
        ]);

        $page = Page::create([
            'title' => $request->string('title'),
            'slug' => $request->string('slug'),
            'content_text' => $request->string('text'),
            'content_html' => bbcode($request->string('text')),
        ]);

        return redirect('page/'.$page->slug);
    }

    public function getDeletePage($id) {
        $this->admin();
        $page = Page::query()->findOrFail($id);
        return view('admin.delete-page', [
            'page' => $page
        ]);
    }

    public function postDeletePage(Request $request) {
        $this->admin();
        $id = $request->integer('id');
        $page = Page::query()->findOrFail($id);
        $page->delete();
        return redirect('admin/pages');
    }
}
