<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\LifeEvent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class LifeEventController extends Controller
{
    public function index()
    {
        $lifeEvents = LifeEvent::orderBy('event_date', 'desc')->get();
        return Inertia::render('dashboard/life-events/index', ['lifeEvents' => $lifeEvents]);
    }

    public function create()
    {
        return Inertia::render('dashboard/life-events/create');
    }

    public function show(string $id)
    {
        $lifeEvent = LifeEvent::findOrFail($id);
        return Inertia::render('dashboard/life-events/edit', ['lifeEvent' => $lifeEvent]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:10240',
            'event_date' => 'required|date',
            'category' => 'required|string',
            'location' => 'required|string',
            'order' => 'nullable|integer',
        ]);

        // Handle image upload
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('life-events', 'public');
            $validated['image'] = '/storage/' . $path;
        }

        LifeEvent::create($validated);
        return redirect()->route('admin.life-events.index')->with('success', 'Life event created successfully');
    }

    public function edit(string $id)
    {
        $lifeEvent = LifeEvent::findOrFail($id);
        return Inertia::render('dashboard/life-events/edit', ['lifeEvent' => $lifeEvent]);
    }

    public function update(Request $request, string $id)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:10240',
            'event_date' => 'required|date',
            'category' => 'required|string',
            'location' => 'required|string',
            'order' => 'nullable|integer',
        ]);

        $lifeEvent = LifeEvent::findOrFail($id);

        // Handle image upload
        if ($request->hasFile('image')) {
            // Delete old image if exists
            if ($lifeEvent->image && Storage::disk('public')->exists(str_replace('/storage/', '', $lifeEvent->image))) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $lifeEvent->image));
            }
            $path = $request->file('image')->store('life-events', 'public');
            $validated['image'] = '/storage/' . $path;
        } else {
            unset($validated['image']);
        }

        $lifeEvent->update($validated);
        return redirect()->route('admin.life-events.index')->with('success', 'Life event updated successfully');
    }

    public function destroy(string $id)
    {
        LifeEvent::findOrFail($id)->delete();
        return redirect()->route('admin.life-events.index')->with('success', 'Life event deleted successfully');
    }
}
