<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\MenuItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class MenuItemController extends Controller
{
    /**
     * Display a listing of menu items.
     */
    public function index()
    {
        $menuItems = MenuItem::with('children')
            ->root()
            ->ordered()
            ->get();

        return Inertia::render('dashboard/menu-items/index', [
            'menuItems' => $menuItems,
        ]);
    }

    /**
     * Show the form for creating a new menu item.
     */
    public function create()
    {
        $parentOptions = MenuItem::root()
            ->ordered()
            ->get(['id', 'label']);

        return Inertia::render('dashboard/menu-items/create', [
            'parentOptions' => $parentOptions,
        ]);
    }

    /**
     * Store a newly created menu item.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'label' => 'required|string|max:255',
            'url' => 'required|string|max:255',
            'target' => 'nullable|string|in:_self,_blank',
            'order' => 'nullable|integer|min:0',
            'is_active' => 'nullable|boolean',
            'parent_id' => 'nullable|exists:menu_items,id',
            'icon' => 'nullable|string|max:255',
        ]);

        try {
            // Set defaults
            $validated['target'] = $validated['target'] ?? '_self';
            $validated['is_active'] = $request->has('is_active') ? (bool) $request->is_active : true;
            $validated['order'] = $validated['order'] ?? MenuItem::max('order') + 1;

            MenuItem::create($validated);

            return redirect()->route('admin.menu-items.index')
                ->with('success', 'Menu item created successfully.');
        } catch (\Exception $e) {
            Log::error('Failed to create menu item', ['error' => $e->getMessage()]);
            return redirect()->back()
                ->withErrors(['error' => 'Failed to create menu item.'])
                ->withInput();
        }
    }

    /**
     * Display the specified menu item.
     */
    public function show(MenuItem $menuItem)
    {
        return redirect()->route('admin.menu-items.edit', $menuItem);
    }

    /**
     * Show the form for editing the specified menu item.
     */
    public function edit(MenuItem $menuItem)
    {
        $parentOptions = MenuItem::root()
            ->where('id', '!=', $menuItem->id)
            ->ordered()
            ->get(['id', 'label']);

        return Inertia::render('dashboard/menu-items/edit', [
            'menuItem' => $menuItem,
            'parentOptions' => $parentOptions,
        ]);
    }

    /**
     * Update the specified menu item.
     */
    public function update(Request $request, MenuItem $menuItem)
    {
        try {
            $validated = $request->validate([
                'label' => 'required|string|max:255',
                'url' => 'required|string|max:255',
                'target' => 'nullable|string|in:_self,_blank',
                'order' => 'nullable|integer|min:0',
                'is_active' => 'nullable|boolean',
                'parent_id' => 'nullable|exists:menu_items,id',
                'icon' => 'nullable|string|max:255',
            ]);

            // Prevent setting self as parent
            if (isset($validated['parent_id']) && $validated['parent_id'] == $menuItem->id) {
                return redirect()->back()
                    ->withErrors(['parent_id' => 'A menu item cannot be its own parent.'])
                    ->withInput();
            }

            $validated['target'] = $validated['target'] ?? '_self';
            $validated['is_active'] = $request->has('is_active') ? (bool) $request->is_active : $menuItem->is_active;

            $menuItem->update($validated);

            return redirect()->route('admin.menu-items.index')
                ->with('success', 'Menu item updated successfully.');
        } catch (\Exception $e) {
            Log::error('Failed to update menu item', ['error' => $e->getMessage()]);
            return redirect()->back()
                ->withErrors(['error' => 'Failed to update menu item.'])
                ->withInput();
        }
    }

    /**
     * Remove the specified menu item.
     */
    public function destroy(MenuItem $menuItem)
    {
        try {
            $menuItem->delete();

            return redirect()->route('admin.menu-items.index')
                ->with('success', 'Menu item deleted successfully.');
        } catch (\Exception $e) {
            Log::error('Failed to delete menu item', ['error' => $e->getMessage()]);
            return redirect()->back()
                ->withErrors(['error' => 'Failed to delete menu item.']);
        }
    }

    /**
     * Toggle the active status of a menu item.
     */
    public function toggleStatus(MenuItem $menuItem)
    {
        try {
            $menuItem->update([
                'is_active' => !$menuItem->is_active,
            ]);

            return redirect()->back()
                ->with('success', 'Menu item status updated successfully.');
        } catch (\Exception $e) {
            Log::error('Failed to toggle menu item status', ['error' => $e->getMessage()]);
            return redirect()->back()
                ->withErrors(['error' => 'Failed to update menu item status.']);
        }
    }

    /**
     * Reorder menu items (for drag-and-drop functionality).
     */
    public function reorder(Request $request)
    {
        try {
            $validated = $request->validate([
                'items' => 'required|array',
                'items.*.id' => 'required|exists:menu_items,id',
                'items.*.order' => 'required|integer|min:0',
            ]);

            foreach ($validated['items'] as $item) {
                MenuItem::where('id', $item['id'])->update(['order' => $item['order']]);
            }

            return response()->json(['success' => true, 'message' => 'Menu items reordered successfully.']);
        } catch (\Exception $e) {
            Log::error('Failed to reorder menu items', ['error' => $e->getMessage()]);
            return response()->json(['success' => false, 'message' => 'Failed to reorder menu items.'], 500);
        }
    }
}
