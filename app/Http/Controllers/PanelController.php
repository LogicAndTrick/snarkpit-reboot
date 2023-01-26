<?php

namespace App\Http\Controllers;

use App\Helpers\Image;
use App\Models\Ban;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;

class PanelController extends Controller
{
    private function getUser($id) {
        $this->loggedIn();
        if (!$id || $id == Auth::id()) return Auth::user();

        $this->admin();
        return User::findOrFail($id);
    }

    public function getIndex($id = 0) {
        $user = $this->getUser($id);
        return view('panel.index', [
            'user' => $user
        ]);
    }

    public function getEditProfile($id = 0) {
        $user = $this->getUser($id);
        return view('panel.edit-profile', [
            'user' => $user
        ]);
    }

    public function postEditProfile(Request $request) {
        $id = $request->input('id');
        $user = $this->getUser($id);
        $request->validate([
            'show_email' => '',
            'show_signature' => '',
            'subscribe_topics' => '',
            'notify_messages' => '',
            'timezone' => 'required|integer',
            'title_text' => 'max:255',
            'info_name' => 'max:255',
            'info_website' => 'url|max:255',
            'info_occupation' => 'max:255',
            'info_interests' => 'max:255',
            'info_location' => 'max:255',
            'info_languages' => 'max:255',
            'info_birthday_formatted' => 'date_format:d/m',
            'info_steam_profile' => 'max:255',
            'info_biography_text' => 'max:10000',
            'info_signature_text' => 'max:1000',
        ]);

        $steam_user = '';
        if (preg_match('%^(?:.*/)?(.*)$%m', $request->input('info_steam_profile'), $regs)) {
            $steam_user = $regs[1];
        }

        $user->info_birthday_formatted = $request->input('info_birthday_formatted');

        $user->update([
            'show_email' => $request->boolean('show_email'),
            'show_signature' => $request->boolean('show_signature'),
            'subscribe_topics' => $request->boolean('subscribe_topics'),
            'notify_messages' => $request->boolean('notify_messages'),
            'timezone' => intval($request->input('timezone')),

            'notify_article_review' => $request->boolean('notify_article_review'),
            'notify_forum_posts' => $request->boolean('notify_forum_posts'),
            'notify_forum_threads' => $request->boolean('notify_forum_threads'),
            'notify_journals' => $request->boolean('notify_journals'),
            'notify_downloads' => $request->boolean('notify_downloads'),
            'notify_news' => $request->boolean('notify_news'),
            'notify_maps' => $request->boolean('notify_maps'),

            'title_custom' => !!$request->input('title_text'),
            'title_text' => $request->input('title_text'),

            'info_name' => $request->input('info_name'),
            'info_website' => $request->input('info_website'),
            'info_occupation' => $request->input('info_occupation'),
            'info_interests' => $request->input('info_interests'),
            'info_location' => $request->input('info_location'),
            'info_languages' => $request->input('info_languages'),
            'info_steam_profile' => $steam_user,

            'info_biography_text' => $request->input('info_biography_text'),
            'info_biography_html' => bbcode($request->input('info_biography_text')),
            'info_signature_text' => $request->input('info_signature_text'),
            'info_signature_html' => bbcode($request->input('info_signature_text')),
        ]);

        return redirect('panel/index/'.$id);
    }

    public function getEditEmail($id = 0) {
        $user = $this->getUser($id);
        return view('panel.edit-email', [
            'user' => $user
        ]);
    }

    public function postEditEmail(Request $request) {
        $id = $request->input('id');
        $user = $this->getUser($id);
        $request->validate([
            'email' => 'required|email|max:255|unique:users,email,'.$user->id
        ]);
        $user->update([
            'email' => $request->input('email'),
            'show_email' => $request->boolean('show_email')
        ]);
        // todo verify new email
        return redirect('panel/index/'.$id);
    }

