# ResumeForge Pro - Deployment Guide

## Prerequisites
Before deploying, ensure you have:
- Node.js 18+ installed
- MongoDB Atlas account
- OpenAI API key or Groq API key
- Vercel account (for frontend) or any hosting service
- Render/Railway account (for backend) or any Node.js hosting

## Environment Variables

### Backend (.env)
```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
OPENAI_API_KEY=your_openai_api_key
GROQ_API_KEY=your_groq_api_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
STRIPE_PRO_PRICE_ID=your_stripe_pro_price_id
CLIENT_URL=https://your-frontend-domain.com
NODE_ENV=production
JWT_SECRET=your_jwt_secret_key_here
```

### Frontend (.env)
```env
VITE_API_URL=https://your-backend-domain.com
```

## Deployment Steps

### 1. Backend Deployment (Render/Railway)

#### Using Render:
1. Go to [render.com](https://render.com) and sign in
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: resumeforge-backend
   - **Root Directory**: server
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `node index.js`
5. Add all environment variables from above
6. Click "Create Web Service"
7. Copy the deployed URL (e.g., https://resumeforge-backend.onrender.com)

#### Using Railway:
1. Go to [railway.app](https://railway.app) and sign in
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Add environment variables
5. Set root directory to `server`
6. Deploy

### 2. Frontend Deployment (Vercel)

#### Using Vercel:
1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: frontend
   - **Build Command**: `npm run build`
   - **Output Directory**: dist
5. Add environment variable:
   - `VITE_API_URL`: Your backend URL from step 1
6. Click "Deploy"

#### Using Netlify:
1. Go to [netlify.com](https://netlify.com) and sign in
2. Click "Add new site" → "Import an existing project"
3. Connect to GitHub and select your repository
4. Configure:
   - **Base directory**: frontend
   - **Build command**: `npm run build`
   - **Publish directory**: frontend/dist
5. Add environment variable: `VITE_API_URL`
6. Click "Deploy site"

### 3. Update Backend CORS

After deploying frontend, update the backend `.env`:
```env
CLIENT_URL=https://your-vercel-app.vercel.app
```

Redeploy the backend for changes to take effect.

### 4. MongoDB Atlas Setup

1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Click "Connect" → "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your database password
6. Add to backend environment variables as `MONGO_URI`
7. In "Network Access", add `0.0.0.0/0` to allow connections from anywhere

## Production Checklist

- [ ] MongoDB Atlas cluster created and connection string added
- [ ] All environment variables configured
- [ ] Backend deployed and health endpoint working (`/api/health`)
- [ ] Frontend deployed and can access backend
- [ ] CORS configured correctly
- [ ] API keys (OpenAI/Groq) are valid and have credits
- [ ] Test all features: resume builder, AI analysis, cover letter generation
- [ ] SSL/HTTPS enabled (automatic on Vercel/Render)
- [ ] Custom domain configured (optional)

## Testing Production

1. Visit your frontend URL
2. Test the following:
   - Homepage loads correctly
   - Navigate to Templates page
   - Try the Analyze feature with sample resume and JD
   - Test AI Bullet Rewriter
   - Test Interview Prep feature
   - Test Cover Letter generator
   - Test AI Chat Assistant

## Troubleshooting

### Backend not connecting to MongoDB
- Check MongoDB Atlas IP whitelist includes `0.0.0.0/0`
- Verify connection string format
- Check database user has read/write permissions

### Frontend can't reach backend
- Verify `VITE_API_URL` is set correctly
- Check CORS settings in backend
- Ensure backend is deployed and running

### AI features not working
- Verify API keys are valid
- Check API key has sufficient credits
- Review backend logs for errors

## Monitoring

- **Backend logs**: Check Render/Railway dashboard
- **Frontend logs**: Check Vercel/Netlify dashboard
- **Database**: Monitor MongoDB Atlas dashboard

## Cost Estimates

- **MongoDB Atlas**: Free tier (512MB)
- **Render/Railway**: Free tier available
- **Vercel/Netlify**: Free tier for personal projects
- **OpenAI API**: Pay per use (~$0.002 per request)
- **Groq API**: Free tier available

## Support

For issues, check:
1. Backend logs
2. Frontend console errors
3. MongoDB Atlas connection status
4. API key validity

---

**Your ResumeForge Pro is now ready for production! 🚀**
