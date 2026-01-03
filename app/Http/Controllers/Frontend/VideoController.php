<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Video;
use App\Models\PageContent;
use App\Models\VideosPageSetting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VideoController extends Controller
{
    public function index()
    {
        $settings = VideosPageSetting::first();
        
        // Always query from Video model with proper is_short filtering
        $regularVideos = Video::where('is_short', false)
            ->orderBy('order', 'asc')
            ->orderBy('created_at', 'desc')
            ->get();

        $shortVideos = Video::where('is_short', true)
            ->orderBy('order', 'asc')
            ->orderBy('created_at', 'desc')
            ->get();
            
        $pageContent = PageContent::getPageContent('videos');

        return Inertia::render('Videos/Page/Videos', [
            'videos' => $regularVideos,
            'shortVideos' => $shortVideos,
            'pageContent' => $pageContent,
            'settings' => $settings,
        ]);
    }
}
