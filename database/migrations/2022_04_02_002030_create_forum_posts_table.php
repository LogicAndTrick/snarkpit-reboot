<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use \Illuminate\Support\Facades\DB;

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
            $table->string('answer', 1)->nullable();
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

        DB::unprepared("ALTER TABLE forum_posts ADD FULLTEXT forum_posts_content_text_fulltext (content_text);");

        DB::unprepared("
            CREATE PROCEDURE update_thread_statistics(tid INT)
            BEGIN
                -- Update last post & post count
                UPDATE forum_threads SET
                    last_post_id = (SELECT id from forum_posts WHERE thread_id = tid AND deleted_at IS NULL ORDER BY created_at DESC LIMIT 1),
                    last_post_at = (SELECT updated_at from forum_posts WHERE thread_id = tid AND deleted_at IS NULL ORDER BY created_at DESC LIMIT 1),
                    stat_posts = (SELECT COUNT(*) FROM forum_posts WHERE thread_id = tid AND deleted_at IS NULL)
                WHERE id = tid;
            END;");

        DB::unprepared("
            CREATE PROCEDURE update_forum_statistics(fid INT)
            BEGIN
                UPDATE forums
                SET last_post_id = (SELECT id from forum_posts WHERE forum_id = fid AND deleted_at IS NULL ORDER BY created_at DESC LIMIT 1),
                stat_posts = (SELECT COUNT(*) FROM forum_posts WHERE forum_id = fid AND deleted_at IS NULL),
                stat_threads = (SELECT COUNT(*) FROM forum_threads WHERE forum_id = fid AND deleted_at IS NULL)
                WHERE id = fid;
            END;");

        DB::unprepared("
            CREATE PROCEDURE update_user_forum_statistics(uid INT)
            BEGIN
                UPDATE users
                SET stat_forum_posts = (SELECT COUNT(*) FROM forum_posts WHERE user_id = uid AND deleted_at IS NULL)
                WHERE id = uid;
            END;
        ");

        DB::unprepared("
            CREATE TRIGGER forum_posts_update_statistics_on_insert AFTER INSERT ON forum_posts
            FOR EACH ROW BEGIN
                CALL update_thread_statistics(NEW.thread_id);
                CALL update_forum_statistics(NEW.forum_id);
                CALL update_user_forum_statistics(NEW.user_id);
            END;");

        DB::unprepared("
            CREATE TRIGGER forum_posts_update_statistics_on_update AFTER UPDATE ON forum_posts
            FOR EACH ROW BEGIN
                CALL update_thread_statistics(NEW.thread_id);
                CALL update_forum_statistics(NEW.forum_id);
                CALL update_user_forum_statistics(NEW.user_id);

                IF NEW.thread_id != OLD.thread_id THEN
                    CALL update_thread_statistics(OLD.thread_id);
                END IF;

                IF NEW.forum_id != OLD.forum_id THEN
                    CALL update_forum_statistics(OLD.forum_id);
                END IF;

                IF NEW.user_id != OLD.user_id THEN
                    CALL update_user_forum_statistics(OLD.user_id);
                END IF;
            END;");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::unprepared("DROP TRIGGER IF EXISTS forum_posts_update_statistics_on_update");
        DB::unprepared("DROP TRIGGER IF EXISTS forum_posts_update_statistics_on_insert");
        DB::unprepared("DROP PROCEDURE IF EXISTS update_user_forum_statistics");
        DB::unprepared("DROP PROCEDURE IF EXISTS update_thread_statistics");
        DB::unprepared("DROP PROCEDURE IF EXISTS update_forum_statistics");
        Schema::dropIfExists('forum_posts');
    }
};
