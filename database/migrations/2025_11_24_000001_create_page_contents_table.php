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
        Schema::create('page_contents', function (Blueprint $table) {
            $table->id();
            $table->string('page')->index(); // about, blogs, books, contact, donation, entrepreneurship, events, life-events, technology, videos
            $table->string('section')->index(); // banner, report, corporate_journey, associates, quotes, etc.
            $table->string('key')->index(); // title, subtitle, description, image, etc.
            $table->text('value')->nullable(); // The actual content
            $table->string('type')->default('text'); // text, textarea, image, url, number
            $table->integer('order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->json('metadata')->nullable(); // For extra settings like font_size, color, etc.
            $table->timestamps();
            
            // Unique constraint for page-section-key combination
            $table->unique(['page', 'section', 'key', 'order']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('page_contents');
    }
};
