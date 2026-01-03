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
        Schema::table('about_me_page_settings', function (Blueprint $table) {
            // Drop old columns if they exist
            $columns = [
                'banner_title', 'banner_subtitle', 'banner_image',
                'report_title', 'report_description', 'report_image',
                'awards_section_title', 'awards_section_subtitle',
                'story_section_title', 'impact_section_title', 'travel_section_title',
                'corporate_journey_title', 'corporate_journey_subtitle',
                'associates_section_title', 'associates_section_subtitle'
            ];
            
            foreach ($columns as $column) {
                if (Schema::hasColumn('about_me_page_settings', $column)) {
                    $table->dropColumn($column);
                }
            }
            
            // Add new JSON columns
            $table->json('banner')->nullable();
            $table->json('report')->nullable();
            $table->json('awards')->nullable();
            $table->json('story')->nullable();
            $table->json('impact')->nullable();
            $table->json('travel')->nullable();
            $table->json('corporate_journey')->nullable();
            $table->json('associates')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('about_me_page_settings', function (Blueprint $table) {
            // Drop JSON columns
            $table->dropColumn([
                'banner', 'report', 'awards', 'story', 
                'impact', 'travel', 'corporate_journey', 'associates'
            ]);
            
            // Restore old columns
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
        });
    }
};