    public function getEditPassword($id = 0) {
        $user = $this->getUser($id);
        return view('panel.edit-password', [
            'user' => $user,
            'need_original' => $user->id == Auth::id() || !Gate::allows('admin')
        ]);
    }

    public function postEditPassword(Request $request) {
        $id = $request->input('id');
        $user = $this->getUser($id);

        // Admin users can reset another user's password without the original
        $need_original = $user->id == Auth::id() || !Gate::allows('admin');

        $request->validate([
            'old_password' => $need_original ? [
                'required',
                'current_password'
            ] : [],
            'password' => [
                'required',
                'confirmed',
                Rules\Password::defaults()
            ]
        ]);

        $user->update([
            'password' => Hash::make($request->input('password')),
            'legacy_password' => ''
        ]);
        return redirect('panel/index/'.$id);
    }

    public function getEditAvatar($id = 0) {
        $user = $this->getUser($id);
        return view('panel.edit-avatar', [
            'user' => $user,
            'presets' => PanelController::$preset_avatars
        ]);
    }

    public function postEditAvatar(Request $request) {
        $id = $request->input('id');
        $user = $this->getUser($id);

        $this->validate($request->instance(), [
            'type' => 'in:upload,preset,erase',
            'upload' => 'required_if:type,upload|mimes:jpg,jpeg,png|max:4096',
            'preset' => 'required_if:type,preset'
        ]);

        if ($request->input('type') == 'erase') {
            $user->deleteAvatar();
            $user->update([ 'avatar_custom' => false, 'avatar_file' => '' ]);
        } else if ($request->input('type') == 'upload') {
            $upload = $request->file('upload');
            $slug = str_pad(strval(rand(0, 99999)), 5, '0', STR_PAD_LEFT);
            $uid = str_pad(strval($user->id), 5, '0', STR_PAD_LEFT);
            $name = $uid . '_' . $slug . '.' . strtolower($upload->getClientOriginalExtension());

            $temp_dir = public_path('uploads/avatars/temp');
            $temp_name = $user->id . '_temp.' . strtolower($upload->getClientOriginalExtension());
            $upload->move($temp_dir, $temp_name);
            Image::MakeThumbnails($temp_dir . '/' . $temp_name, [[
                'width' => 100,
                'height' => 100,
                'suffix' => '',
                'force' => true
            ]], public_path('uploads/avatars/'), $name, true);
            unlink($temp_dir . '/' . $temp_name);

            $user->deleteAvatar();
            $user->update([ 'avatar_custom' => true, 'avatar_file' => $name ]);
        } else {
            $preset = $request->input('preset');
            // Make sure it's in our list before doing anything
            if (in_array($preset, PanelController::$preset_avatars)) {
                $user->deleteAvatar();
                $user->update([ 'avatar_custom' => false, 'avatar_file' => $preset ]);
            }
        }
        return redirect('panel/index/'.$id);
    }

//    public function getNotifications($id = 0) {
//        $user = $this->getUser($id);
//        $notifications = UserNotificationDetails::whereUserId($user->id)->whereIsUnread(true)->get();
//        $subscriptions = UserSubscriptionDetails::whereUserId($user->id)->whereIsOwnArticle(0)->get();
//        return view('user/panel/notifications', [
//            'user' => $user,
//            'notifications' => $notifications,
//            'subscriptions' => $subscriptions
//        ]);
//    }
//
//    public function getClearNotifications($id = 0) {
//        $user = $this->getUser($id);
//        DB::statement("UPDATE user_notifications SET is_unread = 0 WHERE user_id = ? AND is_unread = 1", [ $user->id ]);
//        return redirect('panel/notifications/'.$id);
//    }
//
//    public function getDeleteSubscription($id) {
//        $sub = UserSubscription::findOrFail($id);
//        $user = $this->getUser($sub->user_id);
//        $sub->delete();
//        return redirect('panel/notifications/'.$user->id);
//    }

