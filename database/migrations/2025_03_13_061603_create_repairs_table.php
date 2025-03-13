<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('repairs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('vehicle_id')->constrained()->onDelete('cascade'); // Relación con vehículo
            $table->foreignId('workshop_id')->constrained()->onDelete('cascade'); // Relación con taller
            $table->integer('mileage_before'); // Kilometraje antes de la reparación
            $table->integer('mileage_after'); // Kilometraje después de la reparación
            $table->date('repair_date'); // Fecha de la reparación
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('repairs');
    }
};
