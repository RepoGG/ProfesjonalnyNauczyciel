<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    use HasFactory;

    protected $fillable = [
        'field_id',
        'title',
        'description',
        'image',
    ];

    // Kurs należy do kierunku
    public function field()
    {
        return $this->belongsTo(Field::class);
    }

    // Kurs może zawierać wiele lekcji
    public function lessons()
    {
        return $this->hasMany(Lesson::class);
    }

    public function users()
    {
        return $this->belongsToMany(User::class, 'enrollments')
                    ->withPivot('enrolled_at', 'progress')
                    ->withTimestamps();
    }

}
