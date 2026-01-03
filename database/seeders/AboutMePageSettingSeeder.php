<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\AboutMePageSetting;

class AboutMePageSettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        AboutMePageSetting::updateOrCreate(
            ['id' => 1],
            [
                'banner' => [
                    'label' => 'About Me',
                    'title' => 'Remarkable lives respond to a greater purpose.',
                    'banner_image' => '/assets/about_me/about_me_banner.png',
                    'video_thumbnail' => '/assets/about_me/video_img.png',
                    'video_url' => 'https://www.youtube.com/embed/UGrFGCf5NWY?si=YCA7UJNOqxa3mvCU',
                ],
                
                'report' => [
                    'description' => 'Living an extraordinary life means shaping it on your terms, filled with deep meaning and significant impact. Fueled by the quest for excellence and a strong sense of purpose, Shahriar Khan has motivated millions to dream boldly and strive for greater heights.',
                    'stat_1_value' => '11',
                    'stat_1_label' => 'Years Journey',
                    'stat_2_value' => '200',
                    'stat_2_label' => 'Projects',
                    'stat_3_value' => '6',
                    'stat_3_label' => 'Certification',
                    'stat_4_value' => '5',
                    'stat_4_label' => 'Int Article',
                    'stat_5_value' => '4',
                    'stat_5_label' => 'Books',
                    'stat_6_value' => '4',
                    'stat_6_label' => 'Books',
                    'stat_7_value' => '100',
                    'stat_7_label' => 'Mentoring',
                ],
                
                'awards' => [
                    'section_title' => 'Awards',
                    'section_subtitle' => 'Celebrating achievements and recognitions that highlight Shahriar Khan\'s contributions to technology, entrepreneurship, and education.',
                ],
                
                'story' => [
                    'section_title' => 'My Story',
                    'section_subtitle' => 'The Journey of Innovation and Impact',
                ],
                
                'impact' => [
                    'entrepreneur_title' => 'Entrepreneur Impact',
                    'technology_title' => 'Technology Impact',
                    'background_image' => '/assets/about_me/corporate_journey.png',
                ],
                
                'travel' => [
                    'section_title' => 'Travel countries for business purposes',
                    'section_subtitle' => 'As a global entrepreneur and technology leader, Shahriar Khan has traveled extensively for business purposes, establishing partnerships and exploring opportunities in Turkey, Canada, China, and the United States.',
                    'map_image' => '/assets/about_me/world_map.png',
                ],
                
                'corporate_journey' => [
                    'title' => 'Corporate Journey',
                    'philosophy_title' => 'My Philosophy',
                    'philosophy_image' => '/assets/about_me/shahriar_khan_philosophy.png',
                    'background_image' => '/assets/about_me/corporate_journey.png',
                    'logic_theory_title' => 'Logic Theory',
                    'logic_theory_content_1' => 'Innovation drives progress. By combining cutting-edge technology with strategic business insights, we can solve complex problems and create sustainable value for our clients and communities.',
                    'logic_theory_content_2' => 'Collaboration and continuous learning are essential. Building strong partnerships and staying ahead of technological trends ensures long-term success in the rapidly evolving digital landscape.',
                    'logic_1_title' => 'Logic #1',
                    'logic_1_content' => 'Technology should serve humanity. Every innovation we develop is guided by the principle of creating positive impact and ethical advancement in our society.',
                ],
                
                'associates' => [
                    'title' => 'Associate',
                    'description' => 'Dedicated to fostering collaboration and achieving results. Build meaningful relationships that drive success. Expertise ensures your vision is supported every step of the way.',
                    'background_image' => '/assets/about_me/associate.png',
                ],
            ]
        );
    }
}
