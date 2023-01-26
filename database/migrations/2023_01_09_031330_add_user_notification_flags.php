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
        Schema::table('users', function (Blueprint $table) {
            $table->boolean('notify_article_review')->default(false)->after('notify_messages');
            $table->boolean('notify_forum_posts')->default(false)->after('notify_article_review');
            $table->boolean('notify_forum_threads')->default(false)->after('notify_forum_posts');
            $table->boolean('notify_journals')->default(false)->after('notify_forum_threads');
            $table->boolean('notify_downloads')->default(false)->after('notify_journals');
            $table->boolean('notify_news')->default(false)->after('notify_downloads');
            $table->boolean('notify_maps')->default(false)->after('notify_news');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('notify_article_review');
            $table->dropColumn('notify_forum_posts');
            $table->dropColumn('notify_forum_threads');
            $table->dropColumn('notify_journals');
            $table->dropColumn('notify_downloads');
            $table->dropColumn('notify_news');
            $table->dropColumn('notify_maps');
        });
    }
};
