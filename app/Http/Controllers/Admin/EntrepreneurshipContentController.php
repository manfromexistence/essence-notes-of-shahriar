<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\EntrepreneurshipContent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class EntrepreneurshipContentController extends Controller
{
    public function index()
    {
        $content = EntrepreneurshipContent::orderBy('publish_date', 'desc')->get();
        return Inertia::render('dashboard/entrepreneurship-content/index', ['content' => $content]);
    }

    public function create()
    {
        return Inertia::render('dashboard/entrepreneurship-content/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'type' => 'required|string',
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:10240',
            'author' => 'nullable|string',
            'publish_date' => 'required|date',
            'is_featured' => 'boolean',
            'order' => 'nullable|integer',
        ]);

        // Handle image upload
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('entrepreneurship-content', 'public');
            $validated['image'] = '/storage/' . $path;
        }

        EntrepreneurshipContent::create($validated);
        return redirect()->route('admin.entrepreneurship-content.index')->with('success', 'Content created successfully');
    }

    public function show(string $id)
    {
        return redirect()->route('admin.entrepreneurship-content.edit', $id);
    }

    public function edit(string $id)
    {
        $content = EntrepreneurshipContent::findOrFail($id);
        return Inertia::render('dashboard/entrepreneurship-content/edit', ['content' => $content]);
    }

    public function update(Request $request, string $id)
    {
        $validated = $request->validate([
            'type' => 'required|string',
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:10240',
            'author' => 'nullable|string',
            'publish_date' => 'required|date',
            'is_featured' => 'boolean',
            'order' => 'nullable|integer',
        ]);

        $content = EntrepreneurshipContent::findOrFail($id);

        // Handle image upload
        if ($request->hasFile('image')) {
            // Delete old image if exists
            if ($content->image && Storage::disk('public')->exists(str_replace('/storage/', '', $content->image))) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $content->image));
            }
            $path = $request->file('image')->store('entrepreneurship-content', 'public');
            $validated['image'] = '/storage/' . $path;
        } else {
            unset($validated['image']);
        }

        $content->update($validated);
        return redirect()->route('admin.entrepreneurship-content.index')->with('success', 'Content updated successfully');
    }

    public function destroy(string $id)
    {
        EntrepreneurshipContent::findOrFail($id)->delete();
        return redirect()->route('admin.entrepreneurship-content.index')->with('success', 'Content deleted successfully');
    }
}
