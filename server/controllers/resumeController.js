const Resume = require('../models/Resume');
const pdfService = require('../services/pdfService');

exports.saveResume = async (req, res) => {
    try {
        const { title, data, template } = req.body;
        const resume = new Resume({
            user: req.user.id,
            title,
            data,
            template
        });
        await resume.save();
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
