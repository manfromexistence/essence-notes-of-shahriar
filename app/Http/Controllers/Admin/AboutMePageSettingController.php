<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AboutMePageSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class AboutMePageSettingController extends Controller
{
    public function index()
    {
        // Redirect to the unified about sections dashboard
        return redirect()->route('admin.about-sections.index');
    }

    public function banner()
    {
        $settings = AboutMePageSetting::first() ?? AboutMePageSetting::create([]);
        return Inertia::render('dashboard/about-sections/banner', ['settings' => $settings]);
    }

    public function report()
    {
        $settings = AboutMePageSetting::first() ?? AboutMePageSetting::create([]);
        return Inertia::render('dashboard/about-sections/report', ['settings' => $settings]);
    }

    public function awards()
    {
        $awards = \App\Models\Award::orderBy('order')->get();
        return Inertia::render('dashboard/about-sections/awards', ['awards' => $awards]);
    }

    public function story()
    {
        $storySections = \App\Models\AboutSection::where('section_type', 'story')->orderBy('order')->get();
        return Inertia::render('dashboard/about-sections/story', ['storySections' => $storySections]);
    }

    public function impact()
    {
        $settings = AboutMePageSetting::first() ?? AboutMePageSetting::create([]);
        $impactItems = \App\Models\ImpactItem::where('is_active', true)->orderBy('order')->get();
        return Inertia::render('dashboard/about-sections/impact', [
            'settings' => $settings,
            'impactItems' => $impactItems,
        ]);
    }

    public function travel()
    {
        $settings = AboutMePageSetting::first() ?? AboutMePageSetting::create([]);
        $travelCountries = \App\Models\TravelCountry::where('is_active', true)->orderBy('order')->get();
        return Inertia::render('dashboard/about-sections/travel', [
            'settings' => $settings,
            'travelCountries' => $travelCountries,
        ]);
    }

    public function corporate()
    {
        $settings = AboutMePageSetting::first() ?? AboutMePageSetting::create([]);
        $corporateJourneyItems = \App\Models\CorporateJourneyItem::orderBy('order')->get();
        return Inertia::render('dashboard/about-sections/corporate', [
            'settings' => $settings,
            'corporateJourneyItems' => $corporateJourneyItems,
        ]);
    }

    public function associates()
    {
        $associates = \App\Models\Associate::orderBy('order')->get();
        return Inertia::render('dashboard/about-sections/associates', ['associates' => $associates]);
    }

    public function update(Request $request)
    {
        $settings = AboutMePageSetting::first() ?? new AboutMePageSetting();
        $settings->save();

        return redirect()->back()->with('success', 'About Me page settings updated successfully!');
    }

    public function updateBanner(Request $request)
    {
        $validated = $request->validate([
            'label' => 'nullable|string|max:255',
            'title' => 'nullable|string|max:500',
            'banner_image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:5120',
            'video_thumbnail' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:5120',
            'video_url' => 'nullable|string|max:500',
        ]);

        $settings = AboutMePageSetting::first() ?? new AboutMePageSetting();
        $banner = $settings->banner ?? [];

        // Handle banner image upload
        if ($request->hasFile('banner_image')) {
            $path = $request->file('banner_image')->store('about-me/banner', 'public');
            $banner['banner_image'] = '/storage/' . $path;
        }

        // Handle video thumbnail upload
        if ($request->hasFile('video_thumbnail')) {
            $path = $request->file('video_thumbnail')->store('about-me/banner', 'public');
            $banner['video_thumbnail'] = '/storage/' . $path;
        }

        $banner['label'] = $validated['label'] ?? $banner['label'] ?? '';
        $banner['title'] = $validated['title'] ?? $banner['title'] ?? '';
        $banner['video_url'] = $validated['video_url'] ?? $banner['video_url'] ?? '';

        $settings->banner = $banner;
        $settings->save();

        return redirect()->back()->with('success', 'Banner settings updated successfully!');
    }

    public function updateReport(Request $request)
    {
        $validated = $request->validate([
            'description' => 'nullable|string|max:2000',
            'stat_1_value' => 'nullable|string|max:50',
            'stat_1_label' => 'nullable|string|max:100',
            'stat_2_value' => 'nullable|string|max:50',
            'stat_2_label' => 'nullable|string|max:100',
            'stat_3_value' => 'nullable|string|max:50',
            'stat_3_label' => 'nullable|string|max:100',
            'stat_4_value' => 'nullable|string|max:50',
            'stat_4_label' => 'nullable|string|max:100',
            'stat_5_value' => 'nullable|string|max:50',
            'stat_5_label' => 'nullable|string|max:100',
            'stat_6_value' => 'nullable|string|max:50',
            'stat_6_label' => 'nullable|string|max:100',
            'stat_7_value' => 'nullable|string|max:50',
            'stat_7_label' => 'nullable|string|max:100',
        ]);

        $settings = AboutMePageSetting::first() ?? new AboutMePageSetting();
        $settings->report = $validated;
        $settings->save();

        return redirect()->back()->with('success', 'Report settings updated successfully!');
    }

    public function updateCorporate(Request $request)
    {
        $validated = $request->validate([
            'title' => 'nullable|string|max:255',
            'philosophy_title' => 'nullable|string|max:255',
            'philosophy_image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:5120',
            'background_image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:5120',
            'line_image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp,svg|max:5120',
            'logic_theory_title' => 'nullable|string|max:255',
            'logic_theory_content_1' => 'nullable|string|max:1000',
            'logic_theory_content_2' => 'nullable|string|max:1000',
            'logic_1_title' => 'nullable|string|max:255',
            'logic_1_content' => 'nullable|string|max:1000',
        ]);

        $settings = AboutMePageSetting::first() ?? new AboutMePageSetting();
        $corporate = $settings->corporate_journey ?? [];

        // Handle philosophy image upload
        if ($request->hasFile('philosophy_image')) {
            $path = $request->file('philosophy_image')->store('about-me/corporate', 'public');
            $corporate['philosophy_image'] = '/storage/' . $path;
        }

        // Handle background image upload
        if ($request->hasFile('background_image')) {
            $path = $request->file('background_image')->store('about-me/corporate', 'public');
            $corporate['background_image'] = '/storage/' . $path;
        }

        // Handle line image upload
        if ($request->hasFile('line_image')) {
            $path = $request->file('line_image')->store('about-me/corporate', 'public');
            $corporate['line_image'] = '/storage/' . $path;
        }

        $corporate['title'] = $validated['title'] ?? $corporate['title'] ?? '';
        $corporate['philosophy_title'] = $validated['philosophy_title'] ?? $corporate['philosophy_title'] ?? '';
        $corporate['logic_theory_title'] = $validated['logic_theory_title'] ?? $corporate['logic_theory_title'] ?? '';
        $corporate['logic_theory_content_1'] = $validated['logic_theory_content_1'] ?? $corporate['logic_theory_content_1'] ?? '';
        $corporate['logic_theory_content_2'] = $validated['logic_theory_content_2'] ?? $corporate['logic_theory_content_2'] ?? '';
        $corporate['logic_1_title'] = $validated['logic_1_title'] ?? $corporate['logic_1_title'] ?? '';
        $corporate['logic_1_content'] = $validated['logic_1_content'] ?? $corporate['logic_1_content'] ?? '';

        $settings->corporate_journey = $corporate;
        $settings->save();

        return redirect()->back()->with('success', 'Corporate journey settings updated successfully!');
    }

    public function updateAssociates(Request $request)
    {
        $validated = $request->validate([
            'title' => 'nullable|string|max:255',
            'description' => 'nullable|string|max:1000',
            'background_image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:5120',
        ]);

        $settings = AboutMePageSetting::first() ?? new AboutMePageSetting();
        $associates = $settings->associates ?? [];

        // Handle background image upload
        if ($request->hasFile('background_image')) {
            $path = $request->file('background_image')->store('about-me/associates', 'public');
            $associates['background_image'] = '/storage/' . $path;
        }

        $associates['title'] = $validated['title'] ?? $associates['title'] ?? '';
        $associates['description'] = $validated['description'] ?? $associates['description'] ?? '';

        $settings->associates = $associates;
        $settings->save();

        return redirect()->back()->with('success', 'Associates settings updated successfully!');
    }

    public function updateTravel(Request $request)
    {
        $validated = $request->validate([
            'title' => 'nullable|string|max:255',
            'description' => 'nullable|string|max:2000',
            'map_image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp,svg|max:5120',
        ]);

        $settings = AboutMePageSetting::first() ?? new AboutMePageSetting();
        $travel = $settings->travel ?? [];

        // Handle map image upload
        if ($request->hasFile('map_image')) {
            $filename = time() . "_travel_map." . $request->file('map_image')->getClientOriginalExtension();
            $request->file('map_image')->move(public_path('assets/about_me/travel'), $filename);
            $travel['map_image'] = '/assets/about_me/travel/' . $filename;
        }

        // Use consistent field names (title, description) - migrate old field names if present
        $travel['title'] = $validated['title'] ?? $travel['section_title'] ?? $travel['title'] ?? '';
        $travel['description'] = $validated['description'] ?? $travel['section_subtitle'] ?? $travel['description'] ?? '';
        
        // Remove old field names if they exist
        unset($travel['section_title']);
        unset($travel['section_subtitle']);

        $settings->travel = $travel;
        $settings->save();

        return redirect()->back()->with('success', 'Travel settings updated successfully!');
    }

    public function updateImpact(Request $request)
    {
        $validated = $request->validate([
            'entrepreneur_title' => 'nullable|string|max:255',
            'entrepreneur_description' => 'nullable|string|max:2000',
            'technology_title' => 'nullable|string|max:255',
            'technology_description' => 'nullable|string|max:2000',
            'image_1' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:5120',
            'image_2' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:5120',
            'image_3' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:5120',
            'image_4' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:5120',
        ]);

        $settings = AboutMePageSetting::first() ?? new AboutMePageSetting();
        $impact = $settings->impact ?? [];

        // Handle image uploads
        for ($i = 1; $i <= 4; $i++) {
            if ($request->hasFile("image_$i")) {
                $path = $request->file("image_$i")->store('about-me/impact', 'public');
                $impact["image_$i"] = '/storage/' . $path;
            }
        }

        $impact['entrepreneur_title'] = $validated['entrepreneur_title'] ?? $impact['entrepreneur_title'] ?? '';
        $impact['entrepreneur_description'] = $validated['entrepreneur_description'] ?? $impact['entrepreneur_description'] ?? '';
        $impact['technology_title'] = $validated['technology_title'] ?? $impact['technology_title'] ?? '';
        $impact['technology_description'] = $validated['technology_description'] ?? $impact['technology_description'] ?? '';

        $settings->impact = $impact;
        $settings->save();

        return redirect()->back()->with('success', 'Impact settings updated successfully!');
    }
}
