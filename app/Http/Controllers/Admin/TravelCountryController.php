<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\TravelCountry;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class TravelCountryController extends Controller
{
    public function index()
    {
        $countries = TravelCountry::orderBy('order')->get();
        
        return Inertia::render('dashboard/travel-countries/index', [
            'countries' => $countries
        ]);
    }

    public function create()
    {
        return Inertia::render('dashboard/travel-countries/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'flag_image' => 'nullable|image|max:5120',
            'order' => 'nullable|integer',
            'is_active' => 'boolean'
        ]);

        if ($request->hasFile('flag_image')) {
            $validated['flag_image'] = $request->file('flag_image')->store('travel-countries', 'public');
        }

        $validated['order'] = $validated['order'] ?? TravelCountry::max('order') + 1;
        $validated['is_active'] = $validated['is_active'] ?? true;

        TravelCountry::create($validated);

        return redirect()->route('admin.about-sections.travel')
            ->with('success', 'Country added successfully.');
    }

    public function show(TravelCountry $travelCountry)
    {
        return redirect()->route('admin.travel-countries.edit', $travelCountry);
    }

    public function edit(TravelCountry $travelCountry)
    {
        return Inertia::render('dashboard/travel-countries/edit', [
            'country' => $travelCountry
        ]);
    }

    public function update(Request $request, TravelCountry $travelCountry)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'flag_image' => 'nullable|image|max:5120',
            'order' => 'nullable|integer',
            'is_active' => 'boolean'
        ]);

        if ($request->hasFile('flag_image')) {
            if ($travelCountry->flag_image && !str_starts_with($travelCountry->flag_image, 'http')) {
                Storage::disk('public')->delete($travelCountry->flag_image);
            }
            $validated['flag_image'] = $request->file('flag_image')->store('travel-countries', 'public');
        }

        $travelCountry->update($validated);

        return redirect()->route('admin.about-sections.travel')
            ->with('success', 'Country updated successfully.');
    }

    public function destroy(TravelCountry $travelCountry)
    {
        if ($travelCountry->flag_image && !str_starts_with($travelCountry->flag_image, 'http')) {
            Storage::disk('public')->delete($travelCountry->flag_image);
        }
        
        $travelCountry->delete();

        return redirect()->route('admin.about-sections.travel')
            ->with('success', 'Country deleted successfully.');
    }

    public function reorder(Request $request)
    {
        $request->validate([
            'countries' => 'required|array',
            'countries.*.id' => 'required|exists:travel_countries,id',
            'countries.*.order' => 'required|integer'
        ]);

        foreach ($request->countries as $countryData) {
            TravelCountry::where('id', $countryData['id'])->update(['order' => $countryData['order']]);
        }

        return response()->json(['success' => true]);
    }
}
