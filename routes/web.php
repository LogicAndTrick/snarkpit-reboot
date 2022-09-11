<?php

use App\Http\Controllers\HomeController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::get('/', [HomeController::class, 'index'])->name('home');

Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth'])->name('dashboard');

$controllers = [
    'ban' => \App\Http\Controllers\BanController::class,

    'forum' => \App\Http\Controllers\ForumController::class,
    'thread' => \App\Http\Controllers\ThreadController::class,
    'post' => \App\Http\Controllers\PostController::class,

    'panel' => \App\Http\Controllers\PanelController::class,
    'message' => \App\Http\Controllers\MessageController::class,
    'user' => \App\Http\Controllers\UserController::class,

    'news' => \App\Http\Controllers\NewsController::class,
    'download' => \App\Http\Controllers\DownloadController::class,
    'link' => \App\Http\Controllers\LinksController::class,
    'article' => \App\Http\Controllers\ArticleController::class,
    'map' => \App\Http\Controllers\MapController::class,
    'journal' => \App\Http\Controllers\JournalController::class,

    'api' => \App\Http\Controllers\ApiController::class,
    'search' => \App\Http\Controllers\SearchController::class,
    'admin' => \App\Http\Controllers\AdminController::class
];
App\Helpers\Routing::controllers($controllers);

require __DIR__.'/auth.php';
