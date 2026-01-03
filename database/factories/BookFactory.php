<?php

namespace Database\Factories;

use App\Models\Book;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Book>
 */
class BookFactory extends Factory
{
    protected $model = Book::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->sentence(3),
            'author' => fake()->name(),
            'cover_image' => null,
            'description' => fake()->paragraph(3),
            'summary' => fake()->paragraph(2),
            'highlights' => fake()->paragraph(),
            'review' => fake()->paragraph(),
            'rating' => fake()->randomFloat(1, 3, 5),
            'isbn' => fake()->isbn13(),
            'read_date' => fake()->dateTimeBetween('-2 years', 'now'),
            'is_recommended' => fake()->boolean(30),
            'order' => fake()->numberBetween(0, 100),
        ];
    }

    /**
     * Indicate that the book is recommended.
     */
    public function recommended(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_recommended' => true,
        ]);
    }

    /**
     * Indicate that the book is not recommended.
     */
    public function notRecommended(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_recommended' => false,
        ]);
    }
}
