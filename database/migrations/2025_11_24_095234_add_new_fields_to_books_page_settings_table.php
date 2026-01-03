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
            $table->string('banner_title')->nullable();
            $table->text('banner_description')->nullable();
            $table->string('banner_price')->nullable();
            $table->string('banner_button_text')->nullable();
            $table->text('summary_fallback_text')->nullable();
            $table->string('review_default_author_name')->nullable();
            $table->string('review_default_author_title')->nullable();
            $table->string('review_default_author_company')->nullable();
            $table->text('recommended_books_description')->nullable();
        });
    }

    public function down(): void
    {
        Schema::table('books_page_settings', function (Blueprint $table) {
            $table->dropColumn([
                'banner_title',
                'banner_description',
                'banner_price',
                'banner_button_text',
                'summary_fallback_text',
                'review_default_author_name',
                'review_default_author_title',
                'review_default_author_company',
                'recommended_books_description',
            ]);
        });
    }
};
