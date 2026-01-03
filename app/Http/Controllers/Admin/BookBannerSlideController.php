<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\BookBannerSlide;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class BookBannerSlideController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $slides = BookBannerSlide::orderBy('order')->get();
        
        return Inertia::render('dashboard/book-banner-slides/index', [
            'slides' => $slides
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('dashboard/book-banner-slides/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string|max:2000',
            'book_image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp,svg|max:5120',
            'price_text' => 'nullable|string|max:100',
            'button_text' => 'nullable|string|max:100',
            'is_active' => 'boolean',
        ]);

        // Get the next order value
        $maxOrder = BookBannerSlide::max('order') ?? 0;
        $validated['order'] = $maxOrder + 1;

        // Handle image upload
        if ($request->hasFile('book_image')) {
            $path = $request->file('book_image')->store('book-banner-slides', 'public');
            $validated['book_image'] = '/storage/' . $path;
        }

        BookBannerSlide::create($validated);

        return redirect()->route('admin.book-banner-slides.index')
            ->with('success', 'Banner slide created successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(BookBannerSlide $bookBannerSlide)
    {
        return redirect()->route('admin.book-banner-slides.edit', $bookBannerSlide);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(BookBannerSlide $bookBannerSlide)
    {
        return Inertia::render('dashboard/book-banner-slides/edit', [
            'slide' => $bookBannerSlide
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, BookBannerSlide $bookBannerSlide)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string|max:2000',
            'book_image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp,svg|max:5120',
            'price_text' => 'nullable|string|max:100',
            'button_text' => 'nullable|string|max:100',
            'is_active' => 'boolean',
        ]);

        // Handle image upload
        if ($request->hasFile('book_image')) {
            // Delete old image
            if ($bookBannerSlide->book_image && !str_starts_with($bookBannerSlide->book_image, '/assets/') &&
                Storage::disk('public')->exists(str_replace('/storage/', '', $bookBannerSlide->book_image))) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $bookBannerSlide->book_image));
            }
            
            $path = $request->file('book_image')->store('book-banner-slides', 'public');
            $validated['book_image'] = '/storage/' . $path;
        } else {
            unset($validated['book_image']);
        }

        $bookBannerSlide->update($validated);

        return redirect()->route('admin.book-banner-slides.index')
            ->with('success', 'Banner slide updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(BookBannerSlide $bookBannerSlide)
    {
        // Delete image if exists
        if ($bookBannerSlide->book_image && !str_starts_with($bookBannerSlide->book_image, '/assets/') &&
            Storage::disk('public')->exists(str_replace('/storage/', '', $bookBannerSlide->book_image))) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $bookBannerSlide->book_image));
        }

        $bookBannerSlide->delete();

        return redirect()->route('admin.book-banner-slides.index')
            ->with('success', 'Banner slide deleted successfully!');
    }

    /**
     * Update the order of slides
     */
    public function reorder(Request $request)
    {
        $validated = $request->validate([
            'slides' => 'required|array',
            'slides.*.id' => 'required|exists:book_banner_slides,id',
            'slides.*.order' => 'required|integer',
        ]);

        foreach ($validated['slides'] as $slideData) {
            BookBannerSlide::where('id', $slideData['id'])
                ->update(['order' => $slideData['order']]);
        }

        return response()->json(['message' => 'Order updated successfully!']);
    }
}
