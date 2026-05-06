const Resume = require('../models/Resume');
const User = require('../models/User');
const pdfService = require('../services/pdfService');

exports.saveResume = async (req, res) => {
    try {
        const { title, data, template } = req.body;
        const userId = req.user.id;

        // Check subscription limits
        const user = await User.findById(userId);
        const resumeCount = await Resume.countDocuments({ user: userId });

        if (user.subscription.plan === 'free' && resumeCount >= 1) {
            return res.status(403).json({ 
                error: 'Free plan limit reached. Upgrade to Pro for unlimited resumes.',
                limitReached: true 
            });
        }

        const resume = new Resume({
            user: userId,
            title,
            data,
            template
        });
        await resume.save();
        
        // Update user usage
        await User.findByIdAndUpdate(userId, { $inc: { 'usage.resumesCreated': 1 } });

        res.status(201).json(resume);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.generatePDF = async (req, res) => {
    try {
        const { htmlContent } = req.body;
        const pdfBuffer = await pdfService.generatePDF(htmlContent);
        res.contentType("application/pdf");
        res.send(pdfBuffer);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getResumes = async (req, res) => {
    try {
        const resumes = await Resume.find({ user: req.user.id });
        res.json(resumes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
