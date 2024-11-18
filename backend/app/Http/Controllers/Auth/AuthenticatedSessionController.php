<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\JsonResponse;

class AuthenticatedSessionController extends Controller
{
    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): JsonResponse
    {
        // Uwierzytelnienie użytkownika
        $request->authenticate();

        // Regeneracja sesji
        // $request->session()->regenerate();

        // Zwrócenie odpowiedzi JSON
        return response()->json([
            'message' => 'Zalogowano pomyślnie',
            'user' => $request->user(),
        ]);
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): Response
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return response(['message' => 'Wylogowano pomyślnie'], 200);
    }
}
