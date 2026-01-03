<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Technology;
use App\Models\Certificate;
use App\Models\PageContent;
use App\Models\TechnologyPageSetting;
use App\Models\BlogPost;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TechnologyController extends Controller
{
    public function index()
    {
        $technologies = Technology::orderBy('order')->get();
        
        $certificates = Certificate::orderBy('issue_date', 'desc')->get();
        
        $cyberSecurity = Technology::where('category', 'cybersecurity')
            ->orderBy('order')
            ->get();
            
        $pageContent = PageContent::getPageContent('technology');
        
        $pageSettings = TechnologyPageSetting::first();
        
        // Get latest published blogs for the blogs section
        $blogs = BlogPost::where('is_published', true)
            ->orderBy('published_at', 'desc')
            ->limit(10)
            ->get();

        return Inertia::render('Technology/Page/Technology', [
            'technologies' => $technologies,
            'certificates' => $certificates,
            'cyberSecurity' => $cyberSecurity,
            'pageContent' => $pageContent,
            'pageSettings' => $pageSettings,
            'blogs' => $blogs,
        ]);
    }
}
