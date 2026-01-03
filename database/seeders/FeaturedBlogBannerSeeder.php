<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\FeaturedBlogBanner;
use Carbon\Carbon;

class FeaturedBlogBannerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $banners = [
            [
                'title' => 'Code Warriors Assemble! Bangladesh Prepares for ICT Olympiad Glory.',
                'image' => '/assets/blogs/img1.png',
                'date' => Carbon::parse('2023-08-20'),
                'read_time' => '10 Min Read',
                'size' => 'large',
                'order' => 1,
                'is_active' => true,
                'slug' => 'future-of-ai-in-bangladeshi-businesses'
            ],
            [
                'title' => 'Cybersecurity Best Practices for SMEs',
                'image' => '/assets/blogs/img2.png',
                'date' => Carbon::parse('2023-08-20'),
                'read_time' => '10 Min Read',
                'size' => 'medium',
                'order' => 2,
                'is_active' => true,
                'slug' => 'cybersecurity-best-practices-for-smes'
            ],
            [
                'title' => 'Digital Transformation Strategies',
                'image' => '/assets/blogs/img3.png',
                'date' => Carbon::parse('2023-08-20'),
                'read_time' => '10 Min Read',
                'size' => 'medium',
                'order' => 3,
                'is_active' => true,
                'slug' => 'digital-transformation-strategies'
            ],
            [
                'title' => 'Cloud Computing Trends in 2024',
                'image' => '/assets/blogs/img4.png',
                'date' => Carbon::parse('2023-08-20'),
                'read_time' => '10 Min Read',
                'size' => 'medium',
                'order' => 4,
                'is_active' => true,
                'slug' => 'cloud-computing-trends-2024'
            ],
            [
                'title' => 'Building Scalable Tech Startups',
                'image' => '/assets/blogs/img5.png',
                'date' => Carbon::parse('2023-08-20'),
                'read_time' => '10 Min Read',
                'size' => 'medium',
                'order' => 5,
                'is_active' => true,
                'slug' => 'building-scalable-tech-startups'
            ]
        ];

        foreach ($banners as $banner) {
            FeaturedBlogBanner::updateOrCreate(
                ['title' => $banner['title']],
                $banner
            );
        }
    }
}
