<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\ImpactItem;

class ImpactItemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $items = [
            ['title' => 'Innovation and Product Development', 'order' => 1, 'is_active' => true],
            ['title' => 'Research and Development (R&D)', 'order' => 2, 'is_active' => true],
            ['title' => 'Cybersecurity and Data Protection', 'order' => 3, 'is_active' => true],
            ['title' => 'Optimization of Processes', 'order' => 4, 'is_active' => true],
            ['title' => 'Leadership in Digital Transformation', 'order' => 5, 'is_active' => true],
            ['title' => 'User Experience (UX) Design', 'order' => 6, 'is_active' => true],
            ['title' => 'Education and Mentorship', 'order' => 7, 'is_active' => true],
            ['title' => 'Ethical and Social Contributions', 'order' => 8, 'is_active' => true],
        ];

        foreach ($items as $item) {
            ImpactItem::updateOrCreate(
                ['title' => $item['title']],
                $item
            );
        }
    }
}
