<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\HeroSection;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class HeroSectionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $heroSections = HeroSection::orderBy('order')->get();
        
        return Inertia::render('dashboard/hero-sections/index', [
            'heroSections' => $heroSections,
            'availablePlatforms' => HeroSection::getAvailablePlatforms(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('dashboard/hero-sections/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'nullable|string|max:100',
            'subtitle' => 'required|string',
            'subtitle_max_length' => 'nullable|integer|min:50|max:500',
            'tagline' => 'required|string',
            'tagline_max_length' => 'nullable|integer|min:20|max:100',
            'description' => 'required|string',
            'description_max_length' => 'nullable|integer|min:50|max:300',
            'image_url' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:10240',
            'social_links' => 'nullable|array',
            'social_links.linkedin' => 'nullable|url',
            'social_links.dribbble' => 'nullable|url',
            'social_links.behance' => 'nullable|url',
            'social_link_settings' => 'nullable|array',
            'social_link_settings.*.platform' => 'required|string',
            'social_link_settings.*.label' => 'required|string|max:50',
            'social_link_settings.*.is_active' => 'boolean',
            'font_settings' => 'nullable|array',
            'font_settings.subtitle_size' => 'nullable|string',
            'font_settings.tagline_size' => 'nullable|string',
            'font_settings.description_size' => 'nullable|string',
            'is_active' => 'boolean',
            'order' => 'nullable|integer',
        ]);

        // Validate character limits
        $subtitleMaxLength = $validated['subtitle_max_length'] ?? 200;
        $taglineMaxLength = $validated['tagline_max_length'] ?? 50;
        $descriptionMaxLength = $validated['description_max_length'] ?? 150;

        if (mb_strlen($validated['subtitle']) > $subtitleMaxLength) {
            return redirect()->back()->withErrors([
                'subtitle' => "Subtitle must not exceed {$subtitleMaxLength} characters."
            ])->withInput();
        }

        if (mb_strlen($validated['tagline']) > $taglineMaxLength) {
            return redirect()->back()->withErrors([
                'tagline' => "Tagline must not exceed {$taglineMaxLength} characters."
            ])->withInput();
        }

        if (mb_strlen($validated['description']) > $descriptionMaxLength) {
            return redirect()->back()->withErrors([
                'description' => "Description must not exceed {$descriptionMaxLength} characters."
            ])->withInput();
        }

        // Handle image upload
        if ($request->hasFile('image_url')) {
            $path = $request->file('image_url')->store('hero-sections', 'public');
            $validated['image_url'] = '/storage/' . $path;
        }

        HeroSection::create($validated);

        return redirect()->route('admin.hero-sections.index')
            ->with('success', 'Hero section created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $heroSection = HeroSection::findOrFail($id);
        
        return Inertia::render('dashboard/hero-sections/edit', [
            'heroSection' => $heroSection,
            'availablePlatforms' => HeroSection::getAvailablePlatforms(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validated = $request->validate([
            'title' => 'nullable|string|max:100',
            'subtitle' => 'required|string',
            'subtitle_max_length' => 'nullable|integer|min:50|max:500',
            'tagline' => 'required|string',
            'tagline_max_length' => 'nullable|integer|min:20|max:100',
            'description' => 'required|string',
            'description_max_length' => 'nullable|integer|min:50|max:300',
            'image_url' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:10240',
            'social_links' => 'nullable|array',
            'social_links.linkedin' => 'nullable|url',
            'social_links.dribbble' => 'nullable|url',
            'social_links.behance' => 'nullable|url',
            'social_link_settings' => 'nullable|array',
            'social_link_settings.*.platform' => 'required|string',
            'social_link_settings.*.label' => 'required|string|max:50',
            'social_link_settings.*.is_active' => 'boolean',
            'font_settings' => 'nullable|array',
            'font_settings.subtitle_size' => 'nullable|string',
            'font_settings.tagline_size' => 'nullable|string',
            'font_settings.description_size' => 'nullable|string',
            'is_active' => 'boolean',
            'order' => 'nullable|integer',
        ]);

        // Validate character limits
        $subtitleMaxLength = $validated['subtitle_max_length'] ?? 200;
        $taglineMaxLength = $validated['tagline_max_length'] ?? 50;
        $descriptionMaxLength = $validated['description_max_length'] ?? 150;

        if (mb_strlen($validated['subtitle']) > $subtitleMaxLength) {
            return redirect()->back()->withErrors([
                'subtitle' => "Subtitle must not exceed {$subtitleMaxLength} characters."
            ])->withInput();
        }

        if (mb_strlen($validated['tagline']) > $taglineMaxLength) {
            return redirect()->back()->withErrors([
                'tagline' => "Tagline must not exceed {$taglineMaxLength} characters."
            ])->withInput();
        }

        if (mb_strlen($validated['description']) > $descriptionMaxLength) {
            return redirect()->back()->withErrors([
                'description' => "Description must not exceed {$descriptionMaxLength} characters."
            ])->withInput();
        }

        $heroSection = HeroSection::findOrFail($id);

        // Handle image upload
        if ($request->hasFile('image_url')) {
            // Delete old image if exists
            if ($heroSection->image_url && Storage::disk('public')->exists(str_replace('/storage/', '', $heroSection->image_url))) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $heroSection->image_url));
            }
            $path = $request->file('image_url')->store('hero-sections', 'public');
            $validated['image_url'] = '/storage/' . $path;
        } else {
            unset($validated['image_url']);
        }

        // Clean up empty social links before saving
        if (isset($validated['social_links'])) {
            $validated['social_links'] = array_filter($validated['social_links'], function ($url) {
                return !empty($url) && trim($url) !== '';
            });
        }

        $heroSection->update($validated);

        return redirect()->route('admin.hero-sections.index')
            ->with('success', 'Hero section updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $heroSection = HeroSection::findOrFail($id);
        $heroSection->delete();

        return redirect()->route('admin.hero-sections.index')
            ->with('success', 'Hero section deleted successfully');
    }

    /**
     * Toggle a social link's active status
     */
    public function toggleSocialLink(Request $request, string $id)
    {
        try {
            $validated = $request->validate([
                'platform' => 'required|string|in:linkedin,dribbble,behance',
                'is_active' => 'required',
            ]);

            $heroSection = HeroSection::findOrFail($id);
            $settings = $heroSection->social_link_settings ?? [];
            
            // Ensure is_active is a proper boolean (handles true, false, "true", "false", 1, 0)
            $isActive = filter_var($validated['is_active'], FILTER_VALIDATE_BOOLEAN);
            
            // Find existing setting for this platform or create new one
            $found = false;
            foreach ($settings as $key => $setting) {
                if ($setting['platform'] === $validated['platform']) {
                    $settings[$key]['is_active'] = $isActive;
                    $found = true;
                    break;
                }
            }
            
            if (!$found) {
                $defaultLabel = HeroSection::DEFAULT_PLATFORMS[$validated['platform']]['label'] ?? ucfirst($validated['platform']);
                $settings[] = [
                    'platform' => $validated['platform'],
                    'label' => $defaultLabel,
                    'is_active' => $isActive,
                ];
            }
            
            $heroSection->social_link_settings = $settings;
            $heroSection->save();
            
            // Refresh to get updated data
            $heroSection->refresh();

            if ($request->wantsJson()) {
                return response()->json([
                    'success' => true,
                    'message' => 'Social link status updated',
                    'social_link_settings' => $heroSection->social_link_settings,
                ]);
            }

            return back()->with('success', 'Social link status updated');
        } catch (\Exception $e) {
            Log::error('Toggle social link failed', [
                'hero_section_id' => $id,
                'error' => $e->getMessage(),
            ]);
            
            if ($request->wantsJson()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Failed to update social link status',
                ], 500);
            }
            
            return back()->withErrors(['error' => 'Failed to update social link status']);
        }
    }

    /**
     * Update a social link's label
     */
    public function updateSocialLinkLabel(Request $request, string $id)
    {
        try {
            $validated = $request->validate([
                'platform' => 'required|string|in:linkedin,dribbble,behance',
                'label' => 'required|string|max:50',
            ]);

            $heroSection = HeroSection::findOrFail($id);
            $settings = $heroSection->social_link_settings ?? [];
            
            // Find existing setting for this platform or create new one
            $found = false;
            foreach ($settings as $key => $setting) {
                if ($setting['platform'] === $validated['platform']) {
                    $settings[$key]['label'] = $validated['label'];
                    $found = true;
                    break;
                }
            }
            
            if (!$found) {
                $settings[] = [
                    'platform' => $validated['platform'],
                    'label' => $validated['label'],
                    'is_active' => true,
                ];
            }
            
            $heroSection->social_link_settings = $settings;
            $heroSection->save();

            if ($request->wantsJson()) {
                return response()->json([
                    'success' => true,
                    'message' => 'Social link label updated',
                    'social_link_settings' => $settings,
                ]);
            }

            return back()->with('success', 'Social link label updated');
        } catch (\Illuminate\Validation\ValidationException $e) {
            if ($request->wantsJson()) {
                return response()->json([
                    'message' => 'Validation failed',
                    'errors' => $e->errors(),
                ], 422);
            }
            throw $e;
        } catch (\Exception $e) {
            Log::error('Update social link label failed', [
                'hero_section_id' => $id,
                'error' => $e->getMessage(),
            ]);
            
            if ($request->wantsJson()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Failed to update social link label',
                ], 500);
            }
            
            return back()->withErrors(['error' => 'Failed to update social link label']);
        }
    }
}
