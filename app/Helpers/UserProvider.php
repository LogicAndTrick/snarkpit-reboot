<?php

namespace App\Helpers;

use Illuminate\Auth\EloquentUserProvider;
use Illuminate\Contracts\Auth\Authenticatable as UserContract;
use Illuminate\Support\Str;

class UserProvider extends EloquentUserProvider

    /**
     * Retrieve a user by the given credentials.
     *
     * @param  array  $credentials
     * @return \Illuminate\Contracts\Auth\Authenticatable|null
     */{
    public function retrieveByCredentials(array $credentials)
    {
        if (empty($credentials)) {
            return null;
        }
        // Allow username as an acceptable login key - try it first, otherwise fall back to email address
        $query = $this->createModel()->newQuery();

        foreach ($credentials as $key => $value)
        {
            if ($key == 'email') $key = 'name';
            if (!Str::contains($key, 'password')) $query->where($key, $value);
        }

        $first = $query->first();
        return $first ? $first : parent::retrieveByCredentials($credentials);
    }

    /**
     * Validate a user against the given credentials.
     *
     * @param  \Illuminate\Contracts\Auth\Authenticatable  $user
     * @param  array  $credentials
     * @return bool
     */
    public function validateCredentials(UserContract $user, array $credentials)
    {
        $plain = $credentials['password'];

        // Classic password conversion
        // Legacy password: md5 hashed
        if ($user->legacy_password) {
            $legacy_plain = $plain;
            $legacy_pass = md5($legacy_plain);
            if (strtolower($user->legacy_password) == strtolower($legacy_pass)) {
                // Users with a legacy password won't be able to do anything until they reset their password.
                return true;
            }
        }

        return $this->hasher->check($plain, $user->getAuthPassword());
    }
}
