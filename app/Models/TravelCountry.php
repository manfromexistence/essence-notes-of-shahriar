<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TravelCountry extends Model
{
    protected $fillable = [
        'name',
        'flag_image',
        'order',
        'is_active'
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'order' => 'integer'
    ];

    protected $appends = ['flag_url'];

    public function getFlagUrlAttribute()
    {
        if (!$this->flag_image) {
            return null;
        }
        
        if (str_starts_with($this->flag_image, 'http')) {
            return $this->flag_image;
        }
        
        return asset('storage/' . $this->flag_image);
    }
}
