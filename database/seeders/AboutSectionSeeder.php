<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\AboutSection;

class AboutSectionSeeder extends Seeder
{
    public function run(): void
    {
        $sections = [
            // Story Sections (3 sections matching the Story component)
            [
                'section_type' => 'story',
                'title' => 'The start of a bigger story',
                'content' => "Shahriar Khan's journey began with a passion for technology and business. Graduating from East West University with a Master of Business Administration in Banking, Corporate, Finance, and Securities Law, he embarked on a path that would lead him to become a prominent figure in the tech industry.\n\nHis early experiences shaped his vision for innovative solutions that bridge technology with real-world business challenges. Through perseverance and strategic thinking, Shahriar transformed ideas into successful ventures, establishing himself as a leader in digital transformation.",
                'image' => '/assets/about_me/bigger_story.png',
                'additional_data' => json_encode(['image_position' => 'right']),
                'order' => 1,
                'is_active' => true,
            ],
            [
                'section_type' => 'story',
                'title' => 'The secret to living is giving',
                'content' => "Shahriar believes that true success comes from giving back to the community. Through his entrepreneurial ventures and philanthropic efforts, he has supported numerous initiatives in education, technology, and social development.\n\nHis commitment to mentorship and knowledge sharing has helped countless young professionals enter the tech industry. By founding Nexkraft LTD in 2011, Shahriar has created opportunities for innovation and growth, proving that business success and social responsibility can go hand in hand.",
                'image' => '/assets/about_me/secret_living.png',
                'additional_data' => json_encode(['image_position' => 'left']),
                'order' => 2,
                'is_active' => true,
            ],
            [
                'section_type' => 'story',
                'title' => 'A life dedicated to a greater purpose',
                'content' => "Shahriar Khan's life is driven by a greater purpose: to harness technology for positive change. As CEO of Nexkraft LTD, he leads initiatives that promote digital literacy, cybersecurity awareness, and sustainable business practices.\n\nHis work extends beyond business, encompassing education through ICT Olympiad Bangladesh, innovative solutions through various ventures, and thought leadership through publications and speaking engagements. Shahriar continues to inspire others to pursue excellence with integrity and purpose.",
                'image' => '/assets/about_me/dedicated.png',
                'additional_data' => json_encode(['image_position' => 'right']),
                'order' => 3,
                'is_active' => true,
            ],
            
            // Impact Section
            [
                'section_type' => 'impact',
                'title' => 'Entrepreneur Impact',
                'content' => "As a visionary entrepreneur, Shahriar Khan has pioneered multiple successful ventures including Nexkraft LTD, Nexfly, Mechanix, and NexAcademy. His leadership has driven innovation in event planning, education technology, and digital solutions, creating jobs and fostering economic growth in Bangladesh and beyond.",
                'image' => '/assets/about_me/shahriar_khan1.png',
                'additional_data' => json_encode([
                    'images' => [
                        '/assets/about_me/shahriar_khan1.png',
                        '/assets/about_me/shahriar_khan2.png',
                        '/assets/about_me/shahriar_khan3.png',
                        '/assets/about_me/shahriar_khan4.png',
                    ],
                    'technology_title' => 'Technology Impact',
                    'technology_content' => 'Shahriar Khan has been at the forefront of technological advancement, specializing in AI-driven solutions, cloud-based systems, and cybersecurity. His expertise spans research and development, user experience design, and digital transformation strategies that have revolutionized how businesses operate in the modern digital landscape.',
                    'impact_areas' => [
                        'Innovation and Product Development',
                        'Research and Development (R&D)',
                        'Cybersecurity and Data Protection',
                        'Optimization of Processes',
                        'Leadership in Digital Transformation',
                        'User Experience (UX) Design',
                        'Education and Mentorship',
                        'Ethical and Social Contributions',
                    ]
                ]),
                'order' => 4,
                'is_active' => true,
            ],
            
            // Travel Section
            [
                'section_type' => 'travel',
                'title' => 'Travel countries for business purposes',
                'content' => "As a global entrepreneur and technology leader, Shahriar Khan has traveled extensively for business purposes, establishing partnerships and exploring opportunities in Turkey, Canada, China, and the United States. These journeys have enriched his perspective and strengthened international collaborations.",
                'image' => '/assets/about_me/world_map.png',
                'additional_data' => json_encode([
                    'countries' => [
                        ['name' => 'Turkey', 'flag' => '/assets/about_me/turkey.svg'],
                        ['name' => 'Canada', 'flag' => '/assets/about_me/canada.svg'],
                        ['name' => 'China', 'flag' => '/assets/about_me/china.svg'],
                        ['name' => 'USA', 'flag' => '/assets/about_me/usa.svg'],
                    ]
                ]),
                'order' => 5,
                'is_active' => true,
            ],
        ];

        foreach ($sections as $section) {
            AboutSection::updateOrCreate(
                [
                    'section_type' => $section['section_type'],
                    'order' => $section['order']
                ],
                $section
            );
        }
    }
}
