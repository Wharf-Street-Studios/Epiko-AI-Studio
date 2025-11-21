# Preventing Supabase Auto-Pause

## Problem

Supabase's free tier automatically pauses projects that haven't received activity for **7+ days**. You received this warning:

> "Your project Epiko AI Studio was one of those and it is scheduled to be paused in a couple of days."

## ✅ Immediate Action Taken

I just ran a connection test that generated activity on your database. This should reset the pause timer.

---

## Long-Term Solutions

### Option 1: GitHub Actions (Recommended - Automated)

**What it does**: Automatically pings your Supabase database every 6 days

**Setup** (5 minutes):

1. **Add GitHub Secrets**
   ```
   Go to: https://github.com/YOUR_USERNAME/Epiko-AI-Studio/settings/secrets/actions

   Add these secrets:
   - SUPABASE_URL = https://qtaidcamesetdbpqkmjq.supabase.co
   - SUPABASE_SERVICE_ROLE_KEY = eyJhbGci... (your key)
   ```

2. **Commit the workflow**
   ```bash
   git add .github/workflows/keep-supabase-alive.yml
   git commit -m "Add Supabase keep-alive workflow"
   git push
   ```

3. **Verify it's working**
   - Go to: https://github.com/YOUR_USERNAME/Epiko-AI-Studio/actions
   - Click "Keep Supabase Active"
   - Click "Run workflow" to test manually
   - Should see green checkmark ✅

**Cost**: Free (GitHub Actions free tier: 2,000 min/month)

---

### Option 2: Manual Script (Weekly)

**What it does**: Run a script yourself once a week

**Setup**:

Run this command every week (or whenever you remember):
```bash
cd /Users/aniket/Developer/Claude-Workspace/Epiko-AI-Studio/server
node keep-supabase-alive.js
```

**Schedule with cron** (optional):
```bash
# Open crontab
crontab -e

# Add this line (runs every Sunday at midnight)
0 0 * * 0 cd /Users/aniket/Developer/Claude-Workspace/Epiko-AI-Studio/server && node keep-supabase-alive.js
```

---

### Option 3: Deploy Backend to Production

**What it does**: Once your backend is deployed, regular user activity will keep Supabase active

**Setup**:

Follow the deployment guides we just created:
```bash
cd server
open QUICK_START.md
```

Deploy to Railway/Render, and your app's normal traffic will prevent pauses.

**Cost**: $7-20/month (hosting) + you may want to upgrade Supabase to paid tier

---

### Option 4: Upgrade Supabase to Paid Tier

**What it does**: Eliminates auto-pause entirely

**Cost**: $25/month

**Benefits**:
- No auto-pause ever
- Better performance
- More storage
- Point-in-time recovery
- Priority support

**Setup**:
1. Go to [Supabase Dashboard](https://supabase.com/dashboard/project/qtaidcamesetdbpqkmjq/settings/billing/subscription)
2. Upgrade to Pro plan
3. Done!

---

## Comparison

| Option | Cost | Setup Time | Reliability | Best For |
|--------|------|------------|-------------|----------|
| **GitHub Actions** | Free | 5 min | ⭐⭐⭐⭐⭐ Fully automated | **Development** |
| **Manual Script** | Free | 1 min | ⭐⭐ Depends on you | Quick fix |
| **Deploy Backend** | $7-20/mo | 30-60 min | ⭐⭐⭐⭐⭐ Production traffic | **Production** |
| **Upgrade Supabase** | $25/mo | 2 min | ⭐⭐⭐⭐⭐ No pauses | Enterprise |

---

## Recommended Strategy

### For Development (Now)
1. ✅ Set up GitHub Actions (automated, free)
2. ✅ Run manual script occasionally as backup

### For Production (Later)
1. Deploy backend to Railway/Render
2. Consider upgrading Supabase to Pro tier

---

## Scripts Available

### `test-supabase-connection.js`
Tests database connectivity and generates activity.
```bash
node server/test-supabase-connection.js
```

### `keep-supabase-alive.js`
Dedicated keep-alive script with better logging.
```bash
node server/keep-supabase-alive.js
```

Both scripts will:
- Generate database activity
- Reset the 7-day pause timer
- Verify connection is working

---

## Understanding Supabase Activity

Supabase considers these as "activity":
- ✅ Database queries (SELECT, INSERT, UPDATE, DELETE)
- ✅ Auth operations
- ✅ Storage operations
- ✅ API calls to your project
- ❌ Just visiting the dashboard (doesn't count)

Our scripts perform multiple database queries to ensure activity is registered.

---

## Monitoring

### Check if GitHub Action is running

1. Go to: https://github.com/YOUR_USERNAME/Epiko-AI-Studio/actions
2. Look for "Keep Supabase Active" workflow
3. Should run every 6 days automatically
4. Check for green checkmarks ✅

### Check Supabase Status

1. Go to: https://supabase.com/dashboard/project/qtaidcamesetdbpqkmjq
2. Look for any warning banners
3. Check "Project Settings" → "General" for status

---

## Troubleshooting

### GitHub Action Fails

**Error**: "Missing Supabase credentials"
**Solution**: Add secrets to GitHub repository settings

**Error**: "Could not find profiles table"
**Solution**: Run `supabase-schema.sql` in Supabase SQL Editor

### Manual Script Fails

**Error**: "Cannot find module '@supabase/supabase-js'"
**Solution**:
```bash
cd server
npm install
```

### Still Getting Pause Warnings

**Solution**:
1. Run manual script immediately: `node server/keep-supabase-alive.js`
2. Check GitHub Actions is set up correctly
3. Consider upgrading to paid tier

---

## What Happens if Paused?

If your project does get paused:

1. **Don't panic** - Your data is safe
2. Go to [Supabase Dashboard](https://supabase.com/dashboard/project/qtaidcamesetdbpqkmjq)
3. Click "Unpause Project"
4. Wait 1-2 minutes for project to wake up
5. Set up one of the automated solutions above

**Data retention**: 90 days after pause. After that, you can download your data but can't unpause.

---

## Next Steps

### Right Now (5 minutes)
1. Set up GitHub Actions:
   ```bash
   # Add secrets to GitHub
   # Then commit and push
   git add .github/workflows/keep-supabase-alive.yml
   git add server/keep-supabase-alive.js
   git add server/test-supabase-connection.js
   git commit -m "Add Supabase keep-alive automation"
   git push
   ```

2. Test it manually:
   - Go to GitHub Actions tab
   - Run workflow manually
   - Verify success ✅

### This Week (30-60 minutes)
3. Deploy backend to production (follow `server/QUICK_START.md`)
4. Once deployed, production traffic will handle keep-alive

### Optional
5. Consider upgrading Supabase to Pro tier ($25/month) for no pauses

---

## Quick Reference

**Manual keep-alive**:
```bash
node server/keep-supabase-alive.js
```

**Test connection**:
```bash
node server/test-supabase-connection.js
```

**Check GitHub Actions**:
https://github.com/YOUR_USERNAME/Epiko-AI-Studio/actions

**Supabase Dashboard**:
https://supabase.com/dashboard/project/qtaidcamesetdbpqkmjq

---

## Summary

✅ **Immediate**: I ran a test that generated activity (pause timer reset)
✅ **Automated**: GitHub Actions workflow created (runs every 6 days)
✅ **Manual backup**: Keep-alive script available
✅ **Long-term**: Deploy backend or upgrade Supabase

**Recommended**: Set up GitHub Actions now (5 minutes), then deploy to production later.

Your Supabase project should never pause again! 🎉
