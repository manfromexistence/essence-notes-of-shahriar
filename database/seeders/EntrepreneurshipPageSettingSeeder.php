<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\EntrepreneurshipPageSetting;

class EntrepreneurshipPageSettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        EntrepreneurshipPageSetting::updateOrCreate(
            ['id' => 1],
            [
                'page_title' => 'Entrepreneurship',
                'banner_quote' => 'We are now in the era of the 4th industrial revolution, where everything depends on technology. So we also have to depend on technology',
                'banner_quote_label' => 'My Thoughts',
                'banner_image' => '/assets/entepreneourship/shahriar_khan_banner.png',
                'quotes_section_title' => 'Inspiring Quotes',
                'quotes' => [
                    [
                        'content' => 'The best way to predict the future is to invent it.',
                        'author' => 'Alan Kay',
                        'is_featured' => true,
                    ],
                    // [
                    //     'content' => 'Innovation distinguishes between a leader and a follower.',
                    //     'author' => 'Steve Jobs',
                    //     'is_featured' => false,
                    // ],
                    // [
                    //     'content' => 'The only way to do great work is to love what you do.',
                    //     'author' => 'Steve Jobs',
                    //     'is_featured' => false,
                    // ],
                ],
                'innovation_section_title' => 'Igniting Innovation: A Startup Journey',
                'innovation_section_subtitle' => 'Embarking on a journey of innovation, I\'ve founded and nurtured several startups that push the boundaries of technology and creativity. From NexKraft\'s focus on next-generation technological advancements to Mechani\'s engineering solutions, Huistle\'s innovative platforms, and Mindshaper\'s transformative ideas, each venture represents a step towards transforming bold concepts into impactful realities. This entrepreneurial path has been about more than just building companies—it\'s about fostering a culture of innovation that drives progress and creates lasting value in the digital world.',
                'innovations' => [
                    [
                        'title' => 'NexKraft Solutions',
                        'description' => 'AI-Powered Business Solutions',
                        'long_description' => 'NexKraft is an innovative startup focused on transforming the digital world through cutting-edge solutions. Leveraging artificial intelligence to solve real business problems and drive technological advancement.',
                        'image' => '/assets/entepreneourship/nexkraft.png',
                        'is_featured' => true,
                    ],
                    [
                        'title' => 'Mechanix Pro',
                        'description' => 'Digital Platform for Automotive Services',
                        'long_description' => 'Connecting vehicle owners with trusted mechanics and service providers through a comprehensive digital platform that revolutionizes the automotive service industry.',
                        'image' => '/assets/entepreneourship/mechani.png',
                        'is_featured' => true,
                    ],
                    [
                        'title' => 'Huistle App',
                        'description' => 'Productivity & Task Management',
                        'long_description' => 'A modern productivity app that helps teams collaborate better and manage tasks efficiently in today\'s fast-paced work environment.',
                        'image' => '/assets/entepreneourship/huistle.png',
                        'is_featured' => true,
                    ],
                    [
                        'title' => 'MindShaper',
                        'description' => 'Personal Development Platform',
                        'long_description' => 'Empowering individuals to reach their full potential through innovative personal development tools and resources designed for modern learners.',
                        'image' => '/assets/entepreneourship/mindshaper.png',
                        'is_featured' => true,
                    ],
                ],
                'events_section_title' => 'Events',
                'events_button_text' => 'All Events',
                'blogs_section_title' => 'All Blog',
                'blogs_button_text' => 'All Blogs',
                'blogs_show_less_text' => 'Show Less',
            ]
        );
    }
}
