<?php

use App\Models\IndexPageSetting;
use App\Models\IndexPageLogo;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

beforeEach(function () {
    Storage::fake('public');
    
    // Create a user for authentication
    $this->user = User::factory()->create();
    
    // Create index page setting
    $this->indexPage = IndexPageSetting::create([
        'title_text' => 'Test Title',
        'hero_image' => '/assets/test.png',
        'button_text' => 'Test Button',
        'button_link' => '/test',
        'is_active' => true,
    ]);
});

/**
 * Property 1: Logo Update Persistence
 * For any valid logo data (name, image, display_order, is_active), when an admin updates a logo,
 * the database SHALL contain the updated values and the API SHALL return the updated logo object.
 * 
 * Validates: Requirements 1.1, 1.3
 */
describe('Property 1: Logo Update Persistence', function () {
    it('persists logo name updates correctly', function () {
        // Create initial logo
        $logo = IndexPageLogo::create([
            'index_page_setting_id' => $this->indexPage->id,
            'name' => 'Original Name',
            'logo_path' => '/storage/test-logo.png',
            'display_order' => 1,
            'is_active' => true,
        ]);

        // Generate random new name
        $newName = 'Updated Logo ' . fake()->word();

        $response = $this->actingAs($this->user)
            ->postJson("/admin/index-page/logos/{$logo->id}/update", [
                'name' => $newName,
                'display_order' => 1,
                'is_active' => true,
            ]);

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'message' => 'Logo updated successfully!',
            ]);

        // Verify database contains updated value
        $this->assertDatabaseHas('index_page_logos', [
            'id' => $logo->id,
            'name' => $newName,
        ]);

        // Verify returned logo has updated name
        expect($response->json('logo.name'))->toBe($newName);
    });

    it('persists logo display_order updates correctly', function () {
        $logo = IndexPageLogo::create([
            'index_page_setting_id' => $this->indexPage->id,
            'name' => 'Test Logo',
            'logo_path' => '/storage/test-logo.png',
            'display_order' => 1,
            'is_active' => true,
        ]);

        $newOrder = fake()->numberBetween(1, 100);

        $response = $this->actingAs($this->user)
            ->postJson("/admin/index-page/logos/{$logo->id}/update", [
                'name' => 'Test Logo',
                'display_order' => $newOrder,
                'is_active' => true,
            ]);

        $response->assertStatus(200);

        $this->assertDatabaseHas('index_page_logos', [
            'id' => $logo->id,
            'display_order' => $newOrder,
        ]);
    });

    it('persists logo is_active toggle correctly', function () {
        $logo = IndexPageLogo::create([
            'index_page_setting_id' => $this->indexPage->id,
            'name' => 'Test Logo',
            'logo_path' => '/storage/test-logo.png',
            'display_order' => 1,
            'is_active' => true,
        ]);

        // Toggle to inactive
        $response = $this->actingAs($this->user)
            ->postJson("/admin/index-page/logos/{$logo->id}/update", [
                'name' => 'Test Logo',
                'display_order' => 1,
                'is_active' => '0',
            ]);

        $response->assertStatus(200);

        $this->assertDatabaseHas('index_page_logos', [
            'id' => $logo->id,
            'is_active' => false,
        ]);
    });

    it('persists logo image updates correctly', function () {
        $logo = IndexPageLogo::create([
            'index_page_setting_id' => $this->indexPage->id,
            'name' => 'Test Logo',
            'logo_path' => '/storage/old-logo.png',
            'display_order' => 1,
            'is_active' => true,
        ]);

        $newImage = UploadedFile::fake()->image('new-logo.png', 200, 100);

        $response = $this->actingAs($this->user)
            ->postJson("/admin/index-page/logos/{$logo->id}/update", [
                'name' => 'Test Logo',
                'display_order' => 1,
                'is_active' => true,
                'logo_path' => $newImage,
            ]);

        $response->assertStatus(200);

        // Verify logo_path was updated (not the old path)
        $updatedLogo = IndexPageLogo::find($logo->id);
        expect($updatedLogo->logo_path)->not->toBe('/storage/old-logo.png');
        expect($updatedLogo->logo_path)->toContain('/storage/');
    });
});

/**
 * Property 2: Logo Reorder Persistence
 * For any list of logos with valid IDs and new display_order values, when the reorder endpoint is called,
 * the database SHALL reflect the new ordering and subsequent queries SHALL return logos in the updated order.
 * 
 * Validates: Requirements 1.2
 */
