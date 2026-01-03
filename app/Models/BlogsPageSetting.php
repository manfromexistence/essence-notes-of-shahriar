<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BlogsPageSetting extends Model
{
    use HasFactory;

    protected $fillable = [
        'page_title',
        'banner_title',
        'banner_vector_right',
        'banner_vector_left',
        'all_blogs_section_title',
        'featured_blogs_title',
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];
}
