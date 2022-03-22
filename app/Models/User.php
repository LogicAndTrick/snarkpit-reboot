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
        'email_verified_at' => 'datetime',
    ];
}
