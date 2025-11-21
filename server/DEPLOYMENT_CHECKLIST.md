# Deployment Checklist

Use this checklist before deploying to production.

## Pre-Deployment

### Code & Configuration
- [ ] All code committed to git
- [ ] `.env` file is in `.gitignore` (DO NOT commit secrets)
- [ ] `.env.example` is up to date with all required variables
- [ ] `package.json` scripts tested (`npm start`, `npm run dev`)
- [ ] No TODO comments in critical code paths
- [ ] Remove or secure any test/debug endpoints

### Environment Variables
- [ ] `NODE_ENV` set to `production`
- [ ] `PORT` configured (default: 5001)
- [ ] `SUPABASE_URL` configured
- [ ] `SUPABASE_ANON_KEY` configured
- [ ] `SUPABASE_SERVICE_ROLE_KEY` configured
- [ ] `JWT_SECRET` is strong (32+ random characters, NOT default value)
- [ ] `FRONTEND_URL` set to production URL
- [ ] `GEMINI_API_KEY` configured
- [ ] `OPENAI_API_KEY` configured
- [ ] `RAZORPAY_KEY_ID` is PRODUCTION key (`rzp_live_...`, NOT `rzp_test_...`)
- [ ] `RAZORPAY_KEY_SECRET` is production secret

### Database (Supabase)
- [ ] All tables created from `supabase-schema.sql`
- [ ] Row Level Security (RLS) enabled on all tables
- [ ] RLS policies tested and working
- [ ] Database backups configured
- [ ] Test data cleaned up (no dummy/test records in production)
- [ ] Indexes added for performance-critical queries

### API Keys & Services
- [ ] Gemini API key is valid and has quota
- [ ] OpenAI API key is valid and has credits
- [ ] Razorpay account is activated (not in test mode)
- [ ] Razorpay webhook URL configured (if using webhooks)
- [ ] All API keys are for production environments

### Security
- [ ] Helmet.js configured (already done ✅)
- [ ] CORS configured with production frontend URL
- [ ] Rate limiting enabled (already done ✅)
- [ ] No sensitive data in logs
- [ ] File upload size limits set
- [ ] Input validation on all endpoints
- [ ] SQL injection prevention (using Supabase client ✅)
- [ ] XSS prevention (using Express JSON parser ✅)

## Deployment Steps

### Choose Platform
- [ ] Railway (recommended for simplicity)
- [ ] Render (good free tier)
- [ ] Docker (most flexible)

### Railway Deployment
1. - [ ] Create account at railway.app
2. - [ ] Create new project from GitHub repo
3. - [ ] Set root directory to `server`
4. - [ ] Add all environment variables
5. - [ ] Deploy and wait for build
6. - [ ] Test health endpoint: `https://your-app.up.railway.app/health`

### Render Deployment
1. - [ ] Create account at render.com
2. - [ ] Create new Web Service
3. - [ ] Connect GitHub repository
4. - [ ] Configure build and start commands
5. - [ ] Add all environment variables
6. - [ ] Deploy
7. - [ ] Test health endpoint: `https://your-app.onrender.com/health`

### Docker Deployment
1. - [ ] Build image: `docker build -t epiko-backend .`
2. - [ ] Test locally: `docker run -p 5001:5001 --env-file .env.production epiko-backend`
3. - [ ] Push to registry (Docker Hub, ECR, etc.)
4. - [ ] Deploy to hosting platform
5. - [ ] Test health endpoint

## Post-Deployment Verification

### API Endpoints Testing
Test each endpoint:

#### Health Check
```bash
curl https://your-backend-url.com/health
# Expected: {"status":"OK","message":"Epiko AI Studios API is running"}
```

#### Authentication
```bash
# Register new user
curl -X POST https://your-backend-url.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test123!","username":"testuser"}'

# Login
curl -X POST https://your-backend-url.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test123!"}'
```

#### AI Tools (requires auth token)
```bash
# Test face swap
curl -X POST https://your-backend-url.com/api/ai/face-swap \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"image":"base64_image_data","template":"template1"}'
```

#### Payments
```bash
# Create order
curl -X POST https://your-backend-url.com/api/payments/create-order \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"credits":20,"amount":99}'
```

### Cross-Origin Testing
- [ ] Test API calls from production frontend
- [ ] Verify CORS headers are correct
- [ ] Check preflight OPTIONS requests work

### Performance Testing
- [ ] Response times < 2 seconds for most endpoints
- [ ] AI generation completes within timeout
- [ ] Database queries optimized
- [ ] No memory leaks (monitor for 24 hours)
- [ ] Rate limiting working correctly

### Error Handling
- [ ] 404 errors return proper JSON
- [ ] 500 errors don't expose stack traces (in production)
- [ ] Validation errors return helpful messages
- [ ] Unauthorized requests return 401
- [ ] Forbidden requests return 403

## Frontend Integration

### Update Frontend
- [ ] Update `VITE_API_URL` in frontend to production backend URL
- [ ] Test all API integrations from frontend
- [ ] Verify authentication flow works
- [ ] Test all AI tools end-to-end
- [ ] Test payment flow with real Razorpay
- [ ] Verify error messages display correctly

### Update Razorpay in Frontend
In your frontend code, update Razorpay configuration:

```typescript
// src/screens/profile/Wallet.tsx or payment component
const razorpayOptions = {
  key: 'rzp_live_YOUR_PRODUCTION_KEY', // NOT rzp_test_...
  // ... other options
};
```

