<?php

namespace App\Http\Controllers;

use App\Helpers\Image;
use App\Models\ForumPost;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class ApiController extends Controller
{
    public function postGetPost(Request $request) {
        $this->loggedIn();
        $id = $request->integer('id');
        return response()->json(ForumPost::with(['user:id,name'])->select(['id', 'user_id', 'content_text'])->findOrFail($id));
    }

    public function postFormat(Request $request) {
        $this->loggedIn();
        $field = $request->input('field') ?: 'text';
        $text = $request->input($field) ?: '';
        return bbcode($text);
    }

    public function postImageUpload(Request $request) {
        $this->loggedIn();
        Validator::extend('valid_extension', function($attribute, $value, $parameters) {
            return in_array(strtolower($value->getClientOriginalExtension()), $parameters);
        });
        Validator::extend('image_size', function($attr, $value, $parameters) {
            $max = count($parameters) > 0 ? intval($parameters[0]) : 3000;
            $info = getimagesize($value->getPathName());
            return $info[0] <= $max && $info[1] <= $max;
        });

        $this->validate($request->instance(), [
            'image' => 'required|max:2048|valid_extension:jpeg,jpg,png|image_size:3000'
        ], [
            'image_size' => 'The image cannot have a width or height of more than 3000 pixels',
        ]);

        $image = $request->file('image');
        $fname = Str::uuid()->toString() . '.' . $image->getClientOriginalExtension();

        // Force jpeg if the image is more than 1mb
        $override_type = false;
        if ($image->getSize() >= 1024 * 1024) {
            $override_type = IMAGETYPE_JPEG;
            $fname = explode('.', $fname)[0] . '.jpg';
        }

        // Use 2000 maximum to support 1080p screenshots without resizing
        $thumbs = Image::MakeThumbnails($image->getPathname(),
            [ [ 'width' => 2000, 'height' => 2000, 'force' => true, 'type' => $override_type ] ],
            public_path('uploads/images/' . Auth::id()),
            $fname, false
        );

        return [
            'url' => asset('uploads/images/' . Auth::id() . '/' . $thumbs[0])
        ];
    }
}
