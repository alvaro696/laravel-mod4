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
        // 1. Validar que venga el token
        $request->validate([
            'token' => 'required|string',
        ]);

        // 2. Verificar el token con Google
        //    Instala la librería oficial: composer require google/apiclient
        //    Luego, crea un objeto GoogleClient con tu CLIENT_ID
        $client = new GoogleClient (['client_id' => env('GOOGLE_CLIENT_ID')]);
        $payload = $client->verifyIdToken($request->token);

        if (!$payload) {
            return response()->json(['message' => 'Token de Google inválido'], 401);
        }

        // 3. Obtener datos del usuario desde el payload
        //    Por ejemplo: email, name, picture, etc.
        $googleEmail = $payload['email'];
        $googleName  = $payload['name'] ?? 'Usuario de Google';

        // 4. Buscar o crear el usuario en tu base de datos
        $user = User::where('email', $googleEmail)->first();
        if (!$user) {
            $user = User::create([
                'name'     => $googleName,
                'email'    => $googleEmail,
                // Genera una contraseña aleatoria (o puedes dejarla vacía si no la usas)
                'password' => Hash::make(Str::random(24)),
            ]);
        }

        // 5. Generar un token de tu API (Laravel Sanctum, por ejemplo)
        $apiToken = $user->createToken('authToken')->plainTextToken;

        // 6. Retornar el token de tu API
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
