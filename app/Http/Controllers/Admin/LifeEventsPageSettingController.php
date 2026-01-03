<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\LifeEventsPageSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class LifeEventsPageSettingController extends Controller
{
    public function index()
    {
        return redirect()->route('admin.life-events-page-settings.general');
    }

    public function general()
    {
        $settings = LifeEventsPageSetting::first();
        if (!$settings) {
            $settings = LifeEventsPageSetting::create(['page_title' => 'Life Events']);
        }
        return Inertia::render('dashboard/life-events-page-settings/general', ['settings' => $settings]);
    }

    public function banner()
    {
        $settings = LifeEventsPageSetting::first();
        if (!$settings) {
            $settings = LifeEventsPageSetting::create(['page_title' => 'Life Events']);
        }
        return Inertia::render('dashboard/life-events-page-settings/banner', ['settings' => $settings]);
    }

    public function timeline()
    {
        $settings = LifeEventsPageSetting::first();
        if (!$settings) {
            $settings = LifeEventsPageSetting::create(['page_title' => 'Life Events']);
        }
        return Inertia::render('dashboard/life-events-page-settings/timeline', ['settings' => $settings]);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'page_title' => 'nullable|string|max:255',
            'banner_title' => 'nullable|string|max:255',
            'banner_subtitle' => 'nullable|string|max:255',
            'banner_image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:5120',
            'timeline_section_title' => 'nullable|string|max:255',
            'timeline_section_subtitle' => 'nullable|string|max:255',
        ]);

        $settings = LifeEventsPageSetting::first() ?? new LifeEventsPageSetting();

        if ($request->hasFile('banner_image')) {
            if ($settings->banner_image && !str_starts_with($settings->banner_image, '/assets/') && 
                Storage::disk('public')->exists(str_replace('/storage/', '', $settings->banner_image))) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $settings->banner_image));
            }
            $path = $request->file('banner_image')->store('life-events-page', 'public');
            $validated['banner_image'] = '/storage/' . $path;
        } else {
            unset($validated['banner_image']);
        }

        $settings->fill($validated);
        $settings->save();

        return redirect()->back()->with('success', 'Life Events page settings updated successfully!');
    }
}
