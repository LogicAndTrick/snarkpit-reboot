<?php

namespace App\Http\Controllers;

use App\Events\MessageCreatedEvent;
use App\Models\Message;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MessageController extends Controller
{
    private function getUser($id) {
        $this->loggedIn();
        if (!$id || $id == Auth::id()) return Auth::user();

        $this->admin();
        return User::findOrFail($id);
    }

    public function getIndex($id = 0) {
        $user = $this->getUser($id);

        $messages = Message::with(['from_user'])
            ->where('to_user_id', '=', $user->id)
            ->orderByDesc('created_at')
            ->paginate(20)
            ->withQueryString();

        return view('message.index', [
            'user' => $user,
            'messages' => $messages
        ]);
    }

    public function getSent($id = 0) {
        $user = $this->getUser($id);

        $messages = Message::with(['to_user'])
            ->where('from_user_id', '=', $user->id)
            ->orderByDesc('created_at')
            ->paginate(20)
            ->withQueryString();

        return view('message.sent', [
            'user' => $user,
            'messages' => $messages
        ]);
    }

    public function getSend(Request $request) {
        $this->loggedIn();
        return view('message.send', [
            'user' => Auth::user(),
            'to' => $request->get('to')
        ]);
    }

    public function postSend(Request $request) {
        $this->loggedIn();
        $request->validate([
            'to' => ['exists:App\Models\User,name'],
            'title' => ['required', 'max:200'],
            'text' => ['required', 'max:10000']
        ]);
        $user = User::query()->where('name', '=', $request->input('to'))->first();
        $message = Message::create([
            'from_user_id' => Auth::id(),
            'to_user_id' => $user->id,
            'title' => $request->input('title'),
            'content_text' => $request->input('text'),
            'content_html' => bbcode($request->input('text')),
            'is_read' => false
        ]);

        MessageCreatedEvent::dispatch($message);

        return redirect('message/sent');
    }

    public function getView($id) {
        $this->loggedIn();
        $message = Message::with(['from_user', 'to_user'])->findOrFail($id);
        if (!$message->canRead()) abort(403);
        if (!$message->is_read && $message->to_user_id == Auth::id()) {
            $message->is_read = true;
            $message->save();
        }
        return view('message.view', [
            'message' => $message
        ]);
    }

    public function getDelete($id) {
        $this->loggedIn();
        $message = Message::with(['from_user', 'to_user'])->findOrFail($id);
        if (!$message->canRead()) abort(403);
        return view('message.delete', [
            'message' => $message
        ]);
    }

    public function postDelete(Request $request) {
        $this->loggedIn();
        $id = $request->input('id');
        $message = Message::with(['from_user', 'to_user'])->findOrFail($id);
        if (!$message->canRead()) abort(403);
        $message->delete();
        return redirect('message/inbox/'.$message->to_user_id);
    }
}
