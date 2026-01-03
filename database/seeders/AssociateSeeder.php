<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Associate;

class AssociateSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $associates = [
            [
                'name' => 'E-Club',
                'logo_image' => '/assets/about_me/e-club.svg',
                'url' => null,
                'order' => 1,
                'is_active' => true
            ],
            [
                'name' => 'BASIS',
                'logo_image' => '/assets/about_me/basis.svg',
                'url' => null,
                'order' => 2,
                'is_active' => true
            ],
            [
                'name' => 'BASIS',
                'logo_image' => '/assets/about_me/basis.svg',
                'url' => null,
                'order' => 3,
                'is_active' => true
            ],
            [
                'name' => 'BASIS',
                'logo_image' => '/assets/about_me/basis.svg',
                'url' => null,
                'order' => 4,
                'is_active' => true
            ]
        ];

        foreach ($associates as $associate) {
            Associate::create($associate);
        }
    }
}
