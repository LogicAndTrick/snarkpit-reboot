<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
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
        Schema::create('downloads', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(\App\Models\DownloadCategory::class)->references('id')->on('download_categories');
            $table->foreignIdFor(\App\Models\User::class)->references('id')->on('users');
            $table->foreignIdFor(\App\Models\Game::class)->references('id')->on('games');
            $table->foreignIdFor(\App\Models\ForumThread::class, 'thread_id')->nullable()->references('id')->on('forum_threads');
            $table->string('name', 100);
            $table->string('content_text', 1000);
            $table->string('content_html', 8000);
            $table->integer('stat_downloads');
            $table->string('image_file', 100);
            $table->string('download_file', 100);
            $table->string('mirrors', 1000);
            $table->timestamps();
        });

        DB::unprepared('ALTER TABLE downloads ADD FULLTEXT downloads_name_content_text_fulltext (name, content_text);');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('downloads');
    }
};
