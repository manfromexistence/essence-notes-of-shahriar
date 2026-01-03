<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LifeEventsPageSetting extends Model
{
    use HasFactory;

    protected $fillable = [
        'page_title',
        'banner_title',
        'banner_subtitle',
        'banner_image',
        'timeline_section_title',
        'timeline_section_subtitle',
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];
}
