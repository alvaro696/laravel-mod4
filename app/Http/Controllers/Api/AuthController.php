<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Google\Client as GoogleClient;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    public function loginWithGoogle(Request $request)
    {
        $request->validate([
            'token' => 'required|string',
        ]);

        $client = new GoogleClient (['client_id' => env('GOOGLE_CLIENT_ID')]);
        $payload = $client->verifyIdToken($request->token);

        if (!$payload) {
            return response()->json(['message' => 'Token de Google inválido'], 401);
        }

        $googleEmail = $payload['email'];
        $googleName  = $payload['name'] ?? 'Usuario de Google';

        $user = User::where('email', $googleEmail)->first();
        if (!$user) {
            $user = User::create([
                'name'     => $googleName,
                'email'    => $googleEmail,
                'password' => Hash::make(Str::random(24)),
            ]);
        }

        $apiToken = $user->createToken('authToken')->plainTextToken;

        return response()->json([
            'access_token' => $apiToken,
            'token_type'   => 'Bearer',
            'email'        => $user->email,
        ], 200);
    }
    public function register(Request $request)
    {
        $validatedData = $request->validate([
            'name'                  => 'required|string|max:255',
            'email'                 => 'required|string|email|max:255|unique:users',
            'password'              => 'required|string|min:8|confirmed',
        ]);

        $user = User::create([
            'name'     => $validatedData['name'],
            'email'    => $validatedData['email'],
            'password' => Hash::make($validatedData['password']),
        ]);

        $token = $user->createToken('authToken')->plainTextToken;

        return response()->json([
            'access_token' => $token,
            'token_type'   => 'Bearer',
            'email'        => $user->email,
        ], 201);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email'    => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'message' => 'Credenciales inválidas'
            ], 401);
        }

        $token = $user->createToken('authToken')->plainTextToken;

        return response()->json([
            'access_token' => $token,
            'token_type'   => 'Bearer',
            'email'        => $user->email,
        ], 200);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Sesión cerrada'
        ]);
    }
}
