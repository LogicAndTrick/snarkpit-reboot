<?php

use App\Models\DownloadCategory;
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
        Schema::create('download_categories', function (Blueprint $table) {
            $table->id();
            $table->string('name', 100);
            $table->timestamps();
        });
        $cats = [
            1 => 'Prefabs',
            3 => 'Editors',
            4 => 'Textures',
            5 => 'Models',
            6 => 'Utilities'
        ];
        foreach ($cats as $id => $name) {
            DownloadCategory::create([
                'id' => $id,
                'name' => $name
            ]);
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('download_categories');
    }
};
