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
            $table->string('android_icon_svg')->nullable()->change();
            $table->string('cursor_icon_svg')->nullable()->change();
            $table->string('github_icon_svg')->nullable()->change();
            $table->string('nextjs_icon_svg')->nullable()->change();
            $table->string('tailwind_icon_svg')->nullable()->change();
            $table->string('react_icon_svg')->nullable()->change();
            $table->string('vercel_icon_svg')->nullable()->change();
            $table->string('laravel_icon_svg')->nullable()->change();
            $table->string('google_cloud_icon_svg')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('technology_page_settings', function (Blueprint $table) {
            $table->text('android_icon_svg')->nullable()->change();
            $table->text('cursor_icon_svg')->nullable()->change();
            $table->text('github_icon_svg')->nullable()->change();
            $table->text('nextjs_icon_svg')->nullable()->change();
            $table->text('tailwind_icon_svg')->nullable()->change();
            $table->text('react_icon_svg')->nullable()->change();
            $table->text('vercel_icon_svg')->nullable()->change();
            $table->text('laravel_icon_svg')->nullable()->change();
            $table->text('google_cloud_icon_svg')->nullable()->change();
        });
    }
};
