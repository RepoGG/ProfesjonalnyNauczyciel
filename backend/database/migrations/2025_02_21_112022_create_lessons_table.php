<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLessonsTable extends Migration
{
    public function up()
    {
        Schema::create('lessons', function (Blueprint $table) {
            $table->id();
            // Klucz obcy wskazujący na tabelę courses
            $table->unsignedBigInteger('course_id');
            $table->string('title');                // Tytuł lekcji
            $table->text('description')->nullable();  // Opcjonalny opis lekcji
            $table->string('pdf_path');             // Ścieżka do pliku PDF
            // (opcjonalnie) możesz dodać kolumnę video_url, jeżeli chcesz wspierać materiały wideo
            $table->timestamps();

            // Ustawienie relacji do tabeli courses (usuwanie kaskadowe)
            $table->foreign('course_id')
                  ->references('id')->on('courses')
                  ->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('lessons');
    }
}
