<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\AboutMePageSetting;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class AboutMeSectionsTest extends TestCase
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
     * Property 10.1: Banner section update should persist all fields
     */
    public function test_banner_section_update_persists_all_fields(): void
    {
        AboutMePageSetting::create([]);

        $response = $this->actingAs($this->user)
            ->post(route('admin.about-me-page-settings.update-banner'), [
                'label' => 'About Me',
                'title' => 'My Story',
                'video_url' => 'https://youtube.com/watch?v=test123',
            ]);

        $response->assertRedirect();

        $settings = AboutMePageSetting::first();
        $this->assertEquals('About Me', $settings->banner['label']);
        $this->assertEquals('My Story', $settings->banner['title']);
        $this->assertEquals('https://youtube.com/watch?v=test123', $settings->banner['video_url']);
    }

    /**
     * Property 10.2: Report section update should persist all stats
     */
    public function test_report_section_update_persists_all_stats(): void
    {
        AboutMePageSetting::create([]);

        $response = $this->actingAs($this->user)
            ->post(route('admin.about-me-page-settings.update-report'), [
                'description' => 'My professional journey',
                'stat_1_value' => '10+',
                'stat_1_label' => 'Years Experience',
                'stat_2_value' => '50+',
                'stat_2_label' => 'Projects',
            ]);

        $response->assertRedirect();

        $settings = AboutMePageSetting::first();
        $this->assertEquals('My professional journey', $settings->report['description']);
        $this->assertEquals('10+', $settings->report['stat_1_value']);
        $this->assertEquals('Years Experience', $settings->report['stat_1_label']);
    }

    /**
     * Property 10.3: Corporate journey section update should persist
     */
    public function test_corporate_journey_section_update_persists(): void
    {
        AboutMePageSetting::create([]);

        $response = $this->actingAs($this->user)
            ->post(route('admin.about-me-page-settings.update-corporate'), [
                'title' => 'Corporate Journey',
                'philosophy_title' => 'My Philosophy',
                'logic_theory_title' => 'Logic Theory',
                'logic_theory_content_1' => 'First content block',
                'logic_theory_content_2' => 'Second content block',
            ]);

        $response->assertRedirect();

        $settings = AboutMePageSetting::first();
        $this->assertEquals('Corporate Journey', $settings->corporate_journey['title']);
        $this->assertEquals('My Philosophy', $settings->corporate_journey['philosophy_title']);
        $this->assertEquals('Logic Theory', $settings->corporate_journey['logic_theory_title']);
    }

    /**
     * Property 10.4: Associates section update should persist
     */
    public function test_associates_section_update_persists(): void
    {
        AboutMePageSetting::create([]);

        $response = $this->actingAs($this->user)
            ->post(route('admin.about-me-page-settings.update-associates'), [
                'title' => 'My Associates',
                'description' => 'People I work with',
            ]);

        $response->assertRedirect();

        $settings = AboutMePageSetting::first();
        $this->assertEquals('My Associates', $settings->associates['title']);
        $this->assertEquals('People I work with', $settings->associates['description']);
    }

    /**
     * Property 10.5: Travel section update should persist
     */
    public function test_travel_section_update_persists(): void
    {
        AboutMePageSetting::create([]);

        $response = $this->actingAs($this->user)
            ->post(route('admin.about-me-page-settings.update-travel'), [
                'title' => 'My Travels',
                'description' => 'Countries I have visited',
            ]);

        $response->assertRedirect();

        $settings = AboutMePageSetting::first();
        $this->assertEquals('My Travels', $settings->travel['title']);
        $this->assertEquals('Countries I have visited', $settings->travel['description']);
    }

    /**
     * Property 10.6: Impact section update should persist
     */
    public function test_impact_section_update_persists(): void
    {
        AboutMePageSetting::create([]);

        $response = $this->actingAs($this->user)
            ->post(route('admin.about-me-page-settings.update-impact'), [
                'entrepreneur_title' => 'Entrepreneurship',
                'entrepreneur_description' => 'My entrepreneurial journey',
                'technology_title' => 'Technology',
                'technology_description' => 'Tech innovations',
            ]);

        $response->assertRedirect();

        $settings = AboutMePageSetting::first();
        $this->assertEquals('Entrepreneurship', $settings->impact['entrepreneur_title']);
        $this->assertEquals('My entrepreneurial journey', $settings->impact['entrepreneur_description']);
        $this->assertEquals('Technology', $settings->impact['technology_title']);
    }

    /**
     * Property 10.7: Frontend API returns all section data
     */
    public function test_frontend_returns_all_section_data(): void
    {
        AboutMePageSetting::create([
            'banner' => ['label' => 'Test Label', 'title' => 'Test Title'],
            'report' => ['description' => 'Test Report'],
            'corporate_journey' => ['title' => 'Corporate'],
            'associates' => ['title' => 'Associates'],
            'travel' => ['title' => 'Travel'],
            'impact' => ['entrepreneur_title' => 'Impact'],
        ]);

        $response = $this->get(route('about-me'));

        $response->assertOk();
        $response->assertInertia(fn ($page) => $page
            ->component('AboutMe/Page/AboutMe')
            ->has('pageContent.banner')
            ->has('pageContent.report')
            ->has('pageContent.corporate_journey')
            ->has('pageContent.associates')
            ->has('pageContent.travel')
            ->has('pageContent.impact')
        );
    }

    /**
     * Property 10.8: Section updates require authentication
     */
    public function test_section_updates_require_authentication(): void
    {
        AboutMePageSetting::create([]);

        $response = $this->post(route('admin.about-me-page-settings.update-banner'), [
            'label' => 'Test',
        ]);

        $response->assertRedirect(route('login'));
    }

    /**
     * Property 10.9: Banner image upload should persist
     */
    public function test_banner_image_upload_persists(): void
    {
        AboutMePageSetting::create([]);
        $image = UploadedFile::fake()->image('banner.jpg', 1920, 1080);

        $response = $this->actingAs($this->user)
            ->post(route('admin.about-me-page-settings.update-banner'), [
                'label' => 'Test',
                'title' => 'Test Title',
                'banner_image' => $image,
            ]);

        $response->assertRedirect();

        $settings = AboutMePageSetting::first();
        $this->assertNotNull($settings->banner['banner_image']);
        $this->assertStringContainsString('/storage/', $settings->banner['banner_image']);
    }
}
