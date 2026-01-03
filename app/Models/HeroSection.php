<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HeroSection extends Model
{
    use HasFactory;

    /**
     * Default social media platforms with their icons and labels
     */
    public const DEFAULT_PLATFORMS = [
        'linkedin' => ['label' => 'LinkedIn', 'icon' => 'linkedin'],
        'dribbble' => ['label' => 'Dribbble', 'icon' => 'dribbble'],
        'behance' => ['label' => 'Behance', 'icon' => 'behance'],
    ];

    protected $fillable = [
        'title',
        'subtitle',
        'subtitle_max_length',
        'image_url',
        'tagline',
        'tagline_max_length',
        'description',
        'description_max_length',
        'social_links',
        'social_link_settings',
        'font_settings',
        'is_active',
        'order',
    ];

    protected $casts = [
        'social_links' => 'array',
        'social_link_settings' => 'array',
        'font_settings' => 'array',
        'is_active' => 'boolean',
    ];

    protected $attributes = [
        'subtitle_max_length' => 200,
        'tagline_max_length' => 50,
        'description_max_length' => 150,
    ];

    /**
     * Get only active social links with their settings
     */
    public function getActiveSocialLinksAttribute(): array
    {
        $socialLinks = $this->social_links ?? [];
        $settings = $this->social_link_settings ?? [];
        
        $activeLinks = [];
        
        foreach ($socialLinks as $platform => $url) {
            // Only allow supported platforms
            if (!array_key_exists($platform, self::DEFAULT_PLATFORMS)) {
                continue;
            }
            
            // Skip if URL is empty, null, or just whitespace
            if (empty($url) || trim($url) === '') {
                continue;
            }
            
            // Check if this platform has settings
            $platformSettings = collect($settings)->firstWhere('platform', $platform);
            
            // Determine if active - check is_active flag strictly
            // If settings exist, use the is_active value (default to true if not set)
            // If no settings exist, default to active
            $isActive = true;
            if ($platformSettings !== null) {
                // Explicitly check for false (handles both boolean false and string "false")
                $isActive = filter_var($platformSettings['is_active'] ?? true, FILTER_VALIDATE_BOOLEAN);
            }
            
            // Only include if active
            if ($isActive) {
                $defaultPlatform = self::DEFAULT_PLATFORMS[$platform];
                $activeLinks[] = [
                    'platform' => $platform,
                    'url' => $url,
                    'label' => $platformSettings['label'] ?? $defaultPlatform['label'],
                    'icon' => $defaultPlatform['icon'],
                ];
            }
        }
        
        return $activeLinks;
    }

    /**
     * Get available platforms list
     */
    public static function getAvailablePlatforms(): array
    {
        return self::DEFAULT_PLATFORMS;
    }
}
