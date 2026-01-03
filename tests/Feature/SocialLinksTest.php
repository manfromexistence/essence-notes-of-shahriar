<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\HeroSection;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class SocialLinksTest extends TestCase
{
    use RefreshDatabase;

    protected User $user;

    protected function setUp(): void
    {
        parent::setUp();
        $this->user = User::factory()->create();
    }

    /**
     * Property 7.1: Social link toggle should persist active status
     */
    public function test_social_link_toggle_persists_active_status(): void
    {
        $heroSection = HeroSection::factory()->create([
            'social_links' => ['linkedin' => 'https://linkedin.com/in/test'],
            'social_link_settings' => [],
        ]);

        // Toggle to inactive
        $response = $this->actingAs($this->user)
            ->postJson("/admin/hero-sections/{$heroSection->id}/toggle-social-link", [
                'platform' => 'linkedin',
                'is_active' => false,
            ]);

        $response->assertOk();
        $response->assertJson(['success' => true]);

        $heroSection->refresh();
        $settings = $heroSection->social_link_settings;
        $linkedinSetting = collect($settings)->firstWhere('platform', 'linkedin');
        $this->assertFalse($linkedinSetting['is_active']);

        // Toggle back to active
        $response = $this->actingAs($this->user)
            ->postJson("/admin/hero-sections/{$heroSection->id}/toggle-social-link", [
                'platform' => 'linkedin',
                'is_active' => true,
            ]);

        $response->assertOk();
        $heroSection->refresh();
        $settings = $heroSection->social_link_settings;
        $linkedinSetting = collect($settings)->firstWhere('platform', 'linkedin');
        $this->assertTrue($linkedinSetting['is_active']);
    }

    /**
     * Property 7.2: Social link label update should persist
     */
    public function test_social_link_label_update_persists(): void
    {
        $heroSection = HeroSection::factory()->create([
            'social_links' => ['twitter' => 'https://twitter.com/test'],
            'social_link_settings' => [],
        ]);

        $response = $this->actingAs($this->user)
            ->postJson("/admin/hero-sections/{$heroSection->id}/update-social-link-label", [
                'platform' => 'twitter',
                'label' => 'Follow me on X',
            ]);

        $response->assertOk();
        $response->assertJson(['success' => true]);

        $heroSection->refresh();
        $settings = $heroSection->social_link_settings;
        $twitterSetting = collect($settings)->firstWhere('platform', 'twitter');
        $this->assertEquals('Follow me on X', $twitterSetting['label']);
    }

    /**
     * Property 7.3: Social link CRUD through hero section update
     */
    public function test_social_links_crud_through_hero_section_update(): void
    {
        $heroSection = HeroSection::factory()->create([
            'social_links' => [],
        ]);

        // Add social links (using platforms that are validated in controller)
        $response = $this->actingAs($this->user)
            ->put(route('admin.hero-sections.update', $heroSection->id), [
                'title' => $heroSection->title,
                'subtitle' => $heroSection->subtitle,
                'tagline' => $heroSection->tagline,
                'description' => $heroSection->description,
                'social_links' => [
                    'linkedin' => 'https://linkedin.com/in/newuser',
                    'dribbble' => 'https://dribbble.com/newuser',
                ],
            ]);

        $response->assertRedirect();

        $heroSection->refresh();
        $this->assertEquals('https://linkedin.com/in/newuser', $heroSection->social_links['linkedin']);
        $this->assertEquals('https://dribbble.com/newuser', $heroSection->social_links['dribbble']);
    }

    /**
     * Property 8.1: Active social links filter returns only active links
     */
    public function test_active_social_links_filter_returns_only_active(): void
    {
        $heroSection = HeroSection::factory()->create([
            'social_links' => [
                'linkedin' => 'https://linkedin.com/in/test',
                'twitter' => 'https://twitter.com/test',
                'github' => 'https://github.com/test',
            ],
            'social_link_settings' => [
                ['platform' => 'linkedin', 'label' => 'LinkedIn', 'is_active' => true],
                ['platform' => 'twitter', 'label' => 'Twitter', 'is_active' => false],
                ['platform' => 'github', 'label' => 'GitHub', 'is_active' => true],
            ],
        ]);

        $activeLinks = $heroSection->active_social_links;

        $this->assertCount(2, $activeLinks);
        $platforms = array_column($activeLinks, 'platform');
        $this->assertContains('linkedin', $platforms);
        $this->assertContains('github', $platforms);
        $this->assertNotContains('twitter', $platforms);
    }

    /**
     * Property 8.2: Empty social links should return empty active links
     */
    public function test_empty_social_links_returns_empty_active(): void
    {
        $heroSection = HeroSection::factory()->create([
            'social_links' => [],
            'social_link_settings' => [],
        ]);

        $activeLinks = $heroSection->active_social_links;
        $this->assertEmpty($activeLinks);
    }

    /**
     * Property 8.3: Social links without settings default to active
     */
    public function test_social_links_without_settings_default_to_active(): void
    {
        $heroSection = HeroSection::factory()->create([
            'social_links' => [
                'linkedin' => 'https://linkedin.com/in/test',
                'twitter' => 'https://twitter.com/test',
            ],
            'social_link_settings' => [], // No settings
        ]);

        $activeLinks = $heroSection->active_social_links;

        // Both should be active by default
        $this->assertCount(2, $activeLinks);
    }

    /**
     * Property 8.4: Toggle requires authentication
     */
    public function test_toggle_social_link_requires_authentication(): void
    {
        $heroSection = HeroSection::factory()->create();

        $response = $this->postJson("/admin/hero-sections/{$heroSection->id}/toggle-social-link", [
            'platform' => 'linkedin',
            'is_active' => false,
        ]);

        $response->assertUnauthorized();
    }

    /**
     * Property 8.5: Label update validates max length
     */
    public function test_label_update_validates_max_length(): void
    {
        $heroSection = HeroSection::factory()->create();

        $response = $this->actingAs($this->user)
            ->postJson("/admin/hero-sections/{$heroSection->id}/update-social-link-label", [
                'platform' => 'linkedin',
                'label' => str_repeat('a', 51), // Exceeds 50 char limit
            ]);

        $response->assertStatus(422);
        $response->assertJsonValidationErrors(['label']);
    }
}
