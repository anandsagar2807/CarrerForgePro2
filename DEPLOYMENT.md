# ResumeForge Pro - Deployment Guide
This guide explains how to deploy the application to production using:
- Frontend: Vercel (recommended)
- Backend: Render (recommended) or Railway
- Database: MongoDB Atlas

The instructions are written to match the repository structure typically used in this project:
- Frontend in `frontend/`
- Backend in `backend/`

If your backend folder is named `server/` in your repo, use that instead.

---

## Prerequisites

- Node.js 18+ (Node 20 LTS also works)
- A MongoDB Atlas cluster and database user
- A Groq API key (for AI features)
- (Optional) Stripe keys if you are enabling payments
- Accounts on:
  - Vercel (frontend)
  - Render or Railway (backend)

---

## Environment variables

Use the hosting provider dashboards to set environment variables in production. Do not commit real secrets to GitHub.

### Backend environment variables (production)

Set these in Render/Railway for the backend service:

```env
NODE_ENV=production
PORT=5000

# Database
MONGODB_URI=your_mongodb_atlas_connection_string

# AI
GROQ_API_KEY=your_groq_api_key

# Auth
JWT_SECRET=your_long_random_secret

# CORS
CLIENT_URL=https://your-frontend-domain.com

# Optional: Stripe (only if enabled)
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
STRIPE_PRO_PRICE_ID=your_stripe_pro_price_id
```

Notes:
- Some earlier docs use `MONGO_URI`. This project should standardize on `MONGODB_URI`.
- If your code currently expects `MONGO_URI`, either add `MONGO_URI` in production as well, or update the backend code to read `MONGODB_URI`.

### Frontend environment variables (production)

Set these in Vercel:

```env
VITE_API_BASE_URL=https://your-backend-domain.com
```

Notes:
- Some earlier docs use `VITE_API_URL`. This project should standardize on `VITE_API_BASE_URL`.
- If the frontend code expects `VITE_API_URL`, set that in Vercel instead (or in addition).

---

## Deployment overview (recommended order)

1. Deploy the backend first (Render or Railway)
2. Deploy the frontend (Vercel)
3. Update backend CORS to allow the deployed frontend URL
4. Re-deploy backend if you changed environment variables
5. Run production tests

---

## Step 1: Deploy the backend (Render)

1. Sign in to Render
2. Create a new "Web Service"
3. Connect your GitHub repository
4. Configure the service:
   - Name: `resumeforge-backend` (or any name)
   - Environment: Node
   - Root directory: `backend` (or `server` if that is your backend folder)
   - Build command: `npm install`
   - Start command:
     - Use `npm start` if you have a start script
     - Otherwise use the server entrypoint (commonly `node index.js`)
5. Add the backend environment variables (see above)
6. Deploy

After deployment:
- Copy your backend URL from Render (example: `https://your-service.onrender.com`)
- Verify health endpoint:
  - `GET https://your-service.onrender.com/api/health`

---

## Step 1 (alternative): Deploy the backend (Railway)

1. Sign in to Railway
2. Create a new project and deploy from GitHub
3. Select the repository
4. Set the root directory to `backend` (or `server`)
5. Add environment variables (same as above)
6. Deploy

---

## Step 2: Deploy the frontend (Vercel)

1. Sign in to Vercel
2. Create a new project and import your GitHub repository
3. Configure:
   - Framework preset: Vite
   - Root directory: `frontend`
   - Build command: `npm run build`
   - Output directory: `dist`
4. Add environment variable:
   - `VITE_API_BASE_URL` = the backend URL from Step 1
5. Deploy

After deployment:
- Copy your frontend URL from Vercel (example: `https://your-app.vercel.app`)

---

## Step 3: Configure backend CORS for production

Update the backend environment variable:

```env
CLIENT_URL=https://your-app.vercel.app
```

Then redeploy the backend.

---

## MongoDB Atlas setup

1. Create a MongoDB Atlas cluster
2. Create a database user
3. In Network Access:
   - For development: you may temporarily allow `0.0.0.0/0`
   - For production: prefer allowing only your hosting provider IP ranges where possible
4. Get your connection string and set it as `MONGODB_URI` in the backend environment variables

---

## Production testing checklist

Backend:
- `GET /api/health` returns 200
- MongoDB connection is successful (check logs)
- Rate limiter is not blocking normal usage

Frontend:
- App loads successfully
- Routes work:
  - `/templates`
  - `/builder`
  - `/analyze`
  - `/cover-letter`
  - `/chat`
  - `/interview-prep`

End-to-end:
- Register/login works
- Resume save/load works
- AI endpoints respond:
  - Analyze JD
  - ATS score
  - Rewrite
  - Cover letter
  - Chat
  - Interview questions
- PDF export works (if enabled)

---

## Troubleshooting

### Frontend cannot reach backend

Symptoms:
- Requests fail in the browser
- CORS errors in console

Fixes:
- Ensure Vercel env var points to the correct backend URL:
  - `VITE_API_BASE_URL=https://...`
- Ensure backend `CLIENT_URL` matches your Vercel domain
- Ensure the backend is deployed and running

### Backend cannot connect to MongoDB

Fixes:
- Confirm `MONGODB_URI` is correct
- Confirm Atlas Network Access allows your server
- Confirm the database user has correct permissions

### AI features not working

Fixes:
- Ensure `GROQ_API_KEY` is set in the backend host
- Check backend logs for upstream API errors
- Confirm request rate limits are not being triggered

---

## Monitoring

- Backend logs: Render/Railway dashboard
- Frontend logs: Vercel dashboard
- Database monitoring: MongoDB Atlas dashboard

---

## Cost notes

Costs depend on usage. Typical starting setup:
- MongoDB Atlas: free tier available
- Render/Railway: free tiers available (may sleep on inactivity)
- Vercel: free tier available
- AI APIs: usage-based (Groq pricing depends on plan)
