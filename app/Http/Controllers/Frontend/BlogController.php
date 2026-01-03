<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\BlogPost;
use App\Models\PageContent;
use App\Models\FeaturedBlogBanner;
use App\Models\BlogsPageSetting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BlogController extends Controller
{
    public function index()
    {
        $blogs = BlogPost::where('is_published', true)
            ->orderBy('published_at', 'desc')
            ->get();
            
        $pageContent = PageContent::getPageContent('blogs');
        
        $featuredBanners = FeaturedBlogBanner::with('blog')->where('is_active', true)
            ->orderBy('order')
            ->get();

        $pageSettings = BlogsPageSetting::first();

        return Inertia::render('Blogs/Page/Blogs', [
            'blogs' => $blogs,
            'pageContent' => $pageContent,
            'featuredBanners' => $featuredBanners,
            'pageSettings' => $pageSettings,
        ]);
    }

    public function show($slug)
    {
        $blog = BlogPost::where('slug', $slug)
            ->where('is_published', true)
            ->firstOrFail();

        // Increment views
        $blog->increment('views');

        // Get similar blogs (same category, excluding current blog)
        $similarBlogs = BlogPost::where('is_published', true)
            ->where('id', '!=', $blog->id)
            ->where('category', $blog->category)
            ->limit(3)
            ->get();

        // If not enough similar blogs by category, get other recent blogs
        if ($similarBlogs->count() < 3) {
            $additionalBlogs = BlogPost::where('is_published', true)
                ->where('id', '!=', $blog->id)
                ->where('category', '!=', $blog->category)
                ->orderBy('published_at', 'desc')
                ->limit(3 - $similarBlogs->count())
                ->get();
            
            $similarBlogs = $similarBlogs->merge($additionalBlogs);
        }

        $pageSettings = BlogsPageSetting::first();

        return Inertia::render('Blogs/Page/BlogDetail', [
            'blog' => $blog,
            'similarBlogs' => $similarBlogs,
            'pageSettings' => $pageSettings,
        ]);
    }
}
