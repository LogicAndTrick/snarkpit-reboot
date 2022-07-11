<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('map_statuses', function (Blueprint $table) {
            $table->id();
            $table->string('name', 100);
        });

        $statuses = [
            1 => 'Complete',
            2 => 'Beta',
            3 => 'Abandoned',
        ];
        foreach ($statuses as $id => $name) {
            \App\Models\MapStatus::create([
                'id' => $id,
                'name' => $name
            ]);
        }

        Schema::create('maps', function (Blueprint $table) {
            $table->id();
            $table->string('name', 100);
            $table->foreignIdFor(\App\Models\User::class)->references('id')->on('users');
            $table->foreignIdFor(\App\Models\Game::class)->references('id')->on('games');
            $table->foreignIdFor(\App\Models\ForumThread::class, 'thread_id')->nullable()->references('id')->on('forum_threads');
            $table->foreignIdFor(\App\Models\MapStatus::class, 'status_id')->references('id')->on('map_statuses');
            $table->boolean('is_featured');
            $table->text('content_text');
            $table->text('content_html');
            $table->integer('stat_views');
            $table->integer('stat_downloads');
            $table->float('stat_rating');
            $table->string('download_file', 100);
            $table->string('mirrors', 1000);
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('map_images', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(\App\Models\Map::class)->references('id')->on('maps');
            $table->string('image_file', 100);
            $table->integer('order_index');
        });

        Schema::create('map_ratings', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(\App\Models\Map::class)->references('id')->on('maps');
            $table->foreignIdFor(\App\Models\User::class)->references('id')->on('users');
            $table->integer('rating', false, true);
        });
    }

    public function down()
    {
        Schema::dropIfExists('map_images');
        Schema::dropIfExists('maps');
        Schema::dropIfExists('map_statuses');
    }
};
