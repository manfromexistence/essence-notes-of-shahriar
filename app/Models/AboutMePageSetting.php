<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AboutMePageSetting extends Model
{
    use HasFactory;

    protected $fillable = [
        'banner',
        'report',
        'awards',
        'story',
        'impact',
        'travel',
        'corporate_journey',
        'associates',
    ];

    protected $casts = [
        'banner' => 'array',
        'report' => 'array',
        'awards' => 'array',
        'story' => 'array',
        'impact' => 'array',
        'travel' => 'array',
        'corporate_journey' => 'array',
        'associates' => 'array',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];
}
