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
        Schema::create('videos_page_settings', function (Blueprint $table) {
            $table->id();
            $table->string('page_title')->nullable();
            $table->string('banner_title')->nullable();
            $table->text('banner_subtitle')->nullable();
            $table->text('banner_description')->nullable();
            $table->string('banner_image')->nullable();
            $table->string('all_videos_title')->nullable();
            $table->text('all_videos_description')->nullable();
            $table->string('short_videos_title')->nullable();
            $table->text('short_videos_description')->nullable();
            $table->json('banner_videos')->nullable();
            $table->json('all_videos')->nullable();
            $table->json('short_videos')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('videos_page_settings');
    }
};
