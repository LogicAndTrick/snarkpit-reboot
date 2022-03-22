<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ban extends Model
{
    use HasFactory;

    protected $table = 'bans';
    protected $fillable = [ 'user_id', 'ip', 'ends_at', 'reason' ];

    public function getDates()
    {
        return ['ends_at', 'created_at', 'updated_at', 'deleted_at'];
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function isActive()
    {
        $now = Carbon::now();
        return $this->created_at <= $now && (!$this->ends_at || $this->ends_at >= $now);
    }
}
