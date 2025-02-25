<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Field;

class FieldController extends Controller
{
    // Pobiera listę wszystkich kierunków (fields)
    public function index()
    {
        $fields = Field::all();
        return response()->json($fields);
    }

    // Pobiera szczegóły konkretnego kierunku po ID
    public function show($id)
    {
        $field = Field::findOrFail($id);
        return response()->json($field);
    }

    // Dodaje nowy kierunek
    public function store(Request $request)
    {
        $data = $request->validate([
            'name'        => 'required|string|max:255',
            'description' => 'nullable|string',
            'image'       => 'nullable|url',
        ]);

        $field = Field::create($data);

        return response()->json([
            'message' => 'Kierunek został dodany',
            'field'   => $field
        ], 201);
    }

    // Aktualizuje istniejący kierunek
    public function update(Request $request, $id)
    {
        $field = Field::findOrFail($id);
        $data = $request->validate([
            'name'        => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'image'       => 'nullable|url',
        ]);

        $field->update($data);

        return response()->json([
            'message' => 'Kierunek został zaktualizowany',
            'field'   => $field
        ]);
    }

    // Usuwa kierunek
    public function destroy($id)
    {
        $field = Field::findOrFail($id);
        $field->delete();

        return response()->json([
            'message' => 'Kierunek został usunięty'
        ]);
    }
}
