<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\DB;

class User extends Authenticatable implements MustVerifyEmail
{
    use HasFactory, Notifiable, SoftDeletes;

    public const DEFINITELY_OBLITERATE_THIS_USER = 'aaafc81ce7bb61e4f1c7cc748bcd11b30286a7c2f84af7eb9c0f7c745519ec31';
    public const DEFINITELY_REMOVE_THIS_USER = 'fba7f93761578feac5319412026a8645404b2a49c734bf428397100554c25958';

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

    protected $visible = [
        'id',
        'name',
        'avatar_custom',
        'avatar_file',
        'title_custom',
        'title_text',
        'stat_snarks'
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

    public function deleteAvatar() {
        if ($this->avatar_custom && is_file(public_path('uploads/avatars/'.$this->avatar_file))) {
            unlink(public_path('uploads/avatars/'.$this->avatar_file));
        }
        $this->avatar_custom = false;
        $this->avatar_file = '';
    }

    /**
     * Remove this user, which will delete MOST content they have ever posted, and anonymise the rest.
     * @param $confirmation string If this value doesn't equal User::DEFINITELY_REMOVE_THIS_USER, the user will not be removed
     * @return bool True if the user is removed, false otherwise
     */
    public function remove($confirmation)
    {
        // TODO
        throw new \Exception('Not fully implemented yet.');
        if ($confirmation != User::DEFINITELY_REMOVE_THIS_USER) return false;

        $deleted = Carbon::now();
        $id = $this->id;

        // Not deleted:
        // articles, forum poll votes, map ratings, news

        $soft_delete_tables = [
            'forum_posts',
            'forum_threads',
            'maps',
            // journals
        ];
        $tables = [
            'downloads',
        ];

        // Clean up PM threads

        // todo
        // DB::statement("delete u from message_users u where u.message_id IN ( select m.id from messages m where m.user_id = ? )", [$id]);
        // DB::statement("delete u from message_users u where u.thread_id IN ( select t.id from message_threads t where t.user_id = ? )", [$id]);
        // DB::statement("delete u from message_thread_users u where u.thread_id IN ( select m.id from message_threads m where m.user_id = ? )", [$id]);
        // DB::statement("delete m from messages m where m.thread_id IN ( select t.id from message_threads t where t.user_id = ? )", [$id]);

        foreach ($soft_delete_tables as $t) {
            DB::statement("UPDATE $t SET deleted_at = ? WHERE user_id = ? and deleted_at is null", [$deleted, $id]);
        }
        foreach ($tables as $t) {
            DB::statement("DELETE FROM $t WHERE user_id = ?", [$id]);
        }

        DB::statement("
            UPDATE users SET
            name = ?, email = ?, email_verified_at = null, password = 'removed',
            legacy_password = '', level = 1, remember_token = '',
            last_login_time = null, last_access_time = null, last_access_page = '', last_access_ip = '',
            timezone = 0, show_email = 0, show_signature = 0, subscribe_topics = 0, notify_messages = 0, snow_snarks = 0, has_pit = 0,
            avatar_custom = 0, avatar_file = '',
            title_custom = 0, title_text = '',
            info_name = '', info_website = '', info_occupation = '', info_interests = '', info_location = '', info_languages = '', info_steam_profile = '', info_birthday = 0, info_biography_text = '', info_biography_html = '', info_signature_text = '', info_signature_html = '',
            stat_logins = 0, stat_forum_posts = 0, stat_maps = 0, stat_journals = 0, stat_comments = 0, stat_snarks = 0
            WHERE id = ?
        ", [ 'User#'.$id, $id.'@removed', $id ]);

        return true;
    }

    /**
     * Obliterate this user, which will delete ALL content they have ever posted.
     * It will also PERMANENTLY ban them by IP address.
     * @param $confirmation string If this value doesn't equal User::DEFINITELY_OBLITERATE_THIS_USER, the user will not be obliterated
     * @return bool True if the user is obliterated, false otherwise
     */
    public function obliterate($confirmation)
    {
        // TODO
        throw new \Exception('Not fully implemented yet.');
        if ($confirmation != User::DEFINITELY_OBLITERATE_THIS_USER) return false;

        $deleted = Carbon::now();
        $id = $this->id;

        $soft_delete_tables = [
            'articles',
            'article_versions',
            'forum_posts',
            'forum_threads',
            'maps',
            //'journals',
            'news',
        ];
        $tables = [
            'downloads',
            'forum_poll_item_votes',
            'map_ratings',
        ];

        // Clean up PM threads
        // todo
        // DB::statement("delete u from message_users u where u.message_id IN ( select m.id from messages m where m.user_id = ? )", [$id]);
        // DB::statement("delete u from message_users u where u.thread_id IN ( select t.id from message_threads t where t.user_id = ? )", [$id]);
        // DB::statement("delete u from message_thread_users u where u.thread_id IN ( select m.id from message_threads m where m.user_id = ? )", [$id]);
        // DB::statement("delete m from messages m where m.thread_id IN ( select t.id from message_threads t where t.user_id = ? )", [$id]);

        foreach ($soft_delete_tables as $t) {
            DB::statement("UPDATE $t SET deleted_at = ? WHERE user_id = ?", [$deleted, $id]);
        }
        foreach ($tables as $t) {
            DB::statement("DELETE FROM $t WHERE user_id = ?", [$id]);
        }
        DB::statement('UPDATE users SET deleted_at = ? WHERE id = ?', [$deleted, $id]);

        Ban::create([
            'user_id' => $id,
            'ip' => $this->last_access_ip ? $this->last_access_ip : null,
            'ends_at' => null,
            'reason' => 'You have been banned for spamming.'
        ]);

        return true;
    }
}
