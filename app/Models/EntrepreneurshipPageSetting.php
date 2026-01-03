<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EntrepreneurshipPageSetting extends Model
{
    use HasFactory;

    protected $fillable = [
        'page_title',
        'banner_quote',
        'banner_quote_label',
        'banner_image',
        'quotes_section_title',
        'quotes',
        'innovation_section_title',
        'innovation_section_subtitle',
        'innovations',
        'events_section_title',
        'events_button_text',
        'blogs_section_title',
        'blogs_button_text',
        'blogs_show_less_text',
    ];

    protected $casts = [
        'quotes' => 'array',
        'innovations' => 'array',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];
}
