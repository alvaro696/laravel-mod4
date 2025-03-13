<?php
// app/Http/Controllers/VehicleController.php
namespace App\Http\Controllers;

use App\Models\Vehicle;
use Illuminate\Http\Request;

class VehicleController extends Controller
{
    public function index()
    {
        return Vehicle::all();
    }

    public function store(Request $request)
    {
        $request->validate([
            'plate_number' => 'required|unique:vehicles',
            'brand' => 'required',
            'model' => 'required',
        ]);

        return Vehicle::create($request->all());
    }

    public function show($id)
    {
        return Vehicle::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $vehicle = Vehicle::findOrFail($id);
        $vehicle->update($request->all());
        return $vehicle;
    }

    public function destroy($id)
    {
        Vehicle::destroy($id);
        return response()->noContent();
    }
}