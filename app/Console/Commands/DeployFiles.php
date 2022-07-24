<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class DeployFiles extends Command
{
    protected $signature = 'deploy:files';
    protected $description = 'Deploy files (by copying) from the old site folders to the new one';

    private function mkdir($dir) {
        $this->output->writeln($dir);
        if (file_exists($dir)) return;
        mkdir($dir);
    }

    private function assertExists($dir) {
        if (!file_exists($dir)) {
            $this->output->error('Directory not found: '.$dir);
            die();
        }
    }

    public function handle()
    {
        $old_site_root = config('migration.old_path');
        if ($old_site_root == '') {
            $this->output->error('Old migration directory not found.');
            return 1;
        }
        $old_site_root = rtrim($old_site_root, "\\/").'/';
        $this->output->writeln('Old site root is: ' . $old_site_root);
        $this->assertExists($old_site_root);

        $original_articles_dir = $old_site_root.'/content/articles';
        $original_downloads_dir = $old_site_root.'/content/downloads';
        $original_download_images_dir = $old_site_root.'/content/downloads/images';
        $original_maps_dir = $old_site_root.'/maps';
        $original_avatars_dir = $old_site_root.'/images/avatars';

        $this->output->writeln('Validating environment...');
        $this->assertExists($original_articles_dir);
        $this->assertExists($original_downloads_dir);
        $this->assertExists($original_download_images_dir);
        $this->assertExists($original_maps_dir);
        $this->assertExists($original_avatars_dir);

        $uploads_base_dir = public_path('uploads');

        $articles_base_dir = $uploads_base_dir.'/articles';
        $articles_files_dir = $uploads_base_dir.'/articles/files';
        $articles_images_dir = $uploads_base_dir.'/articles/images';

        $downloads_base_dir = $uploads_base_dir.'/downloads';
        $downloads_files_dir = $uploads_base_dir.'/downloads/files';
        $downloads_images_dir = $uploads_base_dir.'/downloads/images';

        $maps_base_dir = $uploads_base_dir.'/maps';
        $maps_files_dir = $uploads_base_dir.'/maps/files';
        $maps_images_dir = $uploads_base_dir.'/maps/images';

        $avatars_dir = $uploads_base_dir.'/avatars';

        $this->output->writeln('Creating directories...');
        $this->mkdir($articles_base_dir);
        $this->mkdir($articles_files_dir);
        $this->mkdir($articles_images_dir);
        $this->mkdir($downloads_base_dir);
        $this->mkdir($downloads_files_dir);
        $this->mkdir($downloads_images_dir);
        $this->mkdir($maps_base_dir);
        $this->mkdir($maps_files_dir);
        $this->mkdir($maps_images_dir);
        $this->mkdir($avatars_dir);

        $this->output->writeln('Migrating articles...');
        $this->output->writeln('(I haven\'t done anything yet)');

        return 0;
    }
}
