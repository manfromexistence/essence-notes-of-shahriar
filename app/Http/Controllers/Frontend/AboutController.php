<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\AboutSection;
use App\Models\Award;
use App\Models\AboutMePageSetting;
use App\Models\CorporateJourneyItem;
use App\Models\Associate;
use App\Models\TravelCountry;
use App\Models\ImpactItem;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AboutController extends Controller
{
    public function index()
    {
        $sections = AboutSection::where('is_active', true)
            ->orderBy('order')
            ->get()
            ->groupBy('section_type');

        $awards = Award::orderBy('order')->get();
        
        // Get AboutMePageSetting with all JSON fields
        $pageSettings = AboutMePageSetting::first();
        
        // Transform to match the component structure
        $pageContent = [
            'banner' => $pageSettings->banner ?? [],
            'report' => $pageSettings->report ?? [],
            'awards' => $pageSettings->awards ?? [],
            'story' => $pageSettings->story ?? [],
            'impact' => $pageSettings->impact ?? [],
            'travel' => $pageSettings->travel ?? [],
            'corporate_journey' => $pageSettings->corporate_journey ?? [],
            'associates' => $pageSettings->associates ?? [],
        ];
        
        $corporateJourney = CorporateJourneyItem::where('is_active', true)
            ->orderBy('order')
            ->get();
            
        $associates = Associate::where('is_active', true)
            ->orderBy('order')
            ->get();
            
        // Get travel countries
        $travelCountries = TravelCountry::where('is_active', true)
            ->orderBy('order')
            ->get();
            
        // Get impact items
        $impactItems = ImpactItem::where('is_active', true)
            ->orderBy('order')
            ->get();

        return Inertia::render('AboutMe/Page/AboutMe', [
            'sections' => $sections,
            'awards' => $awards,
            'pageContent' => $pageContent,
            'corporateJourney' => $corporateJourney,
            'associates' => $associates,
            'travelCountries' => $travelCountries,
            'impactItems' => $impactItems,
        ]);
    }
}
