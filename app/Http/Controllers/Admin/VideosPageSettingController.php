<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\VideosPageSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class VideosPageSettingController extends Controller
{
    public function index()
    {
        return redirect()->route('admin.videos-page-settings.general');
    }

    public function general()
    {
        $settings = VideosPageSetting::first();
        if (!$settings) {
            $settings = VideosPageSetting::create(['page_title' => 'Videos']);
        }
        return Inertia::render('dashboard/videos-page-settings/general', ['settings' => $settings]);
    }

    public function banner()
    {
        $settings = VideosPageSetting::first();
        if (!$settings) {
            $settings = VideosPageSetting::create(['page_title' => 'Videos']);
        }
        return Inertia::render('dashboard/videos-page-settings/banner', ['settings' => $settings]);
    }

    public function content()
    {
        $settings = VideosPageSetting::first();
        if (!$settings) {
            $settings = VideosPageSetting::create(['page_title' => 'Videos']);
        }
        return Inertia::render('dashboard/videos-page-settings/content', ['settings' => $settings]);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'page_title' => 'nullable|string|max:255',
            'banner_title' => 'nullable|string|max:255',
            'banner_subtitle' => 'nullable|string|max:1000',
            'banner_description' => 'nullable|string|max:2000',
            'banner_image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:5120',
            'all_videos_title' => 'nullable|string|max:255',
            'all_videos_description' => 'nullable|string|max:2000',
            'short_videos_title' => 'nullable|string|max:255',
            'short_videos_description' => 'nullable|string|max:2000',
            'banner_videos' => 'nullable|array',
            'banner_videos.*.title' => 'nullable|string|max:255',
            'banner_videos.*.thumbnail' => 'nullable|string|max:500',
            'banner_videos.*.video_url' => 'nullable', // Can be string (URL) or file
            'banner_videos.*.video_file' => 'nullable|file|mimes:mp4,mov,ogg,qt|max:51200', // 50MB max
            'all_videos' => 'nullable|array',
            'all_videos.*.title' => 'nullable|string|max:255',
            'all_videos.*.thumbnail' => 'nullable|string|max:500',
            'all_videos.*.video_url' => 'nullable',
            'all_videos.*.video_file' => 'nullable|file|mimes:mp4,mov,ogg,qt|max:51200',
            'short_videos' => 'nullable|array',
            'short_videos.*.title' => 'nullable|string|max:255',
            'short_videos.*.thumbnail' => 'nullable|string|max:500',
            'short_videos.*.video_url' => 'nullable',
            'short_videos.*.video_file' => 'nullable|file|mimes:mp4,mov,ogg,qt|max:51200',
        ]);

        $settings = VideosPageSetting::first() ?? new VideosPageSetting();

        // Handle banner_image upload
        if ($request->hasFile('banner_image')) {
            if ($settings->banner_image && !str_starts_with($settings->banner_image, '/assets/') && 
                Storage::disk('public')->exists(str_replace('/storage/', '', $settings->banner_image))) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $settings->banner_image));
            }
            $path = $request->file('banner_image')->store('videos-page', 'public');
            $validated['banner_image'] = '/storage/' . $path;
        } else {
            unset($validated['banner_image']);
        }

        // Helper function to handle video array uploads
        $handleVideoUploads = function ($field, $currentSettings) use ($request, $validated) {
            $videos = $validated[$field] ?? [];
            $processedVideos = [];

            if (empty($videos)) {
                return [];
            }

            foreach ($videos as $index => $video) {
                $processedVideo = $video;
                
                // Handle video file upload
                if ($request->hasFile("{$field}.{$index}.video_file")) {
                    $path = $request->file("{$field}.{$index}.video_file")->store('videos', 'public');
                    $processedVideo['video_url'] = '/storage/' . $path;
                    unset($processedVideo['video_file']); // Remove file object from data to be saved
                } elseif (isset($video['video_url']) && $video['video_url']) {
                    // Keep existing URL
                    $processedVideo['video_url'] = $video['video_url'];
                }

                $processedVideos[] = $processedVideo;
            }
            
            return $processedVideos;
        };

        $validated['banner_videos'] = $handleVideoUploads('banner_videos', $settings);
        $validated['all_videos'] = $handleVideoUploads('all_videos', $settings);
        $validated['short_videos'] = $handleVideoUploads('short_videos', $settings);

        $settings->fill($validated);
        $settings->save();

        return redirect()->back()->with('success', 'Videos page settings updated successfully!');
    }
}
