<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;

class Message extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'from_user_id',
        'to_user_id',
        'title',
        'content_text',
        'content_html',
        'is_read'
    ];

    public function from_user() {
        return $this->belongsTo(User::class, 'from_user_id');
    }

    public function to_user() {
        return $this->belongsTo(User::class, 'to_user_id');
    }

    public function canRead() {
        $user = Auth::user();
        if (!$user) return false;

        if (Gate::allows('admin')) return true;
        return $user->id == $this->from_user_id
            || $user->id == $this->to_user_id;
    }
}
