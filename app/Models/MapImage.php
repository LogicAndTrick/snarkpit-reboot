<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MapImage extends Model
{
    public $timestamps = false;

    public function map() {
        return $this->belongsTo(Map::class);
    }
}
