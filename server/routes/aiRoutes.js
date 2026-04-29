const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');
const { protect } = require('../middleware/authMiddleware');

// AI Analysis Routes
router.post('/analyze-jd', protect, aiController.analyzeJD);
router.post('/rewrite', protect, aiController.rewriteBullet);
router.post('/ats-score', protect, aiController.atsScore);
router.post('/cover-letter', protect, aiController.generateCoverLetter);

// AI Chat & Dynamic Content (public for demo, add protect in production)
router.post('/chat', aiController.chat);
router.post('/generate-template', aiController.generateTemplate);
router.post('/interview-questions', aiController.interviewQuestions);

module.exports = router;