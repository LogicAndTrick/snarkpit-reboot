<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class DeployFiles extends Command
{
    protected $signature = 'deploy:files';
    protected $description = 'Deploy files (by copying) from the old site folders to the new one';

    private function mkdir($dir) {
        if (file_exists($dir)) return;
        $this->output->writeln($dir);
        mkdir($dir);
    }

    private function assertExists($dir) {
        if (!file_exists($dir)) {
            $this->output->error('Directory not found: '.$dir);
            die();
        }
    }

    private function enumerateDirectory($dir) {
        if (!file_exists($dir) || !is_dir($dir)) return [];
        return array_diff(scandir($dir), array('..', '.'));
    }

    private function attemptCopy($source, $destination) {
        if (!file_exists($source)) return; // file doesn't exist at source
        if (file_exists($destination)) {
            $source_size = filesize($source);
            $dest_size = filesize($destination);
            if ($source_size == $dest_size) return; // file already exists at destination and is the same size
        }
        copy($source, $destination);
        $this->output->writeln('Copied ' .$source. ' to '.$destination.'.');
    }

    public function handle()
    {
        $old_site_root = config('migration.old_path');
        if ($old_site_root == '') {
            $this->output->error('Old migration directory not found.');
            return 1;
        }
        $old_site_root = rtrim($old_site_root, "\\/");
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

        // Articles
        $this->output->writeln('Migrating article files...');

        $article_dirs = $this->enumerateDirectory($original_articles_dir);
        foreach ($article_dirs as $article_dir_name) {
            $article_dir = "$original_articles_dir/$article_dir_name";
            $article_id = intval($article_dir_name);
            if (!$article_id) continue;

            $revision_dirs = $this->enumerateDirectory($article_dir);
            foreach ($revision_dirs as $revision_dir_name) {
                $revision_dir = "$article_dir/$revision_dir_name";
                $revision_id = intval($revision_dir_name);
                if (!$revision_id) continue;

                // Article thumbnail
                $this->attemptCopy("{$revision_dir}/{$article_id}.jpg", "$articles_images_dir/article_${article_id}_${revision_id}_thumb.jpg");

                // Article example files
                $this->attemptCopy("{$revision_dir}/example_{$article_id}.zip", "$articles_files_dir/article_${article_id}_${revision_id}_example.zip");
                $this->attemptCopy("{$revision_dir}/example_{$article_id}.jpg", "$articles_files_dir/article_${article_id}_${revision_id}_example.jpg");

                // Article images
                for ($i = 1; $i < 100; $i++) {
                    $img = "$revision_dir/${article_id}_${i}.jpg";
                    if (!file_exists($img)) break;
                    $this->attemptCopy($img, "$articles_images_dir/article_${article_id}_${revision_id}_${i}.jpg");
                }
            }
        }

        // Downloads
        $this->output->writeln('Migrating download files...');

        $download_files = $this->enumerateDirectory($original_downloads_dir);
        $download_files = array_filter($download_files, fn($name) => str_starts_with($name, 'download'));
        foreach ($download_files as $download_file_name) {
            $this->attemptCopy("$original_downloads_dir/$download_file_name", "$downloads_files_dir/$download_file_name");
        }

        $download_images = $this->enumerateDirectory($original_download_images_dir);
        $download_images = array_filter($download_images, fn($name) => str_starts_with($name, 'download'));
        foreach ($download_images as $download_image_name) {
            $this->attemptCopy("$original_download_images_dir/$download_image_name", "$downloads_images_dir/$download_image_name");
        }

        // Maps
        $this->output->writeln('Migrating map files...');

        $map_cat_dirs = $this->enumerateDirectory($original_maps_dir);
        foreach ($map_cat_dirs as $map_cat_dir) {
            $files_dir = "$original_maps_dir/$map_cat_dir";
            if (!is_dir($files_dir)) continue;

            $map_files = $this->enumerateDirectory($files_dir);
            $map_files = array_filter($map_files, fn($name) => str_contains($name, 'map'));
            foreach ($map_files as $map_file_name) {
                $new_map_file_name = str_replace('..', '.', $map_file_name);
                $this->attemptCopy("$files_dir/$map_file_name", "$maps_files_dir/$new_map_file_name");
            }

            $image_files = $this->enumerateDirectory("$files_dir/images");
            $image_files = array_filter($image_files, fn($name) => str_ends_with($name, '.jpg'));
            foreach ($image_files as $image_file_name) {
                $this->attemptCopy("$files_dir/images/$image_file_name", "$maps_images_dir/$image_file_name");
            }
        }

        // Avatars
        $this->output->writeln('Migrating avatars...');

        $avatar_images = $this->enumerateDirectory($original_avatars_dir);
        $avatar_images = array_filter($avatar_images, fn($name) => str_starts_with($name, 'avatar'));
        foreach ($avatar_images as $avatar_image_name) {
            $this->attemptCopy("$original_avatars_dir/$avatar_image_name", "$avatars_dir/$avatar_image_name");
        }

        return 0;
    }
}
