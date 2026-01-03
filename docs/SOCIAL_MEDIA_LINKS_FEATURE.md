# Dynamic Social Media Links Feature

## Overview
This feature allows administrators to dynamically manage social media links displayed on the homepage. The system supports adding, removing, reordering, and toggling the visibility of social media links through an intuitive admin panel with drag-and-drop functionality.

## Key Features

### 1. **Dynamic Social Media Management**
- Add any social media platform (Facebook, Twitter, Instagram, LinkedIn, YouTube, GitHub, etc.)
- Remove social media links
- Edit labels and URLs
- Toggle active/inactive status
- Drag-and-drop to reorder links

### 2. **Frontend Display**
- Only the first 3 active social media links are displayed on the homepage
- Links are ordered based on the admin-defined sequence
- Responsive design with proper icons

### 3. **Supported Platforms**
The system comes pre-configured with support for:
- Facebook
- Twitter
- Instagram
- LinkedIn
- YouTube
- TikTok
- Dribbble
- Behance
- GitHub
- Pinterest
- Reddit
- Snapchat
- WhatsApp
- Telegram
- Discord
- Twitch

## Database Structure

### Table: `social_media_links`
- `id` - Primary key
- `platform` - Platform identifier (e.g., facebook, twitter)
- `label` - Display label
- `url` - Social media profile URL
- `icon` - Icon identifier
- `order` - Display order (0-based)
- `is_active` - Active status
- `created_at` - Timestamp
- `updated_at` - Timestamp

## Backend Implementation

### Model: `SocialMediaLink`
**Location:** `app/Models/SocialMediaLink.php`

**Key Methods:**
- `scopeActive($query)` - Filter only active links
- `scopeOrdered($query)` - Order by display order

**Constants:**
- `AVAILABLE_PLATFORMS` - Array of supported platforms with default icons and labels

### Controller: `SocialMediaLinkController`
**Location:** `app/Http/Controllers/Admin/SocialMediaLinkController.php`

**Endpoints:**
- `GET /admin/social-media-links` - List all social media links
- `POST /admin/social-media-links` - Create new social media link
- `PUT /admin/social-media-links/{id}` - Update existing link
- `DELETE /admin/social-media-links/{id}` - Delete link
- `POST /admin/social-media-links/reorder` - Reorder links via drag-and-drop
- `POST /admin/social-media-links/{id}/toggle-active` - Toggle active status

### Routes
**Location:** `routes/web.php`

All routes are under the `/admin` prefix and require authentication.

## Frontend Implementation

### Admin Panel
**Location:** `resources/js/pages/dashboard/social-media-links/index.tsx`

**Features:**
- Drag-and-drop reordering using `@dnd-kit/sortable`
- Add new social media link via dialog
- Edit existing links
- Delete links with confirmation
- Toggle active status with switch
- Visual feedback for drag operations

**Technologies:**
- React with TypeScript
- Inertia.js for server-side routing
- Shadcn UI components
- DND Kit for drag-and-drop
- Sonner for toast notifications

### Homepage Display
**Location:** `resources/js/pages/Home/Components/Banner.jsx`

**Features:**
- Displays first 3 active social media links
- Dynamically loads icons based on platform
- Responsive design
- Links open in new tab

## Icon Assets

Social media icons are stored in: `public/assets/home/`

Available icons:
- `linkedin.svg`
- `dribbble.svg` (note: filename is `dribble.svg`)
- `behance.svg`
- `facebook.svg`
- `twitter.svg`
- `instagram.svg`
- `youtube.svg`
- `github.svg`

## Usage Guide

### For Administrators

#### Adding a New Social Media Link
1. Navigate to **Dashboard → Social Media Links**
2. Click **"Add Social Link"** button
3. Select platform from dropdown
4. Enter label (auto-populated but editable)
5. Enter full URL of your profile
6. Toggle active status if needed
7. Click **"Create"**

#### Editing a Social Media Link
1. Click the **pencil icon** next to the link
2. Modify label or URL
3. Click **"Update"**

#### Reordering Links
1. Click and hold the **grip icon** (six dots) on the left
2. Drag the link to desired position
3. Release to save new order
4. Order is saved automatically

#### Toggling Active Status
1. Use the **switch toggle** next to each link
2. Only active links appear on the homepage
3. Only the first 3 active links are shown

#### Deleting a Link
1. Click the **trash icon** next to the link
2. Confirm deletion in the popup
3. Link is permanently removed

### For Developers

#### Adding a New Platform
1. Add platform to `SocialMediaLink::AVAILABLE_PLATFORMS` in the model
2. Add corresponding icon to `public/assets/home/{platform}.svg`
3. Update `getSocialIcon()` function in Banner component if needed

#### Customizing Display Limit
To show more/fewer than 3 links on homepage:
1. Edit `HomeController::home()` method
2. Change `->take(3)` to desired number

#### Styling
- Admin panel uses Shadcn UI components with Tailwind CSS
- Homepage banner uses custom Tailwind classes
- Icons are SVG files for scalability

## Database Seeding

Initial data is seeded via `SocialMediaLinkSeeder`:
- LinkedIn (active, order: 1)
- Dribbble (active, order: 2)
- Behance (active, order: 3)

Run seeder:
```bash
php artisan db:seed --class=SocialMediaLinkSeeder
```

Or include in main seeder:
```bash
php artisan migrate:fresh --seed
```

## API Response Format

### List Response
```json
{
  "socialLinks": [
    {
      "id": 1,
      "platform": "linkedin",
      "label": "LinkedIn",
      "url": "https://linkedin.com/in/username",
      "icon": "linkedin",
      "order": 0,
      "is_active": true
    }
  ],
  "availablePlatforms": {
    "facebook": { "label": "Facebook", "icon": "facebook" }
  }
}
```

### Create/Update Response
```json
{
  "success": true,
  "message": "Social media link created successfully",
  "socialLink": { /* link object */ }
}
```

### Reorder Response
```json
{
  "success": true,
  "message": "Social media links reordered successfully"
}
```

## Migration

The migration file creates the `social_media_links` table:
```bash
php artisan migrate
```

File: `database/migrations/2025_12_24_070725_create_social_media_links_table.php`

## Testing

### Manual Testing Checklist
- [ ] Add a new social media link
- [ ] Edit an existing link
- [ ] Delete a link
- [ ] Reorder links via drag-and-drop
- [ ] Toggle active/inactive status
- [ ] Verify only first 3 active links show on homepage
- [ ] Verify order matches admin panel
- [ ] Test responsive design on mobile
- [ ] Verify links open in new tab

### Automated Testing
Create tests in `tests/Feature/SocialMediaLinksTest.php`:
- CRUD operations
- Reordering functionality
- Active status filtering
- Homepage display limit

## Troubleshooting

### Icons Not Showing
- Verify SVG files exist in `public/assets/home/`
- Check icon filename matches platform identifier
- Clear browser cache

### Drag-and-Drop Not Working
- Ensure `@dnd-kit/core`, `@dnd-kit/sortable`, and `@dnd-kit/utilities` are installed
- Check browser console for JavaScript errors

### Links Not Appearing on Homepage
- Verify links are marked as active in admin panel
- Check HomeController is passing socialMediaLinks prop
- Ensure Banner component receives the prop

## Future Enhancements
- Custom icon upload
- Link analytics/click tracking
- A/B testing for link order
- Schedule link activation/deactivation
- Social media feed integration
- Link preview/validation

## Credits
Implemented on: December 24, 2025
Technology Stack: Laravel 11, React, TypeScript, Inertia.js, Tailwind CSS, DND Kit
