<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {

	public function up()
	{
		Schema::create('forum_polls', function(Blueprint $table)
		{
			$table->id();
            $table->foreignIdFor(\App\Models\ForumThread::class, 'thread_id')->references('id')->on('forum_threads');
            $table->string('title');
            $table->date('close_date');
			$table->timestamps();
            $table->softDeletes();
		});
	}

	public function down()
	{
		Schema::drop('forum_polls');
	}

};
