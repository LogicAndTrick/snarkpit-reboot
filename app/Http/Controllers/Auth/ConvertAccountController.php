<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules;
use Illuminate\Support\Facades\Hash;

class ConvertAccountController extends Controller
{
    public function create() {
        $user = Auth::user();
        if (!$user || !$user->legacy_password) return redirect('/home');

        return view('auth.convert', [
            'user' => $user
        ]);
    }

    public function store(Request $request) {
        $user = Auth::user();
        if (!$user || !$user->legacy_password) return redirect('/');

        Validator::extend('match_legacy_password', function($attr, $value, $parameters) use ($user) {
            $legacy_plain = $value;
            $legacy_pass = md5($legacy_plain);
            return strtolower($user->legacy_password) == strtolower($legacy_pass);
        });

        $this->validate($request->instance(), [
            'email' => 'required|email|max:255|unique:users,email,'.$user->id,
            'old_password' => 'required|match_legacy_password',
            'password' => [ 'required', 'confirmed', Rules\Password::defaults() ]
        ], [
            'match_legacy_password' => 'This doesn\'t match your current password.'
        ]);


        $user->update([
            'email' => $request->input('email'),
            'password' => Hash::make($request->input('password')),
            'legacy_password' => ''
        ]);

        if (!$request->user()->hasVerifiedEmail()) {
            $request->user()->sendEmailVerificationNotification();
        }

        return redirect('/');
    }
}
