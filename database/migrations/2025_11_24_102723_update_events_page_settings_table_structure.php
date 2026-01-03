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
        Schema::table('events_page_settings', function (Blueprint $table) {
            // Rename banner_bg_image to banner_vector_image
            $table->renameColumn('banner_bg_image', 'banner_vector_image');
            
            // Remove old columns
            $table->dropColumn(['upcoming_events_title', 'past_events_title', 'all_events_section_title']);
            
            // Add new columns
            $table->text('activities_section_description')->nullable()->after('activities_section_title');
            $table->string('events_section_title')->default('Events')->after('activities_section_description');
            $table->json('year_filter_options')->nullable()->after('events_section_title');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('events_page_settings', function (Blueprint $table) {
            // Reverse the changes
            $table->renameColumn('banner_vector_image', 'banner_bg_image');
            $table->dropColumn(['activities_section_description', 'events_section_title', 'year_filter_options']);
            $table->string('upcoming_events_title')->nullable();
            $table->string('past_events_title')->nullable();
            $table->string('all_events_section_title')->nullable();
        });
    }
};
