<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Lesson;
use App\Models\Course;

class LessonController extends Controller
{
    // Pobieranie listy lekcji dla danego kursu
    public function indexByCourse($courseId)
    {
        $course = Course::findOrFail($courseId);
        $lessons = $course->lessons;
        return response()->json($lessons);
    }

    // Dodawanie nowej lekcji do kursu z uploadem pliku PDF
    public function store(Request $request)
    {
        $data = $request->validate([
            'course_id'   => 'required|exists:courses,id',
            'title'       => 'required|string|max:255',
            'description' => 'nullable|string',
            'pdf'         => 'required|file|mimes:pdf|max:10240', // Maksymalnie 10 MB
        ]);

        // Obsługa uploadu pliku PDF
        if ($request->hasFile('pdf')) {
            $pdfPath = $request->file('pdf')->store('pdfs', 'public');
            $data['pdf_path'] = $pdfPath;
        }

        $lesson = Lesson::create($data);

        return response()->json([
            'message' => 'Lekcja została dodana',
            'lesson'  => $lesson
        ], 201);
    }
}
