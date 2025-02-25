<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Course;

class CourseController extends Controller
{
    // Lista kursów, opcjonalnie filtrowana po kierunku (field_id)
    public function index(Request $request)
    {
        if ($request->has('field_id')) {
            $courses = Course::where('field_id', $request->input('field_id'))->get();
        } else {
            $courses = Course::all();
        }
        return response()->json($courses);
    }

    // Szczegóły kursu wraz z przypisanymi lekcjami
    public function show($id)
    {
        $course = Course::with('lessons')->findOrFail($id);
        return response()->json($course);
    }

    // Dodawanie nowego kursu
    public function store(Request $request)
    {
        $data = $request->validate([
            'field_id'    => 'required|exists:fields,id',
            'title'       => 'required|string|max:255',
            'description' => 'nullable|string',
            'image'       => 'nullable|url',
        ]);

        $course = Course::create($data);

        return response()->json([
            'message' => 'Kurs został dodany',
            'course'  => $course
        ], 201);
    }

    // Aktualizacja istniejącego kursu
    public function update(Request $request, $id)
    {
        $course = Course::findOrFail($id);
        $data = $request->validate([
            'field_id'    => 'sometimes|required|exists:fields,id',
            'title'       => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'image'       => 'nullable|url',
        ]);
        $course->update($data);
        return response()->json([
            'message' => 'Kurs został zaktualizowany',
            'course'  => $course
        ]);
    }

    // Usuwanie kursu
    public function destroy($id)
    {
        $course = Course::findOrFail($id);
        $course->delete();
        return response()->json([
            'message' => 'Kurs został usunięty'
        ]);
    }
}
