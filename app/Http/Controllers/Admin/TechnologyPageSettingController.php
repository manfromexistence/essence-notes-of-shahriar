<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\TechnologyPageSetting;
use App\Models\Certificate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class TechnologyPageSettingController extends Controller
{
    public function index()
    {
        $settings = TechnologyPageSetting::first();
        if (!$settings) {
            $settings = TechnologyPageSetting::create(['page_title' => 'Technology']);
        }
        
        // Get certificates for display in the settings page
        $certificates = Certificate::orderBy('order', 'asc')->orderBy('issue_date', 'desc')->get();
        
        return Inertia::render('dashboard/technology-page-settings/index', [
            'settings' => $settings,
            'certificates' => $certificates,
        ]);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'page_title' => 'nullable|string|max:255',
            'banner_title' => 'nullable|string|max:255',
            'banner_subtitle' => 'nullable|string|max:1000',
            'banner_image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:5120',
            'banner_description' => 'nullable|string|max:2000',
            'cybersecurity_title' => 'nullable|string|max:255',
            'cybersecurity_description' => 'nullable|string|max:2000',
            'cybersecurity_additional_description' => 'nullable|string|max:2000',
            'cybersecurity_image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:5120',
            'contribution_title' => 'nullable|string|max:255',
            'contribution_description' => 'nullable|string|max:5000',
            'contribution_image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:5120',
            'tools_title' => 'nullable|string|max:255',
            'tools_description' => 'nullable|string|max:2000',
            'certificates_title' => 'nullable|string|max:255',
            'certificates_description' => 'nullable|string|max:2000',
            'blogs_title' => 'nullable|string|max:255',
            'section_title' => 'nullable|string|max:255',
            'section_description' => 'nullable|string|max:2000',
            'android_icon_svg' => 'nullable|file|mimes:svg|max:1024',
            'cursor_icon_svg' => 'nullable|file|mimes:svg|max:1024',
            'github_icon_svg' => 'nullable|file|mimes:svg|max:1024',
            'nextjs_icon_svg' => 'nullable|file|mimes:svg|max:1024',
            'tailwind_icon_svg' => 'nullable|file|mimes:svg|max:1024',
            'react_icon_svg' => 'nullable|file|mimes:svg|max:1024',
            'vercel_icon_svg' => 'nullable|file|mimes:svg|max:1024',
            'laravel_icon_svg' => 'nullable|file|mimes:svg|max:1024',
            'google_cloud_icon_svg' => 'nullable|file|mimes:svg|max:1024',
        ]);

        $settings = TechnologyPageSetting::first() ?? new TechnologyPageSetting();

        // Handle banner_image upload
        if ($request->hasFile('banner_image')) {
            if ($settings->banner_image && !str_starts_with($settings->banner_image, '/assets/') && 
                Storage::disk('public')->exists(str_replace('/storage/', '', $settings->banner_image))) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $settings->banner_image));
            }
            $path = $request->file('banner_image')->store('technology-page', 'public');
            $validated['banner_image'] = '/storage/' . $path;
        } else {
            unset($validated['banner_image']);
        }

        // Handle cybersecurity_image upload
        if ($request->hasFile('cybersecurity_image')) {
            if ($settings->cybersecurity_image && !str_starts_with($settings->cybersecurity_image, '/assets/') && 
                Storage::disk('public')->exists(str_replace('/storage/', '', $settings->cybersecurity_image))) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $settings->cybersecurity_image));
            }
            $path = $request->file('cybersecurity_image')->store('technology-page', 'public');
            $validated['cybersecurity_image'] = '/storage/' . $path;
        } else {
            unset($validated['cybersecurity_image']);
        }

        // Handle contribution_image upload
        if ($request->hasFile('contribution_image')) {
            if ($settings->contribution_image && !str_starts_with($settings->contribution_image, '/assets/') && 
                Storage::disk('public')->exists(str_replace('/storage/', '', $settings->contribution_image))) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $settings->contribution_image));
            }
            $path = $request->file('contribution_image')->store('technology-page', 'public');
            $validated['contribution_image'] = '/storage/' . $path;
        } else {
            unset($validated['contribution_image']);
        }

        // Handle SVG icon uploads
        $svgFields = [
            'android_icon_svg',
            'cursor_icon_svg',
            'github_icon_svg',
            'nextjs_icon_svg',
            'tailwind_icon_svg',
            'react_icon_svg',
            'vercel_icon_svg',
            'laravel_icon_svg',
            'google_cloud_icon_svg'
        ];

        foreach ($svgFields as $field) {
            if ($request->hasFile($field)) {
                // Delete old file if exists
                if ($settings->$field && !str_starts_with($settings->$field, '/assets/') && 
                    Storage::disk('public')->exists(str_replace('/storage/', '', $settings->$field))) {
                    Storage::disk('public')->delete(str_replace('/storage/', '', $settings->$field));
                }
                $path = $request->file($field)->store('technology-page/icons', 'public');
                $validated[$field] = '/storage/' . $path;
            } else {
                unset($validated[$field]);
            }
        }

        $settings->fill($validated);
        $settings->save();

        return redirect()->back()->with('success', 'Technology page settings updated successfully!');
    }
}
