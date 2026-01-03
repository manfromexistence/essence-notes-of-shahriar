<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\FeaturedBlogBanner;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class FeaturedBlogBannerController extends Controller
{
    public function index()
    {
        $banners = FeaturedBlogBanner::orderBy('order')->get();
        
        return Inertia::render('dashboard/featured-blog-banners/index', [
            'banners' => $banners
        ]);
    }

    public function create()
    {
        return Inertia::render('dashboard/featured-blog-banners/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'image' => 'required|image|max:10240',
            'date' => 'required|date',
            'read_time' => 'nullable|string|max:50',
            'size' => 'required|in:large,medium,small',
            'order' => 'nullable|integer',
            'is_active' => 'boolean'
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('blog-banners', 'public');
        }

        FeaturedBlogBanner::create($validated);

        return redirect()->route('admin.featured-blog-banners.index')
            ->with('success', 'Featured blog banner created successfully.');
    }

    public function show(FeaturedBlogBanner $featuredBlogBanner)
    {
        return redirect()->route('admin.featured-blog-banners.edit', $featuredBlogBanner);
    }

    public function edit(FeaturedBlogBanner $featuredBlogBanner)
    {
        return Inertia::render('dashboard/featured-blog-banners/edit', [
            'banner' => $featuredBlogBanner
        ]);
    }

    public function update(Request $request, FeaturedBlogBanner $featuredBlogBanner)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'image' => 'nullable|image|max:10240',
            'date' => 'required|date',
            'read_time' => 'nullable|string|max:50',
            'size' => 'required|in:large,medium,small',
            'order' => 'nullable|integer',
            'is_active' => 'boolean'
        ]);

        if ($request->hasFile('image')) {
            if ($featuredBlogBanner->image && !str_starts_with($featuredBlogBanner->image, 'http')) {
                Storage::disk('public')->delete($featuredBlogBanner->image);
            }
            $validated['image'] = $request->file('image')->store('blog-banners', 'public');
        }

        $featuredBlogBanner->update($validated);

        return redirect()->route('admin.featured-blog-banners.index')
            ->with('success', 'Featured blog banner updated successfully.');
    }

    public function destroy(FeaturedBlogBanner $featuredBlogBanner)
    {
        if ($featuredBlogBanner->image && !str_starts_with($featuredBlogBanner->image, 'http')) {
            Storage::disk('public')->delete($featuredBlogBanner->image);
        }
        
        $featuredBlogBanner->delete();

        return redirect()->route('admin.featured-blog-banners.index')
            ->with('success', 'Featured blog banner deleted successfully.');
    }
}
