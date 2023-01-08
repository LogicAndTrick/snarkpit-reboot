<?php

namespace App\Console\Commands;

use App\Models\News;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class DeployUsers extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'deploy:users';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Deploy users from the old database to the new one.';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        ini_set('memory_limit','64M');

        DB::unprepared("delete from `snark3_reboot`.users");

        // Use descending order so that the most recent email address is kept unchanged
        $accounts = DB::select('select * from snark3_snarkpit.accounts order by id desc');

        $duplicate_emails = [];
        $found_duplicates = [];

        $this->withProgressBar($accounts, function($acc) use (&$duplicate_emails, &$found_duplicates) {
            $id = $acc->id;
            if ($id < 0) $id = 100;

            $custom_avatar = false;
            $avatar = $acc->avatar;
            if ($avatar && is_numeric($avatar)) {
                $avatar = $avatar . '.png';
            } else if ($avatar === 'jpg' || $avatar === 'gif' || $avatar === 'png') {
                $custom_avatar = true;
                $avatar = 'avatar' . $id . '.' . $avatar;
            }

            $custom_title = $acc->custom_title;
            if ($custom_title) {
                $custom_title = html_entity_decode(explode('|', $custom_title)[0]);
            }

            $email = $acc->email;
            if (in_array(strtolower($email), $duplicate_emails)) {
                $found = count(array_filter($duplicate_emails, function ($i) use ($email) {
                    return strtolower($email) === $i;
                })) + 1;
                $email = 'duplicate' . $found . '_' . $email;
            }
            $duplicate_emails[] = strtolower($acc->email);

            $level = $acc->level;
            if ($level == 0) $level = 1;

            $user = new User();
            $user->id = $id;
            $user->name = html_entity_decode($acc->username);
            $user->email = $email;
            $user->email_verified_at = $acc->joined;
            $user->password = '';
            $user->legacy_password = $acc->password;
            $user->level = $level;
            $user->remember_token = '';
            $user->last_login_time = $acc->last_seen ? Carbon::createFromTimestamp($acc->last_seen) : Carbon::now();
            $user->last_access_time = $acc->last_seen ? Carbon::createFromTimestamp($acc->last_seen) : Carbon::now();
            $user->last_access_page = '';
            $user->last_access_ip = $acc->ip;
            $user->timezone = is_numeric($acc->timezone) ? $acc->timezone : 0;
            $user->show_email = false;
            $user->show_signature = $acc->addsig;
            $user->subscribe_topics = $acc->notify;
            $user->notify_messages = $acc->notifypm;
            $user->snow_snarks = $acc->snow_snarks;
            $user->has_pit = $acc->pit;
            $user->avatar_custom = $custom_avatar;
            $user->avatar_file = $avatar;
            $user->title_custom = $custom_title != '';
            $user->title_text = $custom_title;
            $user->info_name = '';
            $user->info_website = $acc->website ? 'http://'.html_entity_decode($acc->website) : '';
            $user->info_occupation = html_entity_decode($acc->occupation);
            $user->info_interests = '';
            $user->info_location = html_entity_decode($acc->location);
            $user->info_languages = '';
            $user->info_steam_profile = html_entity_decode($acc->steam);
            $user->info_birthday = 0;
            $user->info_biography_text = reverse_snarkpit_format($acc->profile);
            $user->info_biography_html = bbcode($user->info_biography_text);
            $user->info_signature_text = reverse_snarkpit_format($acc->sig);
            $user->info_signature_html = bbcode($user->info_signature_text);
            $user->stat_logins = 1;
            $user->stat_profile_hits = $acc->profile_views;
            $user->stat_forum_posts = $acc->posts;
            $user->stat_maps = 0;
            $user->stat_journals = 0;
            $user->stat_comments = 0;
            $user->stat_snarks = $acc->snarks;
            $user->created_at = Carbon::createFromTimestamp($acc->joined);
            $user->updated_at = Carbon::createFromTimestamp($acc->joined);
            $user->deleted_at = null;
            $user->save();
        });
        $this->output->writeln("\nUsers done.");
        return 0;
    }
}
