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
            $table->text('cybersecurity_additional_description')->nullable()->after('cybersecurity_description');
        });
    }

    public function down(): void
    {
        Schema::table('technology_page_settings', function (Blueprint $table) {
            $table->dropColumn('cybersecurity_additional_description');
        });
    }
};
