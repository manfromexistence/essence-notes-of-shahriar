<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BooksPageSetting extends Model
{
    use HasFactory;

    protected $fillable = [
        'page_title',
        'banner_pattern_image',
        'book_cover_image',
        'banner_book_image',
        'banner_rotating_button_image',
        'banner_title',
        'banner_description',
        'banner_price',
        'banner_button_text',
        'highlights_section_title',
        'highlights_bg_color',
        'highlight_book_1_image',
        'highlight_book_1_title',
        'highlight_book_1_text',
        'highlight_book_2_image',
        'highlight_book_2_title',
        'highlight_book_2_text',
        'summary_section_title',
        'summary_description',
        'summary_fallback_text',
        'review_section_title',
        'review_default_text',
        'review_default_author_name',
        'review_default_author_title',
        'review_default_author_company',
        'review_avatar_image',
        'review_quotation_icon',
        'review_bg_color',
        'recommended_books_title',
        'recommended_books_subtitle',
        'recommended_books_description',
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];
}
