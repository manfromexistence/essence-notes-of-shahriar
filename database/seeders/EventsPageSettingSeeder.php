<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\EventsPageSetting;

class EventsPageSettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        EventsPageSetting::updateOrCreate(
            ['id' => 1],
            [
                'page_title' => 'Events',
                'banner_title' => 'Active Events',
                'banner_vector_image' => '/assets/events/banner_vector.png',
                'banner_bottom_vector' => '/assets/events/bottom_vector.png',
                'activities_section_title' => 'Last Events Activities',
                'activities_section_description' => 'Explore the highlights from my recent events and activities, where I\'ve engaged with communities, shared insights, and collaborated on innovative projects. These moments capture the essence of networking, learning, and growth in the entrepreneurial and tech space, showcasing the dynamic experiences that shape my journey.',
                'activities_image_1' => '/assets/events/event_activites_1.png',
                'activities_image_2' => '/assets/events/event_activities_2.png',
                'activities_image_3' => '/assets/events/event_activites_3.png',
                'activities_image_4' => '/assets/events/event_activites_4.png',
                'events_section_title' => 'Events',
                'year_filter_options' => ['2024', '2023', '2022', '2021'],
                'default_event_image_1' => '/assets/entepreneourship/slider_1.jpeg',
                'default_event_image_2' => '/assets/entepreneourship/slider_2.jpeg',
                'default_event_image_3' => '/assets/entepreneourship/slider_3.jpeg',
                'default_event_image_4' => '/assets/entepreneourship/slider_4.jpeg',
                'default_event_image_5' => '/assets/entepreneourship/slider_5.jpeg',
            ]
        );
    }
}
