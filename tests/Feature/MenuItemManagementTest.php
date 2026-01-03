<?php

namespace Tests\Feature;

use App\Models\MenuItem;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class MenuItemManagementTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Property 13.1: API endpoint returns only active menu items
     */
    public function test_api_returns_only_active_menu_items(): void
    {
        // Create active and inactive menu items
        MenuItem::factory()->count(3)->create(['is_active' => true]);
        MenuItem::factory()->count(2)->create(['is_active' => false]);

        $response = $this->get('/api/menu');

        $response->assertOk();
        $response->assertJsonStructure([
            'success',
            'data' => [
                '*' => ['id', 'label', 'url', 'target', 'icon', 'children'],
            ],
        ]);
        $response->assertJsonCount(3, 'data');
    }

    /**
     * Property 13.2: Menu items are ordered by order field
     */
    public function test_menu_items_are_ordered(): void
    {
        MenuItem::factory()->create(['label' => 'Third', 'order' => 3, 'is_active' => true]);
        MenuItem::factory()->create(['label' => 'First', 'order' => 1, 'is_active' => true]);
        MenuItem::factory()->create(['label' => 'Second', 'order' => 2, 'is_active' => true]);

        $response = $this->get('/api/menu');

        $response->assertOk();
        $data = $response->json('data');
        $this->assertEquals('First', $data[0]['label']);
        $this->assertEquals('Second', $data[1]['label']);
        $this->assertEquals('Third', $data[2]['label']);
    }

    /**
     * Property 13.3: Admin can create menu items
     */
    public function test_admin_can_create_menu_item(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->post('/admin/menu-items', [
            'label' => 'Test Item',
            'url' => '/test',
            'target' => '_self',
            'order' => 1,
            'is_active' => true,
        ]);

        $response->assertRedirect();
        $this->assertDatabaseHas('menu_items', [
            'label' => 'Test Item',
            'url' => '/test',
        ]);
    }

    /**
     * Property 13.4: Admin can update menu items
     */
    public function test_admin_can_update_menu_item(): void
    {
        $user = User::factory()->create();
        $menuItem = MenuItem::factory()->create(['label' => 'Old Label']);

        $response = $this->actingAs($user)->put("/admin/menu-items/{$menuItem->id}", [
            'label' => 'New Label',
            'url' => $menuItem->url,
            'target' => '_self',
            'order' => 1,
            'is_active' => true,
        ]);

        $response->assertRedirect();
        $this->assertDatabaseHas('menu_items', [
            'id' => $menuItem->id,
            'label' => 'New Label',
        ]);
    }

    /**
     * Property 13.5: Admin can delete menu items
     */
    public function test_admin_can_delete_menu_item(): void
    {
        $user = User::factory()->create();
        $menuItem = MenuItem::factory()->create();

        $response = $this->actingAs($user)->delete("/admin/menu-items/{$menuItem->id}");

        $response->assertRedirect();
        $this->assertDatabaseMissing('menu_items', [
            'id' => $menuItem->id,
        ]);
    }

    /**
     * Property 13.6: Admin can toggle menu item status
     */
    public function test_admin_can_toggle_menu_item_status(): void
    {
        $user = User::factory()->create();
        $menuItem = MenuItem::factory()->create(['is_active' => true]);

        $response = $this->actingAs($user)->post("/admin/menu-items/{$menuItem->id}/toggle-status");

        $response->assertRedirect();
        $this->assertDatabaseHas('menu_items', [
            'id' => $menuItem->id,
            'is_active' => false,
        ]);
    }

    /**
     * Property 13.7: Admin can reorder menu items
     */
    public function test_admin_can_reorder_menu_items(): void
    {
        $user = User::factory()->create();
        $item1 = MenuItem::factory()->create(['order' => 1]);
        $item2 = MenuItem::factory()->create(['order' => 2]);
        $item3 = MenuItem::factory()->create(['order' => 3]);

        $response = $this->actingAs($user)->postJson('/admin/menu-items/reorder', [
            'items' => [
                ['id' => $item1->id, 'order' => 3],
                ['id' => $item2->id, 'order' => 1],
                ['id' => $item3->id, 'order' => 2],
            ],
        ]);

        $response->assertOk();
        $this->assertDatabaseHas('menu_items', ['id' => $item1->id, 'order' => 3]);
        $this->assertDatabaseHas('menu_items', ['id' => $item2->id, 'order' => 1]);
        $this->assertDatabaseHas('menu_items', ['id' => $item3->id, 'order' => 2]);
    }

    /**
     * Property 13.8: Menu items can have children
     */
    public function test_menu_items_can_have_children(): void
    {
        $parent = MenuItem::factory()->create(['is_active' => true]);
        MenuItem::factory()->count(2)->create([
            'parent_id' => $parent->id,
            'is_active' => true,
        ]);

        $response = $this->get('/api/menu');

        $response->assertOk();
        $data = $response->json('data');
        $this->assertCount(1, $data); // Only parent at root level
        $this->assertCount(2, $data[0]['children']);
    }

    /**
     * Property 13.9: Child menu items are only shown if active
     */
    public function test_inactive_children_are_not_shown(): void
    {
        $parent = MenuItem::factory()->create(['is_active' => true]);
        MenuItem::factory()->create([
            'parent_id' => $parent->id,
            'is_active' => true,
        ]);
        MenuItem::factory()->create([
            'parent_id' => $parent->id,
            'is_active' => false,
        ]);

        $response = $this->get('/api/menu');

        $response->assertOk();
        $data = $response->json('data');
        $this->assertCount(1, $data[0]['children']);
    }

    /**
     * Property 13.10: Menu items require label and url
     */
    public function test_menu_item_validation(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->post('/admin/menu-items', [
            'label' => '',
            'url' => '',
        ]);

        $response->assertSessionHasErrors(['label', 'url']);
    }

    /**
     * Property 13.11: Empty menu returns empty array
     */
    public function test_empty_menu_returns_empty_array(): void
    {
        $response = $this->get('/api/menu');

        $response->assertOk();
        $response->assertJson([
            'success' => true,
            'data' => [],
        ]);
    }

    /**
     * Property 13.12: Menu item target defaults to _self
     */
    public function test_menu_item_target_defaults_to_self(): void
    {
        $user = User::factory()->create();

        $this->actingAs($user)->post('/admin/menu-items', [
            'label' => 'Test Item',
            'url' => '/test',
            'order' => 1,
            'is_active' => true,
        ]);

        $this->assertDatabaseHas('menu_items', [
            'label' => 'Test Item',
            'target' => '_self',
        ]);
    }
}
