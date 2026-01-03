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
        Schema::create('about_me_page_settings', function (Blueprint $table) {
            $table->id();
            $table->string('banner_title')->nullable();
            $table->string('banner_subtitle')->nullable();
            $table->string('banner_image')->nullable();
            $table->string('report_title')->nullable();
            $table->text('report_description')->nullable();
            $table->string('report_image')->nullable();
            $table->string('awards_section_title')->nullable();
            $table->string('awards_section_subtitle')->nullable();
            $table->string('story_section_title')->nullable();
            $table->string('impact_section_title')->nullable();
            $table->string('travel_section_title')->nullable();
            $table->string('corporate_journey_title')->nullable();
            $table->string('corporate_journey_subtitle')->nullable();
            $table->string('associates_section_title')->nullable();
            $table->string('associates_section_subtitle')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('about_me_page_settings');
    }
};
