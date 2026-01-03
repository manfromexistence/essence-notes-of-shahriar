<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Donation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class DonationController extends Controller
{
    public function index()
    {
        $donations = Donation::orderBy('order')->orderBy('created_at', 'desc')->get()->unique('title')->values();
        return Inertia::render('dashboard/donations/index', ['donations' => $donations]);
    }

    public function create()
    {
        return Inertia::render('dashboard/donations/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:10240',
            'goal_amount' => 'required|numeric',
            'raised_amount' => 'nullable|numeric',
            'end_date' => 'required|date',
            'is_active' => 'boolean',
            'category' => 'required|string',
            'beneficiary_info' => 'nullable|string',
            'order' => 'nullable|integer',
        ]);

        // Set default order if not provided
        if (!isset($validated['order'])) {
            $validated['order'] = Donation::max('order') + 1;
        }

        // Handle image upload
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('donations', 'public');
            $validated['image'] = '/storage/' . $path;
        }

        Donation::create($validated);
        return redirect()->route('admin.donations.index')->with('success', 'Donation created successfully');
    }

    public function show(string $id)
    {
        return redirect()->route('admin.donations.edit', $id);
    }

    public function edit(string $id)
    {
        $donation = Donation::findOrFail($id);
        return Inertia::render('dashboard/donations/edit', ['donation' => $donation]);
    }

    public function update(Request $request, string $id)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:10240',
            'goal_amount' => 'required|numeric',
            'raised_amount' => 'nullable|numeric',
            'end_date' => 'required|date',
            'is_active' => 'boolean',
            'category' => 'required|string',
            'beneficiary_info' => 'nullable|string',
            'order' => 'nullable|integer',
        ]);

        $donation = Donation::findOrFail($id);

        // Handle image upload
        if ($request->hasFile('image')) {
            // Delete old image if exists
            if ($donation->image && Storage::disk('public')->exists(str_replace('/storage/', '', $donation->image))) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $donation->image));
            }
            $path = $request->file('image')->store('donations', 'public');
            $validated['image'] = '/storage/' . $path;
        } else {
            unset($validated['image']);
        }

        $donation->update($validated);
        return redirect()->route('admin.donations.index')->with('success', 'Donation updated successfully');
    }

    public function destroy(string $id)
    {
        Donation::findOrFail($id)->delete();
        return redirect()->route('admin.donations.index')->with('success', 'Donation deleted successfully');
    }
}
