const aiService = require('../services/aiService');

// @desc    Analyze Job Description
// @route   POST /api/ai/analyze-jd
exports.analyzeJD = async (req, res) => {
  try {
    const { jdText } = req.body;
    if (!jdText) return res.status(400).json({ error: 'Job description text is required' });
    const result = await aiService.analyzeJD(jdText);
    res.json(result);
  } catch (error) {
    console.error('analyzeJD error:', error.message);
    res.status(500).json({ error: 'Failed to analyze job description', details: error.message });
  }
};

// @desc    Rewrite bullet point
// @route   POST /api/ai/rewrite
exports.rewriteBullet = async (req, res) => {
  try {
    const { bullet, keyword } = req.body;
    if (!bullet) return res.status(400).json({ error: 'Bullet point text is required' });
    const result = await aiService.rewriteBullet(bullet, keyword || '');
    res.json({ rewritten: result });
  } catch (error) {
    console.error('rewriteBullet error:', error.message);
    res.status(500).json({ error: 'Failed to rewrite bullet point', details: error.message });
  }
};

// @desc    Calculate ATS Score
// @route   POST /api/ai/ats-score
exports.atsScore = async (req, res) => {
  try {
    const { resumeText, jdText } = req.body;
    if (!resumeText || !jdText) return res.status(400).json({ error: 'Resume text and job description are required' });
    const result = await aiService.calculateATSScore(resumeText, jdText);
    res.json(result);
  } catch (error) {
    console.error('atsScore error:', error.message);
    res.status(500).json({ error: 'Failed to calculate ATS score', details: error.message });
  }
};

// @desc    Generate Cover Letter
// @route   POST /api/ai/cover-letter
exports.generateCoverLetter = async (req, res) => {
  try {
    const { resumeText, jdText, tone } = req.body;
    if (!resumeText || !jdText) return res.status(400).json({ error: 'Resume text and job description are required' });
    const result = await aiService.generateCoverLetter(resumeText, jdText, tone || 'professional');
    res.json({ coverLetter: result });
  } catch (error) {
    console.error('generateCoverLetter error:', error.message);
    res.status(500).json({ error: 'Failed to generate cover letter', details: error.message });
  }
};

// @desc    Chat with AI Assistant
// @route   POST /api/ai/chat
exports.chat = async (req, res) => {
  try {
    const { message, chatHistory, resumeContext } = req.body;
    if (!message) return res.status(400).json({ error: 'Message is required' });
    const result = await aiService.chat(message, chatHistory || [], resumeContext || '');
    res.json({ reply: result });
  } catch (error) {
    console.error('chat error:', error.message);
    res.status(500).json({ error: 'Failed to get AI response', details: error.message });
  }
};

// @desc    Generate Dynamic Template Content
// @route   POST /api/ai/generate-template
exports.generateTemplate = async (req, res) => {
  try {
    const { templateStyle, jobRole, industry } = req.body;
    if (!templateStyle) return res.status(400).json({ error: 'Template style is required' });
    const result = await aiService.generateTemplateContent(templateStyle, jobRole, industry);
    if (!result) return res.status(500).json({ error: 'Failed to generate template content' });
    res.json(result);
  } catch (error) {
    console.error('generateTemplate error:', error.message);
    res.status(500).json({ error: 'Failed to generate template', details: error.message });
  }
};

// @desc    Generate Interview Questions
// @route   POST /api/ai/interview-questions
exports.interviewQuestions = async (req, res) => {
  try {
    const { jobTitle, company, jobDescription } = req.body;
    if (!jobTitle) return res.status(400).json({ error: 'Job title is required' });
    const result = await aiService.generateInterviewQuestions(jobTitle, company, jobDescription);
    res.json(result);
  } catch (error) {
    console.error('interviewQuestions error:', error.message);
    res.status(500).json({ error: 'Failed to generate interview questions', details: error.message });
  }
};