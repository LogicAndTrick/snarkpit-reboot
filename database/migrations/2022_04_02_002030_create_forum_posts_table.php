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
        Schema::create('forum_posts', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(\App\Models\Forum::class)->references('id')->on('forums');
            $table->foreignIdFor(\App\Models\ForumThread::class, 'thread_id')->references('id')->on('forum_threads');
            $table->foreignIdFor(\App\Models\User::class)->references('id')->on('users');
            $table->text('content_text');
            $table->text('content_html');
            $table->boolean('add_signature');
            $table->char('answer')->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->index(['deleted_at', 'forum_id']);
            $table->index(['deleted_at', 'thread_id', 'created_at']);
            $table->index(['deleted_at', 'forum_id', 'created_at']);
            $table->index(['deleted_at', 'user_id']);
            $table->index(['deleted_at', 'created_at']);
            $table->index(['deleted_at', 'updated_at', 'id']);
            $table->index(['deleted_at', 'updated_at']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('forum_posts');
    }
};
