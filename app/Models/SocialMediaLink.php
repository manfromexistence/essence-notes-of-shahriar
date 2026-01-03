<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SocialMediaLink extends Model
{
    protected $fillable = [
        'platform',
        'label',
        'url',
        'icon',
        'order',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'order' => 'integer',
    ];

    /**
     * Available social media platforms with their default icons
     */
    public const AVAILABLE_PLATFORMS = [
        'facebook' => ['label' => 'Facebook', 'icon' => 'facebook'],
        'twitter' => ['label' => 'Twitter', 'icon' => 'twitter'],
        'instagram' => ['label' => 'Instagram', 'icon' => 'instagram'],
        'linkedin' => ['label' => 'LinkedIn', 'icon' => 'linkedin'],
        'youtube' => ['label' => 'YouTube', 'icon' => 'youtube'],
        'tiktok' => ['label' => 'TikTok', 'icon' => 'tiktok'],
        'dribbble' => ['label' => 'Dribbble', 'icon' => 'dribbble'],
        'behance' => ['label' => 'Behance', 'icon' => 'behance'],
        'github' => ['label' => 'GitHub', 'icon' => 'github'],
        'pinterest' => ['label' => 'Pinterest', 'icon' => 'pinterest'],
        'reddit' => ['label' => 'Reddit', 'icon' => 'reddit'],
        'snapchat' => ['label' => 'Snapchat', 'icon' => 'snapchat'],
        'whatsapp' => ['label' => 'WhatsApp', 'icon' => 'whatsapp'],
        'telegram' => ['label' => 'Telegram', 'icon' => 'telegram'],
        'discord' => ['label' => 'Discord', 'icon' => 'discord'],
        'twitch' => ['label' => 'Twitch', 'icon' => 'twitch'],
    ];

    /**
     * Scope to get only active social links
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope to order by display order
     */
    public function scopeOrdered($query)
    {
        return $query->orderBy('order', 'asc');
    }
}
