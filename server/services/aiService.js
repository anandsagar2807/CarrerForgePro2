const axios = require('axios');

const AI_API_KEY = process.env.OPENROUTER_API_KEY;
const AI_API_URL = 'https://openrouter.ai/api/v1/chat/completions';
const DEFAULT_MODEL = process.env.AI_MODEL || 'google/gemini-2.0-flash-001';

const aiRequest = async (messages, temperature = 0.7, maxTokens = 2000) => {
  if (!AI_API_KEY) {
    console.error('No API key found. OPENROUTER_API_KEY:', process.env.OPENROUTER_API_KEY);
    throw new Error('API key not configured. Please set OPENROUTER_API_KEY in environment variables.');
  }

  try {
    const payload = {
      model: DEFAULT_MODEL,
      messages,
      temperature,
      max_tokens: maxTokens,
      headers: {
        "HTTP-Referer": process.env.CLIENT_URL || "http://localhost:3000",
        "X-Title": "Zaalima Resume Forge Pro"
      }
    };
    console.log('Sending to AI API:', JSON.stringify(payload, null, 2));

    const response = await axios.post(AI_API_URL, payload, {
      headers: {
        'Authorization': `Bearer ${AI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      timeout: 30000,
    });

    return response.data.choices[0]?.message?.content;
  } catch (error) {
    console.error('AI API error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.error?.message || 'AI service unavailable');
  }
};

// Analyze Job Description
exports.analyzeJD = async (jdText) => {
  const content = await aiRequest([
    {
      role: 'system',
      content: 'You are a sophisticated JD Analysis Agent. Your task is to scrape and parse the target Job Description to semantically extract and rank critical keywords. Focus on hard skills, soft skills, technologies, and industry-specific terminology.'
    },
    {
      role: 'user',
      content: `Analyze this job description and extract critical keywords. Rank them by importance (high, medium, low). 
      Return valid JSON only in this format: 
      { 
        "keywords": [
          { "term": "keyword", "rank": "high|medium|low", "category": "technical|soft|tool" }
        ],
        "summary": "Brief summary of key requirements",
        "atsTips": ["tip1", "tip2"] 
      }. 
      JD: ${jdText}`
    }
  ], 0.3);
  
  try {
    return JSON.parse(content);
  } catch {
    return { keywords: [], summary: "", atsTips: [] };
  }
};

// Rewrite Bullet Point
exports.rewriteBullet = async (bullet, keyword, context = "") => {
  return await aiRequest([
    {
      role: 'system',
      content: 'You are an expert resume editor. Your goal is to rewrite resume bullet points to perfectly match JD keywords, optimizing for Applicant Tracking Systems (ATS). Use the XYZ formula (Accomplished X, as measured by Y, by doing Z) and ensure the target keywords are naturally integrated.'
    },
    {
      role: 'user',
      content: `Rewrite this resume bullet point to include the target keyword(s): '${keyword}'. 
      Optimization Context: ${context}
      Original Bullet: ${bullet}
      
      Requirements:
      1. Use strong action verbs.
      2. Quantify achievements where possible.
      3. Ensure the keyword fits naturally.
      4. Maximize ATS score.`
    }
  ]);
};

// Calculate ATS Score
exports.calculateATSScore = async (resumeText, jdText) => {
  const content = await aiRequest([
    {
      role: 'system',
      content: 'You are an expert ATS scoring system. Compare resumes against job descriptions with strict analysis. Return valid JSON only.'
    },
    {
      role: 'user',
      content: `Compare this resume against the job description thoroughly. Return JSON: { "score": number, "missingKeywords": [], "foundKeywords": [], "suggestions": [], "sectionScores": { "skills": number, "experience": number, "education": number, "keywords": number }, "strengths": [], "weaknesses": [] }. Resume: ${resumeText} JD: ${jdText}`
    }
  ], 0.3);

  try {
    return JSON.parse(content);
  } catch {
    return { score: 0, missingKeywords: [], foundKeywords: [], suggestions: [] };
  }
};

// Generate Cover Letter
exports.generateCoverLetter = async (resumeText, jdText, tone = 'professional') => {
  return await aiRequest([
    {
      role: 'system',
      content: `You are an expert cover letter writer. Generate a compelling ${tone} cover letter. Be tailored to the role, highlight relevant experience, show enthusiasm. 3-4 paragraphs.`
    },
    {
      role: 'user',
      content: `Generate a ${tone} cover letter based on this resume and job description.\n\nResume: ${resumeText}\n\nJob Description: ${jdText}`
    }
  ], 0.7, 1500);
};

// Chat with AI Assistant
exports.chat = async (message, chatHistory = [], resumeContext = '') => {
  const systemMessage = `You are ResumeForge AI Assistant, an expert career advisor and resume writing assistant. You help users with:
- Resume writing tips and best practices
- ATS optimization advice
- Interview preparation tips
- Career guidance and job search strategies
- Cover letter writing advice
- Skill development recommendations
- Salary negotiation tips
- Professional branding guidance

Be concise, actionable, and friendly. If asked about something unrelated to careers/resumes, politely redirect.${resumeContext ? '\n\n' + resumeContext : ''}`;

  const messages = [
    { role: 'system', content: systemMessage },
    ...chatHistory.slice(-10),
    { role: 'user', content: message }
  ];

  return await aiRequest(messages, 0.7, 1000);
};

// Generate Dynamic Template Content
exports.generateTemplateContent = async (templateStyle, jobRole = 'Senior Professional', industry = 'Technology') => {
  const content = await aiRequest([
    {
      role: 'system',
      content: `You are a professional resume writer. Generate realistic, ATS-friendly resume content.
Return valid JSON with this exact structure:
{
  "personalInfo": { "name": "", "title": "", "email": "", "phone": "", "location": "", "linkedin": "", "website": "" },
  "summary": "2-3 sentence professional summary",
  "experience": [{ "company": "", "title": "", "startDate": "", "endDate": "", "location": "", "achievements": [] }],
  "skills": { "technical": [], "soft": [] },
  "education": [{ "school": "", "degree": "", "field": "", "year": "" }],
  "projects": [{ "name": "", "description": "", "tech": [], "link": "" }],
  "achievements": []
}`
    },
    {
      role: 'user',
      content: `Generate a complete resume for a ${jobRole} in the ${industry} industry using the ${templateStyle} template style. Make it realistic with quantified achievements.`
    }
  ], 0.7, 2500);

  try {
    return JSON.parse(content);
  } catch {
    return null;
  }
};

// Generate Interview Questions
exports.generateInterviewQuestions = async (jobTitle, company = '', jobDescription = '') => {
  const content = await aiRequest([
    {
      role: 'system',
      content: 'You are an expert interview coach. Generate relevant interview questions with suggested answer frameworks. Return valid JSON.'
    },
    {
      role: 'user',
      content: `Generate 8 interview questions for a ${jobTitle} position${company ? ` at ${company}` : ''}. Include behavioral, technical, and situational questions. Return JSON: { "questions": [{ "question": "", "type": "behavioral|technical|situational", "tip": "brief answer tip" }] }${jobDescription ? `. Job Description: ${jobDescription}` : ''}`
    }
  ], 0.7, 1500);

  try {
    return JSON.parse(content);
  } catch {
    return { questions: [] };
  }
};