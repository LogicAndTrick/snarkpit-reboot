<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
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
            $table->integer('stat_ratings');
            $table->string('download_file', 100);
            $table->string('mirrors', 1000);
            $table->timestamps();
            $table->softDeletes();
        });

        DB::unprepared('ALTER TABLE maps ADD FULLTEXT maps_name_content_text_fulltext (name, content_text);');

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

        DB::unprepared("
            CREATE PROCEDURE update_map_statistics(mid INT)
            BEGIN
                update maps m set
                stat_ratings = COALESCE((select COUNT(*) from map_ratings r where r.map_id = m.id), 0),
                stat_rating = COALESCE((select AVG(rating) from map_ratings r where r.map_id = m.id), 0)
                where id = mid;
            END;
        ");

        DB::unprepared("
            CREATE TRIGGER map_ratings_update_statistics_on_insert AFTER INSERT ON map_ratings
            FOR EACH ROW BEGIN
                CALL update_map_statistics(NEW.map_id);
            END;");

        DB::unprepared("
            CREATE TRIGGER map_ratings_update_statistics_on_update AFTER UPDATE ON map_ratings
            FOR EACH ROW BEGIN
                CALL update_map_statistics(NEW.map_id);

                IF NEW.map_id != OLD.map_id THEN
                    CALL update_map_statistics(OLD.map_id);
                END IF;
            END;");

        DB::unprepared("
            CREATE TRIGGER map_ratings_update_statistics_on_delete AFTER DELETE ON map_ratings
            FOR EACH ROW BEGIN
                CALL update_map_statistics(OLD.map_id);
            END;");
    }

    public function down()
    {
        DB::unprepared("DROP TRIGGER IF EXISTS map_ratings_update_statistics_on_insert");
        DB::unprepared("DROP TRIGGER IF EXISTS map_ratings_update_statistics_on_update");
        DB::unprepared("DROP TRIGGER IF EXISTS map_ratings_update_statistics_on_delete");
        DB::unprepared("DROP PROCEDURE IF EXISTS update_map_statistics");
        Schema::dropIfExists('map_ratings');
        Schema::dropIfExists('map_images');
        Schema::dropIfExists('maps');
        Schema::dropIfExists('map_statuses');
    }
};
