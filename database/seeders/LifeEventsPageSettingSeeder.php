<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\LifeEventsPageSetting;

class LifeEventsPageSettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        LifeEventsPageSetting::updateOrCreate(
            ['id' => 1],
            [
                'page_title' => 'Life Events',
                'banner_title' => 'My Life Journey',
                'banner_subtitle' => 'Milestones & Memories',
                'banner_image' => '/assets/life_events/life_events_banner.png',
                'timeline_section_title' => 'Life Timeline',
                'timeline_section_subtitle' => 'A Journey Through Time',
            ]
        );
    }
}
