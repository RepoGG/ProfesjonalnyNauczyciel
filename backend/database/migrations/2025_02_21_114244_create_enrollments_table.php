<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEnrollmentsTable extends Migration
{
    public function up()
    {
        Schema::create('enrollments', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('course_id');
            $table->unsignedBigInteger('user_id');
            $table->timestamp('enrolled_at')->nullable(); // Data zapisu – można ustawić automatycznie przy zapisie
            $table->integer('progress')->default(0); // Opcjonalne pole do śledzenia postępu (np. procent ukończenia)
            $table->timestamps();

            // Ustawienie kluczy obcych i unikalnego indeksu, aby jeden użytkownik mógł zapisać się tylko raz na dany kurs
            $table->foreign('course_id')->references('id')->on('courses')->onDelete('cascade');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->unique(['course_id', 'user_id']);
        });
    }

    public function down()
    {
        Schema::dropIfExists('enrollments');
    }
}
