const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');
const { protect } = require('../middleware/authMiddleware');

// AI Analysis Routes
router.post('/analyze-jd', aiController.analyzeJD);
router.post('/rewrite', aiController.rewriteBullet);
router.post('/ats-score', aiController.atsScore);
router.post('/cover-letter', aiController.generateCoverLetter);

// AI Chat & Dynamic Content (public for demo)
router.post('/chat', aiController.chat);
router.post('/generate-template', aiController.generateTemplate);
router.post('/interview-questions', aiController.interviewQuestions);

module.exports = router;