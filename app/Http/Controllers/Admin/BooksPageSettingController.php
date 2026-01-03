<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\BooksPageSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class BooksPageSettingController extends Controller
{
    public function index()
    {
        return redirect()->route('admin.books-page-settings.general');
    }

    public function general()
    {
        $settings = BooksPageSetting::first();
        if (!$settings) {
            $settings = BooksPageSetting::create(['page_title' => 'Books']);
        }
        return Inertia::render('dashboard/books-page-settings/general', ['settings' => $settings]);
    }

    public function banner()
    {
        $settings = BooksPageSetting::first();
        if (!$settings) {
            $settings = BooksPageSetting::create(['page_title' => 'Books']);
        }
        return Inertia::render('dashboard/books-page-settings/banner', ['settings' => $settings]);
    }

    public function content()
    {
        $settings = BooksPageSetting::first();
        if (!$settings) {
            $settings = BooksPageSetting::create(['page_title' => 'Books']);
        }
        return Inertia::render('dashboard/books-page-settings/content', ['settings' => $settings]);
    }

    public function sections()
    {
        $settings = BooksPageSetting::first();
        if (!$settings) {
            $settings = BooksPageSetting::create(['page_title' => 'Books']);
        }
        return Inertia::render('dashboard/books-page-settings/sections', ['settings' => $settings]);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'page_title' => 'nullable|string|max:255',
            'banner_pattern_image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp,svg|max:5120',
            'book_cover_image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp,svg|max:5120',
            'banner_book_image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp,svg|max:5120',
            'banner_rotating_button_image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp,svg|max:5120',
            'banner_title' => 'nullable|string|max:255',
            'banner_description' => 'nullable|string|max:1000',
            'banner_price' => 'nullable|string|max:100',
            'banner_button_text' => 'nullable|string|max:100',
            'highlights_section_title' => 'nullable|string|max:255',
            'highlights_bg_color' => 'nullable|string|max:20',
            'highlight_book_1_image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp,svg|max:5120',
            'highlight_book_1_title' => 'nullable|string|max:255',
            'highlight_book_1_text' => 'nullable|string|max:2000',
            'highlight_book_2_image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp,svg|max:5120',
            'highlight_book_2_title' => 'nullable|string|max:255',
            'highlight_book_2_text' => 'nullable|string|max:2000',
            'summary_section_title' => 'nullable|string|max:255',
            'summary_description' => 'nullable|string|max:2000',
            'summary_fallback_text' => 'nullable|string|max:2000',
            'review_section_title' => 'nullable|string|max:255',
            'review_default_text' => 'nullable|string|max:2000',
            'review_default_author_name' => 'nullable|string|max:255',
            'review_default_author_title' => 'nullable|string|max:255',
            'review_default_author_company' => 'nullable|string|max:255',
            'review_avatar_image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp,svg|max:5120',
            'review_quotation_icon' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp,svg|max:5120',
            'review_bg_color' => 'nullable|string|max:20',
            'recommended_books_title' => 'nullable|string|max:255',
            'recommended_books_subtitle' => 'nullable|string|max:255',
            'recommended_books_description' => 'nullable|string|max:2000',
        ]);

        $settings = BooksPageSetting::first() ?? new BooksPageSetting();

        if ($request->hasFile('banner_pattern_image')) {
            if ($settings->banner_pattern_image && !str_starts_with($settings->banner_pattern_image, '/assets/') && 
                Storage::disk('public')->exists(str_replace('/storage/', '', $settings->banner_pattern_image))) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $settings->banner_pattern_image));
            }
            $path = $request->file('banner_pattern_image')->store('books-page', 'public');
            $validated['banner_pattern_image'] = '/storage/' . $path;
        } else {
            unset($validated['banner_pattern_image']);
        }

        if ($request->hasFile('book_cover_image')) {
            if ($settings->book_cover_image && !str_starts_with($settings->book_cover_image, '/assets/') && 
                Storage::disk('public')->exists(str_replace('/storage/', '', $settings->book_cover_image))) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $settings->book_cover_image));
            }
            $path = $request->file('book_cover_image')->store('books-page', 'public');
            $validated['book_cover_image'] = '/storage/' . $path;
        } else {
            unset($validated['book_cover_image']);
        }

        // Handle banner book image upload
        if ($request->hasFile('banner_book_image')) {
            if ($settings->banner_book_image && !str_starts_with($settings->banner_book_image, '/assets/') && 
                Storage::disk('public')->exists(str_replace('/storage/', '', $settings->banner_book_image))) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $settings->banner_book_image));
            }
            $path = $request->file('banner_book_image')->store('books-page', 'public');
            $validated['banner_book_image'] = '/storage/' . $path;
        } else {
            unset($validated['banner_book_image']);
        }

        // Handle banner rotating button image upload
        if ($request->hasFile('banner_rotating_button_image')) {
            if ($settings->banner_rotating_button_image && !str_starts_with($settings->banner_rotating_button_image, '/assets/') && 
                Storage::disk('public')->exists(str_replace('/storage/', '', $settings->banner_rotating_button_image))) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $settings->banner_rotating_button_image));
            }
            $path = $request->file('banner_rotating_button_image')->store('books-page', 'public');
            $validated['banner_rotating_button_image'] = '/storage/' . $path;
        } else {
            unset($validated['banner_rotating_button_image']);
        }

        // Handle review avatar image upload
        if ($request->hasFile('review_avatar_image')) {
            if ($settings->review_avatar_image && !str_starts_with($settings->review_avatar_image, '/assets/') && 
                Storage::disk('public')->exists(str_replace('/storage/', '', $settings->review_avatar_image))) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $settings->review_avatar_image));
            }
            $path = $request->file('review_avatar_image')->store('books-page', 'public');
            $validated['review_avatar_image'] = '/storage/' . $path;
        } else {
            unset($validated['review_avatar_image']);
        }

        // Handle review quotation icon upload
        if ($request->hasFile('review_quotation_icon')) {
            if ($settings->review_quotation_icon && !str_starts_with($settings->review_quotation_icon, '/assets/') && 
                Storage::disk('public')->exists(str_replace('/storage/', '', $settings->review_quotation_icon))) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $settings->review_quotation_icon));
            }
            $path = $request->file('review_quotation_icon')->store('books-page', 'public');
            $validated['review_quotation_icon'] = '/storage/' . $path;
        } else {
            unset($validated['review_quotation_icon']);
        }

        // Handle highlight book 1 image upload
        if ($request->hasFile('highlight_book_1_image')) {
            if ($settings->highlight_book_1_image && !str_starts_with($settings->highlight_book_1_image, '/assets/') && 
                Storage::disk('public')->exists(str_replace('/storage/', '', $settings->highlight_book_1_image))) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $settings->highlight_book_1_image));
            }
            $path = $request->file('highlight_book_1_image')->store('books-page', 'public');
            $validated['highlight_book_1_image'] = '/storage/' . $path;
        } else {
            unset($validated['highlight_book_1_image']);
        }

        // Handle highlight book 2 image upload
        if ($request->hasFile('highlight_book_2_image')) {
            if ($settings->highlight_book_2_image && !str_starts_with($settings->highlight_book_2_image, '/assets/') && 
                Storage::disk('public')->exists(str_replace('/storage/', '', $settings->highlight_book_2_image))) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $settings->highlight_book_2_image));
            }
            $path = $request->file('highlight_book_2_image')->store('books-page', 'public');
            $validated['highlight_book_2_image'] = '/storage/' . $path;
        } else {
            unset($validated['highlight_book_2_image']);
        }

        $settings->fill($validated);
        $settings->save();

        return redirect()->back()->with('success', 'Books page settings updated successfully!');
    }
}
