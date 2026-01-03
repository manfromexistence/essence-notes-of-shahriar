<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\VideosPageSetting;

class VideosPageSettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        VideosPageSetting::updateOrCreate(
            ['id' => 1],
            [
                'page_title' => 'Videos',
                'banner_title' => 'Video Gallery',
                'banner_subtitle' => 'Watch My Journey & Insights',
                'banner_description' => 'Explore a comprehensive collection of videos showcasing my journey, insights, and experiences.',
                'banner_image' => '/assets/videos/banner.jpg',
                'all_videos_title' => 'All Videos',
                'all_videos_description' => 'Browse through all available videos.',
                'short_videos_title' => 'Short Videos',
                'short_videos_description' => 'Quick insights and highlights in bite-sized format.',
            ]
        );
    }
}
