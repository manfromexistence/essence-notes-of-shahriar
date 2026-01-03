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
            $table->json('quotes')->nullable();
            $table->json('innovations')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('entrepreneurship_page_settings', function (Blueprint $table) {
            $table->dropColumn(['quotes', 'innovations']);
        });
    }
};
