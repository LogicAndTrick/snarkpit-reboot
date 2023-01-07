<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Spotlight extends Model
{
    public const TYPE_MAP = 'm';
    public const TYPE_ARTICLE = 'a';
    public const TYPE_DOWNLOAD = 'd';

    protected $table = 'spotlight';

    public $timestamps = false;

    protected $fillable = [
        'item_id',
        'item_type',
        'position'
    ];

    public function item() {
        return $this->morphTo();
    }
}
