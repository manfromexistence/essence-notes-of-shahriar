<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Award;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class AwardController extends Controller
{
    public function index()
    {
        $awards = Award::orderBy('award_date', 'desc')->get();
        return Inertia::render('dashboard/awards/index', ['awards' => $awards]);
    }

    public function create()
    {
        return Inertia::render('dashboard/awards/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'organization' => 'required|string',
            'award_date' => 'required|date',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:10240',
            'order' => 'nullable|integer',
        ]);

        // Handle image upload
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('awards', 'public');
            $validated['image'] = '/storage/' . $path;
        }

        Award::create($validated);
        return redirect()->route('admin.awards.index')->with('success', 'Award created successfully');
    }

    public function show(string $id)
    {
        return redirect()->route('admin.awards.edit', $id);
    }

    public function edit(string $id)
    {
        $award = Award::findOrFail($id);
        return Inertia::render('dashboard/awards/edit', ['award' => $award]);
    }

    public function update(Request $request, string $id)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'organization' => 'required|string',
            'award_date' => 'required|date',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:10240',
            'order' => 'nullable|integer',
        ]);

        $award = Award::findOrFail($id);

        // Handle image upload
        if ($request->hasFile('image')) {
            // Delete old image if exists
            if ($award->image && Storage::disk('public')->exists(str_replace('/storage/', '', $award->image))) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $award->image));
            }
            $path = $request->file('image')->store('awards', 'public');
            $validated['image'] = '/storage/' . $path;
        } else {
            unset($validated['image']);
        }

        $award->update($validated);
        return redirect()->route('admin.awards.index')->with('success', 'Award updated successfully');
    }

    public function destroy(string $id)
    {
        Award::findOrFail($id)->delete();
        return redirect()->route('admin.awards.index')->with('success', 'Award deleted successfully');
    }
}
