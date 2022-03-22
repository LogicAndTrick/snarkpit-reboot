<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->string('legacy_password', 60);
            $table->rememberToken();

            $table->timestamp('last_login_time')->nullable();
            $table->timestamp('last_access_time')->nullable();
            $table->string('last_access_page')->nullable();
            $table->string('last_access_ip', 15)->nullable();

            // Options
            $table->integer('timezone');
            $table->boolean('show_email');
            $table->boolean('show_signature');
            $table->boolean('subscribe_topics');
            $table->boolean('notify_messages');
            $table->boolean('snow_snarks');
            $table->boolean('has_pit');

            // Avatar
            $table->boolean('avatar_custom');
            $table->string('avatar_file', 40);

            // Title
            $table->boolean('title_custom');
            $table->string('title_text');

            // Info
            $table->string('info_name');
            $table->string('info_website');
            $table->string('info_occupation');
            $table->string('info_interests');
            $table->string('info_location');
            $table->string('info_languages');
            $table->string('info_steam_profile');
            $table->integer('info_birthday');
            $table->text('info_biography_text');
            $table->text('info_biography_html');
            $table->text('info_signature_text');
            $table->text('info_signature_html');

            // Stats
            $table->integer('stat_logins');
            $table->integer('stat_profile_hits');
            $table->integer('stat_forum_posts');
            $table->integer('stat_maps');
            $table->integer('stat_journals');
            $table->integer('stat_comments');
            $table->integer('stat_snarks');

            $table->timestamps();
            $table->softDeletes();
        });

        DB::unprepared("ALTER TABLE users ADD FULLTEXT users_name_fulltext (name, info_biography_text);");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
