<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PageContent extends Model
{
    protected $fillable = [
        'page',
        'section',
        'key',
        'value',
        'type',
        'order',
        'is_active',
        'metadata'
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'metadata' => 'array',
        'order' => 'integer'
    ];

    /**
     * Get content by page and section
     */
    public static function getPageSection($page, $section)
    {
        return self::where('page', $page)
            ->where('section', $section)
            ->where('is_active', true)
            ->orderBy('order')
            ->get()
            ->pluck('value', 'key');
    }

    /**
     * Get all content for a page grouped by section
     */
    public static function getPageContent($page)
    {
        return self::where('page', $page)
            ->where('is_active', true)
            ->orderBy('order')
            ->get()
            ->groupBy('section')
            ->map(function ($items) {
                return $items->pluck('value', 'key');
            });
    }
}
