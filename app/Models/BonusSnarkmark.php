<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BonusSnarkmark extends Model
{
    protected $table = 'bonus_snarkmarks';

    protected $fillable = ['user_id', 'snarkmarks', 'added_user_id', 'description'];

    public function user() {
        return $this->belongsTo(User::class, 'id', 'user_id');
    }

    public function added_user() {
        return $this->hasOne(User::class, 'id', 'added_user_id');
    }
}
