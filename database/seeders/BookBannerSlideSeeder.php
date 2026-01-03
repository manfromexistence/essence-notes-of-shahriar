<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\BookBannerSlide;

class BookBannerSlideSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Clear existing slides
        BookBannerSlide::truncate();

        $slides = [
            [
                'title' => 'Chat GPT: Risk or Opportunity?',
                'description' => 'Living an extraordinary life means shaping it on your terms, filled with deep meaning and significant impact. Fueled by the quest for excellence and a strong sense of purpose, this book inspires millions to dream boldly.',
                'book_image' => 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop',
                'price_text' => 'Price: 240 BDT',
                'button_text' => 'Read Now',
                'order' => 1,
                'is_active' => true,
            ],
            [
                'title' => 'The Digital Revolution',
                'description' => 'Discover how artificial intelligence is reshaping industries and creating unprecedented opportunities for innovation and growth in the modern business landscape.',
                'book_image' => 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop',
                'price_text' => 'Price: 350 BDT',
                'button_text' => 'Buy Now',
                'order' => 2,
                'is_active' => true,
            ],
            [
                'title' => 'Innovation & Technology',
                'description' => 'A comprehensive guide to understanding the intersection of technology and human creativity. Learn how innovation drives progress and transforms societies.',
                'book_image' => 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400&h=600&fit=crop',
                'price_text' => 'Price: 280 BDT',
                'button_text' => 'Explore',
                'order' => 3,
                'is_active' => true,
            ],
            [
                'title' => 'Entrepreneurship Essentials',
                'description' => 'Master the art of building successful ventures from the ground up. This book provides practical insights and strategies for aspiring entrepreneurs.',
                'book_image' => 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=400&h=600&fit=crop',
                'price_text' => 'Price: 320 BDT',
                'button_text' => 'Learn More',
                'order' => 4,
                'is_active' => true,
            ],
            [
                'title' => 'Leadership in the Digital Age',
                'description' => 'Navigate the complexities of modern leadership with proven strategies and insights. Empower your team and drive transformational change.',
                'book_image' => 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&fit=crop',
                'price_text' => 'Price: 400 BDT',
                'button_text' => 'Get Started',
                'order' => 5,
                'is_active' => true,
            ],
        ];

        foreach ($slides as $slide) {
            BookBannerSlide::create($slide);
        }

        $this->command->info('Book banner slides seeded successfully!');
    }
}
