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
    //'ban' => 'Auth\BanController',

    'forum' => \App\Http\Controllers\ForumController::class,
    'thread' => \App\Http\Controllers\ThreadController::class,
    'post' => \App\Http\Controllers\PostController::class,

    //'panel' => 'User\PanelController',
    //'message' => 'User\MessageController',
    //'user' => 'User\UserController',

    'news' => \App\Http\Controllers\NewsController::class,
    'download' => \App\Http\Controllers\DownloadController::class,
    'links' => \App\Http\Controllers\LinksController::class,

    'api' => \App\Http\Controllers\ApiController::class,
    //'search' => 'Search\SearchController',
    'admin' => \App\Http\Controllers\AdminController::class
];
App\Helpers\Routing::controllers($controllers);

require __DIR__.'/auth.php';
