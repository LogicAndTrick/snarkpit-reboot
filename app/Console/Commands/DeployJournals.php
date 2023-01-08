<?php

namespace App\Console\Commands;

use App\Models\Journal;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class DeployJournals extends Command
{
    protected $signature = 'deploy:journals';

    protected $description = 'Deploy links from the old database to the new one.';

    public function handle()
    {
        // id user title text date edited show
        DB::unprepared("truncate table `snark3_reboot`.journals");
        $journals = DB::select('select * from snark3_snarkpit.journals order by id');
        $this->withProgressBar($journals, function($journal) {
            $j = new Journal();
            $j->id = $journal->id;
            $j->user_id = $journal->user;
            $j->title = $journal->title;
            $j->content_text = reverse_snarkpit_format($journal->text);
            $j->content_html = bbcode($j->content_text);
            $j->created_at = Carbon::createFromTimestamp($journal->date);
            $j->updated_at = Carbon::createFromTimestamp($journal->edited > 0 ? $journal->edited : $journal->date);
            $j->deleted_at = $journal->show ? null : $j->updated_at;
            $j->timestamps = false;
            $j->save();
        });
        $this->output->writeln("\nJournals done.");
        return 0;
    }
}
