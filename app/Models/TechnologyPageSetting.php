<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TechnologyPageSetting extends Model
{
    use HasFactory;

    protected $fillable = [
        'page_title',
        'banner_title',
        'banner_subtitle',
        'banner_image',
        'banner_description',
        'cybersecurity_title',
        'cybersecurity_description',
        'cybersecurity_additional_description',
        'cybersecurity_image',
        'contribution_title',
        'contribution_description',
        'contribution_image',
        'tools_title',
        'tools_description',
        'certificates_title',
        'certificates_description',
        'blogs_title',
        'section_title',
        'section_description',
        'android_icon_svg',
        'cursor_icon_svg',
        'github_icon_svg',
        'nextjs_icon_svg',
        'tailwind_icon_svg',
        'react_icon_svg',
        'vercel_icon_svg',
        'laravel_icon_svg',
        'google_cloud_icon_svg',
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];
}
