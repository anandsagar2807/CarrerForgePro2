# ResumeForge Pro

A professional AI-powered resume builder with advanced features including ATS optimization, AI bullet rewriting, interview preparation, and cover letter generation. Now powered by **OpenRouter API** for flexible, cost-effective AI access.

---

# Features

- **8 Professional Templates**
  - Modern
  - ATS-friendly
  - Creative
  - Executive
  - Minimalist
  - Tech
  - Compact
  - Professional

- **AI-Powered Analysis (via OpenRouter)**
  - ATS Score Checker with industry benchmarks
  - Resume bullet point rewriter
  - Job description analyzer
  - Interview question generator

- **Smart Resume Builder**
  - Guided wizard
  - Real-time preview
  - Auto-save support

- **Cover Letter Generator**
  - AI-generated personalized cover letters

- **AI Chat Assistant**
  - Career guidance
  - Resume optimization tips
  - Job search strategies

- **Export Options**
  - Professional PDF downloads

---

# 🛠️ Tech Stack

## Frontend

- React 18
- Vite
- TailwindCSS
- Framer Motion
- React Router
- Lucide Icons

## Backend

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- Stripe Payment Integration
- OpenRouter API

---

# Getting Started

## Prerequisites

Make sure you have the following installed:

- Node.js 18+
- MongoDB 6+
- npm or yarn
- OpenRouter API Key  
  👉 https://openrouter.ai

---

# ⚙️ Installation

## 1. Clone the Repository

```bash
git clone <your-repo-url>
cd ResumeForge-Pro
```

---

## 2. Install Backend Dependencies

```bash
cd server
npm install
```

---

## 3. Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

---

#  Environment Variables

## Backend `.env`

```env
PORT=5000

MONGODB_URI=mongodb://localhost:27017/resumeforge

JWT_SECRET=your-super-secret-jwt-key

CLIENT_URL=http://localhost:5173

NODE_ENV=development

# OpenRouter Configuration
OPENROUTER_API_KEY=your_openrouter_api_key
OPENROUTER_BASE_URL=https://openrouter.ai/api/v1
OPENROUTER_MODEL=openai/gpt-3.5-turbo

# Optional Fallback Model
OPENROUTER_FALLBACK_MODEL=anthropic/claude-2

# OpenRouter Optional Headers
OPENROUTER_SITE_URL=http://localhost:5173
OPENROUTER_SITE_NAME=ResumeForgePro

# Stripe Configuration
STRIPE_SECRET_KEY=your_stripe_key

# Rate Limiting
AI_REQUESTS_PER_MINUTE=30
AI_REQUESTS_PER_DAY=1000
```

---

## Frontend `.env`

```env
VITE_API_URL=http://localhost:5000/api
```

---

#  Running the Application

## Start Backend Server

```bash
cd server
npm run dev
```

---

## Start Frontend Server

```bash
cd frontend
npm run dev
```

---

## Open Browser

```txt
http://localhost:5173
```

---

# 📁 Project Structure

```text
ResumeForge-Pro/
│
├── frontend/
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Page components
│   │   ├── context/         # React context providers
│   │   ├── services/        # API services
│   │   ├── hooks/           # Custom React hooks
│   │   └── types/           # TypeScript types
│   │
│   ├── public/              # Static assets
│   └── package.json
│
├── server/
│   ├── controllers/         # Route controllers
│   ├── models/              # MongoDB models
│   ├── routes/              # API routes
│   ├── services/
│   │   └── aiService.js     # OpenRouter AI integration
│   │
│   ├── middleware/          # Express middleware
│   ├── config/
│   │   └── openrouter.js    # OpenRouter configuration
│   │
│   └── package.json
│
└── DEPLOYMENT.md            # Deployment guide
```

---

#  API Endpoints

# Authentication Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | User registration |
| POST | `/api/auth/login` | User login |
| GET | `/api/auth/me` | Get current user |

---

# Resume Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/resume/create` | Create resume |
| GET | `/api/resume/:id` | Get resume by ID |
| PUT | `/api/resume/:id` | Update resume |
| DELETE | `/api/resume/:id` | Delete resume |
| GET | `/api/resume/user/:userId` | Get user resumes |

---

# AI Routes (OpenRouter Powered)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/ai/analyze-ats` | ATS score analysis |
| POST | `/api/ai/rewrite-bullet` | Rewrite resume bullets |
| POST | `/api/ai/generate-cover-letter` | Generate cover letter |
| POST | `/api/ai/interview-questions` | Generate interview questions |
| POST | `/api/ai/chat` | AI chat assistant |

---

# Payment Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/payment/create-checkout` | Stripe checkout |
| POST | `/api/payment/webhook` | Stripe webhook |

---

# AI-Powered Resume Analysis

## ATS Score Checker

- Resume ATS scoring
- Industry benchmark comparison
- Formatting analysis
- Keyword optimization

---

## OpenRouter Integration Benefits

### ✅ Multiple Models

Access 100+ AI models through one API.

### ✅ Cost Optimization

Use cheaper models for fast tasks and premium models for advanced analysis.

### ✅ Automatic Fallback Support

Fallback to secondary models if the primary fails.

### ✅ Rate Limiting

