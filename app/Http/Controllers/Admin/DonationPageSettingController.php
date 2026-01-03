<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\DonationPageSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class DonationPageSettingController extends Controller
{
    public function index()
    {
        return redirect()->route('admin.donation-page-settings.general');
    }

    public function general()
    {
        $settings = DonationPageSetting::first();
        if (!$settings) {
            $settings = DonationPageSetting::create(['page_title' => 'Donation']);
        }
        return Inertia::render('dashboard/donation-page-settings/general', ['settings' => $settings]);
    }

    public function banner()
    {
        $settings = DonationPageSetting::first();
        if (!$settings) {
            $settings = DonationPageSetting::create(['page_title' => 'Donation']);
        }
        return Inertia::render('dashboard/donation-page-settings/banner', ['settings' => $settings]);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'page_title' => 'nullable|string|max:255',
            'banner_quote' => 'nullable|string|max:2000',
            'banner_subtitle' => 'nullable|string|max:255',
            'banner_default_image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:5120',
            'donate_section_title' => 'nullable|string|max:255',
            'donate_section_description' => 'nullable|string|max:2000',
        ]);

        $settings = DonationPageSetting::first() ?? new DonationPageSetting();

        if ($request->hasFile('banner_default_image')) {
            if ($settings->banner_default_image && !str_starts_with($settings->banner_default_image, '/assets/') && 
                Storage::disk('public')->exists(str_replace('/storage/', '', $settings->banner_default_image))) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $settings->banner_default_image));
            }
            $path = $request->file('banner_default_image')->store('donation-page', 'public');
            $validated['banner_default_image'] = '/storage/' . $path;
        } else {
            unset($validated['banner_default_image']);
        }

        $settings->fill($validated);
        $settings->save();

        return redirect()->back()->with('success', 'Donation page settings updated successfully!');
    }
}
