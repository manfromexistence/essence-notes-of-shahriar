<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Http\Controllers\Frontend\HomeController;
use App\Http\Controllers\Frontend\AboutController;
use App\Http\Controllers\Frontend\BlogController;
use App\Http\Controllers\Frontend\BookController;
use App\Http\Controllers\Frontend\EventController;
use App\Http\Controllers\Frontend\VideoController;
use App\Http\Controllers\Frontend\TechnologyController;
use App\Http\Controllers\Frontend\DonationController;
use App\Http\Controllers\Frontend\LifeEventController;
use App\Http\Controllers\Frontend\EntrepreneurshipController;
use App\Http\Controllers\Frontend\ContactController;
use App\Http\Controllers\Admin\BlogPostController;
use App\Http\Controllers\Admin\BookController as AdminBookController;
use App\Http\Controllers\Admin\EventController as AdminEventController;
use App\Http\Controllers\Admin\VideoController as AdminVideoController;
use App\Http\Controllers\Admin\TechnologyController as AdminTechnologyController;
use App\Http\Controllers\Admin\DonationController as AdminDonationController;
use App\Http\Controllers\Admin\LifeEventController as AdminLifeEventController;
use App\Http\Controllers\Admin\HeroSectionController;
use App\Http\Controllers\Admin\StatisticController;
use App\Http\Controllers\Admin\AboutSectionController;
use App\Http\Controllers\Admin\AwardController;
use App\Http\Controllers\Admin\CertificateController;
use App\Http\Controllers\Admin\EntrepreneurshipContentController;
use App\Http\Controllers\Admin\IndexPageController;
use App\Http\Controllers\Admin\ContactController as AdminContactController;
use App\Http\Controllers\Admin\ContactPageSettingController;
use App\Http\Controllers\Api\ActivityController;

// Frontend Routes
Route::get('/', [HomeController::class, 'index'])->name('index');
Route::get('/home', [HomeController::class, 'home'])->name('home');
Route::get('/about-me', [AboutController::class, 'index'])->name('about-me');

// About Me page aliases - redirect common URL patterns to primary route
Route::get('/aboutme', fn() => redirect()->route('about-me'));
Route::get('/about', fn() => redirect()->route('about-me'));
Route::get('/blogs', [BlogController::class, 'index'])->name('blogs');
Route::get('/blogs/{slug}', [BlogController::class, 'show'])->name('blogs.show');
Route::get('/books', [BookController::class, 'index'])->name('books');
Route::get('/contact', [ContactController::class, 'index'])->name('contact');
Route::post('/contact', [ContactController::class, 'submit'])->name('contact.submit');
Route::get('/donate-details/{id}', [DonationController::class, 'show'])->name('donate-details');
Route::post('/donate-details/{id}/submit', [DonationController::class, 'storeDonationInterest'])->name('donate-details.submit');
Route::get('/donations', [DonationController::class, 'index'])->name('donations');
Route::get('/entrepreneurship', [EntrepreneurshipController::class, 'index'])->name('entrepreneurship');
Route::get('/events', [EventController::class, 'index'])->name('events');
Route::get('/life-events', [LifeEventController::class, 'index'])->name('life-events');
Route::get('/technology', [TechnologyController::class, 'index'])->name('technology');
Route::get('/videos', [VideoController::class, 'index'])->name('videos');

// API Routes for Chart Data
Route::prefix('api')->name('api.')->group(function () {
    Route::get('/activity/recent', [ActivityController::class, 'getRecentActivity'])->name('activity.recent');
    Route::get('/activity/visitors', [ActivityController::class, 'getVisitorStats'])->name('activity.visitors');
    Route::get('/activity/content-stats', [ActivityController::class, 'getContentStats'])->name('activity.content-stats');
    Route::get('/menu', [\App\Http\Controllers\Api\MenuController::class, 'index'])->name('menu');
});

