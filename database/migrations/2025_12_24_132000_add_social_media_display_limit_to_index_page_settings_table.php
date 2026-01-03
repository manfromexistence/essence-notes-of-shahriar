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
        Schema::table('index_page_settings', function (Blueprint $table) {
            $table->integer('social_media_display_limit')->default(3)->after('is_active');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('index_page_settings', function (Blueprint $table) {
            $table->dropColumn('social_media_display_limit');
        });
    }
};
