<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration {

	public function up()
	{
		Schema::create('forum_poll_item_votes', function(Blueprint $table)
		{
			$table->increments('id');
            $table->foreignIdFor(\App\Models\ForumPoll::class)->references('id')->on('forum_polls');
            $table->foreignIdFor(\App\Models\ForumPollItem::class)->references('id')->on('forum_poll_items');
            $table->foreignIdFor(\App\Models\User::class)->references('id')->on('users');
		});

        DB::unprepared("
            CREATE PROCEDURE update_forum_poll_statistics(pid INT)
            BEGIN
                -- Update vote count
                UPDATE forum_poll_items pi
                SET pi.stat_votes = (SELECT COUNT(*) FROM forum_poll_item_votes WHERE forum_poll_item_id = pi.id)
                WHERE forum_poll_id = pid;
            END;");

        DB::unprepared("
            CREATE TRIGGER forum_poll_item_votes_update_statistics_on_insert AFTER INSERT ON forum_poll_item_votes
            FOR EACH ROW BEGIN
                CALL update_forum_poll_statistics(NEW.forum_poll_id);
            END;");
	}

	public function down()
	{
        DB::unprepared("DROP TRIGGER IF EXISTS forum_poll_item_votes_update_statistics_on_insert");
        DB::unprepared("DROP PROCEDURE IF EXISTS update_forum_poll_statistics");
		Schema::drop('forum_poll_item_votes');
	}

};
