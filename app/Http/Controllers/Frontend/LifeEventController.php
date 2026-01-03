<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\LifeEvent;
use App\Models\LifeEventsPageSetting;
use App\Models\PageContent;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LifeEventController extends Controller
{
    public function index()
    {
        $lifeEvents = LifeEvent::orderBy('event_date', 'desc')->get();
        
        $categories = LifeEvent::select('category')
            ->distinct()
            ->whereNotNull('category')
            ->pluck('category');
            
        $pageContent = PageContent::getPageContent('life_events');
        
        $settings = LifeEventsPageSetting::first();

        return Inertia::render('LifeEvents/Page/LifeEvent', [
            'lifeEvents' => $lifeEvents,
            'categories' => $categories,
            'pageContent' => $pageContent,
            'settings' => $settings,
        ]);
    }
}
