<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {

	public function up()
	{
		Schema::create('forum_poll_items', function(Blueprint $table)
		{
			$table->id();
            $table->foreignIdFor(\App\Models\ForumPoll::class)->references('id')->on('forum_polls');
            $table->string('text');
            $table->unsignedInteger('stat_votes');
		});
	}

	public function down()
	{
		Schema::drop('forum_poll_items');
	}

};
