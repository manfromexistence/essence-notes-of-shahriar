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
        Schema::table('certificates', function (Blueprint $table) {
            // Rename columns to match model
            $table->renameColumn('title', 'name');
            $table->renameColumn('issuer', 'issuing_organization');
            $table->renameColumn('certificate_url', 'credential_url');
            
            // Add new column
            $table->string('credential_id')->nullable()->after('expiry_date');
            
            // Remove columns no longer needed
            $table->dropColumn(['description', 'category']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('certificates', function (Blueprint $table) {
            // Revert column renames
            $table->renameColumn('name', 'title');
            $table->renameColumn('issuing_organization', 'issuer');
            $table->renameColumn('credential_url', 'certificate_url');
            
            // Remove new column
            $table->dropColumn('credential_id');
            
            // Add back removed columns
            $table->text('description')->nullable();
            $table->string('category')->nullable();
        });
    }
};
