<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFieldsTable extends Migration
{
    public function up()
    {
        Schema::create('fields', function (Blueprint $table) {
            $table->id();
            $table->string('name');               // Nazwa kierunku, np. "Informatyka"
            $table->text('description')->nullable(); // Opcjonalny opis kierunku
            $table->string('image')->nullable();     // Opcjonalny obrazek kierunku
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('fields');
    }
}
