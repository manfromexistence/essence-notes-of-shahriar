<?php

namespace Tests\Feature;

use App\Models\Book;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class BooksDisplayTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Property 11.1: Books page should return all books data
     */
    public function test_books_page_returns_all_books(): void
    {
        // Create 6 books
        Book::factory()->count(6)->create();

        $response = $this->get(route('books'));

        $response->assertOk();
        $response->assertInertia(fn ($page) => $page
            ->component('Books/Page/Books')
            ->has('allBooks', 6)
        );
    }

    /**
     * Property 11.2: Books page should return recommended books separately
     */
    public function test_books_page_returns_recommended_books(): void
    {
        // Create 3 recommended and 2 non-recommended books
        Book::factory()->count(3)->create(['is_recommended' => true]);
        Book::factory()->count(2)->create(['is_recommended' => false]);

        $response = $this->get(route('books'));

        $response->assertOk();
        $response->assertInertia(fn ($page) => $page
            ->component('Books/Page/Books')
            ->has('recommendedBooks', 3)
            ->has('allBooks', 5)
        );
    }

    /**
     * Property 11.3: Books should be ordered by order field
     */
    public function test_books_are_ordered_by_order_field(): void
    {
        Book::factory()->create(['title' => 'Third', 'order' => 3]);
        Book::factory()->create(['title' => 'First', 'order' => 1]);
        Book::factory()->create(['title' => 'Second', 'order' => 2]);

        $response = $this->get(route('books'));

        $response->assertOk();
        $response->assertInertia(fn ($page) => $page
            ->component('Books/Page/Books')
            ->where('allBooks.0.title', 'First')
            ->where('allBooks.1.title', 'Second')
            ->where('allBooks.2.title', 'Third')
        );
    }

    /**
     * Property 11.4: Empty books collection should be handled gracefully
     */
    public function test_empty_books_collection_handled_gracefully(): void
    {
        $response = $this->get(route('books'));

        $response->assertOk();
        $response->assertInertia(fn ($page) => $page
            ->component('Books/Page/Books')
            ->has('allBooks', 0)
            ->has('recommendedBooks', 0)
        );
    }

    /**
     * Property 11.5: Books with cover images should include image paths
     */
    public function test_books_include_cover_image_paths(): void
    {
        Book::factory()->create([
            'cover_image' => '/storage/books/test-cover.jpg',
        ]);

        $response = $this->get(route('books'));

        $response->assertOk();
        $response->assertInertia(fn ($page) => $page
            ->component('Books/Page/Books')
            ->where('allBooks.0.cover_image', '/storage/books/test-cover.jpg')
        );
    }

    /**
     * Property 11.6: Large number of books should be returned for slider
     */
    public function test_large_number_of_books_returned_for_slider(): void
    {
        // Create 10 books (more than threshold of 4)
        Book::factory()->count(10)->create();

        $response = $this->get(route('books'));

        $response->assertOk();
        $response->assertInertia(fn ($page) => $page
            ->component('Books/Page/Books')
            ->has('allBooks', 10)
        );
    }

    /**
     * Property 11.7: Books at threshold should be returned for grid
     */
    public function test_books_at_threshold_returned_for_grid(): void
    {
        // Create exactly 4 books (at threshold)
        Book::factory()->count(4)->create();

        $response = $this->get(route('books'));

        $response->assertOk();
        $response->assertInertia(fn ($page) => $page
            ->component('Books/Page/Books')
            ->has('allBooks', 4)
        );
    }
}
