<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\EntrepreneurshipPageSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class EntrepreneurshipPageSettingController extends Controller
{
    public function index()
    {
        $settings = EntrepreneurshipPageSetting::first();
        if (!$settings) {
            $settings = EntrepreneurshipPageSetting::create(['page_title' => 'Entrepreneurship']);
        }
        return Inertia::render('dashboard/entrepreneurship-page-settings/index', ['settings' => $settings]);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'page_title' => 'nullable|string|max:255',
            'banner_quote' => 'nullable|string|max:2000',
            'banner_quote_label' => 'nullable|string|max:255',
            'banner_image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:5120',
            'quotes_section_title' => 'nullable|string|max:255',
            'quotes' => 'nullable|array',
            'quotes.*.content' => 'required|string|max:2000',
            'quotes.*.author' => 'required|string|max:255',
            'quotes.*.image' => 'nullable|string|max:500',
            'quotes.*.is_featured' => 'boolean',
            'quote_images' => 'nullable|array',
            'quote_images.*' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:5120',
            'innovation_section_title' => 'nullable|string|max:255',
            'innovation_section_subtitle' => 'nullable|string|max:2000',
            'innovations' => 'nullable|array',
            'innovations.*.title' => 'required|string|max:255',
            'innovations.*.description' => 'required|string|max:500',
            'innovations.*.long_description' => 'required|string|max:2000',
            'innovations.*.image' => 'nullable|string|max:500',
            'innovations.*.is_featured' => 'boolean',
            'innovation_images' => 'nullable|array',
            'innovation_images.*' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:5120',
            'events_section_title' => 'nullable|string|max:255',
            'events_button_text' => 'nullable|string|max:255',
            'blogs_section_title' => 'nullable|string|max:255',
            'blogs_button_text' => 'nullable|string|max:255',
            'blogs_show_less_text' => 'nullable|string|max:255',
        ]);

        $settings = EntrepreneurshipPageSetting::first() ?? new EntrepreneurshipPageSetting();

        // Handle banner image upload
        if ($request->hasFile('banner_image')) {
            if ($settings->banner_image && !str_starts_with($settings->banner_image, '/assets/') && 
                Storage::disk('public')->exists(str_replace('/storage/', '', $settings->banner_image))) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $settings->banner_image));
            }
            $path = $request->file('banner_image')->store('entrepreneurship-page', 'public');
            $validated['banner_image'] = '/storage/' . $path;
        } else {
            unset($validated['banner_image']);
        }

        // Handle quote image uploads
        if ($request->hasFile('quote_images')) {
            $quoteImages = $request->file('quote_images');
            $quotes = $validated['quotes'] ?? [];
            
            foreach ($quoteImages as $index => $file) {
                if ($file && isset($quotes[$index])) {
                    // Delete old image if it exists and is not a default asset
                    if (isset($quotes[$index]['image']) && $quotes[$index]['image'] && 
                        !str_starts_with($quotes[$index]['image'], '/assets/') && 
                        Storage::disk('public')->exists(str_replace('/storage/', '', $quotes[$index]['image']))) {
                        Storage::disk('public')->delete(str_replace('/storage/', '', $quotes[$index]['image']));
                    }
                    
                    $path = $file->store('entrepreneurship-quotes', 'public');
                    $quotes[$index]['image'] = '/storage/' . $path;
                }
            }
            $validated['quotes'] = $quotes;
        }

        // Handle innovation image uploads
        if ($request->hasFile('innovation_images')) {
            $innovationImages = $request->file('innovation_images');
            $innovations = $validated['innovations'] ?? [];
            
            foreach ($innovationImages as $index => $file) {
                if ($file && isset($innovations[$index])) {
                    // Delete old image if it exists and is not a default asset
                    if (isset($innovations[$index]['image']) && $innovations[$index]['image'] && 
                        !str_starts_with($innovations[$index]['image'], '/assets/') && 
                        Storage::disk('public')->exists(str_replace('/storage/', '', $innovations[$index]['image']))) {
                        Storage::disk('public')->delete(str_replace('/storage/', '', $innovations[$index]['image']));
                    }
                    
                    $path = $file->store('entrepreneurship-innovations', 'public');
                    $innovations[$index]['image'] = '/storage/' . $path;
                }
            }
            $validated['innovations'] = $innovations;
        }

        // Remove file arrays from validated data
        unset($validated['quote_images'], $validated['innovation_images']);

        $settings->fill($validated);
        $settings->save();

        return redirect()->back()->with('success', 'Entrepreneurship page settings updated successfully!');
    }
}
