<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SocialMediaLink;
use App\Models\IndexPageSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class SocialMediaLinkController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $socialLinks = SocialMediaLink::ordered()->get();
        $availablePlatforms = SocialMediaLink::AVAILABLE_PLATFORMS;
        $indexPageSetting = IndexPageSetting::where('is_active', true)->first();
        $displayLimit = $indexPageSetting->social_media_display_limit ?? 3;

        return Inertia::render('dashboard/social-media-links/index', [
            'socialLinks' => $socialLinks,
            'availablePlatforms' => $availablePlatforms,
            'displayLimit' => $displayLimit,
            'indexPageSettingId' => $indexPageSetting->id ?? null,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'platform' => 'required|string|max:50',
                'label' => 'required|string|max:100',
                'url' => 'required|url',
                'icon' => 'nullable|string|max:100',
                'is_active' => 'boolean',
            ]);

            // Get the max order value and add 1
            $maxOrder = SocialMediaLink::max('order') ?? 0;
            $validated['order'] = $maxOrder + 1;

            // Use default icon if not provided
            if (empty($validated['icon']) && isset(SocialMediaLink::AVAILABLE_PLATFORMS[$validated['platform']])) {
                $validated['icon'] = SocialMediaLink::AVAILABLE_PLATFORMS[$validated['platform']]['icon'];
            }

            $socialLink = SocialMediaLink::create($validated);

            if ($request->wantsJson()) {
                return response()->json([
                    'success' => true,
                    'message' => 'Social media link created successfully',
                    'socialLink' => $socialLink,
                ]);
            }

            return redirect()->route('admin.social-media-links.index')
                ->with('success', 'Social media link created successfully');
        } catch (\Exception $e) {
            Log::error('Create social media link failed', [
                'error' => $e->getMessage(),
            ]);

            if ($request->wantsJson()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Failed to create social media link',
                ], 500);
            }

            return back()->withErrors(['error' => 'Failed to create social media link']);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        try {
            $socialLink = SocialMediaLink::findOrFail($id);

            $validated = $request->validate([
                'platform' => 'required|string|max:50',
                'label' => 'required|string|max:100',
                'url' => 'required|url',
                'icon' => 'nullable|string|max:100',
                'is_active' => 'boolean',
            ]);

            $socialLink->update($validated);

            if ($request->wantsJson()) {
                return response()->json([
                    'success' => true,
                    'message' => 'Social media link updated successfully',
                    'socialLink' => $socialLink,
                ]);
            }

            return redirect()->route('admin.social-media-links.index')
                ->with('success', 'Social media link updated successfully');
        } catch (\Exception $e) {
            Log::error('Update social media link failed', [
                'social_link_id' => $id,
                'error' => $e->getMessage(),
            ]);

            if ($request->wantsJson()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Failed to update social media link',
                ], 500);
            }

            return back()->withErrors(['error' => 'Failed to update social media link']);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $socialLink = SocialMediaLink::findOrFail($id);
            $socialLink->delete();

            if (request()->wantsJson()) {
                return response()->json([
                    'success' => true,
                    'message' => 'Social media link deleted successfully',
                ]);
            }

            return redirect()->route('admin.social-media-links.index')
                ->with('success', 'Social media link deleted successfully');
        } catch (\Exception $e) {
            Log::error('Delete social media link failed', [
                'social_link_id' => $id,
                'error' => $e->getMessage(),
            ]);

            if (request()->wantsJson()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Failed to delete social media link',
                ], 500);
            }

            return back()->withErrors(['error' => 'Failed to delete social media link']);
        }
    }

    /**
     * Reorder social media links
     */
    public function reorder(Request $request)
    {
        try {
            $validated = $request->validate([
                'orders' => 'required|array',
                'orders.*.id' => 'required|exists:social_media_links,id',
                'orders.*.order' => 'required|integer|min:0',
            ]);

            foreach ($validated['orders'] as $item) {
                SocialMediaLink::where('id', $item['id'])
                    ->update(['order' => $item['order']]);
            }

            return response()->json([
                'success' => true,
                'message' => 'Social media links reordered successfully',
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            Log::error('Reorder validation failed', [
                'errors' => $e->errors(),
                'request' => $request->all(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Validation failed: ' . json_encode($e->errors()),
                'errors' => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            Log::error('Reorder social media links failed', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
                'request' => $request->all(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to reorder social media links: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Toggle active status
     */
    public function toggleActive(Request $request, string $id)
    {
        try {
            $socialLink = SocialMediaLink::findOrFail($id);
            
            $validated = $request->validate([
                'is_active' => 'required|boolean',
            ]);

            $socialLink->update(['is_active' => $validated['is_active']]);

            if ($request->wantsJson()) {
                return response()->json([
                    'success' => true,
                    'message' => 'Social media link status updated successfully',
                    'socialLink' => $socialLink,
                ]);
            }

            return back()->with('success', 'Social media link status updated successfully');
        } catch (\Exception $e) {
            Log::error('Toggle social media link status failed', [
                'social_link_id' => $id,
                'error' => $e->getMessage(),
            ]);

            if ($request->wantsJson()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Failed to update status',
                ], 500);
            }

            return back()->withErrors(['error' => 'Failed to update status']);
        }
    }

    /**
     * Update display limit
     */
    public function updateDisplayLimit(Request $request)
    {
        try {
            $validated = $request->validate([
                'display_limit' => 'required|integer|min:1|max:10',
                'index_page_setting_id' => 'required|exists:index_page_settings,id',
            ]);

            $indexPageSetting = IndexPageSetting::findOrFail($validated['index_page_setting_id']);
            $indexPageSetting->update([
                'social_media_display_limit' => $validated['display_limit']
            ]);

            if ($request->wantsJson()) {
                return response()->json([
                    'success' => true,
                    'message' => 'Display limit updated successfully',
                    'displayLimit' => $validated['display_limit'],
                ]);
            }

            return back()->with('success', 'Display limit updated successfully');
        } catch (\Exception $e) {
            Log::error('Update display limit failed', [
                'error' => $e->getMessage(),
            ]);

            if ($request->wantsJson()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Failed to update display limit',
                ], 500);
            }

            return back()->withErrors(['error' => 'Failed to update display limit']);
        }
    }
}
