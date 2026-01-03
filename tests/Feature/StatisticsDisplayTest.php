<?php

namespace Tests\Feature;

use App\Models\Statistic;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class StatisticsDisplayTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Property 12.1: Home page should return all statistics
     */
    public function test_home_page_returns_statistics(): void
    {
        // Create 5 statistics
        Statistic::factory()->count(5)->create(['is_active' => true]);

        $response = $this->get(route('home'));

        $response->assertOk();
        $response->assertInertia(fn ($page) => $page
            ->component('Home/Page/Home')
            ->has('statistics', 5)
        );
    }

    /**
     * Property 12.2: Only active statistics should be returned
     */
    public function test_only_active_statistics_are_returned(): void
    {
        // Create 3 active and 2 inactive statistics
        Statistic::factory()->count(3)->create(['is_active' => true]);
        Statistic::factory()->count(2)->create(['is_active' => false]);

        $response = $this->get(route('home'));

        $response->assertOk();
        $response->assertInertia(fn ($page) => $page
            ->component('Home/Page/Home')
            ->has('statistics', 3)
        );
    }

    /**
     * Property 12.3: Statistics should be ordered by order field
     */
    public function test_statistics_are_ordered_by_order_field(): void
    {
        Statistic::factory()->create(['label' => 'Third', 'order' => 3, 'is_active' => true]);
        Statistic::factory()->create(['label' => 'First', 'order' => 1, 'is_active' => true]);
        Statistic::factory()->create(['label' => 'Second', 'order' => 2, 'is_active' => true]);

        $response = $this->get(route('home'));

        $response->assertOk();
        $response->assertInertia(fn ($page) => $page
            ->component('Home/Page/Home')
            ->where('statistics.0.label', 'First')
            ->where('statistics.1.label', 'Second')
            ->where('statistics.2.label', 'Third')
        );
    }

    /**
     * Property 12.4: Large number of statistics should be returned for frontend limit handling
     * The frontend limits visible items to 8, but all are returned from backend
     */
    public function test_large_number_of_statistics_returned(): void
    {
        // Create 12 statistics (more than visible limit of 8)
        Statistic::factory()->count(12)->create(['is_active' => true]);

        $response = $this->get(route('home'));

        $response->assertOk();
        $response->assertInertia(fn ($page) => $page
            ->component('Home/Page/Home')
            ->has('statistics', 12)
        );
    }

    /**
     * Property 12.5: Statistics at visible limit should work correctly
     */
    public function test_statistics_at_visible_limit(): void
    {
        // Create exactly 8 statistics (at visible limit)
        Statistic::factory()->count(8)->create(['is_active' => true]);

        $response = $this->get(route('home'));

        $response->assertOk();
        $response->assertInertia(fn ($page) => $page
            ->component('Home/Page/Home')
            ->has('statistics', 8)
        );
    }

    /**
     * Property 12.6: Empty statistics collection should be handled gracefully
     */
    public function test_empty_statistics_handled_gracefully(): void
    {
        $response = $this->get(route('home'));

        $response->assertOk();
        $response->assertInertia(fn ($page) => $page
            ->component('Home/Page/Home')
            ->has('statistics', 0)
        );
    }

    /**
     * Property 12.7: Admin can create statistics via admin panel
     */
    public function test_admin_can_create_statistic(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->post('/admin/statistics', [
            'label' => 'Test Statistic',
            'value' => '100+',
            'is_active' => true,
            'order' => 1,
        ]);

        $response->assertRedirect();
        $this->assertDatabaseHas('statistics', [
            'label' => 'Test Statistic',
            'value' => '100+',
        ]);
    }

    /**
     * Property 12.8: Admin can update statistics
     */
    public function test_admin_can_update_statistic(): void
    {
        $user = User::factory()->create();
        $statistic = Statistic::factory()->create(['label' => 'Old Label']);

        $response = $this->actingAs($user)->put("/admin/statistics/{$statistic->id}", [
            'label' => 'New Label',
            'value' => $statistic->value,
            'is_active' => true,
            'order' => 1,
        ]);

        $response->assertRedirect();
        $this->assertDatabaseHas('statistics', [
            'id' => $statistic->id,
            'label' => 'New Label',
        ]);
    }

    /**
     * Property 12.9: Admin can delete statistics
     */
    public function test_admin_can_delete_statistic(): void
    {
        $user = User::factory()->create();
        $statistic = Statistic::factory()->create();

        $response = $this->actingAs($user)->delete("/admin/statistics/{$statistic->id}");

        $response->assertRedirect();
        $this->assertDatabaseMissing('statistics', [
            'id' => $statistic->id,
        ]);
    }
}
