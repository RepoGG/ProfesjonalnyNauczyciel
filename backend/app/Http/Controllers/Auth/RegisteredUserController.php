<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Spatie\Permission\Models\Role; 
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;

class RegisteredUserController extends Controller
{
    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): JsonResponse
{
    // Walidacja danych wejściowych
    $validated = $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|string|email|max:255|unique:users',
        'password' => 'required|string|min:8|confirmed',
    ]);

    // Tworzenie użytkownika
    $user = User::create([
        'name' => $validated['name'],
        'email' => $validated['email'],
        'password' => bcrypt($validated['password']),
    ]);
    
Log::info('Dane wejściowe: ', $request->all());
Log::info('Zarejestrowano użytkownika: ', ['user' => $user]);


    // Przypisanie domyślnej roli użytkownika
    $user->assignRole('user');

    // Zwrócenie odpowiedzi JSON
    return response()->json([
        'message' => 'Użytkownik zarejestrowany pomyślnie.',
        'user' => $user,
    ], 201);
}
}
