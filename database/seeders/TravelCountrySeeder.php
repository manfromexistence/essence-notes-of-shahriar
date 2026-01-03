<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\TravelCountry;

class TravelCountrySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $countries = [
            ['name' => 'Turkey', 'flag_image' => null, 'order' => 1, 'is_active' => true],
            ['name' => 'Canada', 'flag_image' => null, 'order' => 2, 'is_active' => true],
            ['name' => 'China', 'flag_image' => null, 'order' => 3, 'is_active' => true],
            ['name' => 'USA', 'flag_image' => null, 'order' => 4, 'is_active' => true],
        ];

        foreach ($countries as $country) {
            TravelCountry::updateOrCreate(
                ['name' => $country['name']],
                $country
            );
        }
    }
}
