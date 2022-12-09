<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up()
    {
        DB::raw("
create view combined_updates as
    select 'map' as type, m.id, m.user_id, m.name, m.updated_at, m.game_id, null as download_category_id, null as article_category_id, m.thread_id, null as slug
    from maps m
    where m.deleted_at is null
union
    select 'download' as type, d.id, d.user_id, d.name, d.updated_at, d.game_id, d.download_category_id, null as article_category_id, d.thread_id, null as slug
    from downloads d
union
    select 'article' as type, a.id, a.user_id, v.title, v.updated_at, a.game_id, null as download_category_id, a.article_category_id, a.forum_thread_id, v.slug
    from articles a
    inner join article_versions v on a.current_version_id = v.id
    where a.deleted_at is null
    and a.is_active = 1;
        ");
    }

    public function down()
    {
        DB::raw('drop view if exists combined_updates;');
    }
};
