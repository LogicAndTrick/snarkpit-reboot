<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function getIndex() {
        return view('admin.index');
    }

    public function getDeployment() {
        $this->superAdmin();
        return view('admin.deployment', [
            'version' => $this->runCommand('git log -1 --format="%h - %s"')
        ]);
    }

    private function runCommand(string $command): bool|string|null {
        $dir = getcwd();
        chdir(base_path());
        $res = shell_exec($command . ' 2>&1');
        chdir($dir);
        return $res;
    }

    private static function executeCommands($commands_to_run) {
        header('Content-Type: text/html');
        header('Cache-Control: no-store');

        chdir(base_path());
        set_time_limit(0);

        if (ob_get_level() == 0) ob_start();

        echo '<!DOCTYPE html>
<html>
<head>
<style>
html, body {
    overflow-x: hidden;
    background: #111;
    color: #eee;
    font-family: monospace;
}
.command {
    position: fixed;
    top: 0.5rem;
    left: 0.5rem;
    border-radius: 0.25rem;
    padding: 0.25rem 0.5rem;
    background: #00ef47;
    color: #222;
}
</style>
</head>
<body>
<script>
let cached = document.body.innerText;
const interval = setInterval(() => {
    const it = document.body.innerText;
    if (it === cached) return;
    cached = it;
    document.scrollingElement.scrollTop = 9999;
}, 10);
function update(text) {
    document.getElementById("upd").innerText = text;
}
</script>
<div class="command" id="upd">Do not close your browser! Getting ready...</div>
<div><br/>';
        echo str_pad('', 4096);
        echo "<br />\n";
        ob_flush();
        flush();

        foreach ($commands_to_run as $cmd) {
            echo '<script>update("Do not close your browser! Running: ' . str_replace('"', '\"', $cmd) . '")</script>';
            $handle = popen("$cmd 2>&1", "r");

            while (!feof($handle)) {
                $buffer = fgets($handle);
                $buffer = trim($buffer);

                echo $buffer;
                echo str_pad('', 4096);
                echo "<br />\n";

                ob_flush();
                flush();
            }
            pclose($handle);
        }

        echo '</div>
<script>
document.scrollingElement.scrollTop = 9999;
clearInterval(interval);
update("Update complete.");
</script>
</body>
</html>';

        ob_end_flush();

        exit();
    }

    public function postDeploymentExecute(Request $request) {
        $this->superAdmin();

        $operation = $request->input('operation');
        $commands = [];
        switch ($operation) {
            case 'update':
                $commands[] = 'git pull';
                $commands[] = 'COMPOSER_HOME=~/.composer-home php composer.phar install';
                $commands[] = 'php artisan optimize';
                break;
            case 'migrate':
                $commands[] = 'php artisan migrate --force';
                break;
            case 'update-migrate':
                $commands[] = 'git pull';
                $commands[] = 'COMPOSER_HOME=~/.composer-home php composer.phar install';
                $commands[] = 'php artisan migrate --force';
                $commands[] = 'php artisan optimize';
                break;
            case 'refresh';
                $commands[] = 'php artisan migrate:refresh';
                $commands[] = 'php artisan deploy:users';
                $commands[] = 'php artisan deploy:bans';
                break;
            case 'deploy-news':
                $commands[] = 'php artisan deploy:news';
                break;
            case 'deploy-forums':
                $commands[] = 'php artisan deploy:forums';
                $commands[] = 'php artisan deploy:forum-polls';
                break;
            case 'deploy-games':
                $commands[] = 'php artisan deploy:games';
                break;
            case 'deploy-downloads':
                $commands[] = 'php artisan deploy:downloads';
                break;
            case 'deploy-links':
                $commands[] = 'php artisan deploy:links';
                break;
            case 'deploy-articles':
                $commands[] = 'php artisan deploy:articles';
                break;
            case 'deploy-maps':
                $commands[] = 'php artisan deploy:maps';
                break;
            case 'deploy-files':
                $commands[] = 'php artisan deploy:files';
                break;
            case 'deploy-messages':
                $commands[] = 'php artisan deploy:messages';
                break;
        }

        self::executeCommands($commands);
    }
}
