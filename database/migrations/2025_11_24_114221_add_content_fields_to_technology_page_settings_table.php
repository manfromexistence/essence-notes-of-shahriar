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
            $table->text('banner_description')->nullable()->after('banner_image');
            $table->string('cybersecurity_title')->nullable()->after('banner_description');
            $table->text('cybersecurity_description')->nullable()->after('cybersecurity_title');
            $table->string('cybersecurity_image')->nullable()->after('cybersecurity_description');
            $table->string('contribution_title')->nullable()->after('cybersecurity_image');
            $table->text('contribution_description')->nullable()->after('contribution_title');
            $table->string('contribution_image')->nullable()->after('contribution_description');
            $table->string('tools_title')->nullable()->after('contribution_image');
            $table->text('tools_description')->nullable()->after('tools_title');
            $table->string('certificates_title')->nullable()->after('tools_description');
            $table->text('certificates_description')->nullable()->after('certificates_title');
            $table->string('blogs_title')->nullable()->after('certificates_description');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('technology_page_settings', function (Blueprint $table) {
            $table->dropColumn([
                'banner_description',
                'cybersecurity_title',
                'cybersecurity_description',
                'cybersecurity_image',
                'contribution_title',
                'contribution_description',
                'contribution_image',
                'tools_title',
                'tools_description',
                'certificates_title',
                'certificates_description',
                'blogs_title',
            ]);
        });
    }
};
