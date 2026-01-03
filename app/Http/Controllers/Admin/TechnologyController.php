<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Technology;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class TechnologyController extends Controller
{
    public function index()
    {
        $technologies = Technology::orderBy('order')->get();
        return Inertia::render('dashboard/technologies/index', ['technologies' => $technologies]);
    }

    public function create()
    {
        return Inertia::render('dashboard/technologies/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'content' => 'nullable|string',
            'icon' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp,svg|max:10240',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp,svg|max:10240',
            'category' => 'required|string',
            'proficiency_level' => 'nullable|string',
            'is_featured' => 'nullable|boolean',
            'order' => 'nullable|integer',
        ]);

        // Handle image upload (supports both 'icon' and 'image' field names)
        if ($request->hasFile('icon')) {
            $path = $request->file('icon')->store('technologies', 'public');
            $validated['icon'] = '/storage/' . $path;
        } elseif ($request->hasFile('image')) {
            $path = $request->file('image')->store('technologies', 'public');
            $validated['icon'] = '/storage/' . $path;
        }
        unset($validated['image']);

        Technology::create($validated);
        return redirect()->route('admin.technologies.index')->with('success', 'Technology created successfully');
    }

    public function show(string $id)
    {
        return redirect()->route('admin.technologies.edit', $id);
    }

    public function edit(string $id)
    {
        $technology = Technology::findOrFail($id);
        return Inertia::render('dashboard/technologies/edit', ['technology' => $technology]);
    }

    public function update(Request $request, string $id)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'content' => 'nullable|string',
            'icon' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp,svg|max:10240',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp,svg|max:10240',
            'category' => 'required|string',
            'proficiency_level' => 'nullable|string',
            'is_featured' => 'nullable|boolean',
            'order' => 'nullable|integer',
        ]);

        $technology = Technology::findOrFail($id);

        // Handle image upload (supports both 'icon' and 'image' field names)
        if ($request->hasFile('icon')) {
            // Delete old icon if exists
            if ($technology->icon && Storage::disk('public')->exists(str_replace('/storage/', '', $technology->icon))) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $technology->icon));
            }
            $path = $request->file('icon')->store('technologies', 'public');
            $validated['icon'] = '/storage/' . $path;
        } elseif ($request->hasFile('image')) {
            // Delete old icon if exists
            if ($technology->icon && Storage::disk('public')->exists(str_replace('/storage/', '', $technology->icon))) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $technology->icon));
            }
            $path = $request->file('image')->store('technologies', 'public');
            $validated['icon'] = '/storage/' . $path;
        } else {
            unset($validated['icon']);
        }
        unset($validated['image']);

        $technology->update($validated);
        return redirect()->route('admin.technologies.index')->with('success', 'Technology updated successfully');
    }

    public function destroy(string $id)
    {
        Technology::findOrFail($id)->delete();
        return redirect()->route('admin.technologies.index')->with('success', 'Technology deleted successfully');
    }
}
