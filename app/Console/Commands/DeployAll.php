<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class DeployAll extends Command
{
    protected $signature = 'deploy:all';
    protected $description = 'Full redeploy of all tables';

    public function handle()
    {
        $this->call('migrate:refresh');
        $this->call('deploy:users');
        $this->call('deploy:bans');
        $this->call('deploy:news');
        $this->call('deploy:forums');
        $this->call('deploy:forum-polls');
        $this->call('deploy:games');
        $this->call('deploy:downloads');
        $this->call('deploy:links');
        $this->call('deploy:articles');
        $this->call('deploy:maps');
        $this->call('deploy:files');
        $this->call('deploy:messages');
        $this->call('deploy:spotlight');
        $this->call('deploy:journals');
        $this->call('deploy:snarkmarks');
        $this->call('deploy:pages');
        return self::SUCCESS;
    }
}
