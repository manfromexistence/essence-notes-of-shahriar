<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\EntrepreneurshipContent;
use App\Models\EntrepreneurshipPageSetting;
use App\Models\PageContent;
use App\Models\BlogPost;
use App\Models\Event;
use Inertia\Inertia;

class EntrepreneurshipController extends Controller
{
    public function index()
    {
        $blogs = BlogPost::where('is_published', true)
            ->orderBy('published_at', 'desc')
            ->get();

        // Get real events from Events table instead of EntrepreneurshipContent
        $events = Event::orderBy('event_date', 'desc')
            ->take(10)
            ->get()
            ->map(function ($event) {
                return [
                    'id' => $event->id,
                    'title' => $event->title,
                    'description' => $event->description,
                    'featured_image' => $event->image,
                    'event_date' => $event->event_date,
                    'event_time' => $event->event_time,
                    'location' => $event->location,
                    'category' => $event->category,
                    'organizer' => $event->organizer,
                    'is_featured' => $event->is_featured,
                    'is_past' => $event->is_past,
                ];
            });
            
        $pageContent = PageContent::getPageContent('entrepreneurship');
        $settings = EntrepreneurshipPageSetting::first();

        return Inertia::render('Entepreneourship/Page/Entepreneouship', [
            'blogs' => $blogs,
            'quotes' => $settings->quotes ?? [],
            'events' => $events,
            'innovations' => $settings->innovations ?? [],
            'pageContent' => $pageContent,
            'settings' => $settings,
        ]);
    }
}
