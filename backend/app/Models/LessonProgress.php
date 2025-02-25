<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LessonProgress extends Model
{
    use HasFactory;

    protected $table = 'lesson_progress';

    protected $fillable = [
        'lesson_id',
        'user_id',
        'completed_at',
        'status',
    ];

    // Relacja z lekcją
    public function lesson()
    {
        return $this->belongsTo(Lesson::class);
    }

    // Relacja z użytkownikiem
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
