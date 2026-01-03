<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\TechnologyPageSetting;

class TechnologyPageSettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        TechnologyPageSetting::updateOrCreate(
            ['id' => 1],
            [
                'page_title' => 'Technology',
                'banner_title' => 'Technology',
                'banner_subtitle' => '"I stay updated with the latest technology trends, focusing on emerging fields like AI-driven design, cloud-based collaboration tools, and responsive design for diverse devices."',
                'banner_image' => '/assets/technology/technology_banner.png',
                'banner_description' => 'Living an extraordinary life means shaping it on your terms, filled with deep meaning and significant impact. Fueled by the quest for excellence and a strong sense of purpose, Shahriar Khan has motivated millions to dream boldly and strive for greater heights.',
                'cybersecurity_title' => 'Cyber security skills',
                'cybersecurity_description' => 'Cybersecurity is a critical component of modern business operations. Shahriar Khan has extensive experience in implementing robust security measures, conducting risk assessments, and developing strategies to protect digital assets.',
                'cybersecurity_additional_description' => 'His expertise includes network security, data protection, compliance frameworks, and incident response planning. Through Nexkraft LTD, he has helped numerous organizations strengthen their cybersecurity posture and navigate the evolving threat landscape.',
                'cybersecurity_image' => '/assets/technology/cyber_security_image.png',
                'contribution_title' => 'Contribution to the field of technology',
                'contribution_description' => 'Shahriar Khan has made significant contributions to the field of technology through innovative solutions and leadership in digital transformation. Shahriar Khan has pioneered innovative technology solutions through Nexkraft LTD, focusing on AI integration, cloud migration, and digital transformation. He has led research initiatives in emerging technologies and contributed to the development of user-centric digital platforms. His work in process optimization has helped businesses improve efficiency and reduce operational costs through technology adoption. Shahriar actively participates in technology communities, sharing knowledge through publications and speaking engagements. His leadership in digital transformation has positioned Bangladesh as a growing hub for technology innovation. Through ICT Olympiad Bangladesh, he has nurtured the next generation of technology leaders. Shahriar\'s commitment to ethical technology development ensures sustainable and responsible innovation.',
                'contribution_image' => '/assets/technology/contribute_field.png',
                'tools_title' => 'Tools and software skills',
                'tools_description' => 'Shahriar Khan is proficient in various technology tools and platforms essential for modern software development and system administration. His expertise includes containerization technologies like Docker and Kubernetes, as well as modern frameworks such as React, Next.js, Node.js, and Python. He leverages tools like GitHub for version control, Vercel for deployment, and Vite for fast development workflows.',
                'certificates_title' => 'Certificates',
                'certificates_description' => 'Shahriar Khan holds various professional certifications in technology, cybersecurity, and business management. These credentials validate his expertise and commitment to staying current with industry standards and best practices.',
                'blogs_title' => 'All Blog',
                'section_title' => 'Tech Stack & Expertise',
                'section_description' => 'Exploring cutting-edge technologies and their impact on business and society.',
            ]
        );
    }
}
