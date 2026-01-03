<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\EventsPageSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class EventsPageSettingController extends Controller
{
    public function index()
    {
        $settings = EventsPageSetting::first();
        if (!$settings) {
            $settings = EventsPageSetting::create(['page_title' => 'Events']);
        }
        return Inertia::render('dashboard/events-page-settings/index', ['settings' => $settings]);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'page_title' => 'nullable|string|max:255',
            'banner_title' => 'nullable|string|max:255',
            'banner_vector_image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp,svg|max:5120',
            'banner_bottom_vector' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp,svg|max:5120',
            'activities_section_title' => 'nullable|string|max:255',
            'activities_section_description' => 'nullable|string|max:2000',
            'activities_image_1' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:5120',
            'activities_image_2' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:5120',
            'activities_image_3' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:5120',
            'activities_image_4' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:5120',
            'events_section_title' => 'nullable|string|max:255',
            'year_filter_options' => 'nullable|array',
            'default_event_image_1' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:5120',
            'default_event_image_2' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:5120',
            'default_event_image_3' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:5120',
            'default_event_image_4' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:5120',
            'default_event_image_5' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:5120',
        ]);

        $settings = EventsPageSetting::first() ?? new EventsPageSetting();

        if ($request->hasFile('banner_vector_image')) {
            if ($settings->banner_vector_image && !str_starts_with($settings->banner_vector_image, '/assets/') && 
                Storage::disk('public')->exists(str_replace('/storage/', '', $settings->banner_vector_image))) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $settings->banner_vector_image));
            }
            $path = $request->file('banner_vector_image')->store('events-page', 'public');
            $validated['banner_vector_image'] = '/storage/' . $path;
        } else {
            unset($validated['banner_vector_image']);
        }

        if ($request->hasFile('banner_bottom_vector')) {
            if ($settings->banner_bottom_vector && !str_starts_with($settings->banner_bottom_vector, '/assets/') && 
                Storage::disk('public')->exists(str_replace('/storage/', '', $settings->banner_bottom_vector))) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $settings->banner_bottom_vector));
            }
            $path = $request->file('banner_bottom_vector')->store('events-page', 'public');
            $validated['banner_bottom_vector'] = '/storage/' . $path;
        } else {
            unset($validated['banner_bottom_vector']);
        }

        // Handle activities images
        for ($i = 1; $i <= 4; $i++) {
            $fieldName = 'activities_image_' . $i;
            if ($request->hasFile($fieldName)) {
                $currentImage = $settings->{$fieldName};
                if ($currentImage && !str_starts_with($currentImage, '/assets/') && 
                    Storage::disk('public')->exists(str_replace('/storage/', '', $currentImage))) {
                    Storage::disk('public')->delete(str_replace('/storage/', '', $currentImage));
                }
                $path = $request->file($fieldName)->store('events-page/activities', 'public');
                $validated[$fieldName] = '/storage/' . $path;
            } else {
                unset($validated[$fieldName]);
            }
        }

        // Handle default event images
        for ($i = 1; $i <= 5; $i++) {
            $fieldName = 'default_event_image_' . $i;
            if ($request->hasFile($fieldName)) {
                $currentImage = $settings->{$fieldName};
                if ($currentImage && !str_starts_with($currentImage, '/assets/') && 
                    Storage::disk('public')->exists(str_replace('/storage/', '', $currentImage))) {
                    Storage::disk('public')->delete(str_replace('/storage/', '', $currentImage));
                }
                $path = $request->file($fieldName)->store('events-page/events', 'public');
                $validated[$fieldName] = '/storage/' . $path;
            } else {
                unset($validated[$fieldName]);
            }
        }

        $settings->fill($validated);
        $settings->save();

        return redirect()->back()->with('success', 'Events page settings updated successfully!');
    }
}
