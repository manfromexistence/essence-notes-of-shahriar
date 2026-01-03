<?php

namespace Database\Factories;

use App\Models\Video;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Video>
 */
class VideoFactory extends Factory
{
    protected $model = Video::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->sentence(4),
            'description' => fake()->paragraph(),
            'video_url' => 'https://youtube.com/watch?v=' . fake()->regexify('[A-Za-z0-9]{11}'),
            'thumbnail' => null,
            'platform' => fake()->randomElement(['YouTube', 'Vimeo', 'TikTok']),
            'category' => fake()->randomElement(['Tutorial', 'Vlog', 'Review', 'Interview']),
            'duration' => fake()->numberBetween(1, 60) . ':' . str_pad(fake()->numberBetween(0, 59), 2, '0', STR_PAD_LEFT),
            'is_short' => fake()->boolean(20),
            'views' => fake()->numberBetween(0, 100000),
            'publish_date' => fake()->dateTimeBetween('-1 year', 'now'),
            'order' => fake()->numberBetween(0, 100),
        ];
    }

    /**
     * Indicate that the video is a short.
     */
    public function short(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_short' => true,
            'duration' => '0:' . str_pad(fake()->numberBetween(15, 59), 2, '0', STR_PAD_LEFT),
        ]);
    }
}
