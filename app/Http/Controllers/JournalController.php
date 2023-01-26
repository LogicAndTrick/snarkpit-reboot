<?php

namespace App\Http\Controllers;

use App\Events\JournalCreatedEvent;
use App\Models\Journal;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class JournalController extends Controller
{

    public function getIndex(Request $request)
    {
        $journals = Journal::with(['user'])->orderBy('created_at', 'desc');

        // filtering
        $user = intval($request->get('user'));
        if ($user > 0) $journals = $journals->where('user_id', '=', $user);

        $journals = $journals->paginate(10)->withQueryString();

        return view('journal.index', [
            'journals' => $journals
        ]);
    }

    public function getView(Request $request, $id)
    {
        $journal = Journal::with(['user'])
            ->where('id', '=', $id)
            ->firstOrFail();

        return view('journal.view', [
            'journal' => $journal
        ]);
    }

    public function getCreate() {
        $this->loggedIn();
        return view('journal.create', [
            //
        ]);
    }

    public function postCreate(Request $request) {
        $this->loggedIn();
        $this->validate($request, [
            'title' => 'required|max:100',
            'text' => 'required|max:8000'
        ]);

        $journal = Journal::Create([
            'user_id' => Auth::id(),
            'title' => $request->input('title'),
            'content_text' => $request->input('text'),
            'content_html' => bbcode($request->input('text'))
        ]);

        JournalCreatedEvent::dispatch($journal);

        return redirect('journal/view/'.$journal->id);
    }

    public function getEdit($id) {
        $this->loggedIn();

        $journal = Journal::findOrFail($id);
        if (!$journal->canEdit()) abort(403);

        return view('journal.edit', [
            'journal' => $journal
        ]);
    }

    public function postEdit(Request $request) {
        $this->loggedIn();

        $id = $request->get('id');
        $journal = Journal::findOrFail($id);
        if (!$journal->canEdit()) abort(403);

        $this->validate($request, [
            'title' => 'required|max:100',
            'text' => 'required|max:8000'
        ]);

        $journal->title = $request->input('title');
        $journal->content_text = $request->input('text');
        $journal->content_html = bbcode($request->input('text'));
        $journal->save();

        return redirect('journal/view/'.$id);
    }

    public function getDelete($id) {
        $this->loggedIn();

        $journal = Journal::findOrFail($id);
        if (!$journal->canEdit()) abort(403);

        return view('journal.delete', [
            'journal' => $journal
        ]);
    }

    public function postDelete(Request $request) {
        $this->loggedIn();

        $id = $request->get('id');
        $journal = Journal::findOrFail($id);
        if (!$journal->canEdit()) abort(403);

        $journal->delete();
        return redirect('journal');
    }
}
