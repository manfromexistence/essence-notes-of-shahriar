<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Video;

class VideoSeeder extends Seeder
{
    public function run(): void
    {
        $videos = [
            [
                'title' => 'Big Buck Bunny - Open Source Animation',
                'description' => 'A beautiful open-source animated short film about a giant rabbit dealing with bullying',
                'video_url' => 'https://www.youtube.com/watch?v=aqz-KE-bpKQ',
                'thumbnail' => 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=640&h=360&fit=crop&crop=center',
                'platform' => 'youtube',
                'category' => 'Entrepreneurship',
                'duration' => 1200,
                'is_short' => false,
                'published_at' => now()->subDays(5),
                'publish_date' => now()->subDays(5),
            ],
            [
                'title' => 'Quick Coding Tip',
                'description' => '60-second quick tip for developers',
                'video_url' => 'https://www.youtube.com/watch?v=gfU1iZnjRZM',
                'thumbnail' => 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=360&h=640&fit=crop&crop=center',
                'platform' => 'youtube',
                'category' => 'Technology',
                'duration' => 60,
                'is_short' => true,
                'published_at' => now()->subDays(2),
                'publish_date' => now()->subDays(2),
            ],
            [
                'title' => 'Sintel - Open Movie Project',
                'description' => 'An epic fantasy short film about a young woman searching for her dragon',
                'video_url' => 'https://www.youtube.com/watch?v=eRsGyueVLvQ',
                'thumbnail' => 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=640&h=360&fit=crop&crop=center',
                'platform' => 'youtube',
                'category' => 'Leadership',
                'duration' => 1800,
                'is_short' => false,
                'published_at' => now()->subDays(10),
                'publish_date' => now()->subDays(10),
            ],
            [
                'title' => 'Quick Development Tutorial',
                'description' => 'Fast-paced modern development tutorial',
                'video_url' => 'https://www.youtube.com/watch?v=Dgm_Rr5JtaU',
                'thumbnail' => 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=360&h=640&fit=crop&crop=center',
                'platform' => 'youtube',
                'category' => 'Technology',
                'duration' => 45,
                'is_short' => true,
                'published_at' => now()->subDays(1),
                'publish_date' => now()->subDays(1),
            ],
            [
                'title' => 'Tears of Steel - Sci-Fi Short Film',
                'description' => 'A gripping science fiction short about a group of warriors and scientists',
                'video_url' => 'https://www.youtube.com/watch?v=R6MlUcmOul8',
                'thumbnail' => 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=640&h=360&fit=crop&crop=center',
                'platform' => 'youtube',
                'category' => 'Entrepreneurship',
                'duration' => 2400,
                'is_short' => false,
                'published_at' => now()->subWeeks(2),
                'publish_date' => now()->subWeeks(2),
            ],
            [
                'title' => 'Tech Innovation Showcase',
                'description' => 'Latest innovations in technology and software development',
                'video_url' => 'https://www.youtube.com/watch?v=YE7VzlLtp-4',
                'thumbnail' => 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=640&h=360&fit=crop&crop=center',
                'platform' => 'youtube',
                'category' => 'Technology',
                'duration' => 900,
                'is_short' => false,
                'published_at' => now()->subDays(7),
                'publish_date' => now()->subDays(7),
            ],
            [
                'title' => 'Startup Success Story',
                'description' => 'Quick story about building a successful startup',
                'video_url' => 'https://www.youtube.com/watch?v=5qap5aO4i9A',
                'thumbnail' => 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=360&h=640&fit=crop&crop=center',
                'platform' => 'youtube',
                'category' => 'Entrepreneurship',
                'duration' => 50,
                'is_short' => true,
                'published_at' => now()->subDays(3),
                'publish_date' => now()->subDays(3),
            ],
        ];

        foreach ($videos as $video) {
            Video::create($video);
        }
    }
}
