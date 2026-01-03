<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class EventController extends Controller
{
    public function index()
    {
        $events = Event::orderBy('event_date', 'desc')->get();
        return Inertia::render('dashboard/events/index', ['events' => $events]);
    }

    public function create()
    {
        return Inertia::render('dashboard/events/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:10240',
            'event_date' => 'required|date',
            'location' => 'required|string',
            'organizer' => 'nullable|string',
            'is_featured' => 'boolean',
            'category' => 'required|string',
            'order' => 'nullable|integer',
        ]);

        // Handle image upload
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('events', 'public');
            $validated['image'] = '/storage/' . $path;
        }

        Event::create($validated);
        return redirect()->route('admin.events.index')->with('success', 'Event created successfully');
    }

    public function show(string $id)
    {
        return redirect()->route('admin.events.edit', $id);
    }

    public function edit(string $id)
    {
        $event = Event::findOrFail($id);
        return Inertia::render('dashboard/events/edit', ['event' => $event]);
    }

    public function update(Request $request, string $id)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:10240',
            'event_date' => 'required|date',
            'location' => 'required|string',
            'organizer' => 'nullable|string',
            'is_featured' => 'boolean',
            'category' => 'required|string',
            'order' => 'nullable|integer',
        ]);

        $event = Event::findOrFail($id);

        // Handle image upload
        if ($request->hasFile('image')) {
            // Delete old image if exists
            if ($event->image && Storage::disk('public')->exists(str_replace('/storage/', '', $event->image))) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $event->image));
            }
            $path = $request->file('image')->store('events', 'public');
            $validated['image'] = '/storage/' . $path;
        } else {
            unset($validated['image']);
        }

        $event->update($validated);
        return redirect()->route('admin.events.index')->with('success', 'Event updated successfully');
    }

    public function destroy(string $id)
    {
        Event::findOrFail($id)->delete();
        return redirect()->route('admin.events.index')->with('success', 'Event deleted successfully');
    }
}
