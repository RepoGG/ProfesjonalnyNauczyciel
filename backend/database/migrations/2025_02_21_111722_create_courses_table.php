<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCoursesTable extends Migration
{
    public function up()
    {
        Schema::create('courses', function (Blueprint $table) {
            $table->id();
            // Klucz obcy wskazujący na tabelę fields
            $table->unsignedBigInteger('field_id');
            $table->string('title');               // Tytuł kursu, np. "Informatyka"
            $table->text('description')->nullable(); // Opis kursu
            $table->string('image')->nullable();     // Opcjonalna grafika kursu
            $table->timestamps();

            // Relacja do tabeli fields – usuwanie kaskadowe
            $table->foreign('field_id')->references('id')->on('fields')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('courses');
    }
}
