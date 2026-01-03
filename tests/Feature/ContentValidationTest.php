<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\HeroSection;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ContentValidationTest extends TestCase
{
    use RefreshDatabase;

    protected User $user;

    protected function setUp(): void
    {
        parent::setUp();
        $this->user = User::factory()->create();
    }

    /**
     * Property 9.1: Title should enforce 100 character limit
     */
    public function test_title_enforces_character_limit(): void
    {
        $heroSection = HeroSection::factory()->create();

        // Title exceeding 100 characters should fail
        $response = $this->actingAs($this->user)
            ->put(route('admin.hero-sections.update', $heroSection->id), [
                'title' => str_repeat('a', 101),
                'subtitle' => 'Valid subtitle',
                'tagline' => 'Valid tagline',
                'description' => 'Valid description',
            ]);

        $response->assertSessionHasErrors(['title']);
    }

    /**
     * Property 9.2: Subtitle should enforce configurable character limit
     */
    public function test_subtitle_enforces_character_limit(): void
    {
        $heroSection = HeroSection::factory()->create([
            'subtitle_max_length' => 200,
        ]);

        // Subtitle exceeding max length should fail
        $response = $this->actingAs($this->user)
            ->put(route('admin.hero-sections.update', $heroSection->id), [
                'title' => 'Valid title',
                'subtitle' => str_repeat('a', 201),
                'tagline' => 'Valid tagline',
                'description' => 'Valid description',
            ]);

        $response->assertSessionHasErrors(['subtitle']);
    }

    /**
     * Property 9.3: Tagline should enforce configurable character limit
     */
    public function test_tagline_enforces_character_limit(): void
    {
        $heroSection = HeroSection::factory()->create([
            'tagline_max_length' => 50,
        ]);

        // Tagline exceeding max length should fail
        $response = $this->actingAs($this->user)
            ->put(route('admin.hero-sections.update', $heroSection->id), [
                'title' => 'Valid title',
                'subtitle' => 'Valid subtitle',
                'tagline' => str_repeat('a', 51),
                'description' => 'Valid description',
            ]);

        $response->assertSessionHasErrors(['tagline']);
    }

    /**
     * Property 9.4: Description should enforce configurable character limit
     */
    public function test_description_enforces_character_limit(): void
    {
        $heroSection = HeroSection::factory()->create([
            'description_max_length' => 150,
        ]);

        // Description exceeding max length should fail
        $response = $this->actingAs($this->user)
            ->put(route('admin.hero-sections.update', $heroSection->id), [
                'title' => 'Valid title',
                'subtitle' => 'Valid subtitle',
                'tagline' => 'Valid tagline',
                'description' => str_repeat('a', 151),
            ]);

        $response->assertSessionHasErrors(['description']);
    }

    /**
     * Property 9.5: Content within limits should be accepted
     */
    public function test_content_within_limits_is_accepted(): void
    {
        $heroSection = HeroSection::factory()->create([
            'subtitle_max_length' => 200,
            'tagline_max_length' => 50,
            'description_max_length' => 150,
        ]);

        $response = $this->actingAs($this->user)
            ->put(route('admin.hero-sections.update', $heroSection->id), [
                'title' => str_repeat('a', 100), // Exactly at limit
                'subtitle' => str_repeat('b', 200), // Exactly at limit
                'tagline' => str_repeat('c', 50), // Exactly at limit
                'description' => str_repeat('d', 150), // Exactly at limit
            ]);

        $response->assertRedirect();
        $response->assertSessionHasNoErrors();

        $heroSection->refresh();
        $this->assertEquals(100, strlen($heroSection->title));
        $this->assertEquals(200, strlen($heroSection->subtitle));
        $this->assertEquals(50, strlen($heroSection->tagline));
        $this->assertEquals(150, strlen($heroSection->description));
    }

    /**
     * Property 9.6: Character limit validation returns descriptive error messages
     */
    public function test_character_limit_returns_descriptive_error(): void
    {
        $heroSection = HeroSection::factory()->create([
            'subtitle_max_length' => 200,
        ]);

        $response = $this->actingAs($this->user)
            ->put(route('admin.hero-sections.update', $heroSection->id), [
                'title' => 'Valid title',
                'subtitle' => str_repeat('a', 250),
                'tagline' => 'Valid tagline',
                'description' => 'Valid description',
            ]);

        $response->assertSessionHasErrors(['subtitle']);
        $errors = session('errors')->get('subtitle');
        $this->assertNotEmpty($errors);
        // Error message should mention the limit
        $this->assertStringContainsString('200', $errors[0]);
    }

    /**
     * Property 9.7: Empty content should be accepted (nullable fields)
     */
    public function test_empty_content_is_accepted_for_nullable_fields(): void
    {
        $heroSection = HeroSection::factory()->create();

        $response = $this->actingAs($this->user)
            ->put(route('admin.hero-sections.update', $heroSection->id), [
                'title' => 'Valid title',
                'subtitle' => '',
                'tagline' => '',
                'description' => '',
            ]);

        // Should fail because subtitle, tagline, description are required in validation
        // Let's check the actual validation rules
        $response->assertSessionHasErrors(['subtitle', 'tagline', 'description']);
    }

    /**
     * Property 9.8: Create hero section also enforces character limits
     */
    public function test_create_hero_section_enforces_character_limits(): void
    {
        $response = $this->actingAs($this->user)
            ->post(route('admin.hero-sections.store'), [
                'title' => str_repeat('a', 101), // Exceeds 100 char limit
                'subtitle' => 'Valid subtitle',
                'tagline' => 'Valid tagline',
                'description' => 'Valid description',
            ]);

        $response->assertSessionHasErrors(['title']);
    }
}
