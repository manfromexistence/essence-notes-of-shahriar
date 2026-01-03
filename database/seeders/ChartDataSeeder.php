<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\BlogPost;
use App\Models\Video;
use App\Models\Event;
use App\Models\Book;
use App\Models\Donation;
use App\Models\Award;
use App\Models\Certificate;
use App\Models\LifeEvent;
use Carbon\Carbon;
use Illuminate\Support\Str;

/**
 * This seeder generates historical data spread across the last 90 days
 * to ensure the dashboard chart displays properly with realistic data.
 */
class ChartDataSeeder extends Seeder
{
    public function run(): void
    {
        $this->seedBlogPosts();
        $this->seedVideos();
        $this->seedEvents();
        $this->seedBooks();
        $this->seedDonations();
        $this->seedAwards();
        $this->seedCertificates();
        $this->seedLifeEvents();
    }

    private function seedBlogPosts(): void
    {
        $categories = ['Technology', 'Business', 'Security', 'Cloud', 'Startup', 'AI', 'Leadership', 'Innovation'];
        $topics = [
            'The Rise of Generative AI in Enterprise',
            'Building Resilient Microservices Architecture',
            'Sustainable Tech: Green Computing Solutions',
            'Blockchain Beyond Cryptocurrency',
            'The Future of Remote Work Technology',
            'Cybersecurity Trends for Modern Businesses',
            'Data Analytics: From Insights to Action',
            'Cloud Migration Best Practices',
            'Machine Learning in Production Systems',
            'DevOps Culture and Digital Transformation',
            'API-First Development Strategies',
            'Edge Computing and IoT Applications',
            'Zero Trust Security Framework',
            'Agile Methodologies in Practice',
            'Kubernetes and Container Orchestration',
            'No-Code/Low-Code Revolution',
            'Digital Customer Experience',
            'Venture Capital and Startup Funding',
            'Product Management Excellence',
            'Technical Debt Management',
            'Open Source Business Models',
            'SaaS Scalability Patterns',
            'Data Privacy and Compliance',
            'Artificial Intelligence Ethics',
            'Serverless Architecture Benefits',
            'Mobile-First Development',
            'Progressive Web Applications',
            'CI/CD Pipeline Optimization',
            'Database Performance Tuning',
            'API Security Best Practices',
            'User Experience Design Principles',
            'Growth Hacking Strategies',
            'B2B Marketing Technology',
            'Customer Success Management',
            'Revenue Operations Excellence',
        ];

        // Generate blog posts spread across last 90 days with varying frequency
        $createdCount = 0;
        for ($daysAgo = 90; $daysAgo >= 0; $daysAgo--) {
            $date = Carbon::now()->subDays($daysAgo);
            
            // Create 0-3 blog posts per day (more recent = more posts)
            $postsToday = $this->getRandomCountForDate($daysAgo);
            
            for ($i = 0; $i < $postsToday; $i++) {
                $title = $topics[$createdCount % count($topics)] . ' - Part ' . (floor($createdCount / count($topics)) + 1);
                $slug = Str::slug($title) . '-' . Str::random(5);
                
                BlogPost::create([
                    'title' => $title,
                    'slug' => $slug,
                    'excerpt' => 'Exploring the latest trends and insights in ' . $categories[$createdCount % count($categories)],
                    'content' => $this->generateContent($title),
                    'featured_image' => '/assets/blogs/img' . (($createdCount % 5) + 1) . '.png',
                    'category' => $categories[$createdCount % count($categories)],
                    'tags' => implode(', ', array_slice($categories, 0, 3)),
                    'read_time' => rand(5, 15),
                    'published_at' => $date,
                    'is_published' => true,
                    'created_at' => $date,
                    'updated_at' => $date,
                ]);
                
                $createdCount++;
            }
        }
    }

