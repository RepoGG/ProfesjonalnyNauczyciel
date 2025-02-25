<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\LessonProgress;

class LessonProgressController extends Controller
{
    // Endpoint do oznaczania lekcji jako rozpoczętej lub ukończonej
    public function storeOrUpdate(Request $request)
    {
        $data = $request->validate([
            'lesson_id' => 'required|exists:lessons,id',
            'status'    => 'required|string|in:in progress,completed'
        ]);

        $user = $request->user();

        // Aktualizujemy lub tworzymy wpis w tabeli lesson_progress
        $lessonProgress = LessonProgress::updateOrCreate(
            [
                'lesson_id' => $data['lesson_id'],
                'user_id'   => $user->id
            ],
            [
                'status'       => $data['status'],
                'completed_at' => $data['status'] === 'completed' ? now() : null
            ]
        );

        return response()->json([
            'message'         => 'Postęp lekcji zaktualizowany',
            'lesson_progress' => $lessonProgress
        ]);
    }
}
