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
        Schema::create('events_page_settings', function (Blueprint $table) {
            $table->id();
            $table->string('page_title')->nullable();
            $table->string('banner_title')->nullable();
            $table->string('banner_bg_image')->nullable();
            $table->string('banner_bottom_vector')->nullable();
            $table->string('activities_section_title')->nullable();
            $table->string('upcoming_events_title')->nullable();
            $table->string('past_events_title')->nullable();
            $table->string('all_events_section_title')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('events_page_settings');
    }
};