    private function seedVideos(): void
    {
        $categories = ['Technology', 'Entrepreneurship', 'Leadership', 'Education', 'Business', 'Innovation'];
        $titles = [
            'Tech Talk: Future of Software Development',
            'Entrepreneurship Journey Episode',
            'Leadership Lessons from Industry Experts',
            'Quick Coding Tips and Tricks',
            'Business Strategy Masterclass',
            'Innovation Spotlight',
            'Startup Success Stories',
            'Digital Transformation Guide',
            'Product Launch Deep Dive',
            'Industry Insights Weekly',
            'Developer Conference Highlights',
            'Market Analysis Report',
            'Tech Review Session',
            'Expert Interview Series',
            'Tutorial: Modern Web Development',
        ];

        $createdCount = 0;
        for ($daysAgo = 90; $daysAgo >= 0; $daysAgo--) {
            $date = Carbon::now()->subDays($daysAgo);
            
            // Create 0-2 videos per day
            $videosToday = $this->getRandomCountForDate($daysAgo, 2);
            
            for ($i = 0; $i < $videosToday; $i++) {
                $isShort = rand(0, 1) === 1;
                $title = $titles[$createdCount % count($titles)] . ' #' . ($createdCount + 1);
                
                Video::create([
                    'title' => $title,
                    'description' => 'An insightful video about ' . $categories[$createdCount % count($categories)],
                    'video_url' => 'https://www.youtube.com/watch?v=' . Str::random(11),
                    'thumbnail' => 'https://images.unsplash.com/photo-' . rand(1500000000000, 1700000000000) . '?w=640&h=360&fit=crop',
                    'platform' => 'youtube',
                    'category' => $categories[$createdCount % count($categories)],
                    'duration' => $isShort ? rand(30, 60) : rand(300, 3600),
                    'is_short' => $isShort,
                    'published_at' => $date,
                    'publish_date' => $date,
                    'created_at' => $date,
                    'updated_at' => $date,
                ]);
                
                $createdCount++;
            }
        }
    }

    private function seedEvents(): void
    {
        $categories = ['Conference', 'Workshop', 'Networking', 'Training', 'Webinar', 'Meetup'];
        $locations = ['Dhaka, Bangladesh', 'Singapore', 'Online', 'Dubai', 'London', 'New York'];
        $titles = [
            'Tech Innovation Summit',
            'Startup Founders Meetup',
            'Digital Marketing Workshop',
            'AI Conference',
            'Leadership Training',
            'Business Networking Event',
            'Developer Bootcamp',
            'Product Management Seminar',
            'Cloud Computing Workshop',
            'Entrepreneurship Forum',
        ];

        $createdCount = 0;
        for ($daysAgo = 90; $daysAgo >= 0; $daysAgo--) {
            $date = Carbon::now()->subDays($daysAgo);
            
            // Create 0-1 events per day (events are less frequent)
            if (rand(0, 4) === 0) {  // ~20% chance each day
                $title = $titles[$createdCount % count($titles)] . ' ' . $date->format('Y');
                $isPast = rand(0, 1) === 1;
                
                Event::create([
                    'title' => $title,
                    'description' => 'Join us for this exciting ' . $categories[$createdCount % count($categories)] . ' event.',
                    'image' => '/assets/events/event_activites_' . (($createdCount % 4) + 1) . '.png',
                    'location' => $locations[$createdCount % count($locations)],
                    'event_date' => $isPast ? $date->copy()->subDays(rand(1, 30)) : $date->copy()->addDays(rand(1, 60)),
                    'event_time' => sprintf('%02d:00:00', rand(9, 18)),
                    'category' => $categories[$createdCount % count($categories)],
                    'organizer' => 'Tech Events BD',
                    'is_featured' => rand(0, 3) === 0,
                    'is_past' => $isPast,
                    'created_at' => $date,
                    'updated_at' => $date,
                ]);
                
                $createdCount++;
            }
        }
    }

