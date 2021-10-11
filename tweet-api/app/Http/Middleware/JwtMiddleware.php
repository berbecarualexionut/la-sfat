<?php

namespace App\Http\Middleware;

use Closure;
use Tymon\JWTAuth\Facades\JWTAuth;
use Exception;
use Firebase\JWT;

class JwtMiddleware
{

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        try {
            $authHeader = $request->header('Authorization');
            $authHeader = explode(" ", $authHeader)[1];

            $user = JWT\JWT::decode($authHeader, getenv('JWT_SECRET'), array('HS256'));

            //@TODO: here it would be nice to have a Builder Request, that "assembles" decoded data

            $request->email = $user->email;
            $request->username = $user->username;
        }
        catch (JWT\ExpiredException $e) {
            return response()->json(['status' => 'Authorization token expired'], 403);
        }

        return $next($request);
    }
}
