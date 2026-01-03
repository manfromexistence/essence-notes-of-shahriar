<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\BlogsPageSetting;

class BlogsPageSettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        BlogsPageSetting::updateOrCreate(
            ['id' => 1],
            [
                'page_title' => 'Blogs',
                'banner_title' => 'Latest Blogs & Insights',
                'banner_vector_right' => '/assets/blogs/vector_right.svg',
                'banner_vector_left' => '/assets/blogs/vector_left.svg',
                'all_blogs_section_title' => 'All Blogs',
                'featured_blogs_title' => 'Featured Blogs',
            ]
        );
    }
}
