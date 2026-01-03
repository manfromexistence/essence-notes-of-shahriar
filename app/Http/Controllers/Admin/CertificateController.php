<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Certificate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class CertificateController extends Controller
{
    public function index()
    {
        $certificates = Certificate::orderBy('issue_date', 'desc')->get();
        return Inertia::render('dashboard/certificates/index', ['certificates' => $certificates]);
    }

    public function create()
    {
        return Inertia::render('dashboard/certificates/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'nullable|string|max:255',
            'title' => 'nullable|string|max:255',
            'issuing_organization' => 'nullable|string',
            'issue_date' => 'nullable|date',
            'expiry_date' => 'nullable|date',
            'credential_id' => 'nullable|string',
            'credential_url' => 'nullable|string',
            'certificate_url' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:10240',
            'thumbnail' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:10240',
            'order' => 'nullable|integer',
        ]);

        // Use title if name is not provided
        if (empty($validated['name']) && !empty($validated['title'])) {
            $validated['name'] = $validated['title'];
        }

        // Handle image upload (supports both 'image' and 'thumbnail' field names)
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('certificates', 'public');
            $validated['image'] = '/storage/' . $path;
        } elseif ($request->hasFile('thumbnail')) {
            $path = $request->file('thumbnail')->store('certificates', 'public');
            $validated['image'] = '/storage/' . $path;
        }
        unset($validated['thumbnail']);

        Certificate::create($validated);
        return redirect()->route('admin.certificates.index')->with('success', 'Certificate created successfully');
    }

    public function show(string $id)
    {
        return redirect()->route('admin.certificates.edit', $id);
    }

    public function edit(string $id)
    {
        $certificate = Certificate::findOrFail($id);
        return Inertia::render('dashboard/certificates/edit', ['certificate' => $certificate]);
    }

    public function update(Request $request, string $id)
    {
        $validated = $request->validate([
            'name' => 'nullable|string|max:255',
            'title' => 'nullable|string|max:255',
            'issuing_organization' => 'nullable|string',
            'issue_date' => 'nullable|date',
            'expiry_date' => 'nullable|date',
            'credential_id' => 'nullable|string',
            'credential_url' => 'nullable|string',
            'certificate_url' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:10240',
            'thumbnail' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:10240',
            'order' => 'nullable|integer',
        ]);

        $certificate = Certificate::findOrFail($id);

        // Use title if name is not provided
        if (empty($validated['name']) && !empty($validated['title'])) {
            $validated['name'] = $validated['title'];
        }

        // Handle image upload (supports both 'image' and 'thumbnail' field names)
        if ($request->hasFile('image')) {
            // Delete old image if exists
            if ($certificate->image && Storage::disk('public')->exists(str_replace('/storage/', '', $certificate->image))) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $certificate->image));
            }
            $path = $request->file('image')->store('certificates', 'public');
            $validated['image'] = '/storage/' . $path;
        } elseif ($request->hasFile('thumbnail')) {
            // Delete old image if exists
            if ($certificate->image && Storage::disk('public')->exists(str_replace('/storage/', '', $certificate->image))) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $certificate->image));
            }
            $path = $request->file('thumbnail')->store('certificates', 'public');
            $validated['image'] = '/storage/' . $path;
        } else {
            unset($validated['image']);
        }
        unset($validated['thumbnail']);

        $certificate->update($validated);
        return redirect()->route('admin.certificates.index')->with('success', 'Certificate updated successfully');
    }

    public function destroy(string $id)
    {
        Certificate::findOrFail($id)->delete();
        return redirect()->route('admin.certificates.index')->with('success', 'Certificate deleted successfully');
    }
}
