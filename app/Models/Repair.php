<?php
// app/Models/Repair.php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Repair extends Model
{
    protected $fillable = [
        'vehicle_id', 'workshop_id', 'mileage_before', 'mileage_after', 'repair_date'
    ];

    public function vehicle(): BelongsTo
    {
        return $this->belongsTo(Vehicle::class);
    }

    public function workshop(): BelongsTo
    {
        return $this->belongsTo(Workshop::class);
    }
}