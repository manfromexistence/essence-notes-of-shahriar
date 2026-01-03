<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Video;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class VideoUpdateTest extends TestCase
{
    use RefreshDatabase;

    protected User $user;

    protected function setUp(): void
    {
        parent::setUp();
        $this->user = User::factory()->create();
        Storage::fake('public');
    }

    /**
     * Property 6.1: Video update should persist all fields correctly
     */
    public function test_video_update_persists_all_fields(): void
    {
        $video = Video::factory()->create([
            'title' => 'Original Title',
            'description' => 'Original Description',
            'video_url' => 'https://youtube.com/watch?v=original',
            'platform' => 'YouTube',
            'category' => 'Tutorial',
            'duration' => '5:00',
            'is_short' => false,
            'views' => 100,
        ]);

        $updateData = [
            'title' => 'Updated Title',
            'description' => 'Updated Description',
            'video_url' => 'https://youtube.com/watch?v=updated',
            'platform' => 'Vimeo',
            'category' => 'Vlog',
            'duration' => '10:30',
            'is_short' => true,
            'views' => 500,
            'publish_date' => '2024-06-15',
            'order' => 5,
        ];

        $response = $this->actingAs($this->user)
            ->put(route('admin.videos.update', $video->id), $updateData);

        $response->assertRedirect(route('admin.videos.index'));

        $video->refresh();
        $this->assertEquals('Updated Title', $video->title);
        $this->assertEquals('Updated Description', $video->description);
        $this->assertEquals('https://youtube.com/watch?v=updated', $video->video_url);
        $this->assertEquals('Vimeo', $video->platform);
        $this->assertEquals('Vlog', $video->category);
        $this->assertEquals('10:30', $video->duration);
        $this->assertTrue($video->is_short);
        $this->assertEquals(500, $video->views);
    }

    /**
     * Property 6.2: Video update with POST and _method=PUT should work (method spoofing)
     */
    public function test_video_update_with_method_spoofing(): void
    {
        $video = Video::factory()->create([
            'title' => 'Original Title',
            'video_url' => 'https://youtube.com/watch?v=original',
        ]);

        $updateData = [
            '_method' => 'PUT',
            'title' => 'Spoofed Update Title',
            'video_url' => 'https://youtube.com/watch?v=spoofed',
            'publish_date' => '2024-06-15',
        ];

        $response = $this->actingAs($this->user)
            ->post("/admin/videos/{$video->id}", $updateData);

        $response->assertRedirect(route('admin.videos.index'));

        $video->refresh();
        $this->assertEquals('Spoofed Update Title', $video->title);
        $this->assertEquals('https://youtube.com/watch?v=spoofed', $video->video_url);
    }

    /**
     * Property 6.3: Video update with thumbnail should upload and persist
     */
    public function test_video_update_with_thumbnail(): void
    {
        $video = Video::factory()->create([
            'title' => 'Video with Thumbnail',
            'video_url' => 'https://youtube.com/watch?v=test',
            'thumbnail' => null,
        ]);

        $thumbnail = UploadedFile::fake()->image('new-thumbnail.jpg', 640, 360);

        $response = $this->actingAs($this->user)
            ->put(route('admin.videos.update', $video->id), [
                'title' => 'Video with Thumbnail',
                'video_url' => 'https://youtube.com/watch?v=test',
                'thumbnail' => $thumbnail,
                'publish_date' => '2024-06-15',
            ]);

        $response->assertRedirect(route('admin.videos.index'));

        $video->refresh();
        $this->assertNotNull($video->thumbnail);
        $this->assertStringContainsString('/storage/videos/', $video->thumbnail);
    }

    /**
     * Property 6.4: Video update should validate required fields
     */
    public function test_video_update_validates_required_fields(): void
    {
        $video = Video::factory()->create();

        $response = $this->actingAs($this->user)
            ->put(route('admin.videos.update', $video->id), [
                'title' => '', // Required field empty
                'video_url' => '', // Required field empty
            ]);

        $response->assertSessionHasErrors(['title', 'video_url']);
    }

    /**
     * Property 6.5: Video update should reject invalid thumbnail types
     */
    public function test_video_update_rejects_invalid_thumbnail(): void
    {
        $video = Video::factory()->create();

        $invalidFile = UploadedFile::fake()->create('document.pdf', 100, 'application/pdf');

        $response = $this->actingAs($this->user)
            ->put(route('admin.videos.update', $video->id), [
                'title' => 'Test Video',
                'video_url' => 'https://youtube.com/watch?v=test',
                'thumbnail' => $invalidFile,
                'publish_date' => '2024-06-15',
            ]);

        $response->assertSessionHasErrors(['thumbnail']);
    }

    /**
     * Property 6.6: Video update should handle boolean is_short field correctly
     */
    public function test_video_update_handles_boolean_is_short(): void
    {
        $video = Video::factory()->create([
            'is_short' => false,
        ]);

        // Update to true
        $this->actingAs($this->user)
            ->put(route('admin.videos.update', $video->id), [
                'title' => $video->title,
                'video_url' => $video->video_url,
                'is_short' => true,
                'publish_date' => '2024-06-15',
            ]);

        $video->refresh();
        $this->assertTrue($video->is_short);

        // Update back to false
        $this->actingAs($this->user)
            ->put(route('admin.videos.update', $video->id), [
                'title' => $video->title,
                'video_url' => $video->video_url,
                'is_short' => false,
                'publish_date' => '2024-06-15',
            ]);

        $video->refresh();
        $this->assertFalse($video->is_short);
    }

    /**
     * Property 6.7: Video update should require authentication
     */
    public function test_video_update_requires_authentication(): void
    {
        $video = Video::factory()->create();

        $response = $this->put(route('admin.videos.update', $video->id), [
            'title' => 'Unauthorized Update',
            'video_url' => 'https://youtube.com/watch?v=test',
        ]);

        $response->assertRedirect(route('login'));
    }

    /**
     * Property 6.8: Video update should handle non-existent video gracefully
     */
    public function test_video_update_handles_nonexistent_gracefully(): void
    {
        $response = $this->actingAs($this->user)
            ->put(route('admin.videos.update', 99999), [
                'title' => 'Test',
                'video_url' => 'https://youtube.com/watch?v=test',
            ]);

        // Controller catches exception and redirects with error
        $response->assertRedirect();
        $response->assertSessionHasErrors(['error']);
    }
}
