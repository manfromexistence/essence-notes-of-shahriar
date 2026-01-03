<?php

namespace Database\Factories;

use App\Models\HeroSection;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\HeroSection>
 */
class HeroSectionFactory extends Factory
{
    protected $model = HeroSection::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->sentence(3),
            'subtitle' => fake()->sentence(8),
            'subtitle_max_length' => 200,
            'tagline' => fake()->sentence(4),
            'tagline_max_length' => 50,
            'description' => fake()->paragraph(2),
            'description_max_length' => 150,
            'image_url' => null,
            'social_links' => [
                'linkedin' => 'https://linkedin.com/in/' . fake()->userName(),
                'twitter' => 'https://twitter.com/' . fake()->userName(),
            ],
            'social_link_settings' => [],
            'font_settings' => [
                'subtitle_size' => '1rem',
                'tagline_size' => '0.875rem',
                'description_size' => '1rem',
            ],
            'is_active' => true,
            'order' => fake()->numberBetween(0, 10),
        ];
    }

    /**
     * Indicate that the hero section is inactive.
     */
    public function inactive(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_active' => false,
        ]);
    }

    /**
     * Indicate that the hero section has no social links.
     */
    public function withoutSocialLinks(): static
    {
        return $this->state(fn (array $attributes) => [
            'social_links' => [],
            'social_link_settings' => [],
        ]);
    }
}
