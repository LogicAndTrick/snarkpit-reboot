<?php

namespace App\Http\Controllers;

use App\Models\Link;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Str;

class LinksController extends Controller
{
    public function getIndex(Request $request)
    {
        $links = Link::orderBy('name')->get();
        $manage = $request->get('manage', null) !== null && Gate::allows('admin');
        return view('link/index', [
            'links' => $links,
            'manage' => $manage
        ]);
    }

    public function getCreate() {
        $this->admin();
        return view('link.create');
    }

    public function postCreate(Request $request) {
        $this->admin();
        $this->validate($request, [
            'name' => 'required|max:255',
            'url' => 'required|max:255|url',
            'description' => 'required|max:255',
            'icon' => 'required|mimes:jpg,png'
        ]);

        // Upload the icon file
        $icon_file = $request->file('icon');
        $icon_id = Str::uuid()->toString();
        $dir = public_path('uploads/links');
        $icon = 'icon_' . $icon_id . '.' . strtolower($icon_file->getClientOriginalExtension());
        $icon_file->move($dir, $icon);

        // Create the link
        Link::Create([
            'name' => $request->get('name'),
            'url' => $request->get('url'),
            'icon' => 'uploads/links/' . $icon,
            'description' => $request->get('description'),
        ]);
        return redirect('link?manage');
    }

    public function getEdit($id) {
        $this->admin();
        $link = Link::findOrFail($id);
        return view('link/edit', [
            'link' => $link
        ]);
    }

    public function postEdit(Request $request) {
        $this->admin();

        $id = $request->get('id');
        $link = Link::findOrFail($id);

        $this->validate($request, [
            'name' => 'required|max:255',
            'url' => 'required|max:255|url',
            'description' => 'required|max:255',
            'icon' => 'mimes:jpg,png'
        ]);

        // Upload the icon file
        $icon_file = $request->file('icon');
        if ($icon_file) {
            $icon_id = Str::uuid()->toString();
            $dir = public_path('uploads/links');
            $icon = 'icon_' . $icon_id . '.' . strtolower($icon_file->getClientOriginalExtension());
            $icon_file->move($dir, $icon);
            $link->icon = 'uploads/links/' . $icon;
        }

        $link->name = $request->get('name');
        $link->url = $request->get('url');
        $link->description = $request->get('description');
        $link->save();

        return redirect('link?manage');
    }

    public function getDelete($id) {
        $this->admin();
        $link = Link::findOrFail($id);
        return view('link/delete', [
            'link' => $link
        ]);

    }

    public function postDelete(Request $request) {
        $this->admin();
        $id = $request->get('id');
        $link = Link::findOrFail($id);
        $link->delete();
        return redirect('link?manage');
    }
}
