<?php

namespace App\Console\Commands;

use App\Models\Message;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class DeployMessages extends Command
{
    protected $signature = 'deploy:messages';

    protected $description = 'Deploy private messages from the old database to the new one.';

    public function handle()
    {
        DB::unprepared("truncate table `snark3_reboot`.messages");
        $messages = DB::select('
            select pm.*
            from snark3_snarkpit.private_messages pm
            inner join snark3_snarkpit.accounts a on pm.sender = a.id
            inner join snark3_snarkpit.accounts b on pm.receiver = b.id
            order by pm.id
        ');
        $this->withProgressBar($messages, function($msg) {

            $message = new Message();
            $message->id = $msg->id;
            $message->from_user_id = $msg->sender;
            $message->to_user_id = $msg->receiver;
            $message->title = $msg->title;
            $message->content_text = reverse_snarkpit_format($msg->text);
            $message->content_html = bbcode($message->content_text);
            $message->is_read = $msg->read > 0;
            $message->created_at = Carbon::createFromTimestamp($msg->time);
            $message->updated_at = Carbon::createFromTimestamp($msg->time);
            $message->deleted_at = $msg->r_del ? Carbon::now() : null;
            $message->timestamps = false;
            $message->save();
        });
        return 0;
    }
}
