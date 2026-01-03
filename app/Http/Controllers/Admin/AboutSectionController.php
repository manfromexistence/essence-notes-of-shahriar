<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AboutSection;
use App\Models\Award;
use App\Models\CorporateJourneyItem;
use App\Models\Associate;
use App\Models\AboutMePageSetting;
use App\Models\ImpactItem;
use App\Models\TravelCountry;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class AboutSectionController extends Controller
{
    public function index()
    {
        $aboutSections = AboutSection::orderBy('order')->get();
        $awards = Award::orderBy('order')->get();
        $corporateJourney = CorporateJourneyItem::orderBy('order')->get();
        $associates = Associate::orderBy('order')->get();
        $impactItems = ImpactItem::orderBy('order')->get();
        $travelCountries = TravelCountry::orderBy('order')->get();
        $settings = AboutMePageSetting::first();
        
        return Inertia::render('dashboard/about-sections/index', [
            'aboutSections' => $aboutSections,
            'awards' => $awards,
            'corporateJourney' => $corporateJourney,
            'associates' => $associates,
            'impactItems' => $impactItems,
            'travelCountries' => $travelCountries,
            'settings' => $settings,
        ]);
    }

    public function create()
    {
        return Inertia::render('dashboard/about-sections/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'section_type' => 'required|string',
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:10240',
            'additional_data' => 'nullable|json',
            'order' => 'nullable|integer',
            'is_active' => 'boolean',
        ]);

        // Handle image upload
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('about-sections', 'public');
            $validated['image'] = '/storage/' . $path;
        }

        AboutSection::create($validated);
        return redirect()->route('admin.about-sections.index')->with('success', 'About section created successfully');
    }

    public function edit(string $id)
    {
        $aboutSection = AboutSection::findOrFail($id);
        return Inertia::render('dashboard/about-sections/edit', ['aboutSection' => $aboutSection]);
    }

    public function show(AboutSection $aboutSection)
    {
        return Inertia::render('dashboard/about-sections/show', ['aboutSection' => $aboutSection]);
    }

    public function update(Request $request, string $id)
    {
        $validated = $request->validate([
            'section_type' => 'required|string',
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:10240',
            'additional_data' => 'nullable|json',
            'order' => 'nullable|integer',
            'is_active' => 'boolean',
        ]);

        $aboutSection = AboutSection::findOrFail($id);

        // Handle image upload
        if ($request->hasFile('image')) {
            // Delete old image if exists
            if ($aboutSection->image && Storage::disk('public')->exists(str_replace('/storage/', '', $aboutSection->image))) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $aboutSection->image));
            }
            $path = $request->file('image')->store('about-sections', 'public');
            $validated['image'] = '/storage/' . $path;
        } else {
            unset($validated['image']);
        }

        $aboutSection->update($validated);
        return redirect()->route('admin.about-sections.index')->with('success', 'About section updated successfully');
    }

    public function destroy(string $id)
    {
        AboutSection::findOrFail($id)->delete();
        return redirect()->route('admin.about-sections.index')->with('success', 'About section deleted successfully');
    }
}