// Admin Dashboard Routes
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [\App\Http\Controllers\Dashboard\DashboardController::class, 'index'])->name('dashboard');

    // Profile Routes
    Route::get('/profile', [\App\Http\Controllers\Dashboard\ProfileController::class, 'index'])->name('profile');
    Route::post('/profile/update', [\App\Http\Controllers\Dashboard\ProfileController::class, 'update'])->name('dashboard.profile.update');
    Route::post('/profile/update-theme', [\App\Http\Controllers\Dashboard\ProfileController::class, 'updateTheme'])->name('profile.update-theme');

    // Admin Resource Routes
    Route::prefix('admin')->name('admin.')->group(function () {
        // About Sections - Custom Section Routes (MUST come before resource route)
        Route::get('about-sections/banner', [\App\Http\Controllers\Admin\AboutMePageSettingController::class, 'banner'])->name('about-sections.banner');
        Route::get('about-sections/report', [\App\Http\Controllers\Admin\AboutMePageSettingController::class, 'report'])->name('about-sections.report');
        Route::get('about-sections/awards', [\App\Http\Controllers\Admin\AboutMePageSettingController::class, 'awards'])->name('about-sections.awards');
        Route::get('about-sections/story', [\App\Http\Controllers\Admin\AboutMePageSettingController::class, 'story'])->name('about-sections.story');
        Route::get('about-sections/impact', [\App\Http\Controllers\Admin\AboutMePageSettingController::class, 'impact'])->name('about-sections.impact');
        Route::get('about-sections/travel', [\App\Http\Controllers\Admin\AboutMePageSettingController::class, 'travel'])->name('about-sections.travel');
        Route::get('about-sections/corporate', [\App\Http\Controllers\Admin\AboutMePageSettingController::class, 'corporate'])->name('about-sections.corporate');
        Route::get('about-sections/associates', [\App\Http\Controllers\Admin\AboutMePageSettingController::class, 'associates'])->name('about-sections.associates');
        
        // About Me Page Settings - Update Routes
        Route::post('about-me-page-settings/update-banner', [\App\Http\Controllers\Admin\AboutMePageSettingController::class, 'updateBanner'])->name('about-me-page-settings.update-banner');
        Route::post('about-me-page-settings/update-report', [\App\Http\Controllers\Admin\AboutMePageSettingController::class, 'updateReport'])->name('about-me-page-settings.update-report');
        Route::post('about-me-page-settings/update-corporate', [\App\Http\Controllers\Admin\AboutMePageSettingController::class, 'updateCorporate'])->name('about-me-page-settings.update-corporate');
        Route::post('about-me-page-settings/update-associates', [\App\Http\Controllers\Admin\AboutMePageSettingController::class, 'updateAssociates'])->name('about-me-page-settings.update-associates');
        
        // Resource Routes
        Route::resource('blogs', BlogPostController::class);
        Route::resource('books', AdminBookController::class);
        Route::resource('events', AdminEventController::class);
        Route::resource('videos', AdminVideoController::class);
        Route::resource('technologies', AdminTechnologyController::class);
        Route::resource('donations', AdminDonationController::class);
        
        // Donation Records Management
        Route::get('donation-records', [\App\Http\Controllers\Admin\DonationRecordController::class, 'index'])->name('donation-records.index');
        Route::post('donation-records/{donationRecord}/status', [\App\Http\Controllers\Admin\DonationRecordController::class, 'updateStatus'])->name('donation-records.update-status');
        Route::delete('donation-records/{donationRecord}', [\App\Http\Controllers\Admin\DonationRecordController::class, 'destroy'])->name('donation-records.destroy');
        
        Route::resource('life-events', AdminLifeEventController::class);
        Route::resource('hero-sections', HeroSectionController::class);
        Route::post('hero-sections/{id}/toggle-social-link', [HeroSectionController::class, 'toggleSocialLink'])->name('hero-sections.toggle-social-link');
        Route::post('hero-sections/{id}/update-social-link-label', [HeroSectionController::class, 'updateSocialLinkLabel'])->name('hero-sections.update-social-link-label');
        Route::resource('statistics', StatisticController::class);
        
        // Social Media Links Management
        Route::post('social-media-links/reorder', [\App\Http\Controllers\Admin\SocialMediaLinkController::class, 'reorder'])->name('social-media-links.reorder');
        Route::post('social-media-links/{id}/toggle-active', [\App\Http\Controllers\Admin\SocialMediaLinkController::class, 'toggleActive'])->name('social-media-links.toggle-active');
        Route::post('social-media-links/update-display-limit', [\App\Http\Controllers\Admin\SocialMediaLinkController::class, 'updateDisplayLimit'])->name('social-media-links.update-display-limit');
        Route::resource('social-media-links', \App\Http\Controllers\Admin\SocialMediaLinkController::class)->except(['show', 'create', 'edit']);
        
        Route::resource('about-sections', AboutSectionController::class);
        Route::resource('awards', AwardController::class);
        Route::resource('certificates', CertificateController::class);
        Route::resource('entrepreneurship-content', EntrepreneurshipContentController::class);
        Route::resource('contacts', AdminContactController::class)->only(['index', 'show', 'update', 'destroy']);
        
        // New content management routes
        Route::resource('page-contents', \App\Http\Controllers\Admin\PageContentController::class);
        Route::resource('corporate-journey', \App\Http\Controllers\Admin\CorporateJourneyController::class);
        Route::resource('associates', \App\Http\Controllers\Admin\AssociateController::class);
        Route::resource('featured-blog-banners', \App\Http\Controllers\Admin\FeaturedBlogBannerController::class);
        Route::resource('book-banner-slides', \App\Http\Controllers\Admin\BookBannerSlideController::class);
        Route::post('book-banner-slides/reorder', [\App\Http\Controllers\Admin\BookBannerSlideController::class, 'reorder'])->name('book-banner-slides.reorder');
        
        // Menu Items Management
        Route::resource('menu-items', \App\Http\Controllers\Admin\MenuItemController::class);
        Route::post('menu-items/{menuItem}/toggle-status', [\App\Http\Controllers\Admin\MenuItemController::class, 'toggleStatus'])->name('menu-items.toggle-status');
        Route::post('menu-items/reorder', [\App\Http\Controllers\Admin\MenuItemController::class, 'reorder'])->name('menu-items.reorder');
        
        // Travel Countries Management
        Route::resource('travel-countries', \App\Http\Controllers\Admin\TravelCountryController::class);
        Route::post('travel-countries/reorder', [\App\Http\Controllers\Admin\TravelCountryController::class, 'reorder'])->name('travel-countries.reorder');
        
        // Impact Items Management
        Route::resource('impact-items', \App\Http\Controllers\Admin\ImpactItemController::class);
        Route::post('impact-items/reorder', [\App\Http\Controllers\Admin\ImpactItemController::class, 'reorder'])->name('impact-items.reorder');
        
        // About Me Page Settings - Travel & Impact Update Routes
        Route::post('about-me-page-settings/update-travel', [\App\Http\Controllers\Admin\AboutMePageSettingController::class, 'updateTravel'])->name('about-me-page-settings.update-travel');
        Route::post('about-me-page-settings/update-impact', [\App\Http\Controllers\Admin\AboutMePageSettingController::class, 'updateImpact'])->name('about-me-page-settings.update-impact');
        
        // Contact Page Settings
        Route::get('contact-page-settings', [ContactPageSettingController::class, 'index'])->name('contact-page-settings.index');
        Route::post('contact-page-settings/update', [ContactPageSettingController::class, 'update'])->name('contact-page-settings.update');
        
        // Index Page Management
        Route::get('index-page', [IndexPageController::class, 'index'])->name('index-page.index');
        Route::post('index-page/update', [IndexPageController::class, 'update'])->name('index-page.update');
        Route::post('index-page/logos', [IndexPageController::class, 'storeLogo'])->name('index-page.logos.store');
        Route::post('index-page/logos/{logo}/update', [IndexPageController::class, 'updateLogo'])->name('index-page.logos.update-post');
        Route::put('index-page/logos/{logo}', [IndexPageController::class, 'updateLogo'])->name('index-page.logos.update');
        Route::delete('index-page/logos/{logo}', [IndexPageController::class, 'deleteLogo'])->name('index-page.logos.delete');
        Route::post('index-page/logos/reorder', [IndexPageController::class, 'reorderLogos'])->name('index-page.logos.reorder');
        
        // Videos Page Settings - Redirect legacy route to general
        Route::get('videos-page-settings', fn() => redirect()->route('admin.videos-page-settings.general'))->name('videos-page-settings.index');
        
        // Videos Page Settings - Section Routes
        Route::get('videos-page-settings/general', [\App\Http\Controllers\Admin\VideosPageSettingController::class, 'general'])->name('videos-page-settings.general');
        Route::get('videos-page-settings/banner', [\App\Http\Controllers\Admin\VideosPageSettingController::class, 'banner'])->name('videos-page-settings.banner');
        Route::get('videos-page-settings/content', [\App\Http\Controllers\Admin\VideosPageSettingController::class, 'content'])->name('videos-page-settings.content');
        Route::post('videos-page-settings/update', [\App\Http\Controllers\Admin\VideosPageSettingController::class, 'update'])->name('videos-page-settings.update');
        
        // Books Page Settings - Redirect legacy route to general
        Route::get('books-page-settings', fn() => redirect()->route('admin.books-page-settings.general'));
        
        // Books Page Settings - Section Routes
        Route::get('books-page-settings/general', [\App\Http\Controllers\Admin\BooksPageSettingController::class, 'general'])->name('books-page-settings.general');
        Route::get('books-page-settings/banner', [\App\Http\Controllers\Admin\BooksPageSettingController::class, 'banner'])->name('books-page-settings.banner');
        Route::get('books-page-settings/content', [\App\Http\Controllers\Admin\BooksPageSettingController::class, 'content'])->name('books-page-settings.content');
        Route::get('books-page-settings/sections', [\App\Http\Controllers\Admin\BooksPageSettingController::class, 'sections'])->name('books-page-settings.sections');
        Route::post('books-page-settings/update', [\App\Http\Controllers\Admin\BooksPageSettingController::class, 'update'])->name('books-page-settings.update');
        
        // Entrepreneurship Page Settings
        Route::get('entrepreneurship-page-settings', [\App\Http\Controllers\Admin\EntrepreneurshipPageSettingController::class, 'index'])->name('entrepreneurship-page-settings.index');
        Route::post('entrepreneurship-page-settings/update', [\App\Http\Controllers\Admin\EntrepreneurshipPageSettingController::class, 'update'])->name('entrepreneurship-page-settings.update');
        
        // Life Events Page Settings - Redirect legacy route to general
        Route::get('life-events-page-settings', fn() => redirect()->route('admin.life-events-page-settings.general'));
        
        // Life Events Page Settings - Section Routes
        Route::get('life-events-page-settings/general', [\App\Http\Controllers\Admin\LifeEventsPageSettingController::class, 'general'])->name('life-events-page-settings.general');
        Route::get('life-events-page-settings/banner', [\App\Http\Controllers\Admin\LifeEventsPageSettingController::class, 'banner'])->name('life-events-page-settings.banner');
        Route::get('life-events-page-settings/timeline', [\App\Http\Controllers\Admin\LifeEventsPageSettingController::class, 'timeline'])->name('life-events-page-settings.timeline');
        Route::post('life-events-page-settings/update', [\App\Http\Controllers\Admin\LifeEventsPageSettingController::class, 'update'])->name('life-events-page-settings.update');
        
        // Blogs Page Settings - Redirect legacy route to general
        Route::get('blogs-page-settings', fn() => redirect()->route('admin.blogs-page-settings.general'));
        
        // Blogs Page Settings - Section Routes
        Route::get('blogs-page-settings/general', [\App\Http\Controllers\Admin\BlogsPageSettingController::class, 'general'])->name('blogs-page-settings.general');
        Route::get('blogs-page-settings/banner', [\App\Http\Controllers\Admin\BlogsPageSettingController::class, 'banner'])->name('blogs-page-settings.banner');
        Route::get('blogs-page-settings/sections', [\App\Http\Controllers\Admin\BlogsPageSettingController::class, 'sections'])->name('blogs-page-settings.sections');
        Route::post('blogs-page-settings/update', [\App\Http\Controllers\Admin\BlogsPageSettingController::class, 'update'])->name('blogs-page-settings.update');
        
        // Technology Page Settings
        Route::get('technology-page-settings', [\App\Http\Controllers\Admin\TechnologyPageSettingController::class, 'index'])->name('technology-page-settings.index');
        Route::post('technology-page-settings/update', [\App\Http\Controllers\Admin\TechnologyPageSettingController::class, 'update'])->name('technology-page-settings.update');
        
        // Donation Page Settings - Redirect legacy route to general
        Route::get('donation-page-settings', fn() => redirect()->route('admin.donation-page-settings.general'));
        
        // Donation Page Settings - Section Routes
        Route::get('donation-page-settings/general', [\App\Http\Controllers\Admin\DonationPageSettingController::class, 'general'])->name('donation-page-settings.general');
        Route::get('donation-page-settings/banner', [\App\Http\Controllers\Admin\DonationPageSettingController::class, 'banner'])->name('donation-page-settings.banner');
        Route::post('donation-page-settings/update', [\App\Http\Controllers\Admin\DonationPageSettingController::class, 'update'])->name('donation-page-settings.update');
        
        // Events Page Settings
        Route::get('events-page-settings', [\App\Http\Controllers\Admin\EventsPageSettingController::class, 'index'])->name('events-page-settings.index');
        Route::post('events-page-settings/update', [\App\Http\Controllers\Admin\EventsPageSettingController::class, 'update'])->name('events-page-settings.update');
    });
});

require __DIR__.'/settings.php';
