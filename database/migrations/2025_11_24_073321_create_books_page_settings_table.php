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
        Schema::create('books_page_settings', function (Blueprint $table) {
            $table->id();
            $table->string('page_title')->nullable();
            $table->string('banner_pattern_image')->nullable();
            $table->string('highlights_section_title')->nullable();
            $table->string('highlights_bg_color')->nullable();
            $table->string('summary_section_title')->nullable();
            $table->text('summary_description')->nullable();
            $table->string('review_section_title')->nullable();
            $table->string('review_bg_color')->nullable();
            $table->text('review_default_text')->nullable();
            $table->string('recommended_books_title')->nullable();
            $table->string('recommended_books_subtitle')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('books_page_settings');
    }
};
