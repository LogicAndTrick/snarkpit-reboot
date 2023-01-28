<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_subscriptions', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(\App\Models\User::class)->references('id')->on('users');
            $table->char('item_type', 1);
            $table->unsignedBigInteger('item_id');
            $table->boolean('send_email');

            $table->index(['user_id', 'item_type', 'item_id']);
        });

        Schema::create('user_notifications', function(Blueprint $table) {
            $table->id();
            $table->foreignIdFor(\App\Models\User::class)->references('id')->on('users');
            $table->char('item_type', 1);
            $table->unsignedBigInteger('item_id');
            $table->boolean('is_unread');

            $table->timestamps();

            $table->index(['user_id', 'item_type', 'item_id', 'is_unread'], 'user_notifications_user_type_id_unread_index');
        });

        DB::unprepared("
            CREATE VIEW user_subscription_details AS
            SELECT
                US.id, US.user_id, US.item_type, US.item_id, US.send_email,
                (CASE US.item_type
                    WHEN 't' THEN T.title
                    WHEN 'a' THEN AR.title
                    WHEN 'm' THEN M.name
                    WHEN 'n' THEN N.subject
                    WHEN 'j' THEN J.title
                    WHEN 'd' THEN D.name
                END) AS title
            FROM user_subscriptions US
            LEFT JOIN forum_threads T ON US.item_type = 't' AND US.item_id = T.id
            LEFT JOIN articles A ON US.item_type = 'a' AND US.item_id = A.id
              LEFT JOIN article_versions AR ON A.current_version_id = AR.id
            LEFT JOIN maps M ON US.item_type = 'm' AND US.item_id = M.id
            LEFT JOIN news N ON US.item_type = 'n' AND US.item_id = N.id
            LEFT JOIN journals J ON US.item_type = 'j' AND US.item_id = J.id
            LEFT JOIN downloads D ON US.item_type = 'd' AND US.item_id = D.id
            ;");

        DB::unprepared("
            CREATE VIEW user_notification_details AS
            SELECT
                UN.id, UN.user_id, UN.item_type, UN.item_id, UN.is_unread, UN.created_at, UN.updated_at,
                (CASE UN.item_type
                    WHEN 't' THEN T.title
                    WHEN 'a' THEN AR.title
                    WHEN 'm' THEN M.name
                    WHEN 'n' THEN N.subject
                    WHEN 'j' THEN J.title
                    WHEN 'd' THEN D.name
                END) AS title
            FROM user_notifications UN
            LEFT JOIN forum_threads T ON UN.item_type = 't' AND UN.item_id = T.id
            LEFT JOIN articles A ON UN.item_type = 'a' AND UN.item_id = A.id
              LEFT JOIN article_versions AR ON A.current_version_id = AR.id
            LEFT JOIN maps M ON UN.item_type = 'm' AND UN.item_id = M.id
            LEFT JOIN news N ON UN.item_type = 'n' AND UN.item_id = N.id
            LEFT JOIN journals J ON UN.item_type = 'j' AND UN.item_id = J.id
            LEFT JOIN downloads D ON UN.item_type = 'd' AND UN.item_id = D.id
            ;");

        DB::unprepared("
            CREATE PROCEDURE clear_user_notifications(uid INT, ity CHAR(1), iid INT)
            BEGIN
                UPDATE user_notifications
                SET is_unread = 0
                WHERE user_id = uid AND item_type = ity collate utf8mb4_unicode_ci AND item_id = iid AND is_unread = 1;
            END;
        ");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::unprepared("DROP PROCEDURE IF EXISTS clear_user_notifications");
        DB::unprepared("DROP VIEW IF EXISTS user_notification_details");
        DB::unprepared("DROP VIEW IF EXISTS user_subscription_details");
        Schema::dropIfExists('user_notifications');
        Schema::dropIfExists('user_subscriptions');
    }
};
