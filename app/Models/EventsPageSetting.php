<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EventsPageSetting extends Model
{
    use HasFactory;

    protected $fillable = [
        'page_title',
        'banner_title',
        'banner_vector_image',
        'banner_bottom_vector',
        'activities_section_title',
        'activities_section_description',
        'activities_image_1',
        'activities_image_2',
        'activities_image_3',
        'activities_image_4',
        'events_section_title',
        'year_filter_options',
        'default_event_image_1',
        'default_event_image_2',
        'default_event_image_3',
        'default_event_image_4',
        'default_event_image_5',
    ];

    protected $casts = [
        'year_filter_options' => 'array',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];
}
