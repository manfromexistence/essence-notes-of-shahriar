<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\DonationPageSetting;

class DonationPageSettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DonationPageSetting::updateOrCreate(
            ['id' => 1],
            [
                'page_title' => 'Donation',
                'banner_quote' => 'We are now in the era of the 4th industrial revolution, where everything depends on technology. So we also have to depend on technology',
                'banner_subtitle' => 'My Thoughts',
                'banner_default_image' => '/assets/donation/donation.png',
                'donate_section_title' => 'Support Our Cause',
                'donate_section_description' => 'Your contribution makes a difference in transforming lives and creating opportunities.',
            ]
        );
    }
}
