<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\ArticleCategory;
use App\Models\Ban;
use App\Models\DownloadCategory;
use App\Models\Game;
use App\Models\Map;
use App\Models\Spotlight;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function getIndex() {
        return view('admin.index');
    }

    public function getUsers() {
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

    public function getDeployment() {
        die;
        $this->superAdmin();
        return view('admin.deployment', [
            'version' => $this->runCommand('git log -1 --format="%h - %s"')
        ]);
    }

    private function runCommand(string $command): bool|string|null {
        $dir = getcwd();
        chdir(base_path());
        $res = shell_exec($command . ' 2>&1');
        chdir($dir);
        return $res;
    }

    private static function executeCommands($commands_to_run) {
        header('Content-Type: text/html');
        header('Cache-Control: no-store');

        chdir(base_path());
        set_time_limit(0);

        if (ob_get_level() == 0) ob_start();

        echo '<!DOCTYPE html>
<html>
<head>
<style>
html, body {
    overflow-x: hidden;
    background: #111;
    color: #eee;
    font-family: monospace;
}
.command {
    position: fixed;
    top: 0.5rem;
    left: 0.5rem;
    border-radius: 0.25rem;
    padding: 0.25rem 0.5rem;
    background: #00ef47;
    color: #222;
}
</style>
</head>
<body>
<script>
let cached = document.body.innerText;
const interval = setInterval(() => {
    const it = document.body.innerText;
    if (it === cached) return;
    cached = it;
    document.scrollingElement.scrollTop = 9999;
}, 10);
function update(text) {
    document.getElementById("upd").innerText = text;
}
</script>
<div class="command" id="upd">Do not close your browser! Getting ready...</div>
<div><br/>';
        echo str_pad('', 4096);
        echo "<br />\n";
        ob_flush();
        flush();

        foreach ($commands_to_run as $cmd) {
            echo '<script>update("Do not close your browser! Running: ' . str_replace('"', '\"', $cmd) . '")</script>';
            $handle = popen("$cmd 2>&1", "r");

            while (!feof($handle)) {
                $buffer = fgets($handle);
                $buffer = trim($buffer);

                echo $buffer;
                echo str_pad('', 4096);
                echo "<br />\n";

                ob_flush();
                flush();
            }
            pclose($handle);
        }

        echo '</div>
<script>
document.scrollingElement.scrollTop = 9999;
clearInterval(interval);
update("Update complete.");
</script>
</body>
</html>';

        ob_end_flush();

        exit();
    }

    public function postDeploymentExecute(Request $request) {
        die;
        $this->superAdmin();

        $operation = $request->input('operation');
        $commands = [];
        switch ($operation) {
            case 'update':
                $commands[] = 'git pull';
                $commands[] = 'COMPOSER_HOME=~/.composer-home php composer.phar install';
                $commands[] = 'php artisan optimize';
                break;
            case 'migrate':
                $commands[] = 'php artisan migrate --force';
                break;
            case 'update-migrate':
                $commands[] = 'git pull';
                $commands[] = 'COMPOSER_HOME=~/.composer-home php composer.phar install';
                $commands[] = 'php artisan migrate --force';
                $commands[] = 'php artisan optimize';
                break;
            case 'refresh';
                $commands[] = 'php artisan migrate:refresh';
                $commands[] = 'php artisan deploy:users';
                $commands[] = 'php artisan deploy:bans';
                break;
            case 'deploy-news':
                $commands[] = 'php artisan deploy:news';
                break;
            case 'deploy-forums':
                $commands[] = 'php artisan deploy:forums';
                $commands[] = 'php artisan deploy:forum-polls';
                break;
            case 'deploy-games':
                $commands[] = 'php artisan deploy:games';
                break;
            case 'deploy-downloads':
                $commands[] = 'php artisan deploy:downloads';
                break;
            case 'deploy-links':
                $commands[] = 'php artisan deploy:links';
                break;
            case 'deploy-articles':
                $commands[] = 'php artisan deploy:articles';
                break;
            case 'deploy-maps':
                $commands[] = 'php artisan deploy:maps';
                break;
            case 'deploy-files':
                $commands[] = 'php artisan deploy:files';
                break;
            case 'deploy-messages':
                $commands[] = 'php artisan deploy:messages';
                break;
            case 'deploy-spotlight':
                $commands[] = 'php artisan deploy:spotlight';
                break;
            case 'deploy-journals':
                $commands[] = 'php artisan deploy:journals';
                break;
        }

        self::executeCommands($commands);
    }
}
