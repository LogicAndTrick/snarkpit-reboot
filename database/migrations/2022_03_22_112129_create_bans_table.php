<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBansTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('bans', function(Blueprint $table)
        {
            $table->id();
            $table->foreignIdFor(\App\Models\User::class)->nullable()->references('id')->on('users');
            $table->string('ip', 15)->nullable();
            $table->timestamp('ends_at')->nullable();
            $table->string('reason', 512);
            $table->timestamps();

            $table->index(['ip', 'ends_at']);
            $table->index(['user_id', 'ends_at']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('bans');
    }
}
