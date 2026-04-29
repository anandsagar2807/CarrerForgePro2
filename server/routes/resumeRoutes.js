const express = require('express');
const router = express.Router();
const resumeController = require('../controllers/resumeController');
const { protect, checkSubscription } = require('../middleware/authMiddleware');

router.post('/', protect, checkSubscription, resumeController.saveResume);
router.get('/', protect, resumeController.getResumes);
router.post('/pdf', protect, resumeController.generatePDF);

module.exports = router;
