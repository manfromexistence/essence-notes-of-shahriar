<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FeaturedBlogBanner extends Model
{
    protected $fillable = [
        'title',
        'image',
        'date',
        'read_time',
        'size',
        'order',
        'is_active',
        'blog_post_id',
        'slug'
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'order' => 'integer',
        'date' => 'date'
    ];

    public function blog()
    {
        return $this->belongsTo(BlogPost::class, 'blog_post_id');
    }
}
