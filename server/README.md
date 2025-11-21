# Epiko AI Studio Backend API

Node.js backend for Epiko AI Studio with Supabase database and OpenAI integration.

## 🚀 Production Deployment

Ready to deploy? Check these guides:

- **[Quick Start Guide](QUICK_START.md)** - Deploy to production in 30 minutes (Railway/Render)
- **[Full Deployment Guide](PRODUCTION_DEPLOYMENT.md)** - Comprehensive production deployment documentation
- **[Deployment Checklist](DEPLOYMENT_CHECKLIST.md)** - Complete pre-launch checklist
- **[Integration Guide](INTEGRATION_GUIDE.md)** - API integration documentation

### Deployment Options
- ✅ **Railway** (Recommended) - Fastest, easiest deployment
- ✅ **Render** - Good free tier, automatic deployments
- ✅ **Docker** - Deploy anywhere (AWS, GCP, Azure, DigitalOcean)

## Features

✅ **Authentication System**
- Email/Password registration and login with Supabase Auth
- JWT-based authentication
- Google OAuth integration
- Apple Sign-In integration
- Facebook Login integration

✅ **User Management**
- User profiles with avatar and bio
- Credits system (100 starting credits)
- Follow/unfollow functionality
- Public profile endpoints

✅ **Posts & Social Features**
- Create, read, update, delete posts
- Like/unlike posts
- Save/unsave posts for later
- Comments system
- Share counter
- Feed with pagination
- User-specific post feeds

✅ **AI Tools Integration**
- Face Swap (10 credits)
- AI Avatar Generation (8 credits)
- Duo Portrait (12 credits)
- Poster Maker (10 credits)
- Age Transform (10 credits)
- Image Enhancement (8 credits)
- Generation history tracking

✅ **Security**
- Helmet.js for security headers
- Rate limiting (100 requests per 15 min)
- CORS configuration
- Row Level Security with Supabase
- Input validation

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth
- **AI:** OpenAI API (DALL-E 3)
- **Security:** Helmet, CORS
- **Environment:** dotenv

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Supabase account and project
- OpenAI API key
- npm or yarn package manager

### Installation

1. Navigate to server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Update `.env` with your credentials:
```env
PORT=5001
SUPABASE_URL=your-supabase-project-url
SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
OPENAI_API_KEY=your-openai-api-key
FRONTEND_URL=http://localhost:3000
```

5. Set up Supabase database:
- Go to your Supabase project dashboard
- Navigate to SQL Editor
- Run the schema from `supabase-schema.sql`

6. Start the server:

Development mode with auto-reload:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## API Endpoints

### Authentication

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/register` | Register new user | Public |
| POST | `/api/auth/login` | Login user | Public |
| GET | `/api/auth/me` | Get current user | Private |
| POST | `/api/auth/google` | Google OAuth | Public |
| POST | `/api/auth/apple` | Apple Sign-In | Public |
| POST | `/api/auth/facebook` | Facebook Login | Public |

### Posts

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/posts` | Create new post | Private |
| GET | `/api/posts/feed` | Get feed posts | Optional |
| GET | `/api/posts/:id` | Get single post | Public |
| POST | `/api/posts/:id/like` | Like/unlike post | Private |
| POST | `/api/posts/:id/save` | Save/unsave post | Private |
| POST | `/api/posts/:id/comments` | Add comment | Private |
| DELETE | `/api/posts/:id` | Delete post | Private |
| GET | `/api/posts/user/:username` | Get user posts | Public |

### AI Tools

| Method | Endpoint | Description | Credits | Auth |
|--------|----------|-------------|---------|------|
| POST | `/api/ai/face-swap` | Generate face swap | 10 | Private |
| POST | `/api/ai/avatar` | Generate AI avatar | 8 | Private |
| POST | `/api/ai/duo-portrait` | Generate duo portrait | 12 | Private |
| POST | `/api/ai/poster` | Generate poster | 10 | Private |
| POST | `/api/ai/age-transform` | Transform age | 10 | Private |
| POST | `/api/ai/enhance` | Enhance image | 8 | Private |
| GET | `/api/ai/history` | Get generation history | 0 | Private |

### Health Check

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/health` | Server health status | Public |

## Request/Response Examples

### Register User

**Request:**
```bash
POST /api/auth/register
Content-Type: application/json

