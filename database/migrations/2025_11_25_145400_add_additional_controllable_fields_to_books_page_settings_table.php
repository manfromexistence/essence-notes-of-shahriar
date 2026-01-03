<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('books_page_settings', function (Blueprint $table) {
            // Banner Images - check if columns exist before adding
            if (!Schema::hasColumn('books_page_settings', 'banner_book_image')) {
                $table->string('banner_book_image')->nullable();
            }
            if (!Schema::hasColumn('books_page_settings', 'banner_rotating_button_image')) {
                $table->string('banner_rotating_button_image')->nullable();
            }
            
            // Review Section Images
            if (!Schema::hasColumn('books_page_settings', 'review_avatar_image')) {
                $table->string('review_avatar_image')->nullable();
            }
            if (!Schema::hasColumn('books_page_settings', 'review_quotation_icon')) {
                $table->string('review_quotation_icon')->nullable();
            }
            
            // Section Background Colors
            if (!Schema::hasColumn('books_page_settings', 'highlights_bg_color')) {
                $table->string('highlights_bg_color')->nullable()->default('#1E293B');
            }
            if (!Schema::hasColumn('books_page_settings', 'review_bg_color')) {
                $table->string('review_bg_color')->nullable()->default('#2E5AFF');
            }
            
            // Default Highlight Books
            if (!Schema::hasColumn('books_page_settings', 'highlight_book_1_image')) {
                $table->string('highlight_book_1_image')->nullable();
            }
            if (!Schema::hasColumn('books_page_settings', 'highlight_book_1_title')) {
                $table->string('highlight_book_1_title')->nullable();
            }
            if (!Schema::hasColumn('books_page_settings', 'highlight_book_1_text')) {
                $table->text('highlight_book_1_text')->nullable();
            }
            if (!Schema::hasColumn('books_page_settings', 'highlight_book_2_image')) {
                $table->string('highlight_book_2_image')->nullable();
            }
            if (!Schema::hasColumn('books_page_settings', 'highlight_book_2_title')) {
                $table->string('highlight_book_2_title')->nullable();
            }
            if (!Schema::hasColumn('books_page_settings', 'highlight_book_2_text')) {
                $table->text('highlight_book_2_text')->nullable();
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('books_page_settings', function (Blueprint $table) {
            $table->dropColumn([
                'banner_book_image',
                'banner_rotating_button_image',
                'review_avatar_image',
                'review_quotation_icon',
                'highlights_bg_color',
                'review_bg_color',
                'highlight_book_1_image',
                'highlight_book_1_title',
                'highlight_book_1_text',
                'highlight_book_2_image',
                'highlight_book_2_title',
                'highlight_book_2_text',
            ]);
        });
    }
};
