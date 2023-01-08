<?php

namespace App\Console\Commands;

use App\Models\ForumPoll;
use App\Models\ForumPollItem;
use App\Models\ForumPollItemVote;
use App\Models\ForumThread;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class DeployForumPolls extends Command
{
    protected $signature = 'deploy:forum-polls';

    protected $description = 'Deploy forum polls from the old database to the new one.';

    public function handle()
    {
        DB::unprepared("delete from `snark3_reboot`.forum_poll_item_votes");
        DB::unprepared("delete from `snark3_reboot`.forum_poll_items");
        DB::unprepared("delete from `snark3_reboot`.forum_polls");

        $polls = DB::select('select * from snark3_snarkpit.forum_polls');

        // id question options votes topic_id ends
        $this->withProgressBar($polls, function ($poll) {
            $thread = ForumThread::find($poll->topic_id);
            if (!$thread) return;

            $p = new ForumPoll();
            $p->id = $poll->id;
            $p->thread_id = $poll->topic_id;
            $p->title = stripslashes(stripslashes($poll->question));
            $p->close_date = Carbon::createFromTimestamp($poll->ends);
            $p->save();

            $items = [];
            $poll_options = explode('|', substr($poll->options, 1));
            foreach ($poll_options as $option) {
                $item = new ForumPollItem();
                $item->forum_poll_id = $p->id;
                $item->text = stripslashes(stripslashes($option));
                $item->stat_votes = 0;
                $item->save();
                $items[] = $item;
            }

            if (strlen($poll->votes) > 0) {
                $poll_votes = explode('|', substr($poll->votes, 1));
                for ($i = 0; $i < count($poll_votes); $i += 2) {
                    $vote = new ForumPollItemVote();
                    $vote->forum_poll_id = $p->id;
                    $vote->forum_poll_item_id = $items[$poll_votes[$i]]->id;
                    $vote->user_id = intval($poll_votes[$i + 1]);
                    $vote->save();
                }
            }
        });
        $this->output->writeln("\nPolls done.");
        return self::SUCCESS;
    }
}
