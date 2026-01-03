<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PageContent;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PageContentController extends Controller
{
    public function index(Request $request)
    {
        $page = $request->get('page', 'all');
        
        $query = PageContent::orderBy('page')->orderBy('section')->orderBy('order');
        
        if ($page !== 'all') {
            $query->where('page', $page);
        }
        
        $contents = $query->get()->groupBy(['page', 'section']);
        
        $pages = PageContent::select('page')->distinct()->pluck('page');
        
        return Inertia::render('dashboard/page-contents/index', [
            'contents' => $contents,
            'pages' => $pages,
            'selectedPage' => $page
        ]);
    }

    public function create()
    {
        $pages = ['about', 'blogs', 'books', 'contact', 'donation', 'entrepreneurship', 'events', 'life_events', 'technology', 'videos'];
        $types = ['text', 'textarea', 'image', 'url', 'number'];
        
        return Inertia::render('dashboard/page-contents/create', [
            'pages' => $pages,
            'types' => $types
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'page' => 'required|string',
            'section' => 'required|string',
            'key' => 'required|string',
            'value' => 'nullable|string',
            'type' => 'required|in:text,textarea,image,url,number',
            'order' => 'nullable|integer',
            'is_active' => 'boolean',
            'metadata' => 'nullable|array'
        ]);

        PageContent::create($validated);

        return redirect()->route('admin.page-contents.index')
            ->with('success', 'Page content created successfully.');
    }

    public function show(PageContent $pageContent)
    {
        return redirect()->route('admin.page-contents.edit', $pageContent);
    }

    public function edit(PageContent $pageContent)
    {
        $pages = ['about', 'blogs', 'books', 'contact', 'donation', 'entrepreneurship', 'events', 'life_events', 'technology', 'videos'];
        $types = ['text', 'textarea', 'image', 'url', 'number'];
        
        return Inertia::render('dashboard/page-contents/edit', [
            'pageContent' => $pageContent,
            'pages' => $pages,
            'types' => $types
        ]);
    }

    public function update(Request $request, PageContent $pageContent)
    {
        $validated = $request->validate([
            'page' => 'required|string',
            'section' => 'required|string',
            'key' => 'required|string',
            'value' => 'nullable|string',
            'type' => 'required|in:text,textarea,image,url,number',
            'order' => 'nullable|integer',
            'is_active' => 'boolean',
            'metadata' => 'nullable|array'
        ]);

        $pageContent->update($validated);

        return redirect()->route('admin.page-contents.index')
            ->with('success', 'Page content updated successfully.');
    }

    public function destroy(PageContent $pageContent)
    {
        $pageContent->delete();

        return redirect()->route('admin.page-contents.index')
            ->with('success', 'Page content deleted successfully.');
    }
}
