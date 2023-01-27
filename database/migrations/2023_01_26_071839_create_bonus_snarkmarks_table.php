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
        Schema::create('bonus_snarkmarks', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(\App\Models\User::class)->references('id')->on('users');
            $table->integer('snarkmarks');
            $table->foreignIdFor(\App\Models\User::class, 'added_user_id')->references('id')->on('users');
            $table->string('description', 256);
            $table->timestamps();
        });

        DB::statement('
            create function get_user_snarkmarks(uid int)
            returns int
            begin
                declare total int default 0;
                set total = 0;

                -- article: 30
                set total = total + (select count(*) * 30 from articles where user_id = uid and deleted_at is null);

                -- download: 20
                set total = total + (select count(*) * 20 from downloads where user_id = uid);

                -- map: 10 + 50 * rating
                set total = total + (select ifnull(sum(10 + 50 * stat_rating), 0) from maps where user_id = uid and deleted_at is null);

                -- post: 0.1
                set total = total + (select count(*) * 0.1 from forum_posts where user_id = uid and deleted_at is null);

                -- bonus
                set total = total + (select ifnull(sum(snarkmarks), 0) from bonus_snarkmarks where user_id = uid);

                return total;
            end
        ');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::statement('drop function if exists get_user_snarkmarks');
        Schema::dropIfExists('bonus_snarkmarks');
    }
};
