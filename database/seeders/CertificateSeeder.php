<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Certificate;

class CertificateSeeder extends Seeder
{
    public function run(): void
    {
        $certificates = [
            [
                'name' => 'AWS Solutions Architect',
                'issuing_organization' => 'Amazon Web Services',
                'image' => '/assets/technology/certificate_1.png',
                'credential_url' => 'https://aws.amazon.com/certification',
                'issue_date' => now()->subYears(2),
                'expiry_date' => now()->addYear(),
                'credential_id' => 'AWS-SAA-C03-123456',
                'order' => 1,
            ],
            [
                'name' => 'Certified Ethical Hacker',
                'issuing_organization' => 'EC-Council',
                'image' => '/assets/technology/certificate_2.png',
                'credential_url' => 'https://www.eccouncil.org/programs/certified-ethical-hacker-ceh',
                'issue_date' => now()->subYears(3),
                'expiry_date' => null,
                'credential_id' => 'CEH-789012',
                'order' => 2,
            ],
            [
                'name' => 'Google Cloud Professional',
                'issuing_organization' => 'Google Cloud',
                'image' => '/assets/technology/certificate_3.png',
                'credential_url' => 'https://cloud.google.com/certification',
                'issue_date' => now()->subYear(),
                'expiry_date' => now()->addYears(2),
                'credential_id' => 'GCP-PRO-345678',
                'order' => 3,
            ],
            [
                'name' => 'Professional Scrum Master',
                'issuing_organization' => 'Scrum.org',
                'image' => '/assets/technology/certificate_1.png',
                'credential_url' => 'https://www.scrum.org',
                'issue_date' => now()->subMonths(18),
                'expiry_date' => null,
                'credential_id' => 'PSM-I-901234',
                'order' => 4,
            ],
        ];

        foreach ($certificates as $cert) {
            Certificate::create($cert);
        }
    }
}
