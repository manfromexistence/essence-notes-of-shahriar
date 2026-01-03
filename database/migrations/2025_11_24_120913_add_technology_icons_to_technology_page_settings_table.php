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
        Schema::table('technology_page_settings', function (Blueprint $table) {
            $table->text('android_icon_svg')->nullable();
            $table->text('cursor_icon_svg')->nullable();
            $table->text('github_icon_svg')->nullable();
            $table->text('nextjs_icon_svg')->nullable();
            $table->text('tailwind_icon_svg')->nullable();
            $table->text('react_icon_svg')->nullable();
            $table->text('vercel_icon_svg')->nullable();
            $table->text('laravel_icon_svg')->nullable();
            $table->text('google_cloud_icon_svg')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('technology_page_settings', function (Blueprint $table) {
            $table->dropColumn([
                'android_icon_svg',
                'cursor_icon_svg',
                'github_icon_svg',
                'nextjs_icon_svg',
                'tailwind_icon_svg',
                'react_icon_svg',
                'vercel_icon_svg',
                'laravel_icon_svg',
                'google_cloud_icon_svg'
            ]);
        });
    }
};
