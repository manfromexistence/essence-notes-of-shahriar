<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\MenuItem;

class MenuItemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Clear existing menu items
        MenuItem::truncate();

        // Main navigation items
        $menuItems = [
            [
                'label' => 'Home',
                'url' => '/home',
                'target' => '_self',
                'order' => 1,
                'is_active' => true,
                'icon' => 'home',
            ],
            [
                'label' => 'About Me',
                'url' => '/about-me',
                'target' => '_self',
                'order' => 2,
                'is_active' => true,
                'icon' => 'user',
            ],
            [
                'label' => 'Books',
                'url' => '/books',
                'target' => '_self',
                'order' => 4,
                'is_active' => true,
                'icon' => 'book',
            ],
            [
                'label' => 'Blogs',
                'url' => '/blogs',
                'target' => '_self',
                'order' => 6,
                'is_active' => true,
                'icon' => 'file-text',
            ],
            [
                'label' => 'Contact',
                'url' => '/contact',
                'target' => '_self',
                'order' => 11,
                'is_active' => true,
                'icon' => 'mail',
            ],
            [
                'label' => 'Donations',
                'url' => '/donations',
                'target' => '_self',
                'order' => 10,
                'is_active' => true,
                'icon' => 'gift',
            ],
            [
                'label' => 'Events',
                'url' => '/events',
                'target' => '_self',
                'order' => 5,
                'is_active' => true,
                'icon' => 'calendar',
            ],
            [
                'label' => 'Entrepreneurship',
                'url' => '/entrepreneurship',
                'target' => '_self',
                'order' => 3,
                'is_active' => true,
                'icon' => 'briefcase',
            ],
            [
                'label' => 'Life Events',
                'url' => '/life-events',
                'target' => '_self',
                'order' => 8,
                'is_active' => true,
                'icon' => 'heart',
            ],
            [
                'label' => 'Technology',
                'url' => '/technology',
                'target' => '_self',
                'order' => 9,
                'is_active' => true,
                'icon' => 'cpu',
            ],
            [
                'label' => 'Videos',
                'url' => '/videos',
                'target' => '_self',
                'order' => 7,
                'is_active' => true,
                'icon' => 'video',
            ],
        ];

        foreach ($menuItems as $item) {
            MenuItem::create($item);
        }
    }
}
