# About Me CMS - Quick Reference Guide

## 🚀 Quick Start

### Access the Dashboard
Navigate to: `/admin/about-sections`

### Available Tabs
1. **Banner** - Hero section with video
2. **Report** - Statistics display
3. **Awards** - Awards and recognitions
4. **Story** - Journey story sections
5. **Impact** - Entrepreneur & technology impact
6. **Travel** - Business travel countries
7. **Corporate** - Corporate journey & philosophy
8. **Associates** - Partners and associates

---

## 📝 Section Management Guide

### 1️⃣ Banner Section
**Purpose**: Main hero section with video and title

**Editable Fields:**
- Label (e.g., "About Me")
- Title (main headline)
- Banner Image (right side image)
- Video Thumbnail (clickable image)
- Video URL (YouTube embed URL)

**Steps:**
1. Go to Banner tab
2. Fill in text fields
3. Upload images (optional)
4. Paste YouTube embed URL
5. Click "Save Banner Settings"

---

### 2️⃣ Report Section
**Purpose**: Display 7 key statistics and a description

**Editable Fields:**
- Description (paragraph text)
- 7 Statistics (each with value and label)
  - Example: Value: "11" | Label: "Years Journey"

**Steps:**
1. Go to Report tab
2. Update description
3. Modify statistics (value + label pairs)
4. Click "Save Report Settings"

---

### 3️⃣ Awards Section
**Purpose**: Showcase awards and recognitions

**Management:**
- **View**: Table displays all awards
- **Add**: Click "Add Award" button → Fill form → Save
- **Edit**: Click ⋮ menu → Edit → Update → Save
- **Delete**: Click ⋮ menu → Delete → Confirm

**Award Fields:**
- Title
- Organization
- Award Date
- Description
- Image
- Order (display position)

---

### 4️⃣ Story Sections
**Purpose**: Tell your journey in 3 sections

**Management:**
- **View**: Table shows all story sections
- **Add**: Click "Add Story Section" → Fill form
- **Edit**: Click ⋮ menu → Edit → Update
- **Delete**: Click ⋮ menu → Delete

**Story Fields:**
- Title (e.g., "The start of a bigger story")
- Content (rich text with paragraphs)
- Image
- Order (1, 2, 3 for sequence)
- Active Status

**Tips:**
- Separate paragraphs with double line breaks
- Images alternate left/right automatically by order

---

### 5️⃣ Impact Section
**Purpose**: Display entrepreneur and technology impact

**Management:**
- **View**: Shows current impact section
- **Edit**: Click "Edit Impact Section"

**Impact Data:**
- Entrepreneur Impact content
- Technology Impact content
- Impact area tags (8 items)
- Multiple images

---

### 6️⃣ Travel Section
**Purpose**: Show business travel countries

**Management:**
- **View**: Shows current travel section
- **Edit**: Click "Edit Travel Section"

**Travel Data:**
- Section title
- Description
- Country list with flags
- World map image

---

### 7️⃣ Corporate Journey
**Purpose**: Display career timeline and philosophy

**Section Settings:**
- Title (e.g., "Corporate Journey")
- Philosophy Title
- Philosophy Image
- Logic Theory sections
- Background image

**Journey Items:**
- **View**: Table displays journey timeline
- **Add**: Click "Add Journey Item"
- **Edit**: Click ⋮ menu → Edit
- **Delete**: Click ⋮ menu → Delete

**Journey Item Fields:**
- Step Number (1, 2, 3...)
- Title (role/position)
- Company name
- Description
- Icon image
- Order

**Steps to Update:**
1. Go to Corporate tab
2. Update settings at top (title, philosophy, logic content)
3. Click "Save Corporate Settings"
4. Manage journey items in table below

---

### 8️⃣ Associates Section
**Purpose**: Display partner logos and description

**Section Settings:**
- Title (e.g., "Associate")
- Description
- Background Image

**Associate Items:**
- **View**: Table displays all associates
- **Add**: Click "Add Associate"
- **Edit**: Click ⋮ menu → Edit
- **Delete**: Click ⋮ menu → Delete

