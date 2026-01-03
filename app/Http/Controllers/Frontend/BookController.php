<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Book;
use App\Models\BooksPageSetting;
use App\Models\PageContent;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BookController extends Controller
{
    public function index()
    {
        $books = Book::where('is_recommended', true)
            ->orderBy('order')
            ->get();

        $allBooks = Book::orderBy('order')->get();
        
        $pageContent = PageContent::getPageContent('books');
        
        $settings = BooksPageSetting::first();
        
        // Get active carousel slides ordered by order column
        $carouselSlides = \App\Models\BookBannerSlide::active()->get();

        return Inertia::render('Books/Page/Books', [
            'recommendedBooks' => $books,
            'allBooks' => $allBooks,
            'pageContent' => $pageContent,
            'settings' => $settings,
            'carouselSlides' => $carouselSlides,
        ]);
    }
}
