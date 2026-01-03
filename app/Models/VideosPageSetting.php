<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VideosPageSetting extends Model
{
    use HasFactory;

    protected $fillable = [
        'page_title',
        'banner_title',
        'banner_subtitle',
        'banner_description',
        'banner_image',
        'all_videos_title',
        'all_videos_description',
        'short_videos_title',
        'short_videos_description',
        'banner_videos',
        'all_videos',
        'short_videos',
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'banner_videos' => 'array',
        'all_videos' => 'array',
        'short_videos' => 'array',
    ];
}
