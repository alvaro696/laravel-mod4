<?php
// app/Models/Workshop.php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Workshop extends Model
{
    protected $fillable = ['name', 'address'];

    public function repairs(): HasMany
    {
        return $this->hasMany(Repair::class);
    }
}