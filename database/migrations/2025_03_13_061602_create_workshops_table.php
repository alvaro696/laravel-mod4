<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    // database/migrations/xxxx_xx_xx_create_workshops_table.php
public function up()
{
    Schema::create('workshops', function (Blueprint $table) {
        $table->id();
        $table->string('name'); // Nombre del taller
        $table->string('address'); // Dirección del taller
        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('workshops');
    }
};