## Monitoring & Alerts

### Setup Monitoring
- [ ] Error tracking (Sentry, Bugsnag, or similar)
- [ ] Uptime monitoring (UptimeRobot, Pingdom, etc.)
- [ ] API response time monitoring
- [ ] Database query performance monitoring
- [ ] Log aggregation (Papertrail, Loggly, or similar)

### Configure Alerts
- [ ] Email alerts for API downtime
- [ ] Slack/Discord webhook for critical errors
- [ ] Threshold alerts for high error rates
- [ ] Alerts for low API key quotas

### Cost Monitoring
- [ ] Set up billing alerts for hosting platform
- [ ] Monitor Gemini API usage and costs
- [ ] Monitor OpenAI API usage and costs
- [ ] Track Razorpay transaction fees

## Documentation

### Update Documentation
- [ ] Update README with production URL
- [ ] Document API endpoints (Swagger/Postman)
- [ ] Create runbook for common issues
- [ ] Document deployment process
- [ ] Update environment variables documentation

### Team Communication
- [ ] Share production URLs with team
- [ ] Document access credentials (securely)
- [ ] Share monitoring dashboard access
- [ ] Document on-call procedures

## Backup & Recovery

### Data Backup
- [ ] Supabase automatic backups enabled
- [ ] Test database restore process
- [ ] Document backup schedule
- [ ] Store backups in separate location

### Disaster Recovery Plan
- [ ] Document recovery steps for major outage
- [ ] Test recovery process
- [ ] Keep backup of all environment variables (encrypted)
- [ ] Document rollback procedure

## Legal & Compliance

### Privacy & Security
- [ ] Privacy policy updated
- [ ] Terms of service in place
- [ ] GDPR compliance checked (if EU users)
- [ ] CCPA compliance checked (if California users)
- [ ] COPPA compliance verified (13+ age restriction)
- [ ] Content moderation policy in place

### Payment Compliance
- [ ] Razorpay account verified
- [ ] Business details updated in Razorpay
- [ ] Payment webhooks configured
- [ ] Refund policy documented
- [ ] Tax compliance checked (GST if India)

## Performance & Scaling

### Initial Scale
- [ ] Start with single instance
- [ ] Monitor resource usage
- [ ] Identify bottlenecks

### Scaling Checklist (when needed)
- [ ] Enable horizontal scaling
- [ ] Add load balancer
- [ ] Configure session persistence
- [ ] Add Redis for caching
- [ ] Optimize database queries
- [ ] Add CDN for static assets
- [ ] Consider database read replicas

## Launch Day

### Final Checks (Launch -1 day)
- [ ] All checklist items above completed
- [ ] Staging environment tested
- [ ] Load testing completed
- [ ] Team briefed on launch plan
- [ ] Monitoring dashboards ready
- [ ] Support channels ready

### Launch Sequence
1. - [ ] Deploy to production
2. - [ ] Verify health endpoint
3. - [ ] Test critical user flows
4. - [ ] Update frontend API URL
5. - [ ] Deploy frontend
6. - [ ] Smoke test complete flow
7. - [ ] Monitor logs for 1 hour
8. - [ ] Announce launch 🚀

### Post-Launch (First 24 hours)
- [ ] Monitor error rates continuously
- [ ] Check API response times
- [ ] Verify payment flow working
- [ ] Monitor user registration
- [ ] Check AI generation success rate
- [ ] Monitor server resource usage

### Post-Launch (First Week)
- [ ] Daily log review
- [ ] User feedback collection
- [ ] Performance optimization based on metrics
- [ ] Fix any critical bugs immediately
- [ ] Update documentation based on issues found

## Rollback Plan

If issues occur:

1. **Immediate Actions**
   - [ ] Stop accepting new traffic (if critical)
   - [ ] Assess impact and severity
   - [ ] Communicate status to users

2. **Rollback Steps**
   - [ ] Revert to previous deployment
   - [ ] Restore database if needed
   - [ ] Update frontend to use old API
   - [ ] Verify old version works

3. **Post-Mortem**
   - [ ] Document what went wrong
   - [ ] Fix issue in development
   - [ ] Add monitoring to catch similar issues
   - [ ] Update deployment checklist

## Success Metrics

Track these metrics post-launch:

- [ ] API uptime (target: 99.9%)
- [ ] Average response time (target: < 500ms)
- [ ] Error rate (target: < 1%)
- [ ] AI generation success rate (target: > 95%)
- [ ] Payment success rate (target: > 98%)
- [ ] User registration rate
- [ ] Active users (DAU/MAU)

---

## Quick Reference

### Production URLs
- **Backend**: `https://your-backend-url.com`
- **Frontend**: `https://wharf-street-studios.github.io/Epiko-AI-Studio`
- **Database**: Supabase dashboard URL
- **Monitoring**: Your monitoring service URL

### Important Links
- Railway/Render Dashboard
- Supabase Dashboard
- Razorpay Dashboard
- Gemini AI Console
- OpenAI API Dashboard
- Error Tracking Dashboard

### Emergency Contacts
- DevOps Lead: [Contact info]
- Backend Developer: [Contact info]
- Database Admin: [Contact info]

---

**Good luck with your deployment! 🚀**

Remember: Start small, monitor closely, scale gradually.
