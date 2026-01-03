<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ImpactItem;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ImpactItemController extends Controller
{
    public function index()
    {
        $items = ImpactItem::orderBy('order')->get();
        
        return Inertia::render('dashboard/impact-items/index', [
            'items' => $items
        ]);
    }

    public function create()
    {
        return Inertia::render('dashboard/impact-items/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'order' => 'nullable|integer',
            'is_active' => 'boolean'
        ]);

        $validated['order'] = $validated['order'] ?? ImpactItem::max('order') + 1;
        $validated['is_active'] = $validated['is_active'] ?? true;

        ImpactItem::create($validated);

        return redirect()->route('admin.about-sections.impact')
            ->with('success', 'Impact item added successfully.');
    }

    public function show(ImpactItem $impactItem)
    {
        return redirect()->route('admin.impact-items.edit', $impactItem);
    }

    public function edit(ImpactItem $impactItem)
    {
        return Inertia::render('dashboard/impact-items/edit', [
            'item' => $impactItem
        ]);
    }

    public function update(Request $request, ImpactItem $impactItem)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'order' => 'nullable|integer',
            'is_active' => 'boolean'
        ]);

        $impactItem->update($validated);

        return redirect()->route('admin.about-sections.impact')
            ->with('success', 'Impact item updated successfully.');
    }

    public function destroy(ImpactItem $impactItem)
    {
        $impactItem->delete();

        return redirect()->route('admin.about-sections.impact')
            ->with('success', 'Impact item deleted successfully.');
    }

    public function reorder(Request $request)
    {
        $request->validate([
            'items' => 'required|array',
            'items.*.id' => 'required|exists:impact_items,id',
            'items.*.order' => 'required|integer'
        ]);

        foreach ($request->items as $itemData) {
            ImpactItem::where('id', $itemData['id'])->update(['order' => $itemData['order']]);
        }

        return response()->json(['success' => true]);
    }
}
