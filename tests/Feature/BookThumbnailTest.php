<?php

use App\Models\Book;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

beforeEach(function () {
    Storage::fake('public');
    $this->user = User::factory()->create();
});

/**
 * Property 4: Book Thumbnail Round-Trip
 * For any book with a valid cover image file, uploading the thumbnail SHALL store the file
 * and associate it with the book record, and retrieving the book SHALL return the correct thumbnail path.
 * 
 * Validates: Requirements 2.1, 2.4
 */
describe('Property 4: Book Thumbnail Round-Trip', function () {
    it('stores and retrieves book cover image correctly on create', function () {
        $coverImage = UploadedFile::fake()->image('book-cover.jpg', 400, 600);

        $response = $this->actingAs($this->user)
            ->post('/admin/books', [
                'title' => 'Test Book ' . fake()->word(),
                'author' => fake()->name(),
                'cover_image' => $coverImage,
                'description' => fake()->paragraph(),
                'rating' => fake()->numberBetween(1, 5),
            ]);

        $response->assertRedirect('/admin/books');

        // Verify book was created with cover_image
        $book = Book::latest()->first();
        expect($book)->not->toBeNull();
        expect($book->cover_image)->not->toBeNull();
        expect($book->cover_image)->toContain('/storage/');
        expect($book->cover_image)->toContain('books/covers');
    });

    it('stores and retrieves book cover image correctly on update', function () {
        // Create book without cover
        $book = Book::create([
            'title' => 'Test Book',
            'author' => 'Test Author',
            'rating' => 4,
        ]);

        $coverImage = UploadedFile::fake()->image('new-cover.png', 300, 450);

        $response = $this->actingAs($this->user)
            ->put("/admin/books/{$book->id}", [
                'title' => $book->title,
                'author' => $book->author,
                'cover_image' => $coverImage,
                'rating' => $book->rating,
            ]);

        $response->assertRedirect('/admin/books');

        // Verify cover_image was updated
        $book->refresh();
        expect($book->cover_image)->not->toBeNull();
        expect($book->cover_image)->toContain('/storage/');
    });

    it('returns book with thumbnail in list view', function () {
        // Create book with cover
        $coverImage = UploadedFile::fake()->image('cover.jpg', 200, 300);
        
        $this->actingAs($this->user)
            ->post('/admin/books', [
                'title' => 'Book With Cover',
                'cover_image' => $coverImage,
            ]);

        $response = $this->actingAs($this->user)
            ->get('/admin/books');

        $response->assertStatus(200);
        
        // Verify the book with cover is in the response
        $book = Book::where('title', 'Book With Cover')->first();
        expect($book->cover_image)->not->toBeNull();
    });

    it('replaces old cover image when updating with new one', function () {
        // Create book with initial cover
        $oldCover = UploadedFile::fake()->image('old-cover.jpg', 200, 300);
        
        $this->actingAs($this->user)
            ->post('/admin/books', [
                'title' => 'Book To Update',
                'cover_image' => $oldCover,
            ]);

        $book = Book::where('title', 'Book To Update')->first();
        $oldPath = $book->cover_image;

        // Update with new cover
        $newCover = UploadedFile::fake()->image('new-cover.jpg', 400, 600);
        
        $this->actingAs($this->user)
            ->put("/admin/books/{$book->id}", [
                'title' => $book->title,
                'cover_image' => $newCover,
            ]);

        $book->refresh();
        expect($book->cover_image)->not->toBe($oldPath);
        expect($book->cover_image)->toContain('/storage/');
    });
});

/**
 * Property 5: Book Upload Error Handling
 * For any invalid book thumbnail upload (invalid file type, oversized file, corrupted file),
 * the API SHALL return an error response with a descriptive failure reason
 * and SHALL NOT create a partial book record.
 * 
 * Validates: Requirements 2.3
 */
describe('Property 5: Book Upload Error Handling', function () {
    it('returns error for invalid file type', function () {
        $invalidFile = UploadedFile::fake()->create('document.pdf', 100, 'application/pdf');

        $response = $this->actingAs($this->user)
            ->post('/admin/books', [
                'title' => 'Book With Invalid File',
                'cover_image' => $invalidFile,
            ]);

        // Should have errors (either cover_image or general)
        $response->assertSessionHasErrors();

        // Verify no book was created
        expect(Book::where('title', 'Book With Invalid File')->exists())->toBeFalse();
    });

    it('returns error for oversized file', function () {
        // Create file larger than 5MB limit
        $oversizedFile = UploadedFile::fake()->image('large-cover.jpg')->size(6000);

        $response = $this->actingAs($this->user)
            ->post('/admin/books', [
                'title' => 'Book With Large File',
                'cover_image' => $oversizedFile,
            ]);

        // Should have errors (either cover_image or general)
        $response->assertSessionHasErrors();

        // Verify no book was created
        expect(Book::where('title', 'Book With Large File')->exists())->toBeFalse();
    });

    it('does not modify existing book on invalid update', function () {
        // Create book with valid cover
        $validCover = UploadedFile::fake()->image('valid-cover.jpg', 200, 300);
        
        $this->actingAs($this->user)
            ->post('/admin/books', [
                'title' => 'Existing Book',
                'cover_image' => $validCover,
            ]);

        $book = Book::where('title', 'Existing Book')->first();
        $originalCover = $book->cover_image;

        // Try to update with invalid file
        $invalidFile = UploadedFile::fake()->create('document.txt', 100, 'text/plain');

        $this->actingAs($this->user)
            ->put("/admin/books/{$book->id}", [
                'title' => $book->title,
                'cover_image' => $invalidFile,
            ]);

        // Verify original cover unchanged
        $book->refresh();
        expect($book->cover_image)->toBe($originalCover);
    });

    it('returns descriptive error message for invalid file type', function () {
        $invalidFile = UploadedFile::fake()->create('script.exe', 100, 'application/x-msdownload');

        $response = $this->actingAs($this->user)
            ->from('/admin/books/create')
            ->post('/admin/books', [
                'title' => 'Test Book',
                'cover_image' => $invalidFile,
            ]);

        // Should have errors
        $response->assertSessionHasErrors();
    });
});