Built-in request limiting support.

### ✅ Usage Analytics

Monitor token usage and API cost.

---

# 🧠 Smart Resume Builder

- Real-time preview
- Step-by-step guided builder
- Professional resume templates
- Auto-save functionality

---

# ✨ AI Bullet Point Rewriter

Transforms simple bullet points into professional achievements.

### Features

- Strong action verbs
- Quantifiable metrics
- Industry-tailored writing
- Multiple variations

---

# 📝 Cover Letter Generator

Generate personalized AI cover letters based on:

- Resume content
- Job descriptions
- Industry role

---

# 🎯 Interview Preparation

Generate:

- Behavioral interview questions
- Technical interview questions
- Industry-specific questions
- Interview tips and best practices

---

# 💬 AI Chat Assistant

Provides:

- Career guidance
- Resume improvement tips
- Job search strategies
- Real-time assistance

---

# ⚡ OpenRouter Configuration

## Example Model Configuration

```javascript
const MODELS = {
  fast: 'openai/gpt-3.5-turbo',
  balanced: 'anthropic/claude-2',
  premium: 'openai/gpt-4-turbo',
  coding: 'meta-llama/llama-2-70b',
  analysis: 'google/gemini-pro'
}
```

#  Deployment

# Production Checklist

- ✅ Strong JWT Secret
- ✅ MongoDB Authentication
- ✅ HTTPS/TLS Enabled
- ✅ Proper Rate Limiting
- ✅ Secure CORS Configuration
- ✅ Security Headers Enabled
- ✅ Monitoring & Alerts
- ✅ Backup Strategy
- ✅ OpenRouter API Key Added
- ✅ Fallback Models Configured
- ✅ Stripe Webhooks Configured

---

# Quick Deployment Platforms

| Service | Platform |
|---------|----------|
| Frontend | Vercel / Netlify |
| Backend | Render / Railway / Heroku |
| Database | MongoDB Atlas |
| AI Provider | OpenRouter |

---

#  Environment Variables Reference

## Required Variables

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
OPENROUTER_API_KEY=your_openrouter_api_key
```

---

## Optional Variables

```env
STRIPE_SECRET_KEY=for_payment_processing
CLIENT_URL=http://localhost:5173
PORT=5000

OPENROUTER_BASE_URL=https://openrouter.ai/api/v1
OPENROUTER_MODEL=openai/gpt-3.5-turbo
OPENROUTER_FALLBACK_MODEL=anthropic/claude-2
OPENROUTER_SITE_URL=http://localhost:5173
OPENROUTER_SITE_NAME=ResumeForgePro

AI_REQUESTS_PER_MINUTE=30
AI_REQUESTS_PER_DAY=1000
```

---

# 🧩 AI Service Implementation Example

```javascript
// server/services/aiService.js

import { OpenRouter } from '../config/openrouter.js';

class AIService {
  constructor() {
    this.client = new OpenRouter({
      apiKey: process.env.OPENROUTER_API_KEY,
      baseURL: process.env.OPENROUTER_BASE_URL,
      defaultModel: process.env.OPENROUTER_MODEL,
      fallbackModel: process.env.OPENROUTER_FALLBACK_MODEL
    });
  }

  async analyzeATS(resumeText, jobDescription) {
    try {
      const response = await this.client.chat({
        model: 'openai/gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are an ATS resume analysis expert...'
          },
          {
            role: 'user',
            content: `Analyze this resume: ${resumeText}\nJob: ${jobDescription}`
          }
        ]
      });

      return response;

    } catch (error) {

      // Automatic fallback
      return await this.client.chatWithFallback(error);
    }
  }
}

export default AIService;
```

---

# Testing

## Backend Tests

```bash
cd server
npm test
```

---

## Frontend Tests

```bash
cd frontend
npm test
```

---

## Test OpenRouter Connection

```bash
node server/test/openrouter.test.js
```

---

# 🛠️ Troubleshooting

# Issue: Invalid API Key

```bash
curl https://openrouter.ai/api/v1/auth/key \
  -H "Authorization: Bearer $OPENROUTER_API_KEY"
```

---

# Issue: Rate Limit Exceeded

### Solution

- Implement exponential backoff
- Upgrade OpenRouter plan
- Monitor usage dashboard

```txt
https://openrouter.ai/activity
```

---

# 🤝 Contributing

1. Fork the repository
2. Create a feature branch

```bash
git checkout -b feature/AmazingFeature
```

3. Commit changes

```bash
git commit -m "Add some AmazingFeature"
```

4. Push changes

```bash
git push origin feature/AmazingFeature
```

5. Open a Pull Request

---

# 📚 Documentation

- API Reference
- Deployment Guide
- Contribution Guide

---

# 📜 License

This project is licensed under the **MIT License**.

---

# 🕘 Version History

| Version | Changes |
|---------|----------|
| v1.0.0 | Initial release with OpenAI |
| v1.1.0 | Migrated to OpenRouter API |
| v1.2.0 | Added multi-model support |
| v1.3.0 | Enhanced rate limiting and usage tracking |

---

# ❤️ Built With Passion

Built with ❤️ for job seekers using OpenRouter's unified AI API.

---

# ✅ Status

## Production Ready
