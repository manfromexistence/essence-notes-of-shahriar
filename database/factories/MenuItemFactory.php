<?php

namespace Database\Factories;

use App\Models\MenuItem;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\MenuItem>
 */
class MenuItemFactory extends Factory
{
    protected $model = MenuItem::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'label' => fake()->words(2, true),
            'url' => '/' . fake()->randomElement(['home', 'about', 'contact', 'blog', 'services', 'products', 'gallery', 'faq']),
            'target' => '_self',
            'order' => fake()->numberBetween(0, 100),
            'is_active' => true,
            'parent_id' => null,
            'icon' => null,
        ];
    }

    /**
     * Indicate that the menu item is inactive.
     */
    public function inactive(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_active' => false,
        ]);
    }

    /**
     * Indicate that the menu item opens in a new tab.
     */
    public function newTab(): static
    {
        return $this->state(fn (array $attributes) => [
            'target' => '_blank',
        ]);
    }

    /**
     * Set a specific order for the menu item.
     */
    public function order(int $order): static
    {
        return $this->state(fn (array $attributes) => [
            'order' => $order,
        ]);
    }

    /**
     * Set a parent for the menu item.
     */
    public function withParent(MenuItem $parent): static
    {
        return $this->state(fn (array $attributes) => [
            'parent_id' => $parent->id,
        ]);
    }
}
