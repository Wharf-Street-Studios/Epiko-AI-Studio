# Quick Start Guide - Production Deployment

Get your Epiko AI Studio backend live in production in under 30 minutes.

## TL;DR - Fastest Path to Production

**Railway (Recommended)** - Easiest, fastest deployment:

1. Push code to GitHub
2. Go to [railway.app](https://railway.app) → New Project → Deploy from GitHub
3. Select repository, set root directory to `server`
4. Add environment variables (copy from `.env.example`)
5. Deploy! 🚀

Your API will be live at: `https://your-app.up.railway.app`

---

## Step-by-Step Railway Deployment

### Step 1: Prepare Your Code (2 minutes)

```bash
# Ensure you're in the server directory
cd server

# Verify package.json exists
ls package.json

# Commit any changes
git add .
git commit -m "Prepare backend for production deployment"
git push
```

### Step 2: Sign Up for Railway (1 minute)

1. Go to [railway.app](https://railway.app)
2. Click **"Start a New Project"**
3. Sign in with GitHub

### Step 3: Create New Project (2 minutes)

1. Click **"Deploy from GitHub repo"**
2. Select your repository: `Epiko-AI-Studio`
3. Click **"Add variables"** or **"Settings"** → **"Variables"**
4. Set **Root Directory**: `server`

### Step 4: Configure Environment Variables (10 minutes)

Click **"Variables"** tab and add these (get values from your accounts):

#### Essential Variables
```env
NODE_ENV=production
PORT=5001

# Supabase (from https://app.supabase.com)
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_ANON_KEY=eyJhbGci...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...

# JWT
JWT_SECRET=CHANGE-THIS-TO-RANDOM-32-CHARACTERS
JWT_EXPIRES_IN=7d

# Frontend
FRONTEND_URL=https://wharf-street-studios.github.io/Epiko-AI-Studio

# Google Gemini (from https://ai.google.dev/)
GEMINI_API_KEY=AIza...
GEMINI_MODEL=gemini-2.0-flash

# OpenAI (from https://platform.openai.com/api-keys)
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-4

# Razorpay (from https://dashboard.razorpay.com/)
RAZORPAY_KEY_ID=rzp_live_...
RAZORPAY_KEY_SECRET=...
```

**Pro Tip**: Generate secure JWT secret:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Step 5: Deploy (5 minutes)

1. Railway will automatically start deploying
2. Watch the build logs in the **"Deployments"** tab
3. Wait for "Deployed successfully" message
4. Copy your production URL from the **"Settings"** → **"Domains"** section

### Step 6: Verify Deployment (2 minutes)

Test your API:

```bash
# Replace with your Railway URL
curl https://your-app-name.up.railway.app/health

# Expected response:
# {"status":"OK","message":"Epiko AI Studios API is running","timestamp":"..."}
```

### Step 7: Update Frontend (5 minutes)

Update your frontend to use the production API:

**File**: `src/services/api.ts` or `.env`

```typescript
// Option 1: Update api.ts directly
const API_BASE_URL = 'https://your-app-name.up.railway.app/api';

// Option 2: Use environment variable
// Create .env.production in frontend root
VITE_API_URL=https://your-app-name.up.railway.app/api
```

Redeploy frontend:
```bash
cd ..  # Go back to root
npm run build
npm run deploy
```

---

## Alternative: Render Deployment

Prefer Render? Here's the quick path:

### Step 1: Create Web Service

1. Go to [render.com](https://render.com)
2. Click **"New +"** → **"Web Service"**
3. Connect GitHub and select your repository

### Step 2: Configure Service

```
Name: epiko-ai-studio-backend
Region: Oregon
Branch: main
Root Directory: server
Runtime: Node
Build Command: npm ci
Start Command: npm start
```

### Step 3: Add Environment Variables

Use the **"Environment"** tab to add all variables from Step 4 above.

### Step 4: Deploy

Click **"Create Web Service"** - Render will build and deploy automatically.

Your URL: `https://epiko-ai-studio-backend.onrender.com`

---

## Getting API Keys

### Supabase
1. Go to [supabase.com](https://supabase.com)
2. Create new project (or use existing)
3. Settings → API → Copy keys
4. Run SQL from `supabase-schema.sql` in SQL Editor

### Google Gemini
1. Go to [ai.google.dev](https://ai.google.dev/)
2. Click **"Get API Key"**
3. Create new API key
4. Copy key

### OpenAI
1. Go to [platform.openai.com](https://platform.openai.com/api-keys)
2. Create new secret key
3. Copy key (won't be shown again!)
4. Add credits to account

### Razorpay
1. Go to [dashboard.razorpay.com](https://dashboard.razorpay.com/)
2. Sign up for business account
3. Complete KYC verification
4. Settings → API Keys → Generate Live Keys
5. **Important**: Use `rzp_live_...` keys, NOT `rzp_test_...`

---

## Common Issues & Fixes

### Issue: Build Fails

**Solution**: Check Node version
```bash
# Railway uses Node 20 by default
# Verify package.json has correct engine
{
  "engines": {
    "node": ">=18.0.0"
  }
}
```

### Issue: 500 Errors After Deployment

**Solution**: Check environment variables
- Go to Railway/Render dashboard → Variables
- Verify all required variables are set
- Check logs for specific error messages

### Issue: CORS Errors from Frontend

**Solution**: Update `FRONTEND_URL`
```bash
# Railway
railway variables --set FRONTEND_URL=https://your-frontend-url.com

# Or update in dashboard
```

### Issue: Database Connection Failed

**Solution**: Verify Supabase credentials
- Check SUPABASE_URL is correct (includes `https://`)
- Verify keys are not truncated
- Test connection manually:
```bash
curl -X GET 'YOUR_SUPABASE_URL/rest/v1/' \
  -H "apikey: YOUR_ANON_KEY"
```

### Issue: Payment Verification Failed

**Solution**: Use production Razorpay keys
- Key ID must start with `rzp_live_` (not `rzp_test_`)
- Verify webhook URL is configured (if using)
- Check Razorpay dashboard for failed payments

---

## Cost Breakdown

### Railway
- **Hobby**: $5/month (good for testing)
- **Pro**: $20/month (recommended for production)
- Includes: Automatic HTTPS, custom domains, metrics

### Render
- **Free**: $0 (spins down after inactivity)
- **Starter**: $7/month (always on)
- **Standard**: $25/month (more resources)

### API Usage (Estimated)
- **Gemini**: Free tier → $0.00025/request
- **OpenAI DALL-E 3**: $0.04-0.08/image
- **Razorpay**: 2% + ₹0 per transaction

**Total for small app (100 users/month)**: ~$20-30/month

---

## Next Steps After Deployment

1. **Test Everything**
   - [ ] Health check endpoint
   - [ ] User registration
   - [ ] Login
   - [ ] AI tool generation
   - [ ] Payment flow

2. **Setup Monitoring**
   - [ ] Add uptime monitoring (UptimeRobot, Pingdom)
   - [ ] Configure error tracking (Sentry)
   - [ ] Set up alerts for downtime

3. **Optimize**
   - [ ] Enable caching
   - [ ] Add CDN for uploads
   - [ ] Optimize database queries

4. **Document**
   - [ ] Update README with production URLs
   - [ ] Create API documentation
   - [ ] Document common issues

---

## Emergency Rollback

If something goes wrong:

### Railway
```bash
# Via CLI
railway rollback

# Via Dashboard
Deployments → Previous deployment → Redeploy
```

### Render
```bash
# Via Dashboard
Dashboard → Select previous deployment → Redeploy
```

---

## Support & Resources

- **Railway Docs**: [docs.railway.app](https://docs.railway.app)
- **Render Docs**: [render.com/docs](https://render.com/docs)
- **Supabase Docs**: [supabase.com/docs](https://supabase.com/docs)
- **This Project**:
  - Full deployment guide: `PRODUCTION_DEPLOYMENT.md`
  - Deployment checklist: `DEPLOYMENT_CHECKLIST.md`
  - Integration guide: `INTEGRATION_GUIDE.md`

---

## You're Ready! 🚀

Your backend is now production-ready. Follow the steps above, and you'll have a live API in under 30 minutes.

**Questions?** Check `PRODUCTION_DEPLOYMENT.md` for detailed troubleshooting.

**Pro Tip**: Start with Railway for simplicity. You can always migrate to another platform later.

Good luck with your launch! 🎉
