<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\CorporateJourneyItem;

class CorporateJourneySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $items = [
            [
                'step_number' => 1,
                'title' => 'Graduation',
                'company' => 'East West University',
                'description' => 'Master of Business Administration (M.B.A.), Banking, Corporate, Finance, and Securities Law',
                'icon_image' => '/assets/about_me/graduation_hat.png',
                'order' => 1,
                'is_active' => true
            ],
            [
                'step_number' => 2,
                'title' => 'First Job',
                'company' => 'Banking Sector',
                'description' => 'Financial Analyst, Corporate Banking Division (2008-2011)',
                'icon_image' => '/assets/about_me/search.png',
                'order' => 2,
                'is_active' => true
            ],
            [
                'step_number' => 3,
                'title' => 'Last Job',
                'company' => 'Technology Consulting Firm',
                'description' => 'Senior Consultant, Digital Solutions (2010-2011)',
                'icon_image' => '/assets/about_me/rotate_bag.png',
                'order' => 3,
                'is_active' => true
            ],
            [
                'step_number' => 4,
                'title' => 'Enterpreneur',
                'company' => 'Nexkraft LTD',
                'description' => 'Founder & CEO (2011-Present)',
                'icon_image' => '/assets/about_me/bag.svg',
                'order' => 4,
                'is_active' => true
            ],
            [
                'step_number' => 5,
                'title' => 'Nexkraft launching',
                'company' => 'Nexkraft LTD',
                'description' => 'CEO (2011)',
                'icon_image' => '/assets/about_me/nexkraft.svg',
                'order' => 5,
                'is_active' => true
            ]
        ];

        foreach ($items as $item) {
            CorporateJourneyItem::updateOrCreate(
                ['step_number' => $item['step_number']],
                $item
            );
        }
    }
}
