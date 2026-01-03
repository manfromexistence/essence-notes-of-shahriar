<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CorporateJourneyItem extends Model
{
    protected $fillable = [
        'step_number',
        'title',
        'company',
        'description',
        'icon_image',
        'order',
        'is_active'
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'step_number' => 'integer',
        'order' => 'integer'
    ];

    public function getIconUrlAttribute()
    {
        if (!$this->icon_image) {
            return null;
        }
        
        if (str_starts_with($this->icon_image, 'http')) {
            return $this->icon_image;
        }
        
        return asset('storage/' . $this->icon_image);
    }
}
