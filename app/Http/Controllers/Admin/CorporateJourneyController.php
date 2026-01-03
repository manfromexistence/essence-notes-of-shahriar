<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\CorporateJourneyItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class CorporateJourneyController extends Controller
{
    public function index()
    {
        $items = CorporateJourneyItem::orderBy('order')->get();
        
        return Inertia::render('dashboard/corporate-journey/index', [
            'items' => $items
        ]);
    }

    public function create()
    {
        return Inertia::render('dashboard/corporate-journey/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'step_number' => 'required|integer',
            'title' => 'required|string|max:255',
            'company' => 'required|string|max:255',
            'description' => 'required|string',
            'icon_image' => 'nullable|image|max:10240',
            'order' => 'nullable|integer',
            'is_active' => 'boolean'
        ]);

        if ($request->hasFile('icon_image')) {
            $validated['icon_image'] = $request->file('icon_image')->store('corporate-journey', 'public');
        }

        CorporateJourneyItem::create($validated);

        return redirect()->route('admin.corporate-journey.index')
            ->with('success', 'Corporate journey item created successfully.');
    }

    public function show(CorporateJourneyItem $corporateJourney)
    {
        return redirect()->route('admin.corporate-journey.edit', $corporateJourney);
    }

    public function edit(CorporateJourneyItem $corporateJourney)
    {
        return Inertia::render('dashboard/corporate-journey/edit', [
            'item' => $corporateJourney
        ]);
    }

    public function update(Request $request, CorporateJourneyItem $corporateJourney)
    {
        $validated = $request->validate([
            'step_number' => 'required|integer',
            'title' => 'required|string|max:255',
            'company' => 'required|string|max:255',
            'description' => 'required|string',
            'icon_image' => 'nullable|image|max:10240',
            'order' => 'nullable|integer',
            'is_active' => 'boolean'
        ]);

        if ($request->hasFile('icon_image')) {
            if ($corporateJourney->icon_image && !str_starts_with($corporateJourney->icon_image, 'http')) {
                Storage::disk('public')->delete($corporateJourney->icon_image);
            }
            $validated['icon_image'] = $request->file('icon_image')->store('corporate-journey', 'public');
        }

        $corporateJourney->update($validated);

        return redirect()->route('admin.corporate-journey.index')
            ->with('success', 'Corporate journey item updated successfully.');
    }

    public function destroy(CorporateJourneyItem $corporateJourney)
    {
        if ($corporateJourney->icon_image && !str_starts_with($corporateJourney->icon_image, 'http')) {
            Storage::disk('public')->delete($corporateJourney->icon_image);
        }
        
        $corporateJourney->delete();

        return redirect()->route('admin.corporate-journey.index')
            ->with('success', 'Corporate journey item deleted successfully.');
    }
}
