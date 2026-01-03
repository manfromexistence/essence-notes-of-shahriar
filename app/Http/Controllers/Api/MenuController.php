<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\MenuItem;
use App\Models\HeroSection;
use Illuminate\Http\JsonResponse;

class MenuController extends Controller
{
    /**
     * Get all active menu items for the frontend navigation.
     * Returns only active items, sorted by order.
     */
    public function index(): JsonResponse
    {
        $menuItems = MenuItem::with(['children' => function ($query) {
            $query->active()->ordered();
        }])
            ->active()
            ->root()
            ->ordered()
            ->get()
            ->map(function ($item) {
                return [
                    'id' => $item->id,
                    'label' => $item->label,
                    'url' => $item->url,
                    'target' => $item->target,
                    'icon' => $item->icon,
                    'children' => $item->children->map(function ($child) {
                        return [
                            'id' => $child->id,
                            'label' => $child->label,
                            'url' => $child->url,
                            'target' => $child->target,
                            'icon' => $child->icon,
                        ];
                    }),
                ];
            });

        // Get site title from active hero section
        $hero = HeroSection::where('is_active', true)->orderBy('order')->first();
        $siteTitle = $hero?->title ?? 'Shahriar Khan';

        return response()->json([
            'success' => true,
            'data' => $menuItems,
            'site_title' => $siteTitle,
        ]);
    }
}
