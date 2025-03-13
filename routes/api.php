<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\VehicleController;
use App\Http\Controllers\WorkshopController;
use App\Http\Controllers\RepairController;
use Illuminate\Support\Facades\Route;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::apiResource('vehicles', VehicleController::class);
    Route::apiResource('workshops', WorkshopController::class);
    Route::apiResource('repairs', RepairController::class);
});

