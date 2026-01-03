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
            $table->dropColumn(['highlights_bg_color', 'review_bg_color']);
            $table->string('book_cover_image')->nullable()->after('banner_pattern_image');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('books_page_settings', function (Blueprint $table) {
            $table->string('highlights_bg_color')->nullable();
            $table->string('review_bg_color')->nullable();
            $table->dropColumn('book_cover_image');
        });
    }
};
