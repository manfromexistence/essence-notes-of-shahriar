<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Video;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class VideoController extends Controller
{
    public function index()
    {
        $videos = Video::orderBy('publish_date', 'desc')->get();
        return Inertia::render('dashboard/videos/index', ['videos' => $videos]);
    }

    public function create()
    {
        return Inertia::render('dashboard/videos/create');
    }

    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'title' => 'required|string|max:255',
                'description' => 'nullable|string',
                'video_url' => 'required|string',
                'thumbnail' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:10240',
                'duration' => 'nullable|string',
                'publish_date' => 'nullable|date',
                'views' => 'nullable|integer',
                'is_short' => 'nullable|boolean',
                'category' => 'nullable|string',
                'platform' => 'nullable|string',
                'order' => 'nullable|integer',
            ]);

            // Set defaults
            $validated['views'] = $validated['views'] ?? 0;
            $validated['is_short'] = $validated['is_short'] ?? false;
            $validated['order'] = $validated['order'] ?? 0;
            $validated['publish_date'] = $validated['publish_date'] ?? now();

            // Handle thumbnail upload
            if ($request->hasFile('thumbnail')) {
                $file = $request->file('thumbnail');
                if ($file->isValid()) {
                    $thumbnailPath = $file->store('videos', 'public');
                    $validated['thumbnail'] = '/storage/' . $thumbnailPath;
                } else {
                    Log::error('Video store: Invalid thumbnail file', [
                        'error' => $file->getErrorMessage()
                    ]);
                }
            }

            Video::create($validated);
            return redirect()->route('admin.videos.index')->with('success', 'Video created successfully');
        } catch (\Exception $e) {
            Log::error('Video store failed', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            return back()->withErrors(['error' => 'Failed to create video: ' . $e->getMessage()]);
        }
    }

    public function show(string $id)
    {
        return redirect()->route('admin.videos.edit', $id);
    }

    public function edit(string $id)
    {
        $video = Video::findOrFail($id);
        return Inertia::render('dashboard/videos/edit', ['video' => $video]);
    }

    public function update(Request $request, string $id)
    {
        try {
            Log::info('Video update started', [
                'video_id' => $id,
                'request_method' => $request->method(),
                'has_thumbnail' => $request->hasFile('thumbnail'),
                'input_keys' => array_keys($request->all())
            ]);

            $validated = $request->validate([
                'title' => 'required|string|max:255',
                'description' => 'nullable|string',
                'video_url' => 'required|string',
                'thumbnail' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:10240',
                'duration' => 'nullable|string',
                'publish_date' => 'nullable|date',
                'views' => 'nullable|integer',
                'is_short' => 'nullable|boolean',
                'category' => 'nullable|string',
                'platform' => 'nullable|string',
                'order' => 'nullable|integer',
            ], [
                'thumbnail.image' => 'The thumbnail must be an image file.',
                'thumbnail.mimes' => 'The thumbnail must be a JPEG, PNG, JPG, GIF, or WebP file.',
                'thumbnail.max' => 'The thumbnail must not exceed 10MB.',
            ]);

            $video = Video::findOrFail($id);

            // Set defaults for boolean/integer fields
            $validated['views'] = $validated['views'] ?? $video->views ?? 0;
            $validated['is_short'] = $request->has('is_short') ? (bool)$request->input('is_short') : ($video->is_short ?? false);
            $validated['order'] = $validated['order'] ?? $video->order ?? 0;

            // Handle thumbnail upload if a new file is provided
            if ($request->hasFile('thumbnail')) {
                $file = $request->file('thumbnail');
                if ($file->isValid()) {
                    // Delete old thumbnail if exists
                    if ($video->thumbnail) {
                        $oldPath = public_path($video->thumbnail);
                        if (file_exists($oldPath)) {
                            unlink($oldPath);
                        }
                    }
                    
                    $thumbnailPath = $file->store('videos', 'public');
                    $validated['thumbnail'] = '/storage/' . $thumbnailPath;
                    Log::info('Video thumbnail uploaded', ['path' => $validated['thumbnail']]);
                } else {
                    Log::error('Video update: Invalid thumbnail file', [
                        'video_id' => $id,
                        'error' => $file->getErrorMessage()
                    ]);
                }
            }

            $video->update($validated);
            
            Log::info('Video updated successfully', ['video_id' => $id]);
            
            return redirect()->route('admin.videos.index')->with('success', 'Video updated successfully');
        } catch (\Illuminate\Validation\ValidationException $e) {
            Log::error('Video update validation failed', [
                'video_id' => $id,
                'errors' => $e->errors()
            ]);
            throw $e;
        } catch (\Exception $e) {
            Log::error('Video update failed', [
                'video_id' => $id,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            return back()->withErrors(['error' => 'Failed to update video: ' . $e->getMessage()]);
        }
    }

    public function destroy(string $id)
    {
        try {
            $video = Video::findOrFail($id);
            
            // Delete thumbnail if exists
            if ($video->thumbnail) {
                $thumbnailPath = public_path($video->thumbnail);
                if (file_exists($thumbnailPath)) {
                    unlink($thumbnailPath);
                }
            }
            
            $video->delete();
            return redirect()->route('admin.videos.index')->with('success', 'Video deleted successfully');
        } catch (\Exception $e) {
            Log::error('Video delete failed', [
                'video_id' => $id,
                'error' => $e->getMessage()
            ]);
            return back()->withErrors(['error' => 'Failed to delete video: ' . $e->getMessage()]);
        }
    }
}
