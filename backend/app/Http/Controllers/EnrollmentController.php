<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class EnrollmentController extends Controller
{
    // Endpoint do zapisywania użytkownika na kurs
    // Zakładamy, że użytkownik jest autoryzowany (np. przy użyciu Sanctum)
    public function store(Request $request)
    {
        $data = $request->validate([
            'course_id' => 'required|exists:courses,id',
        ]);

        $user = $request->user();

        // Dodajemy rekord do tabeli enrollments bez nadpisywania istniejących zapisów
        $user->courses()->syncWithoutDetaching([
            $data['course_id'] => ['enrolled_at' => now()]
        ]);

        return response()->json(['message' => 'Zapisano na kurs']);
    }
}
