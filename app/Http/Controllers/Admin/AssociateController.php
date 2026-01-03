<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Associate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class AssociateController extends Controller
{
    public function index()
    {
        $associates = Associate::orderBy('order')->get();
        
        return Inertia::render('dashboard/associates/index', [
            'associates' => $associates
        ]);
    }

    public function create()
    {
        return Inertia::render('dashboard/associates/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'logo_image' => 'required|image|max:10240',
            'url' => 'nullable|url',
            'order' => 'nullable|integer',
            'is_active' => 'boolean'
        ]);

        if ($request->hasFile('logo_image')) {
            $validated['logo_image'] = $request->file('logo_image')->store('associates', 'public');
        }

        Associate::create($validated);

        return redirect()->route('admin.associates.index')
            ->with('success', 'Associate created successfully.');
    }

    public function show(Associate $associate)
    {
        return redirect()->route('admin.associates.edit', $associate);
    }

    public function edit(Associate $associate)
    {
        return Inertia::render('dashboard/associates/edit', [
            'associate' => $associate
        ]);
    }

    public function update(Request $request, Associate $associate)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'logo_image' => 'nullable|image|max:10240',
            'url' => 'nullable|url',
            'order' => 'nullable|integer',
            'is_active' => 'boolean'
        ]);

        if ($request->hasFile('logo_image')) {
            if ($associate->logo_image && !str_starts_with($associate->logo_image, 'http')) {
                Storage::disk('public')->delete($associate->logo_image);
            }
            $validated['logo_image'] = $request->file('logo_image')->store('associates', 'public');
        }

        $associate->update($validated);

        return redirect()->route('admin.associates.index')
            ->with('success', 'Associate updated successfully.');
    }

    public function destroy(Associate $associate)
    {
        if ($associate->logo_image && !str_starts_with($associate->logo_image, 'http')) {
            Storage::disk('public')->delete($associate->logo_image);
        }
        
        $associate->delete();

        return redirect()->route('admin.associates.index')
            ->with('success', 'Associate deleted successfully.');
    }
}
