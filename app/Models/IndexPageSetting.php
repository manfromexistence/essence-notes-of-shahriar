<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class IndexPageSetting extends Model
{
    use HasFactory;

    protected $fillable = [
        'title_text',
        'hero_image',
        'button_text',
        'button_link',
        'is_active',
        'social_media_display_limit',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'social_media_display_limit' => 'integer',
    ];

    public function logos()
    {
        return $this->hasMany(IndexPageLogo::class)->orderBy('display_order');
    }

    public function activeLogos()
    {
        return $this->hasMany(IndexPageLogo::class)->where('is_active', true)->orderBy('display_order');
    }
}
