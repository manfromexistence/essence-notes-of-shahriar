<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\PageContent;

class PageContentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $contents = [
            // About Me Page - Banner Section
            ['page' => 'about', 'section' => 'banner', 'key' => 'video_thumbnail', 'value' => '/assets/about_me/video_img.png', 'type' => 'image', 'order' => 1],
            ['page' => 'about', 'section' => 'banner', 'key' => 'video_url', 'value' => 'https://www.youtube.com/embed/UGrFGCf5NWY?si=YCA7UJNOqxa3mvCU', 'type' => 'url', 'order' => 2],
            ['page' => 'about', 'section' => 'banner', 'key' => 'label', 'value' => 'About Me', 'type' => 'text', 'order' => 3],
            ['page' => 'about', 'section' => 'banner', 'key' => 'title', 'value' => 'Remarkable lives respond to a greater purpose.', 'type' => 'textarea', 'order' => 4],
            ['page' => 'about', 'section' => 'banner', 'key' => 'banner_image', 'value' => '/assets/about_me/about_me_banner.png', 'type' => 'image', 'order' => 5],

            // About Me Page - Report Section (Statistics)
            ['page' => 'about', 'section' => 'report', 'key' => 'stat_1_value', 'value' => '11', 'type' => 'text', 'order' => 1],
            ['page' => 'about', 'section' => 'report', 'key' => 'stat_1_label', 'value' => 'Years Journey', 'type' => 'text', 'order' => 2],
            ['page' => 'about', 'section' => 'report', 'key' => 'stat_2_value', 'value' => '200', 'type' => 'text', 'order' => 3],
            ['page' => 'about', 'section' => 'report', 'key' => 'stat_2_label', 'value' => 'Projects', 'type' => 'text', 'order' => 4],
            ['page' => 'about', 'section' => 'report', 'key' => 'stat_3_value', 'value' => '6', 'type' => 'text', 'order' => 5],
            ['page' => 'about', 'section' => 'report', 'key' => 'stat_3_label', 'value' => 'Certification', 'type' => 'text', 'order' => 6],
            ['page' => 'about', 'section' => 'report', 'key' => 'stat_4_value', 'value' => '5', 'type' => 'text', 'order' => 7],
            ['page' => 'about', 'section' => 'report', 'key' => 'stat_4_label', 'value' => 'Int Article', 'type' => 'text', 'order' => 8],
            ['page' => 'about', 'section' => 'report', 'key' => 'stat_5_value', 'value' => '4', 'type' => 'text', 'order' => 9],
            ['page' => 'about', 'section' => 'report', 'key' => 'stat_5_label', 'value' => 'Books', 'type' => 'text', 'order' => 10],
            ['page' => 'about', 'section' => 'report', 'key' => 'stat_6_value', 'value' => '4', 'type' => 'text', 'order' => 11],
            ['page' => 'about', 'section' => 'report', 'key' => 'stat_6_label', 'value' => 'Books', 'type' => 'text', 'order' => 12],
            ['page' => 'about', 'section' => 'report', 'key' => 'stat_7_value', 'value' => '100', 'type' => 'text', 'order' => 13],
            ['page' => 'about', 'section' => 'report', 'key' => 'stat_7_label', 'value' => 'Mentoring', 'type' => 'text', 'order' => 14],
            ['page' => 'about', 'section' => 'report', 'key' => 'description', 'value' => 'Living an extraordinary life means shaping it on your terms, filled with deep meaning and significant impact. Fueled by the quest for excellence and a strong sense of purpose, Shahriar Khan has motivated millions to dream boldly and strive for greater heights.', 'type' => 'textarea', 'order' => 15],

            // About Me Page - Corporate Journey Section
            ['page' => 'about', 'section' => 'corporate_journey', 'key' => 'title', 'value' => 'Corporate Journey', 'type' => 'text', 'order' => 1],
            ['page' => 'about', 'section' => 'corporate_journey', 'key' => 'background_image', 'value' => '/assets/about_me/corporate_journey.png', 'type' => 'image', 'order' => 2],

            // About Me Page - Associates Section
            ['page' => 'about', 'section' => 'associates', 'key' => 'title', 'value' => 'Associate', 'type' => 'text', 'order' => 1],
            ['page' => 'about', 'section' => 'associates', 'key' => 'description', 'value' => 'Dedicated to fostering collaboration and achieving results. Build meaningful relationships that drive success. Expertise ensures your vision is supported every step of the way.', 'type' => 'textarea', 'order' => 2],
            ['page' => 'about', 'section' => 'associates', 'key' => 'background_image', 'value' => '/assets/about_me/associate.png', 'type' => 'image', 'order' => 3],

            // Blogs Page - Banner Section
            ['page' => 'blogs', 'section' => 'banner', 'key' => 'title', 'value' => 'Blogs', 'type' => 'text', 'order' => 1],
            ['page' => 'blogs', 'section' => 'banner', 'key' => 'vector_right', 'value' => '/assets/blogs/vector_right.svg', 'type' => 'image', 'order' => 2],
            ['page' => 'blogs', 'section' => 'banner', 'key' => 'vector_left', 'value' => '/assets/blogs/vector_left.svg', 'type' => 'image', 'order' => 3],

            // Books Page - Banner Section
            ['page' => 'books', 'section' => 'banner', 'key' => 'pattern_background', 'value' => '/assets/books/pattern_bg.png', 'type' => 'image', 'order' => 1],
            ['page' => 'books', 'section' => 'banner', 'key' => 'rotating_text_image', 'value' => '/assets/books/TextFlex_ Buy Now _ Buy Now _ Buy Now _.png', 'type' => 'image', 'order' => 2],

            // Entrepreneurship Page - Banner Section
            ['page' => 'entrepreneurship', 'section' => 'banner', 'key' => 'label', 'value' => 'My Thoughts', 'type' => 'text', 'order' => 1],
            ['page' => 'entrepreneurship', 'section' => 'banner', 'key' => 'quote', 'value' => 'We are now in the era of the 4th industrial revolution, where everything depends on technology. So we also have to depend on technology', 'type' => 'textarea', 'order' => 2],
            ['page' => 'entrepreneurship', 'section' => 'banner', 'key' => 'banner_image', 'value' => '/assets/entepreneourship/shahriar_khan_banner.png', 'type' => 'image', 'order' => 3],

            // Entrepreneurship Page - Quotes Section
            ['page' => 'entrepreneurship', 'section' => 'quotes', 'key' => 'content', 'value' => 'Living an extraordinary life means shaping it on your terms, filled with deep meaning and significant impact. Fueled by the quest for excellence and a strong sense of purpose, Shahriar Khan has motivated millions to dream boldly and strive for greater heights.', 'type' => 'textarea', 'order' => 1],

            // Events Page - Banner Section
            ['page' => 'events', 'section' => 'banner', 'key' => 'title', 'value' => 'Active Events', 'type' => 'text', 'order' => 1],
            ['page' => 'events', 'section' => 'banner', 'key' => 'banner_vector', 'value' => '/assets/events/banner_vector.png', 'type' => 'image', 'order' => 2],
            ['page' => 'events', 'section' => 'banner', 'key' => 'bottom_vector', 'value' => '/assets/events/bottom_vector.png', 'type' => 'image', 'order' => 3],

            // Events Page - Activities Section
            ['page' => 'events', 'section' => 'activities', 'key' => 'title', 'value' => 'Activities', 'type' => 'text', 'order' => 1],

            // Life Events Page - Banner Section
            ['page' => 'life_events', 'section' => 'banner', 'key' => 'label', 'value' => 'My Thoughts', 'type' => 'text', 'order' => 1],
            ['page' => 'life_events', 'section' => 'banner', 'key' => 'title', 'value' => 'Moments that Matter', 'type' => 'text', 'order' => 2],
            ['page' => 'life_events', 'section' => 'banner', 'key' => 'subtitle', 'value' => 'Focusing on meaningful and defining life events.', 'type' => 'textarea', 'order' => 3],
            ['page' => 'life_events', 'section' => 'banner', 'key' => 'banner_image', 'value' => '/assets/life_events/life_events_banner.png', 'type' => 'image', 'order' => 4],
            ['page' => 'life_events', 'section' => 'banner', 'key' => 'pattern_background', 'value' => '/assets/life_events/pattern_bg.png', 'type' => 'image', 'order' => 5],

            // Technology Page - Banner Section
            ['page' => 'technology', 'section' => 'banner', 'key' => 'label', 'value' => 'Technology', 'type' => 'text', 'order' => 1],
            ['page' => 'technology', 'section' => 'banner', 'key' => 'quote', 'value' => 'I stay updated with the latest technology trends, focusing on emerging fields like AI-driven design, cloud-based collaboration tools, and responsive design for diverse devices.', 'type' => 'textarea', 'order' => 2],
            ['page' => 'technology', 'section' => 'banner', 'key' => 'banner_image', 'value' => '/assets/technology/technology_banner.png', 'type' => 'image', 'order' => 3],
            ['page' => 'technology', 'section' => 'banner', 'key' => 'description', 'value' => 'Living an extraordinary life means shaping it on your terms, filled with deep meaning and significant impact. Fueled by the quest for excellence and a strong sense of purpose, Shahriar Khan has motivated millions to dream boldly and strive for greater heights.', 'type' => 'textarea', 'order' => 4],

            // Videos Page - Banner Section
            ['page' => 'videos', 'section' => 'banner', 'key' => 'title', 'value' => 'Videos', 'type' => 'text', 'order' => 1],
            ['page' => 'videos', 'section' => 'banner', 'key' => 'vector_right', 'value' => '/assets/videos/vector_right.svg', 'type' => 'image', 'order' => 2],
            ['page' => 'videos', 'section' => 'banner', 'key' => 'vector_left', 'value' => '/assets/videos/vector_left.svg', 'type' => 'image', 'order' => 3],
            ['page' => 'videos', 'section' => 'banner', 'key' => 'play_icon', 'value' => '/assets/videos/play-fill.svg', 'type' => 'image', 'order' => 4],
        ];

        foreach ($contents as $content) {
            PageContent::updateOrCreate(
                [
                    'page' => $content['page'],
                    'section' => $content['section'],
                    'key' => $content['key'],
                    'order' => $content['order']
                ],
                $content
            );
        }
    }
}
