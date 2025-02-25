<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLessonProgressTable extends Migration
{
    public function up()
    {
        Schema::create('lesson_progress', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('lesson_id');
            $table->unsignedBigInteger('user_id');
            // Data ukończenia lekcji; może być null, jeśli lekcja jeszcze nie została ukończona
            $table->timestamp('completed_at')->nullable();
            // Status lekcji – np. "in progress" lub "completed"
            $table->string('status')->default('in progress');
            $table->timestamps();

            // Klucze obce
            $table->foreign('lesson_id')
                  ->references('id')->on('lessons')
                  ->onDelete('cascade');
            $table->foreign('user_id')
                  ->references('id')->on('users')
                  ->onDelete('cascade');
            // Unikalny indeks, aby jeden użytkownik miał tylko jeden wpis dla danej lekcji
            $table->unique(['lesson_id', 'user_id']);
        });
    }

    public function down()
    {
        Schema::dropIfExists('lesson_progress');
    }
}
