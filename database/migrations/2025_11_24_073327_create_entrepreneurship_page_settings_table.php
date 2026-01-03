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
        Schema::create('entrepreneurship_page_settings', function (Blueprint $table) {
            $table->id();
            $table->string('page_title')->nullable();
            $table->text('banner_quote')->nullable();
            $table->string('banner_quote_label')->nullable();
            $table->string('banner_image')->nullable();
            $table->string('banner_bg_color')->nullable();
            $table->string('quotes_section_title')->nullable();
            $table->string('innovation_section_title')->nullable();
            $table->string('innovation_section_subtitle')->nullable();
            $table->string('events_section_title')->nullable();
            $table->string('blogs_section_title')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('entrepreneurship_page_settings');
    }
};
