<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Book;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class BookController extends Controller
{
    public function index()
    {
        $books = Book::latest()->get();
        
        return Inertia::render('dashboard/books/index', [
            'books' => $books
        ]);
    }

    public function create()
    {
        return Inertia::render('dashboard/books/create');
    }

    public function store(Request $request)
    {
        try {
            // Log incoming request for debugging
            Log::info('Book creation attempt', [
                'has_file' => $request->hasFile('cover_image'),
                'file_info' => $request->hasFile('cover_image') ? [
                    'name' => $request->file('cover_image')->getClientOriginalName(),
                    'size' => $request->file('cover_image')->getSize(),
                    'mime' => $request->file('cover_image')->getMimeType(),
                ] : null,
                'all_data' => $request->except('cover_image'),
            ]);

            $validated = $request->validate([
                'title' => 'required|string|max:255',
                'author' => 'nullable|string|max:255',
                'cover_image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:5120',
                'description' => 'nullable|string',
                'summary' => 'nullable|string',
                'highlights' => 'nullable|string',
                'review' => 'nullable|string',
                'rating' => 'nullable|integer|min:0|max:5',
                'isbn' => 'nullable|string',
                'read_date' => 'nullable|date',
                'is_recommended' => 'nullable|boolean',
                'order' => 'nullable|integer',
            ], [
                'cover_image.image' => 'The cover image must be an image file.',
                'cover_image.mimes' => 'The cover image must be a file of type: jpeg, png, jpg, gif, webp.',
                'cover_image.max' => 'The cover image must not exceed 5MB.',
            ]);

            // Ensure is_recommended is boolean
            $validated['is_recommended'] = $request->has('is_recommended') ? (bool)$request->is_recommended : false;

            // Handle cover image upload
            if ($request->hasFile('cover_image')) {
                $file = $request->file('cover_image');
                
                if (!$file->isValid()) {
                    Log::error('Invalid cover image file', [
                        'error' => $file->getError(),
                        'error_message' => $file->getErrorMessage(),
                    ]);
                    return redirect()->back()
                        ->withErrors(['cover_image' => 'The uploaded file is invalid: ' . $file->getErrorMessage()])
                        ->withInput();
                }

                $env = strtolower(config('app.env'));
                $disk = ($env === 'production' || $env === 'prod') ? 'public_uploads' : 'public';
                
                $path = $file->store('books/covers', $disk);
                
                if (!$path) {
                    Log::error('Failed to store book cover image', [
                        'file_name' => $file->getClientOriginalName(),
                        'disk' => $disk,
                    ]);
                    return redirect()->back()
                        ->withErrors(['cover_image' => 'Failed to save cover image. Please try again.'])
                        ->withInput();
                }
                
                // Set file permissions to 644 (readable by everyone)
                $fullPath = $disk === 'public_uploads' 
                    ? public_path('uploads/' . $path)
                    : storage_path('app/public/' . $path);
                    
                if (file_exists($fullPath)) {
                    chmod($fullPath, 0644);
                }
                
                $validated['cover_image'] = $disk === 'public_uploads' 
                    ? '/uploads/' . $path 
                    : '/storage/' . $path;
                    
                Log::info('Book cover image uploaded successfully', [
                    'path' => $validated['cover_image'],
                ]);
            }

            Book::create($validated);

            return redirect()->route('admin.books.index')
                ->with('success', 'Book added successfully.');
        } catch (\Exception $e) {
            Log::error('Book creation error', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);
            
            return redirect()->back()
                ->withErrors(['general' => 'An error occurred: ' . $e->getMessage()])
                ->withInput();
        }
    }

    public function show(Book $book)
    {
        return redirect()->route('admin.books.edit', $book);
    }

    public function edit(Book $book)
    {
        return Inertia::render('dashboard/books/edit', [
            'book' => $book
        ]);
    }

    public function update(Request $request, Book $book)
    {
        try {
            // Log incoming request for debugging
            Log::info('Book update attempt', [
                'book_id' => $book->id,
                'has_file' => $request->hasFile('cover_image'),
                'file_info' => $request->hasFile('cover_image') ? [
                    'name' => $request->file('cover_image')->getClientOriginalName(),
                    'size' => $request->file('cover_image')->getSize(),
                    'mime' => $request->file('cover_image')->getMimeType(),
                ] : null,
            ]);

            $validated = $request->validate([
                'title' => 'required|string|max:255',
                'author' => 'nullable|string|max:255',
                'cover_image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:5120',
                'description' => 'nullable|string',
                'summary' => 'nullable|string',
                'highlights' => 'nullable|string',
                'review' => 'nullable|string',
                'rating' => 'nullable|integer|min:0|max:5',
                'isbn' => 'nullable|string',
                'read_date' => 'nullable|date',
                'is_recommended' => 'nullable|boolean',
                'order' => 'nullable|integer',
            ], [
                'cover_image.image' => 'The cover image must be an image file.',
                'cover_image.mimes' => 'The cover image must be a file of type: jpeg, png, jpg, gif, webp.',
                'cover_image.max' => 'The cover image must not exceed 5MB.',
            ]);

            // Ensure is_recommended is boolean
            $validated['is_recommended'] = $request->has('is_recommended') ? (bool)$request->is_recommended : $book->is_recommended;

            // Handle cover image upload
            if ($request->hasFile('cover_image')) {
                $file = $request->file('cover_image');
                
                if (!$file->isValid()) {
                    Log::error('Invalid cover image file for update', [
                        'book_id' => $book->id,
                        'error' => $file->getError(),
                        'error_message' => $file->getErrorMessage(),
                    ]);
                    return redirect()->back()
                        ->withErrors(['cover_image' => 'The uploaded file is invalid: ' . $file->getErrorMessage()])
                        ->withInput();
                }

                $env = strtolower(config('app.env'));
                $disk = ($env === 'production' || $env === 'prod') ? 'public_uploads' : 'public';
                
                // Delete old image if exists
                if ($book->cover_image) {
                    $oldPath = str_replace(['/storage/', '/uploads/'], '', $book->cover_image);
                    $oldDisk = str_starts_with($book->cover_image, '/uploads/') ? 'public_uploads' : 'public';
                    
                    if (Storage::disk($oldDisk)->exists($oldPath)) {
                        Storage::disk($oldDisk)->delete($oldPath);
                    }
                }

                $path = $file->store('books/covers', $disk);
                
                if (!$path) {
                    Log::error('Failed to store book cover image during update', [
                        'book_id' => $book->id,
                        'file_name' => $file->getClientOriginalName(),
                        'disk' => $disk,
                    ]);
                    return redirect()->back()
                        ->withErrors(['cover_image' => 'Failed to save cover image. Please try again.'])
                        ->withInput();
                }
                
                // Set file permissions to 644 (readable by everyone)
                $fullPath = $disk === 'public_uploads' 
                    ? public_path('uploads/' . $path)
                    : storage_path('app/public/' . $path);
                    
                if (file_exists($fullPath)) {
                    chmod($fullPath, 0644);
                }
                
                $validated['cover_image'] = $disk === 'public_uploads' 
                    ? '/uploads/' . $path 
                    : '/storage/' . $path;
                    
                Log::info('Book cover image updated successfully', [
                    'book_id' => $book->id,
                    'path' => $validated['cover_image'],
                ]);
            } else {
                // Don't update cover_image if no new file is uploaded
                unset($validated['cover_image']);
            }

            $book->update($validated);

            return redirect()->route('admin.books.index')
                ->with('success', 'Book updated successfully.');
        } catch (\Exception $e) {
            Log::error('Book update error', [
                'book_id' => $book->id,
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);
            
            return redirect()->back()
                ->withErrors(['general' => 'An error occurred: ' . $e->getMessage()])
                ->withInput();
        }
    }

    public function destroy(Book $book)
    {
        // Delete cover image if exists
        if ($book->cover_image && Storage::disk('public')->exists(str_replace('/storage/', '', $book->cover_image))) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $book->cover_image));
        }

        $book->delete();

        return redirect()->route('admin.books.index')
            ->with('success', 'Book deleted successfully.');
    }
}
