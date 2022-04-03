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
        Schema::create('article_versions', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(\App\Models\Article::class)->references('id')->on('articles');
            $table->foreignIdFor(\App\Models\User::class)->references('id')->on('users');
            // 1 = draft
            // 2 = pending approval (admin notified)
            // 3 = approved/active
            // 4 = archived/old
            // 5 = rejected (user notified)
            $table->boolean('status');
            $table->string('slug', 200);
            $table->string('title', 200);
            $table->text('description');
            $table->text('attachment_file', 200);
            $table->text('thumbnail_file', 200);
            $table->text('content_text');
            $table->text('content_html');
            $table->foreignIdFor(\App\Models\User::class, 'review_user_id')->references('id')->on('users');
            $table->text('review_text');
            $table->text('review_html');
            $table->timestamps();
            $table->softDeletes();

            $table->index(['deleted_at', 'status', 'slug']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('article_versions');
    }
};
