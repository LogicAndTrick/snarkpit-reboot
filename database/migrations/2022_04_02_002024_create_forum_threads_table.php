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
        Schema::create('forum_threads', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(\App\Models\Forum::class)->references('id')->on('forums');
            $table->foreignIdFor(\App\Models\User::class)->references('id')->on('users');
            $table->string('title', 200);
            $table->string('description', 200);
            $table->integer('stat_views');
            $table->integer('stat_posts');
            $table->integer('last_post_id');
            $table->timestamp('last_post_at')->nullable();
            $table->boolean('is_open');
            $table->boolean('is_sticky');
            $table->boolean('is_poll');
            $table->char('answered')->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->index('forum_id');
            $table->index('user_id');
            $table->index('last_post_id');
            $table->index('last_post_at');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('forum_threads');
    }
};
