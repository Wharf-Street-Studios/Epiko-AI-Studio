# Production Deployment Guide

This guide covers deploying the Epiko AI Studio backend to production environments.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Option 1: Railway Deployment](#option-1-railway-deployment-recommended)
- [Option 2: Render Deployment](#option-2-render-deployment)
- [Option 3: Docker Deployment](#option-3-docker-deployment)
- [Post-Deployment Configuration](#post-deployment-configuration)
- [Environment Variables](#environment-variables)
- [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before deploying, ensure you have:

1. **Supabase Project**
   - Project URL
   - Anon Key
   - Service Role Key
   - Database tables created (run `supabase-schema.sql`)

2. **API Keys**
   - Google Gemini API Key ([Get it here](https://ai.google.dev/))
   - OpenAI API Key ([Get it here](https://platform.openai.com/api-keys))
   - Razorpay Keys ([Get it here](https://dashboard.razorpay.com/))

3. **Git Repository**
   - Code pushed to GitHub/GitLab/Bitbucket

4. **Frontend Deployed**
   - Production URL for CORS configuration

---

## Option 1: Railway Deployment (Recommended)

Railway offers simple deployment with automatic HTTPS and great developer experience.

### Step 1: Install Railway CLI (Optional)

```bash
npm install -g @railway/cli
railway login
```

### Step 2: Deploy via Web Dashboard

1. Go to [railway.app](https://railway.app)
2. Click **"New Project"** → **"Deploy from GitHub repo"**
3. Connect your GitHub account and select your repository
4. Set **Root Directory** to `server`
5. Railway auto-detects the configuration from `railway.json`

### Step 3: Configure Environment Variables

In Railway Dashboard → Variables, add:

```env
NODE_ENV=production
PORT=5001
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
JWT_SECRET=your-secure-random-jwt-secret
JWT_EXPIRES_IN=7d
FRONTEND_URL=https://wharf-street-studios.github.io/Epiko-AI-Studio
GEMINI_API_KEY=your-gemini-api-key
GEMINI_MODEL=gemini-2.0-flash
GEMINI_VISION_MODEL=gemini-2.0-flash
OPENAI_API_KEY=your-openai-api-key
OPENAI_MODEL=gpt-4
OPENAI_MAX_TOKENS=2000
FACE_SWAP_MODEL=dall-e-3
IMAGE_GENERATION_MODEL=dall-e-3
IMAGE_ENHANCEMENT_MODEL=dall-e-3
RAZORPAY_KEY_ID=your-razorpay-key-id
RAZORPAY_KEY_SECRET=your-razorpay-key-secret
MAX_FILE_SIZE=10485760
UPLOAD_DIR=./uploads
```

### Step 4: Deploy

Railway will automatically deploy on push. Your API will be available at:
```
https://your-app-name.up.railway.app
```

### Railway CLI Deployment

```bash
cd server
railway init
railway up
railway open
```

---

## Option 2: Render Deployment

Render provides free tier and automatic deployments.

### Step 1: Create Web Service

1. Go to [render.com](https://render.com)
2. Click **"New +"** → **"Web Service"**
3. Connect your repository
4. Configure:
   - **Name**: epiko-ai-studio-backend
   - **Region**: Oregon (or closest)
   - **Branch**: main
   - **Root Directory**: server
   - **Runtime**: Node
   - **Build Command**: `npm ci`
   - **Start Command**: `npm start`

### Step 2: Use Blueprint (Recommended)

Render will automatically detect `render.yaml` in the server directory.

1. Click **"New"** → **"Blueprint"**
2. Select repository
3. Render reads `render.yaml` and sets up everything
4. Add environment variable values in dashboard

### Step 3: Manual Configuration

If not using blueprint, add environment variables manually:

Go to **Environment** tab and add all variables from `.env.example`

### Step 4: Deploy

Render auto-deploys on git push. Access your API at:
```
https://epiko-ai-studio-backend.onrender.com
```

---

## Option 3: Docker Deployment

Deploy to any platform supporting Docker (AWS, GCP, Azure, DigitalOcean, etc.)

### Step 1: Build Docker Image

```bash
cd server
docker build -t epiko-ai-studio-backend:latest .
```

### Step 2: Test Locally

```bash
# Create .env.production file with all environment variables
docker run -p 5001:5001 --env-file .env.production epiko-ai-studio-backend:latest
```

Test: http://localhost:5001/health

### Step 3: Deploy to Platform

#### Docker Hub
```bash
docker tag epiko-ai-studio-backend:latest yourusername/epiko-ai-studio-backend:latest
docker push yourusername/epiko-ai-studio-backend:latest
```

#### AWS ECS
```bash
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin YOUR_ACCOUNT.dkr.ecr.us-east-1.amazonaws.com
docker tag epiko-ai-studio-backend:latest YOUR_ACCOUNT.dkr.ecr.us-east-1.amazonaws.com/epiko-ai-studio:latest
docker push YOUR_ACCOUNT.dkr.ecr.us-east-1.amazonaws.com/epiko-ai-studio:latest
```

#### DigitalOcean App Platform
```bash
doctl apps create --spec server/render.yaml
```

---

## Post-Deployment Configuration

### 1. Update Frontend API URL

In your frontend repository, update the API URL:

**File**: `src/services/api.ts` or environment variable

```typescript
const API_BASE_URL = process.env.VITE_API_URL || 'https://your-backend-url.com/api';
```

### 2. Update CORS Settings

Verify CORS is configured for your frontend URL in `server.js`:

```javascript
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}));
```

### 3. Test API Endpoints

```bash
# Health check
curl https://your-backend-url.com/health

# Test auth endpoint
curl -X POST https://your-backend-url.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'
```

### 4. Setup Monitoring

#### Railway
- Built-in metrics available in dashboard
- Set up alerts for downtime

#### Render
- Enable auto-deploy on push
- Set up health check notifications

#### External Monitoring (Recommended)
```bash
# Install Sentry for error tracking
npm install @sentry/node
```

Add to `server.js`:
```javascript
import * as Sentry from '@sentry/node';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
});
```

---

## Environment Variables

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `production` |
| `PORT` | Server port | `5001` |
| `SUPABASE_URL` | Supabase project URL | `https://xxx.supabase.co` |
| `SUPABASE_ANON_KEY` | Public anon key | `eyJhbGci...` |
| `SUPABASE_SERVICE_ROLE_KEY` | Service role key | `eyJhbGci...` |
| `JWT_SECRET` | JWT signing secret | Random string (32+ chars) |
| `FRONTEND_URL` | Frontend URL for CORS | `https://your-frontend.com` |
| `GEMINI_API_KEY` | Google Gemini API key | `AIza...` |
| `OPENAI_API_KEY` | OpenAI API key | `sk-...` |

### Payment Variables (Required for Production)

| Variable | Description | Example |
|----------|-------------|---------|
| `RAZORPAY_KEY_ID` | Razorpay key ID | `rzp_live_...` |
| `RAZORPAY_KEY_SECRET` | Razorpay secret key | `your_secret_key` |

⚠️ **Important**: Use production keys (`rzp_live_...`) not test keys (`rzp_test_...`)

### Optional Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `JWT_EXPIRES_IN` | Token expiry | `7d` |
| `GEMINI_MODEL` | Gemini model | `gemini-2.0-flash` |
| `OPENAI_MODEL` | OpenAI model | `gpt-4` |
| `MAX_FILE_SIZE` | Max upload size | `10485760` (10MB) |

---

## Database Setup

### Create Required Tables

Run the SQL schema in your Supabase project:

```bash
# Using Supabase CLI
supabase db push

# Or manually in SQL Editor
# Copy contents of supabase-schema.sql and execute
```

### Verify Tables

Required tables:
- `profiles`
- `posts`
- `likes`
- `saves`
- `comments`
- `comment_likes`
- `followers`
- `ai_generations`
- `payment_orders`

### Enable Row Level Security

Ensure RLS is enabled on all tables:

```sql
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
-- Repeat for all tables
```

---

## Security Checklist

Before going live:

- [ ] Change all default secrets and keys
- [ ] Use production Razorpay keys (not test keys)
- [ ] Enable HTTPS (automatic on Railway/Render)
- [ ] Configure proper CORS origins
- [ ] Set strong JWT_SECRET (32+ random characters)
- [ ] Enable rate limiting (already configured)
- [ ] Review Supabase RLS policies
- [ ] Set up error monitoring (Sentry)
- [ ] Configure backup strategy for Supabase
- [ ] Review file upload limits
- [ ] Test payment flow end-to-end
- [ ] Set up logging and monitoring

---

## Troubleshooting

### 1. 500 Internal Server Error

**Check logs:**
```bash
# Railway
railway logs

# Render
View logs in dashboard

# Docker
docker logs container-id
```

**Common causes:**
- Missing environment variables
- Database connection issues
- API key problems

### 2. CORS Errors

Verify `FRONTEND_URL` matches your frontend domain exactly:
```bash
# Check current setting
railway variables

# Update if needed
railway variables --set FRONTEND_URL=https://your-frontend.com
```

### 3. Database Connection Failed

Check Supabase credentials:
```bash
# Test connection
curl -X GET 'https://your-project.supabase.co/rest/v1/' \
  -H "apikey: your-anon-key" \
  -H "Authorization: Bearer your-anon-key"
```

### 4. Payment Verification Failed

Ensure you're using production Razorpay keys:
- Key ID starts with `rzp_live_` (not `rzp_test_`)
- Webhook signature verification enabled
- Order amounts match (in paise, not rupees)

### 5. AI Generation Fails

Check API keys and quotas:
```bash
# Test Gemini
curl https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=YOUR_KEY

# Test OpenAI
curl https://api.openai.com/v1/models \
  -H "Authorization: Bearer YOUR_KEY"
```

### 6. Out of Memory

Increase memory limits:
- Railway: Automatic scaling
- Render: Upgrade plan for more RAM
- Docker: Add `--memory=512m` flag

---

## Performance Optimization

### 1. Enable Compression

Already configured via Helmet.js

### 2. Database Connection Pooling

Supabase handles this automatically

### 3. Caching

Consider adding Redis for:
- AI generation results
- User session data
- Rate limiting

### 4. CDN for Static Assets

Use Cloudflare or AWS CloudFront for image uploads

---

## Monitoring & Maintenance

### Health Checks

Endpoint: `GET /health`

Expected response:
```json
{
  "status": "OK",
  "message": "Epiko AI Studios API is running",
  "timestamp": "2024-11-21T..."
}
```

### Log Monitoring

Key logs to watch:
- Error rates
- API response times
- Database query performance
- Payment failures
- AI generation success/failure rates

### Regular Maintenance

- [ ] Weekly: Review error logs
- [ ] Monthly: Update dependencies (`npm audit`, `npm update`)
- [ ] Monthly: Check API usage and costs
- [ ] Quarterly: Review and optimize database queries
- [ ] Quarterly: Security audit

---

## Cost Estimates

### Railway (Recommended for MVP)
- **Hobby Plan**: $5/month
- **Pro Plan**: $20/month (recommended)
- Includes: 512MB RAM, automatic HTTPS, metrics

### Render
- **Free Tier**: $0 (sleeps after inactivity)
- **Starter**: $7/month (no sleep)
- **Standard**: $25/month (more resources)

### API Costs (Approximate)
- **Gemini API**: Free tier, then ~$0.00025/request
- **OpenAI DALL-E 3**: ~$0.04-0.08/image
- **Razorpay**: 2% + ₹0 per transaction

**Estimated monthly cost for 1000 users:**
- Hosting: $20
- AI APIs: $50-100
- Payment fees: Variable (2% of revenue)
- **Total**: ~$70-120/month + payment fees

---

## Next Steps

After deployment:

1. **Test all endpoints** using Postman/Thunder Client
2. **Update frontend** with production API URL
3. **Test payment flow** with real Razorpay credentials
4. **Set up monitoring** and alerts
5. **Configure backups** for critical data
6. **Document API** using Swagger/OpenAPI
7. **Load testing** with tools like k6 or Artillery

---

## Support

For deployment issues:
- Railway: [docs.railway.app](https://docs.railway.app)
- Render: [render.com/docs](https://render.com/docs)
- Supabase: [supabase.com/docs](https://supabase.com/docs)

For project-specific issues, check:
- `README.md`
- `INTEGRATION_GUIDE.md`
- `BACKEND_STATUS.md`

---

**Version**: 1.0.0
**Last Updated**: November 2024
**Status**: Production Ready ✅
