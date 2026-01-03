<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DonationPageSetting extends Model
{
    use HasFactory;

    protected $fillable = [
        'page_title',
        'banner_quote',
        'banner_subtitle',
        'banner_default_image',
        'donate_section_title',
        'donate_section_description',
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];
}
