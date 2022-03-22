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
        DB::unprepared('delete from `snarkpit-new`.users');
        $accounts = DB::select('select * from snark3_snarkpit.accounts');

        $duplicate_emails = [
            // todo
        ];
        $found_duplicates = [];

        // todo: permissions/admin levels

        foreach ($accounts as $acc) {
            if ($acc->id < 0) continue;

            $custom_avatar = false;
            $avatar = $acc->avatar;
            if ($avatar && is_numeric($avatar)) {
                $avatar = $avatar . '.png';
            } else if ($avatar === 'jpg' || $avatar === 'gif' || $avatar === 'png') {
                $custom_avatar = true;
                $avatar = 'avatar' . $acc->id . '.' . $avatar;
            }

            $email = $acc->email;
            if (array_search($email, $duplicate_emails) !== false) {
                $found = count(array_filter($found_duplicates, function ($i) use ($email) {
                    return strtolower($email) === strtolower($i);
                })) + 1;
                if ($found > 1) {
                    $email = 'duplicate' . $found . '_' . $email;
                }
                $found_duplicates[] = $acc->email;
            }

            $user = new User();
            $user->id = $acc->id;
            $user->name = $acc->username;
            $user->email = $email;
            $user->email_verified_at = $acc->joined;
            $user->password = '';
            $user->legacy_password = $acc->password;
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
            $user->title_custom = $acc->custom_title != '';
            $user->title_text = $acc->custom_title;
            $user->info_name = '';
            $user->info_website = $acc->website ? 'http://'.$acc->website : '';
            $user->info_occupation = $acc->occupation;
            $user->info_interests = '';
            $user->info_location = $acc->location;
            $user->info_languages = '';
            $user->info_steam_profile = $acc->steam;
            $user->info_birthday = 0;
            $user->info_biography_text = reverse_snarkpit_format($acc->profile);
            $user->info_biography_html = $this->bbcode($user->info_biography_text);
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
        }
        return 0;
    }

    private function bbcode($content_text)
    {
        return $content_text;
    }
}
