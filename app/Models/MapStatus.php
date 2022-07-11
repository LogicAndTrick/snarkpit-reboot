<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MapStatus extends Model
{
    const STATUS_COMPLETE = 1;
    const STATUS_BETA = 2;
    const STATUS_ABANDONED = 3;

    public $timestamps = false;
    protected $fillable = ['id', 'name'];
}
