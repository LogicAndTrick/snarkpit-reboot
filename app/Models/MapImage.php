<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MapImage extends Model
{
    public $timestamps = false;
    protected $fillable = ['map_id', 'image_file', 'order_index'];

    public function map() {
        return $this->belongsTo(Map::class);
    }
}
