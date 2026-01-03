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
        Schema::table('entrepreneurship_page_settings', function (Blueprint $table) {
            if (!Schema::hasColumn('entrepreneurship_page_settings', 'events_button_text')) {
                $table->string('events_button_text')->nullable();
            }
            if (!Schema::hasColumn('entrepreneurship_page_settings', 'blogs_button_text')) {
                $table->string('blogs_button_text')->nullable();
            }
            if (!Schema::hasColumn('entrepreneurship_page_settings', 'blogs_show_less_text')) {
                $table->string('blogs_show_less_text')->nullable();
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('entrepreneurship_page_settings', function (Blueprint $table) {
            $table->dropColumn(['events_button_text', 'blogs_button_text', 'blogs_show_less_text']);
        });
    }
};