{
  "fullName": "John Doe",
  "email": "john@example.com",
  "username": "johndoe",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "fullName": "John Doe",
    "email": "john@example.com",
    "username": "johndoe",
    "avatar": null,
    "credits": 100,
    "authProvider": "email",
    "createdAt": "2024-01-15T10:00:00.000Z"
  }
}
```

### Generate AI Avatar

**Request:**
```bash
POST /api/ai/avatar
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "prompt": "professional businessman in suit",
  "style": "photorealistic"
}
```

**Response:**
```json
{
  "success": true,
  "imageUrl": "https://oaidalleapiprodscus.blob.core.windows.net/...",
  "creditsUsed": 8,
  "remainingCredits": 92
}
```

### Create Post

**Request:**
```bash
POST /api/posts
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "image": "https://example.com/image.jpg",
  "tool": "face-swap",
  "caption": "Amazing face swap result!"
}
```

**Response:**
```json
{
  "success": true,
  "post": {
    "id": "507f1f77bcf86cd799439011",
    "creator": {
      "id": "507f191e810c19729de860ea",
      "fullName": "John Doe",
      "username": "johndoe",
      "avatar": null
    },
    "image": "https://example.com/image.jpg",
    "tool": "face-swap",
    "caption": "Amazing face swap result!",
    "createdAt": "2024-01-15T10:00:00.000Z"
  }
}
```

## Authentication

Protected routes require JWT token in the Authorization header:

```
Authorization: Bearer YOUR_JWT_TOKEN
```

Get token from `/api/auth/login` or `/api/auth/register` response.

## Database Schema

The database uses Supabase (PostgreSQL) with the following main tables:

### Profiles
- Extends Supabase auth.users
- Stores user information, credits, verification status
- Has Row Level Security enabled

### Posts
- Stores user-generated content
- Links to creator via foreign key
- Supports public/private visibility

### Likes, Saves, Comments
- Social interaction tables
- All protected by RLS policies

### AI Generations
- Tracks all AI tool usage
- Stores input parameters and output URLs
- Records credit usage

See `supabase-schema.sql` for complete schema and RLS policies.

## Environment Variables

Required environment variables (see `.env.example`):

```env
# Server
PORT=5001
NODE_ENV=development

# Supabase
SUPABASE_URL=...
SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...

# OpenAI
OPENAI_API_KEY=...
OPENAI_MODEL=gpt-4
OPENAI_MAX_TOKENS=2000

# Frontend
FRONTEND_URL=http://localhost:3000
```

## Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Get your project URL and keys from Settings > API
3. Run the SQL schema from `supabase-schema.sql` in SQL Editor
4. Configure OAuth providers in Authentication > Providers
5. Update `.env` with your credentials

## OpenAI Setup

1. Create an account at [platform.openai.com](https://platform.openai.com)
2. Generate an API key from API Keys section
3. Add credits to your account
4. Update `OPENAI_API_KEY` in `.env`

## Production Deployment

### Deploy to Railway/Render/Heroku

1. Set environment variables in platform dashboard
2. Set `SUPABASE_URL`, `SUPABASE_ANON_KEY`, and `SUPABASE_SERVICE_ROLE_KEY`
3. Set `OPENAI_API_KEY` with your OpenAI key
4. Set `NODE_ENV=production`
5. Deploy from Git repository

## Error Handling

All errors return consistent format:

```json
{
  "success": false,
  "message": "Error description",
  "stack": "... (only in development)"
}
```

Common status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Server Error

## Rate Limiting

- 100 requests per 15 minutes per IP
- Applies to all `/api/*` routes
- Returns 429 status when exceeded

## Credits System

Each user starts with 100 credits. AI tools consume credits:
- Face Swap: 10 credits
- AI Avatar: 8 credits
- Duo Portrait: 12 credits
- Poster Maker: 10 credits
- Age Transform: 10 credits
- Image Enhancement: 8 credits

## Security Best Practices

✅ Supabase Row Level Security (RLS) enabled
✅ JWT token validation via Supabase Auth
✅ Helmet.js security headers
✅ CORS restricted to frontend domain
✅ Rate limiting enabled
✅ Input validation on all endpoints
✅ Environment variables for secrets

## License

MIT License

## Support

For issues and questions:
- GitHub Issues: [repository-url]/issues
- Email: support@epiko.ai

---

Built with Node.js, Express, Supabase, and OpenAI