    private function seedBooks(): void
    {
        $books = [
            ['title' => 'The Innovator\'s Dilemma', 'author' => 'Clayton Christensen'],
            ['title' => 'Good to Great', 'author' => 'Jim Collins'],
            ['title' => 'Start with Why', 'author' => 'Simon Sinek'],
            ['title' => 'The Art of War', 'author' => 'Sun Tzu'],
            ['title' => 'Deep Work', 'author' => 'Cal Newport'],
            ['title' => 'The Hard Thing About Hard Things', 'author' => 'Ben Horowitz'],
            ['title' => 'Sapiens', 'author' => 'Yuval Noah Harari'],
            ['title' => 'Principles', 'author' => 'Ray Dalio'],
            ['title' => 'Thinking in Systems', 'author' => 'Donella Meadows'],
            ['title' => 'The Phoenix Project', 'author' => 'Gene Kim'],
            ['title' => 'Clean Code', 'author' => 'Robert C. Martin'],
            ['title' => 'Designing Data-Intensive Applications', 'author' => 'Martin Kleppmann'],
            ['title' => 'The Pragmatic Programmer', 'author' => 'David Thomas'],
            ['title' => 'Hooked', 'author' => 'Nir Eyal'],
            ['title' => 'Measure What Matters', 'author' => 'John Doerr'],
        ];

        $createdCount = 0;
        for ($daysAgo = 90; $daysAgo >= 0; $daysAgo--) {
            $date = Carbon::now()->subDays($daysAgo);
            
            // Create 0-1 books per day (books are less frequent)
            if (rand(0, 6) === 0) {  // ~15% chance each day
                $bookData = $books[$createdCount % count($books)];
                
                Book::create([
                    'title' => $bookData['title'] . ' (Edition ' . ($createdCount + 1) . ')',
                    'author' => $bookData['author'],
                    'cover_image' => '/assets/books/recommended_book' . (($createdCount % 5) + 1) . '.png',
                    'description' => 'A must-read book about business and technology.',
                    'summary' => 'This book provides invaluable insights for entrepreneurs and leaders.',
                    'highlights' => 'Key concepts, practical frameworks, real-world examples.',
                    'review' => 'Highly recommended for anyone in the tech industry.',
                    'rating' => rand(4, 5),
                    'isbn' => '978' . rand(1000000000, 9999999999),
                    'read_date' => $date,
                    'is_recommended' => rand(0, 2) === 0,
                    'order' => $createdCount + 1,
                    'created_at' => $date,
                    'updated_at' => $date,
                ]);
                
                $createdCount++;
            }
        }
    }

    private function seedDonations(): void
    {
        $causes = [
            ['title' => 'Rural School Development', 'category' => 'Education'],
            ['title' => 'Healthcare Access Initiative', 'category' => 'Health'],
            ['title' => 'Women Empowerment Program', 'category' => 'Social'],
            ['title' => 'Environmental Conservation', 'category' => 'Environment'],
            ['title' => 'Youth Skills Training', 'category' => 'Technology'],
            ['title' => 'Emergency Relief Fund', 'category' => 'Emergency'],
            ['title' => 'Senior Care Program', 'category' => 'Health'],
            ['title' => 'Digital Literacy Campaign', 'category' => 'Education'],
        ];

        $createdCount = 0;
        for ($daysAgo = 90; $daysAgo >= 0; $daysAgo--) {
            $date = Carbon::now()->subDays($daysAgo);
            
            // Create 0-1 donations per day
            if (rand(0, 5) === 0) {  // ~17% chance each day
                $causeData = $causes[$createdCount % count($causes)];
                $goalAmount = rand(10, 100) * 1000;
                
                Donation::create([
                    'title' => $causeData['title'] . ' #' . ($createdCount + 1),
                    'description' => 'Support our ' . $causeData['category'] . ' initiative to make a difference.',
                    'image' => '/assets/donation/donate_card' . (($createdCount % 2) + 1) . '.png',
                    'goal_amount' => $goalAmount,
                    'raised_amount' => rand(0, $goalAmount),
                    'category' => $causeData['category'],
                    'end_date' => $date->copy()->addMonths(rand(1, 6)),
                    'is_active' => rand(0, 3) !== 0,
                    'beneficiary_info' => 'Communities in need across Bangladesh',
                    'order' => $createdCount + 1,
                    'created_at' => $date,
                    'updated_at' => $date,
                ]);
                
                $createdCount++;
            }
        }
    }

    private function seedAwards(): void
    {
        $awards = [
            ['title' => 'Technology Excellence Award', 'org' => 'Tech Association Bangladesh'],
            ['title' => 'Innovation Leader Award', 'org' => 'Asia Innovation Council'],
            ['title' => 'Best Startup Mentor', 'org' => 'Startup Ecosystem BD'],
            ['title' => 'Digital Transformation Award', 'org' => 'Digital Bangladesh'],
            ['title' => 'Leadership Excellence', 'org' => 'Business Leaders Forum'],
            ['title' => 'Social Impact Recognition', 'org' => 'Impact Foundation'],
        ];

        $createdCount = 0;
        for ($daysAgo = 90; $daysAgo >= 0; $daysAgo--) {
            $date = Carbon::now()->subDays($daysAgo);
            
            // Create 0-1 awards (awards are rare)
            if (rand(0, 14) === 0) {  // ~7% chance each day
                $awardData = $awards[$createdCount % count($awards)];
                
                Award::create([
                    'title' => $awardData['title'] . ' ' . $date->format('Y'),
                    'description' => 'Recognized for outstanding contribution and excellence.',
                    'organization' => $awardData['org'],
                    'image' => '/assets/about_me/Image - ' . (($createdCount % 3) + 1) . '.png',
                    'award_date' => $date->format('Y-m-d'),
                    'order' => $createdCount + 1,
                    'created_at' => $date,
                    'updated_at' => $date,
                ]);
                
                $createdCount++;
            }
        }
    }

