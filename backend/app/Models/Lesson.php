<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lesson extends Model
{
    use HasFactory;

    protected $fillable = [
        'course_id',
        'title',
        'description',
        'pdf_path',
    ];

    // Lekcja należy do kursu
    public function course()
    {
        return $this->belongsTo(Course::class);
    }
}
