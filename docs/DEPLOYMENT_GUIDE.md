# Deployment & Migration Guide

## Pre-Deployment Checklist

- [ ] Backup current database
- [ ] Test migrations on local/staging environment
- [ ] Review all seeder data matches current website
- [ ] Ensure all image paths are correct
- [ ] Test admin panels locally
- [ ] Verify frontend displays correctly

---

## Step-by-Step Deployment

### 1. Backup Database

```bash
# Create backup before any changes
php artisan db:backup

# Or manually export database
mysqldump -u username -p database_name > backup_$(date +%Y%m%d).sql
```

### 2. Pull Latest Code

```bash
git pull origin main
# or download and extract latest code
```

### 3. Install Dependencies (if needed)

```bash
composer install --no-dev --optimize-autoloader
npm install && npm run build
```

### 4. Run Migrations

```bash
# Migrate new tables
php artisan migrate

# Check migration status
php artisan migrate:status
```

Expected new migrations:
- `2025_11_24_000001_create_page_contents_table`
- `2025_11_24_000002_create_corporate_journey_items_table`
- `2025_11_24_000003_create_associates_table`
- `2025_11_24_000004_create_featured_blog_banners_table`

### 5. Seed Initial Data

```bash
# Run all seeders (includes new content)
php artisan db:seed

# Or run specific seeders
php artisan db:seed --class=PageContentSeeder
php artisan db:seed --class=CorporateJourneySeeder
php artisan db:seed --class=AssociateSeeder
php artisan db:seed --class=FeaturedBlogBannerSeeder
```

### 6. Clear Caches

```bash
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear
```

### 7. Optimize

```bash
php artisan optimize
php artisan config:cache
php artisan route:cache
```

### 8. Test the Application

- [ ] Visit homepage - check content displays
- [ ] Visit all pages - verify no errors
- [ ] Login to admin panel
- [ ] Access each new admin section
- [ ] Try editing content
- [ ] Verify changes appear on frontend

---

## Rollback Plan (If Issues Occur)

### Option 1: Rollback Migrations

```bash
# Rollback last batch of migrations
php artisan migrate:rollback

# Or rollback specific migration
php artisan migrate:rollback --step=4
```

### Option 2: Restore Database Backup

```bash
# Drop and restore database
mysql -u username -p database_name < backup_20241124.sql
```

### Option 3: Revert Code Changes

```bash
# Revert to previous commit
git revert HEAD

# Or checkout previous version
git checkout <previous-commit-hash>
```

---

## Post-Deployment Tasks

### 1. Verify All Pages

Visit and check:
- ✅ Homepage
- ✅ About Me page
- ✅ Blogs page
- ✅ Books page
- ✅ Entrepreneurship page
- ✅ Events page
- ✅ Life Events page
- ✅ Technology page
- ✅ Videos page
- ✅ Contact page

### 2. Test Admin Panels

Login and verify:
- ✅ Page Contents management
- ✅ Corporate Journey management
- ✅ Associates management
- ✅ Featured Blog Banners management

### 3. Test CRUD Operations

For each admin panel, test:
- ✅ Create new item
- ✅ Edit existing item
- ✅ Delete item
- ✅ Verify changes on frontend

### 4. Performance Check

```bash
# Check application performance
php artisan optimize
php artisan route:cache
php artisan config:cache
```

### 5. Monitor Logs

```bash
# Check for any errors
tail -f storage/logs/laravel.log
```

---

## Common Issues & Solutions

### Issue: Migration fails
**Solution:**
- Check database connection
- Verify user has CREATE TABLE permissions
- Check if tables already exist
- Review migration file syntax

### Issue: Seeders fail
**Solution:**
- Check if migrations ran successfully
- Verify image paths exist
- Check for duplicate data constraints
- Review seeder data format

### Issue: Admin panel 404
**Solution:**
- Run `php artisan route:clear`
- Run `php artisan route:cache`
- Check route file syntax
- Verify controller namespaces

### Issue: Images not showing
**Solution:**
- Check image paths in database
- Verify files exist in public/assets
- Check file permissions
- Run `php artisan storage:link`

### Issue: Changes not appearing
**Solution:**
- Clear browser cache
- Run `php artisan cache:clear`
- Run `php artisan view:clear`
- Check if content is marked active

---

## Database Schema Reference

### page_contents Table
```sql
id, page, section, key, value, type, order, is_active, metadata, timestamps
```

### corporate_journey_items Table
```sql
id, step_number, title, company, description, icon_image, order, is_active, timestamps
```

### associates Table
```sql
id, name, logo_image, url, order, is_active, timestamps
```

### featured_blog_banners Table
```sql
id, title, image, date, read_time, size, order, is_active, timestamps
```

---

## Environment-Specific Notes

### Production
- Use `--force` flag for migrations if needed
- Always backup before migrating
- Test on staging first
- Schedule maintenance window
- Monitor error logs closely

### Staging
- Mirror production data
- Test full deployment process
- Verify all functionality
- Get stakeholder approval

### Local Development
- Fresh migrate often: `php artisan migrate:fresh --seed`
- No need for extensive backups
- Test new features here first

---

## Maintenance Commands

### Regular Maintenance
```bash
# Clear old logs
php artisan log:clear

# Optimize application
php artisan optimize

# Update composer
composer update
```

### Database Maintenance
```bash
# Check database size
php artisan db:show

# Optimize database
php artisan db:optimize
```

### Content Management
```bash
# Export content to JSON
php artisan content:export

# Import content from JSON
php artisan content:import
```

---

## Success Criteria

Deployment is successful when:
- ✅ All migrations complete without errors
- ✅ All seeders run successfully
- ✅ Frontend pages display correctly
- ✅ Admin panels accessible and functional
- ✅ CRUD operations work on all content types
- ✅ No errors in application logs
- ✅ Performance is acceptable
- ✅ All images load correctly
- ✅ Mobile responsiveness maintained

---

## Support Contacts

- **Developer:** [Your contact info]
- **DBA:** [Database admin contact]
- **DevOps:** [Server admin contact]
- **Project Manager:** [PM contact]

---

## Rollback Decision Matrix

| Issue | Severity | Action |
|-------|----------|--------|
| Frontend broken | Critical | Immediate rollback |
| Admin panel 404 | High | Rollback or quick fix |
| Some images missing | Medium | Fix forward |
| Minor styling issues | Low | Fix forward |
| Performance degradation | High | Investigate, possibly rollback |

---

## Next Steps After Deployment

1. Monitor application for 24-48 hours
2. Train team on new admin panels
3. Document any custom content added
4. Plan for future enhancements
5. Schedule regular content audits
6. Set up automated backups
7. Create content management workflows

---

## Important Notes

⚠️ **Do not skip the backup step!**
⚠️ **Test on staging before production!**
⚠️ **Have rollback plan ready!**
⚠️ **Monitor logs after deployment!**

✅ All changes are backward compatible
✅ Existing data is preserved
✅ Frontend has fallback values
✅ Can rollback safely if needed

---

For detailed technical information, see `REFACTORING_SUMMARY.md`
For admin usage instructions, see `ADMIN_GUIDE.md`