    private function seedCertificates(): void
    {
        $certs = [
            ['name' => 'Professional Cloud Architect', 'org' => 'Google Cloud'],
            ['name' => 'Solutions Architect Associate', 'org' => 'Amazon Web Services'],
            ['name' => 'Azure Developer Associate', 'org' => 'Microsoft'],
            ['name' => 'Certified Kubernetes Administrator', 'org' => 'CNCF'],
            ['name' => 'Project Management Professional', 'org' => 'PMI'],
            ['name' => 'Certified ScrumMaster', 'org' => 'Scrum Alliance'],
        ];

        $createdCount = 0;
        for ($daysAgo = 90; $daysAgo >= 0; $daysAgo--) {
            $date = Carbon::now()->subDays($daysAgo);
            
            // Create 0-1 certificates (certificates are rare)
            if (rand(0, 12) === 0) {  // ~8% chance each day
                $certData = $certs[$createdCount % count($certs)];
                
                Certificate::create([
                    'name' => $certData['name'] . ' Level ' . (($createdCount % 3) + 1),
                    'issuing_organization' => $certData['org'],
                    'image' => '/assets/technology/certificate_' . (($createdCount % 3) + 1) . '.png',
                    'credential_url' => 'https://example.com/cert/' . Str::random(10),
                    'issue_date' => $date,
                    'expiry_date' => $date->copy()->addYears(2),
                    'credential_id' => strtoupper(Str::random(3)) . '-' . rand(100000, 999999),
                    'order' => $createdCount + 1,
                    'created_at' => $date,
                    'updated_at' => $date,
                ]);
                
                $createdCount++;
            }
        }
    }

    private function seedLifeEvents(): void
    {
        $categories = ['Career', 'Education', 'Achievement', 'Social Impact', 'Personal', 'Travel'];
        $events = [
            'Launched New Product',
            'Attended International Conference',
            'Completed Major Project',
            'Received Industry Recognition',
            'Started New Initiative',
            'Achieved Business Milestone',
            'Published Article',
            'Hosted Workshop',
            'Expanded Business Operations',
            'Formed Strategic Partnership',
        ];

        $createdCount = 0;
        for ($daysAgo = 90; $daysAgo >= 0; $daysAgo--) {
            $date = Carbon::now()->subDays($daysAgo);
            
            // Create 0-1 life events (life events are less frequent)
            if (rand(0, 8) === 0) {  // ~11% chance each day
                $title = $events[$createdCount % count($events)];
                
                LifeEvent::create([
                    'title' => $title . ' ' . $date->format('M Y'),
                    'description' => 'A significant milestone in the journey of growth and achievement.',
                    'image' => '/assets/life_events/winning_strategy' . ($createdCount % 2 === 0 ? '' : '_mini' . (($createdCount % 3) + 1)) . '.png',
                    'event_date' => $date,
                    'category' => $categories[$createdCount % count($categories)],
                    'location' => 'Dhaka, Bangladesh',
                    'is_featured' => rand(0, 3) === 0,
                    'order' => $createdCount + 1,
                    'created_at' => $date,
                    'updated_at' => $date,
                ]);
                
                $createdCount++;
            }
        }
    }

    /**
     * Get random count for a specific date
     * More recent dates get higher chance of more items
     */
    private function getRandomCountForDate(int $daysAgo, int $maxCount = 3): int
    {
        // Weight towards more recent days having more activity
        if ($daysAgo <= 7) {
            // Last 7 days: higher activity
            return rand(0, $maxCount);
        } elseif ($daysAgo <= 30) {
            // Last 30 days: medium activity
            return rand(0, min(2, $maxCount));
        } else {
            // Older: lower activity
            return rand(0, 1);
        }
    }

    private function generateContent(string $title): string
    {
        return "This comprehensive article explores {$title}. 

In today's rapidly evolving digital landscape, understanding these concepts is crucial for businesses and professionals alike. 

Key topics covered:
- Understanding the fundamentals
- Best practices and implementation strategies  
- Real-world case studies and examples
- Future trends and predictions

Whether you're a seasoned professional or just starting out, this article provides valuable insights that can help you stay ahead of the curve.";
    }
}
