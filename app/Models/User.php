<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable implements MustVerifyEmail
{
    use HasFactory, Notifiable, SoftDeletes;

    public const LEVEL_MEMBER = 1;
    public const LEVEL_MODERATOR = 2;
    public const LEVEL_ADMIN = 3;
    public const LEVEL_SUPER_ADMIN = 4;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'legacy_password',
        'level',
        'timezone',
        'show_email',
        'show_signature',
        'subscribe_topics',
        'notify_messages',
        'snow_snarks',
        'has_pit',
        'avatar_custom',
        'avatar_file',
        'title_custom',
        'title_text',
        'info_name',
        'info_website',
        'info_occupation',
        'info_interests',
        'info_location',
        'info_languages',
        'info_steam_profile',
        'info_birthday',
        'info_biography_text',
        'info_biography_html',
        'info_signature_text',
        'info_signature_html',
        'stat_logins',
        'stat_profile_hits',
        'stat_forum_posts',
        'stat_maps',
        'stat_journals',
        'stat_comments',
        'stat_snarks',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
        'legacy_password',
    ];

    protected $attributes = [
        'legacy_password' => '',
        'level' => 1,
        'timezone' => 0,
        'show_email' => false,
        'show_signature' => false,
        'subscribe_topics' => true,
        'notify_messages' => true,
        'snow_snarks' => true,
        'has_pit' => false,
        'avatar_custom' => false,
        'avatar_file' => '',
        'title_custom' => false,
        'title_text' => '',
        'info_name' => '',
        'info_website' => '',
        'info_occupation' => '',
        'info_interests' => '',
        'info_location' => '',
        'info_languages' => '',
        'info_steam_profile' => '',
        'info_birthday' => 0,
        'info_biography_text' => '',
        'info_biography_html' => '',
        'info_signature_text' => '',
        'info_signature_html' => '',
        'stat_logins' => 0,
        'stat_profile_hits' => 0,
        'stat_forum_posts' => 0,
        'stat_maps' => 0,
        'stat_journals' => 0,
        'stat_comments' => 0,
        'stat_snarks' => 0,
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'last_login_time' => 'datetime',
        'last_access_time' => 'datetime',
        'email_verified_at' => 'datetime',
    ];

    protected $appends = [
        'info_birthday_formatted'
    ];

    public function maps() {
        return $this->hasMany(Map::class);
    }

    public function articles() {
        return $this->hasMany(Article::class);
    }

    public function getInfoBirthdayFormattedAttribute() {
        $val = $this->info_birthday;
        if ($val == 0) return '';
        $d = $val % 100;
        $m = ($val - $d) / 100;
        return str_pad(strval($d), 2, '0', STR_PAD_LEFT) . '/' . str_pad(strval($m), 2, '0', STR_PAD_LEFT);
    }

    public function setInfoBirthdayFormattedAttribute($value) {
        if (preg_match('%(0[1-9]|[12][0-9]|3[01])/(0[1-9]|1[012])%m', $value, $regs)) {
            $this->info_birthday = intval($regs[2] . $regs[1]);
        } else {
            $this->info_birthday = 0;
        }
    }
}
