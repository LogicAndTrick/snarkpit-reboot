<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;

class Journal extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $casts = ['created_at', 'updated_at', 'deleted_at'];

    protected $fillable = ['user_id', 'title', 'content_text', 'content_html'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function canEdit() {
        $user = Auth::user();
        if (!$user) return false;

        if (Gate::allows('admin')) return true;
        return $user->id == $this->user_id;
    }
}
