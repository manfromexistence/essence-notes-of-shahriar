<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\SocialMediaLink;

class SocialMediaLinkSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $socialLinks = [
            [
                'platform' => 'linkedin',
                'label' => 'LinkedIn',
                'url' => 'https://www.linkedin.com/in/mohammadshahriarkhan/',
                'icon' => 'linkedin',
                'order' => 1,
                'is_active' => true,
            ],
            [
                'platform' => 'dribbble',
                'label' => 'Dribbble',
                'url' => 'https://dribbble.com',
                'icon' => 'dribbble',
                'order' => 2,
                'is_active' => true,
            ],
            [
                'platform' => 'behance',
                'label' => 'Behance',
                'url' => 'https://www.behance.net',
                'icon' => 'behance',
                'order' => 3,
                'is_active' => true,
            ],
        ];

        foreach ($socialLinks as $link) {
            SocialMediaLink::updateOrCreate(
                ['platform' => $link['platform']],
                $link
            );
        }
    }
}
