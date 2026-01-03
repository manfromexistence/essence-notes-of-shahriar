<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Associate extends Model
{
    protected $fillable = [
        'name',
        'logo_image',
        'url',
        'order',
        'is_active'
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'order' => 'integer'
    ];

    public function getLogoUrlAttribute()
    {
        if (!$this->logo_image) {
            return null;
        }
        
        if (str_starts_with($this->logo_image, 'http')) {
            return $this->logo_image;
        }
        
        return asset('storage/' . $this->logo_image);
    }
}
