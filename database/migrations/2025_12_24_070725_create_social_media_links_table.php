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
        Schema::create('social_media_links', function (Blueprint $table) {
            $table->id();
            $table->string('platform'); // facebook, twitter, instagram, linkedin, etc.
            $table->string('label'); // Display label
            $table->string('url'); // Social media profile URL
            $table->string('icon')->nullable(); // Icon path or icon name
            $table->integer('order')->default(0); // Order for displaying
            $table->boolean('is_active')->default(true); // Active status
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('social_media_links');
    }
};
