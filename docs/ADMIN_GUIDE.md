# Admin Quick Reference Guide

## Accessing Admin Panels

All admin panels are accessible from your dashboard after logging in.

### Navigation URLs:
- Page Contents: `/admin/page-contents`
- Corporate Journey: `/admin/corporate-journey`
- Associates: `/admin/associates`
- Featured Blog Banners: `/admin/featured-blog-banners`

---

## 1. Page Contents Management

**Purpose:** Manage all text, images, and URLs across all pages.

### Structure:
- **Page:** Which page (about, blogs, books, etc.)
- **Section:** Which section of the page (banner, report, etc.)
- **Key:** What content (title, description, image, etc.)
- **Value:** The actual content
- **Type:** text, textarea, image, url, or number

### Common Keys by Page:

#### About Page - Banner Section:
- `video_thumbnail` - Video thumbnail image
- `video_url` - YouTube embed URL
- `label` - "About Me" label
- `title` - Main heading
- `banner_image` - Right side image

#### About Page - Report Section:
- `stat_1_value` through `stat_7_value` - Numbers
- `stat_1_label` through `stat_7_label` - Labels
- `description` - Bottom description text

#### About Page - Corporate Journey:
- `title` - Section heading
- `background_image` - Background image

#### About Page - Associates:
- `title` - Section title
- `description` - Section description
- `background_image` - Background image

#### Blogs Page - Banner:
- `title` - Page title
- `vector_right` - Top right decoration
- `vector_left` - Bottom left decoration

### How to Edit:
1. Filter by page you want to edit
2. Find the section and key
3. Click edit icon
4. Update the value
5. Save

---

## 2. Corporate Journey Management

**Purpose:** Manage the 5-step career timeline on About page.

### Fields:
- **Step Number:** 1-5
- **Title:** Milestone name (e.g., "Graduation")
- **Company:** Organization name
- **Description:** Detailed description
- **Icon Image:** Icon/image path
- **Order:** Display order
- **Is Active:** Show/hide

### Example:
- Step 1: Graduation
- Step 2: First Job
- Step 3: Last Job
- Step 4: Entrepreneur
- Step 5: Nexkraft Launching

### How to Add New Item:
1. Click "Add New Item"
2. Fill in all fields
3. Upload icon image (optional)
4. Set order number
5. Mark as active
6. Save

---

## 3. Associates Management

**Purpose:** Manage partner organization logos on About page.

### Fields:
- **Name:** Organization name
- **Logo Image:** Logo file path
- **URL:** Website link (optional)
- **Order:** Display order
- **Is Active:** Show/hide

### How to Add New Associate:
1. Click "Add New Associate"
2. Enter name
3. Upload logo image
4. Add website URL (optional)
5. Set order
6. Mark as active
7. Save

---

## 4. Featured Blog Banners

**Purpose:** Manage the featured blog grid on Blogs page.

### Fields:
- **Title:** Blog post title
- **Image:** Featured image
- **Date:** Publication date
- **Read Time:** e.g., "10 Min Read"
- **Size:** large, medium, or small
- **Order:** Display order
- **Is Active:** Show/hide

### Layout:
- **1 Large Banner:** Takes 2x2 grid (main featured)
- **4 Medium Banners:** Take 1x1 grid each

### How to Add New Banner:
1. Click "Add New Banner"
2. Enter title
3. Upload image
4. Select date
5. Choose size (large for main, medium for grid)
6. Set order (1 = first)
7. Mark as active
8. Save

---

## Tips & Best Practices

### Images:
- Use `/assets/...` for images in public/assets folder
- Use full URLs for external images
- Recommended sizes:
  - Banners: 1920x800px
  - Logos: 200x100px
  - Icons: 100x100px

### Text Content:
- Keep titles under 100 characters
- Use line breaks for multi-line content
- Test on mobile after changes

### Order Numbers:
- Lower numbers display first
- Use increments of 10 (10, 20, 30) for easy reordering
- You can use decimals (15, 25) to insert between

### Active/Inactive:
- Inactive items are hidden from frontend
- Use to temporarily hide content
- Keep for seasonal content

### Backup:
- Database is automatically backed up
- Content changes are logged
- Can restore from backups if needed

---

## Common Tasks

### Change Homepage Banner Text:
1. Go to Page Contents
2. Filter by "home" page
3. Find "banner" section
4. Edit "title" or "subtitle" key
5. Save

### Add New Career Step:
1. Go to Corporate Journey
2. Click "Add New Item"
3. Fill in details with next step number
4. Upload icon
5. Save

### Feature Different Blogs:
1. Go to Featured Blog Banners
2. Add new or edit existing
3. Set appropriate size and order
4. Save

### Hide/Show Content:
1. Find the item in respective admin panel
2. Toggle "Is Active" to false/true
3. Save

---

## Troubleshooting

**Image not showing:**
- Check file path is correct
- Ensure image exists in public/assets
- Check file permissions

**Content not updating:**
- Clear browser cache
- Check if item is marked active
- Verify you saved changes

**Layout broken:**
- Check image sizes
- Verify text length
- Test on mobile view

**Need help?**
Contact the development team for assistance.
