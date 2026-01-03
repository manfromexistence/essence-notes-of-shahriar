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
            // Activities section images (4 images for the grid)
            $table->string('activities_image_1')->nullable()->after('activities_section_description');
            $table->string('activities_image_2')->nullable()->after('activities_image_1');
            $table->string('activities_image_3')->nullable()->after('activities_image_2');
            $table->string('activities_image_4')->nullable()->after('activities_image_3');
            
            // Default event images for slider (5 images)
            $table->string('default_event_image_1')->nullable()->after('activities_image_4');
            $table->string('default_event_image_2')->nullable()->after('default_event_image_1');
            $table->string('default_event_image_3')->nullable()->after('default_event_image_2');
            $table->string('default_event_image_4')->nullable()->after('default_event_image_3');
            $table->string('default_event_image_5')->nullable()->after('default_event_image_4');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('events_page_settings', function (Blueprint $table) {
            $table->dropColumn([
                'activities_image_1',
                'activities_image_2', 
                'activities_image_3',
                'activities_image_4',
                'default_event_image_1',
                'default_event_image_2',
                'default_event_image_3',
                'default_event_image_4',
                'default_event_image_5'
            ]);
        });
    }
};
