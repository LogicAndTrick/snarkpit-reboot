<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('articles', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(\App\Models\User::class)->references('id')->on('users');
            $table->foreignIdFor(\App\Models\ArticleCategory::class)->references('id')->on('article_categories');
            $table->foreignIdFor(\App\Models\Game::class)->references('id')->on('games');
            $table->foreignIdFor(\App\Models\ForumThread::class)->references('id')->on('forum_threads');
            $table->foreignId('current_version_id'); // 'active' column
            $table->integer('is_active');
            $table->integer('stat_views');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('articles');
    }
};
