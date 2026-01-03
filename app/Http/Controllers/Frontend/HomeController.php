<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\HeroSection;
use App\Models\Statistic;
use App\Models\IndexPageSetting;
use App\Models\SocialMediaLink;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        $indexPage = IndexPageSetting::with('activeLogos')->where('is_active', true)->first();
        
        // Return the Index page (landing page with SHAHRIAR text)
        return Inertia::render('Index', [
            'indexPage' => $indexPage,
        ]);
    }
    
    public function home()
    {
        $hero = HeroSection::where('is_active', true)
            ->orderBy('order')
            ->first();
            
        $statistics = Statistic::where('is_active', true)
            ->orderBy('order')
            ->get();

        // Get display limit from index page settings (default to 3)
        $indexPage = IndexPageSetting::where('is_active', true)->first();
        $displayLimit = $indexPage->social_media_display_limit ?? 3;

        // Get social media links - only first X active links based on settings
        $socialMediaLinks = SocialMediaLink::active()
            ->ordered()
            ->take($displayLimit)
            ->get();

        // Add active social links to hero data
        $heroData = $hero ? $hero->toArray() : null;
        if ($heroData && $hero) {
            $heroData['active_social_links'] = $hero->active_social_links;
        }

        return Inertia::render('Home/Page/Home', [
            'hero' => $heroData,
            'statistics' => $statistics,
            'socialMediaLinks' => $socialMediaLinks,
            'displayLimit' => $displayLimit,
        ]);
    }
}