describe('Property 2: Logo Reorder Persistence', function () {
    it('persists new logo order correctly', function () {
        // Create multiple logos
        $logos = [];
        for ($i = 1; $i <= 5; $i++) {
            $logos[] = IndexPageLogo::create([
                'index_page_setting_id' => $this->indexPage->id,
                'name' => "Logo $i",
                'logo_path' => "/storage/logo-$i.png",
                'display_order' => $i,
                'is_active' => true,
            ]);
        }

        // Reverse the order
        $reorderedLogos = array_map(function ($logo, $index) use ($logos) {
            return [
                'id' => $logo->id,
                'display_order' => count($logos) - $index,
            ];
        }, $logos, array_keys($logos));

        $response = $this->actingAs($this->user)
            ->postJson('/admin/index-page/logos/reorder', [
                'logos' => $reorderedLogos,
            ]);

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'message' => 'Logos reordered successfully!',
            ]);

        // Verify each logo has the new order
        foreach ($reorderedLogos as $logoData) {
            $this->assertDatabaseHas('index_page_logos', [
                'id' => $logoData['id'],
                'display_order' => $logoData['display_order'],
            ]);
        }
    });

    it('returns logos in updated order after reordering', function () {
        // Create logos in order 1, 2, 3
        $logo1 = IndexPageLogo::create([
            'index_page_setting_id' => $this->indexPage->id,
            'name' => 'Logo A',
            'logo_path' => '/storage/logo-a.png',
            'display_order' => 1,
            'is_active' => true,
        ]);
        $logo2 = IndexPageLogo::create([
            'index_page_setting_id' => $this->indexPage->id,
            'name' => 'Logo B',
            'logo_path' => '/storage/logo-b.png',
            'display_order' => 2,
            'is_active' => true,
        ]);
        $logo3 = IndexPageLogo::create([
            'index_page_setting_id' => $this->indexPage->id,
            'name' => 'Logo C',
            'logo_path' => '/storage/logo-c.png',
            'display_order' => 3,
            'is_active' => true,
        ]);

        // Reorder to 3, 1, 2
        $this->actingAs($this->user)
            ->postJson('/admin/index-page/logos/reorder', [
                'logos' => [
                    ['id' => $logo1->id, 'display_order' => 2],
                    ['id' => $logo2->id, 'display_order' => 3],
                    ['id' => $logo3->id, 'display_order' => 1],
                ],
            ]);

        // Query logos ordered by display_order
        $orderedLogos = IndexPageLogo::orderBy('display_order')->get();

        expect($orderedLogos[0]->name)->toBe('Logo C');
        expect($orderedLogos[1]->name)->toBe('Logo A');
        expect($orderedLogos[2]->name)->toBe('Logo B');
    });
});

/**
 * Property 3: Logo Error Handling
 * For any invalid logo update request (missing required fields, invalid file type, oversized file),
 * the API SHALL return an error response with a descriptive message and SHALL NOT modify the existing logo data.
 * 
 * Validates: Requirements 1.4
 */
describe('Property 3: Logo Error Handling', function () {
    it('returns error for missing required name field', function () {
        $logo = IndexPageLogo::create([
            'index_page_setting_id' => $this->indexPage->id,
            'name' => 'Original Name',
            'logo_path' => '/storage/test-logo.png',
            'display_order' => 1,
            'is_active' => true,
        ]);

        $response = $this->actingAs($this->user)
            ->postJson("/admin/index-page/logos/{$logo->id}/update", [
                'name' => '', // Empty name
                'display_order' => 1,
                'is_active' => true,
            ]);

        $response->assertStatus(422)
            ->assertJsonStructure([
                'success',
                'message',
                'errors' => ['name'],
            ]);

        // Verify original data unchanged
        $this->assertDatabaseHas('index_page_logos', [
            'id' => $logo->id,
            'name' => 'Original Name',
        ]);
    });

    it('returns error for invalid file type', function () {
        $logo = IndexPageLogo::create([
            'index_page_setting_id' => $this->indexPage->id,
            'name' => 'Test Logo',
            'logo_path' => '/storage/test-logo.png',
            'display_order' => 1,
            'is_active' => true,
        ]);

        $invalidFile = UploadedFile::fake()->create('document.pdf', 100, 'application/pdf');

        $response = $this->actingAs($this->user)
            ->postJson("/admin/index-page/logos/{$logo->id}/update", [
                'name' => 'Test Logo',
                'display_order' => 1,
                'is_active' => true,
                'logo_path' => $invalidFile,
            ]);

        $response->assertStatus(422)
            ->assertJsonStructure([
                'success',
                'message',
                'errors' => ['logo_path'],
            ]);

        // Verify original logo_path unchanged
        $this->assertDatabaseHas('index_page_logos', [
            'id' => $logo->id,
            'logo_path' => '/storage/test-logo.png',
        ]);
    });

    it('returns error for oversized file', function () {
        $logo = IndexPageLogo::create([
            'index_page_setting_id' => $this->indexPage->id,
            'name' => 'Test Logo',
            'logo_path' => '/storage/test-logo.png',
            'display_order' => 1,
            'is_active' => true,
        ]);

        // Create a file larger than 5MB limit
        $oversizedFile = UploadedFile::fake()->image('large-logo.png')->size(6000);

        $response = $this->actingAs($this->user)
            ->postJson("/admin/index-page/logos/{$logo->id}/update", [
                'name' => 'Test Logo',
                'display_order' => 1,
                'is_active' => true,
                'logo_path' => $oversizedFile,
            ]);

        $response->assertStatus(422)
            ->assertJsonStructure([
                'success',
                'message',
                'errors' => ['logo_path'],
            ]);

        // Verify original logo_path unchanged
        $this->assertDatabaseHas('index_page_logos', [
            'id' => $logo->id,
            'logo_path' => '/storage/test-logo.png',
        ]);
    });

    it('returns error for invalid logo IDs in reorder', function () {
        $response = $this->actingAs($this->user)
            ->postJson('/admin/index-page/logos/reorder', [
                'logos' => [
                    ['id' => 99999, 'display_order' => 1], // Non-existent ID
                ],
            ]);

        $response->assertStatus(422)
            ->assertJsonStructure([
                'success',
                'message',
                'errors',
            ]);
    });
});
