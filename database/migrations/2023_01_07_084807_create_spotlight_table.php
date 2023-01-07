<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('spotlight', function (Blueprint $table) {
            $table->id();
            $table->integer('item_id');
            $table->char('item_type', 1);
            $table->integer('position');
        });
    }

    public function down()
    {
        Schema::dropIfExists('spotlight');
    }
};
