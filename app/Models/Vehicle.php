<?php

// app/Models/Vehicle.php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Vehicle extends Model
{
    protected $fillable = ['plate_number', 'brand', 'model'];

    public function repairs(): HasMany
    {
        return $this->hasMany(Repair::class);
    }
}