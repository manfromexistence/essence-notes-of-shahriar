<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\BlogsPageSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class BlogsPageSettingController extends Controller
{
    public function index()
    {
        // Legacy route - redirect to general section
        return redirect()->route('admin.blogs-page-settings.general');
    }

    public function general()
    {
        $settings = BlogsPageSetting::first();
        
        if (!$settings) {
            $settings = BlogsPageSetting::create(['page_title' => 'Blogs']);
        }

        return Inertia::render('dashboard/blogs-page-settings/general', [
            'settings' => $settings,
        ]);
    }

    public function banner()
    {
        $settings = BlogsPageSetting::first();
        
        if (!$settings) {
            $settings = BlogsPageSetting::create   (['page_title' => 'Blogs']);
        }

        return Inertia::render('dashboard/blogs-page-settings/banner', [
            'settings' => $settings,
        ]);
    }

    public function sections()
    {
        $settings = BlogsPageSetting::first();
        
        if (!$settings) {
            $settings = BlogsPageSetting::create(['page_title' => 'Blogs']);
        }

        return Inertia::render('dashboard/blogs-page-settings/sections', [
            'settings' => $settings,
        ]);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'page_title' => 'nullable|string|max:255',
            'banner_title' => 'nullable|string|max:255',
            'banner_vector_right' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp,svg|max:5120',
            'banner_vector_left' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp,svg|max:5120',
            'all_blogs_section_title' => 'nullable|string|max:255',
            'featured_blogs_title' => 'nullable|string|max:255',
        ]);

        $settings = BlogsPageSetting::first() ?? new BlogsPageSetting();

        if ($request->hasFile('banner_vector_right')) {
            if ($settings->banner_vector_right && !str_starts_with($settings->banner_vector_right, '/assets/') && 
                Storage::disk('public')->exists(str_replace('/storage/', '', $settings->banner_vector_right))) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $settings->banner_vector_right));
            }
            $path = $request->file('banner_vector_right')->store('blogs-page', 'public');
            $validated['banner_vector_right'] = '/storage/' . $path;
        } else {
            unset($validated['banner_vector_right']);
        }

        if ($request->hasFile('banner_vector_left')) {
            if ($settings->banner_vector_left && !str_starts_with($settings->banner_vector_left, '/assets/') && 
                Storage::disk('public')->exists(str_replace('/storage/', '', $settings->banner_vector_left))) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $settings->banner_vector_left));
            }
            $path = $request->file('banner_vector_left')->store('blogs-page', 'public');
            $validated['banner_vector_left'] = '/storage/' . $path;
        } else {
            unset($validated['banner_vector_left']);
        }

        $settings->fill($validated);
        $settings->save();

        session()->flash('success', 'Blogs page settings updated successfully!');
        return back();
    }
}