**Associate Fields:**
- Name
- Logo Image
- Order
- Active Status

**Steps:**
1. Go to Associates tab
2. Update section settings (title, description, background)
3. Click "Save Associates Settings"
4. Manage associate list in table below

---

## 🎨 Image Upload Guidelines

### Recommended Sizes
- **Banner Image**: 800x600px or larger
- **Video Thumbnail**: 600x400px
- **Award Images**: 200x200px
- **Story Images**: 460x332px
- **Corporate Journey Icons**: 100x100px
- **Associate Logos**: 150x50px (horizontal logos work best)
- **Philosophy Image**: 500x700px

### Supported Formats
- JPEG (.jpg, .jpeg)
- PNG (.png)
- GIF (.gif)
- WebP (.webp)

### File Size Limits
- Maximum: 5MB per image

---

## ⚙️ Tips & Best Practices

### Content Writing
- ✅ Keep titles concise and impactful
- ✅ Use line breaks for readability
- ✅ Proofread before saving
- ✅ Use consistent tone across sections

### Images
- ✅ Use high-quality images
- ✅ Optimize images before uploading (compress)
- ✅ Use consistent aspect ratios
- ✅ Include alt text when available

### Order Management
- ✅ Use sequential numbers (1, 2, 3...)
- ✅ Leave gaps (10, 20, 30) for future insertions
- ✅ Keep related items in logical order

### Active Status
- ✅ Deactivate instead of deleting (preserves data)
- ✅ Use for seasonal content
- ✅ Test changes with active=false first

---

## 🔧 Common Tasks

### Adding a New Award
1. Awards tab → "Add Award"
2. Fill: Title, Organization, Date, Description
3. Upload image
4. Set order number
5. Save

### Updating Statistics
1. Report tab
2. Modify value/label pairs
3. Example: "15" → "Years" becomes "15 Years"
4. Save

### Changing Banner Video
1. Banner tab
2. Paste new YouTube embed URL
3. Format: `https://www.youtube.com/embed/VIDEO_ID`
4. Update thumbnail if needed
5. Save

### Reordering Story Sections
1. Story tab → Edit each section
2. Change order number (1, 2, 3)
3. Lower numbers appear first
4. Save each section

### Adding a Corporate Journey Step
1. Corporate tab → Journey Items table
2. "Add Journey Item"
3. Fill: Step #, Title, Company, Description
4. Upload icon
5. Set order
6. Save

---

## 🐛 Troubleshooting

### Images Not Showing
**Problem**: Uploaded images don't display on frontend

**Solution**:
1. Run: `php artisan storage:link` in terminal
2. Check file uploaded to `/public/storage/`
3. Verify database path starts with `/storage/`

### Changes Not Saving
**Problem**: Form submits but no changes appear

**Solution**:
1. Check for validation errors (red text under fields)
2. Ensure all required fields filled
3. Try clearing browser cache
4. Check file size limits for uploads

### Table Shows No Data
**Problem**: Dashboard tables are empty

**Solution**:
1. Run seeders: `php artisan db:seed --class=AboutSectionSeeder`
2. Check database connection
3. Verify you're logged in as admin

---

## 📞 Support Reference

### File Locations
- Dashboard: `resources/js/pages/dashboard/about-sections/page.tsx`
- Frontend: `resources/js/pages/AboutMe/Page/AboutMe.jsx`
- Models: `app/Models/AboutMePageSetting.php`
- Controllers: `app/Http/Controllers/Admin/AboutMePageSettingController.php`

### Database Tables
- `about_me_page_settings` - Section settings
- `about_sections` - Story, Impact, Travel content
- `awards` - Awards data
- `corporate_journey_items` - Career timeline
- `associates` - Partner logos

### Routes
- Frontend: `/aboutme`
- Dashboard: `/admin/about-sections`
- API endpoints: `/admin/about-me-page-settings/update-*`

---

**Last Updated**: November 24, 2025
**Version**: 1.0