    public function getEditName($id = 0) {
        $this->admin();
        $user = $this->getUser($id);
        return view('panel.edit-name', [
            'user' => $user
        ]);
    }

    public function postEditName(Request $request) {
        $this->admin();
        $id = $request->input('id');
        $user = $this->getUser($id);

        $this->validate($request->instance(), [
            'new_name' => 'required|max:255|unique:users,name,'.$user->id
        ]);

        $user->update([ 'name' => $request->input('new_name') ]);
        return redirect('panel/index/'.$id);
    }

    public function getEditBans($id = 0) {
        $this->admin();
        $user = $this->getUser($id);
        $bans = Ban::whereUserId($id)->get();
        return view('panel.edit-bans', [
            'user' => $user,
            'bans' => $bans
        ]);
    }

    public function postAddBan(Request $request) {
        $this->admin();
        $id = $request->input('id');
        $user = $this->getUser($id);

        $this->validate($request->instance(), [
            'reason' => 'required|max:255',
            'duration' => 'required|integer',
            'unit' => 'required|integer'
        ]);

        $hours = intval($request->input('duration')) * intval($request->input('unit'));
        $ban = Ban::create([
            'user_id' => $user->id,
            'ip' => ($request->input('ip_ban') && $user->last_access_ip ? $user->last_access_ip : null),
            'ends_at' => $hours < 0 ? null : Carbon::now()->addHours($hours),
            'reason' => $request->input('reason')
        ]);

        return redirect('panel/edit-bans/'.$id);
    }

    public function postDeleteBan(Request $request) {
        $this->admin();
        $id = $request->input('id');
        $ban = Ban::findOrFail($id);
        $ban->delete();
        return redirect('panel/edit-bans/'.$ban->user_id);
    }

    public function getEditLevel($id = 0) {
        $this->superAdmin();
        $user = $this->getUser($id);
        return view('panel.edit-level', [
            'user' => $user
        ]);
    }

    public function postEditLevel(Request $request) {
        $this->superAdmin();
        $id = $request->input('id');
        $user = $this->getUser($id);

        $this->validate($request->instance(), [
            'new_level' => 'required|integer'
        ]);
        $user->update([ 'level' => $request->input('new_level') ]);

        return redirect('panel/index/'.$id);
    }

    public function getObliterate($id) {
        $this->superAdmin();
        $user = $this->getUser($id);
        return view('panel.obliterate', [
            'user' => $user
        ]);
    }

    public function postObliterate(Request $request) {
        $this->superAdmin();
        $id = $request->input('id');
        $user = $this->getUser($id);

        $this->validate($request->instance(), [
            'sure' => 'required|confirmed'
        ], [
            'required' => 'You must check both boxes if you want to obliterate this user.',
            'confirmed' => 'You must check both boxes if you want to obliterate this user.'
        ]);

        set_time_limit(500);
        $user->obliterate(User::DEFINITELY_OBLITERATE_THIS_USER);

        return redirect('/');
    }

    public function getRemove($id) {
        $this->superAdmin();
        $user = $this->getUser($id);
        return view('panel.remove', [
            'user' => $user
        ]);
    }

    public function postRemove(Request $request) {
        $this->superAdmin();
        $id = $request->input('id');
        $user = $this->getUser($id);

        $this->validate($request->instance(), [
            'sure' => 'required|confirmed'
        ], [
            'required' => 'You must check both boxes if you want to remove this user.',
            'confirmed' => 'You must check both boxes if you want to remove this user.'
        ]);

        set_time_limit(500);
        $user->remove(User::DEFINITELY_REMOVE_THIS_USER);

        return redirect('/user/view/' . $id);
    }

    private static $preset_avatars = [
        '1.png',
        '2.png',
        '3.png',
        '4.png',
        '5.png',
        '6.png',
        '7.png',
        '8.png',
        '9.png',
        '10.png',
        '11.png',
        '12.png',
        '13.png',
    ];
}
