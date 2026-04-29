import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useResume } from '../context/ResumeContext';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import {
    Upload, FileText, Briefcase, GraduationCap, Code,
    Award, Download, Eye, Save, Sparkles, ChevronLeft,
    Plus, Trash2, MapPin, Mail, Phone, Link as LinkIcon,
    Linkedin, Github, ExternalLink, Trash
} from 'lucide-react';
import ResumePreview from '../components/ResumePreview';

const ResumeBuilderPage = () => {
    const { templateId } = useParams();
    const navigate = useNavigate();
    const {
        resumeData,
        selectedTemplate,
        setTemplate,
        updatePersonalInfo,
        addEducation,
        updateEducation,
        removeEducation,
        addExperience,
        updateExperience,
        removeExperience,
        addSkill,
        removeSkill,
        addProject,
        updateProject,
        removeProject,
        setJobDescription,
        setUploadedResume
    } = useResume();

    const [activeSection, setActiveSection] = useState('personal');
    const [jdText, setJdText] = useState(resumeData.jobDescription || '');
    const [showDownloadModal, setShowDownloadModal] = useState(false);

    useEffect(() => {
        if (templateId && templateId !== selectedTemplate) {
            setTemplate(templateId);
        }
    }, [templateId, selectedTemplate, setTemplate]);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const incomingJD = params.get('jd');
        if (incomingJD && incomingJD.trim()) {
            setJobDescription(incomingJD);
            setJdText(incomingJD);
        }
    }, [setJobDescription]);

    // Form sections config
    const sections = [
        { id: 'personal', label: 'Personal Info', icon: <FileText className="w-5 h-5" /> },
        { id: 'education', label: 'Education', icon: <GraduationCap className="w-5 h-5" /> },
        { id: 'experience', label: 'Experience', icon: <Briefcase className="w-5 h-5" /> },
        { id: 'skills', label: 'Skills', icon: <Code className="w-5 h-5" /> },
        { id: 'projects', label: 'Projects', icon: <Award className="w-5 h-5" /> },
    ];

    // AI Actions
    const handleAnalyzeJD = () => {
        if (!jdText.trim()) return;
        alert('AI is analyzing the Job Description to identify key skills and requirements...');
        setJobDescription(jdText);
    };

    const handleOptimizeResume = () => {
        if (!jdText.trim()) return;
        alert('AI is optimizing your resume content based on the Job Description...');
        // Mock optimization: Add a suggested skill if it's not there
        const keywords = ['Cloud Architecture', 'CI/CD', 'Microservices', 'GraphQL'];
        const randomKeyword = keywords[Math.floor(Math.random() * keywords.length)];

        if (!resumeData.skills.some(s => s.name === randomKeyword)) {
            setTimeout(() => {
                addSkill({ name: randomKeyword, category: 'AI Suggested' });
            }, 1000);
        }
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setUploadedResume(file);
            alert(`File "${file.name}" uploaded. Extracting data...`);
        }
    };

    const extractKeywords = (text) => {
        if (!text) return [];
        const stopWords = new Set(['and', 'the', 'for', 'with', 'from', 'your', 'that', 'this', 'will', 'are', 'you', 'our', 'into']);
        return Array.from(new Set(
            text
                .toLowerCase()
                .replace(/[^a-z0-9\s+#/.()-]/g, ' ')
                .split(/\s+/)
                .filter((word) => word.length > 2 && !stopWords.has(word))
        ));
    };

    const getResumeCorpus = () => {
        const chunks = [
            resumeData.personalInfo.fullName,
            resumeData.personalInfo.summary,
            ...resumeData.skills.map((skill) => skill.name),
            ...resumeData.experience.map((exp) => `${exp.position} ${exp.company} ${exp.description}`),
            ...resumeData.projects.map((project) => `${project.name} ${project.description} ${(project.technologies || []).join(' ')}`),
        ];
        return chunks.join(' ').toLowerCase();
    };

    const getKeywordCoverage = () => {
        const jdKeywords = extractKeywords(jdText).slice(0, 30);
        if (jdKeywords.length === 0) {
            return { coverage: 0, missing: [], found: [] };
        }

        const corpus = getResumeCorpus();
        const found = jdKeywords.filter((keyword) => corpus.includes(keyword));
        const missing = jdKeywords.filter((keyword) => !corpus.includes(keyword));
        const coverage = Math.round((found.length / jdKeywords.length) * 100);

        return { coverage, missing, found };
    };

    const getExportFileName = (extension) => {
        const safeName = (resumeData.personalInfo.fullName || 'resume').trim().replace(/\s+/g, '_');
        return `${safeName}.${extension}`;
    };

    const downloadBlob = (blob, fileName) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        URL.revokeObjectURL(url);
        document.body.removeChild(a);
    };

    const getResumeElementForExport = () => {
        const exportNodes = Array.from(document.querySelectorAll('[data-resume-export="true"]'));
        const visibleNode = exportNodes.find((node) => node.offsetParent !== null);

        return visibleNode || exportNodes[exportNodes.length - 1] ||
            document.querySelector('.resume-preview-container') ||
            document.querySelector('.w-\\[8\\.5in\\]');
    };

    const generateClientPdf = async () => {
        const resumeElement = getResumeElementForExport();
        if (!resumeElement) {
            throw new Error('Resume preview not found');
        }

        const canvas = await html2canvas(resumeElement, {
            scale: 2,
            useCORS: true,
            backgroundColor: '#ffffff',
            logging: false,
        });

        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'pt', 'a4');
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        const imgWidth = pageWidth;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
        heightLeft -= pageHeight;

        while (heightLeft > 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
            heightLeft -= pageHeight;
        }

        pdf.save(getExportFileName('pdf'));
    };

    // PDF Export Functionality
    const handleDownloadPDF = async () => {
        const resumeElement = getResumeElementForExport();
        if (!resumeElement) {
            alert('Resume preview not found');
            return;
        }

        // Try backend PDF first, then fallback to client-side PDF generation.
        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
            const token = localStorage.getItem('token');
            const headers = {
                'Content-Type': 'application/json',
            };

            if (token) {
                headers.Authorization = `Bearer ${token}`;
            }

            const htmlContent = `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="UTF-8">
                    <style>
                        * { box-sizing: border-box; }
                        body { margin: 0; padding: 0; background: #fff; }
                    </style>
                </head>
                <body>${resumeElement.innerHTML}</body>
                </html>
            `;

            const response = await fetch(`${apiUrl}/resume/pdf`, {
                method: 'POST',
                headers,
                body: JSON.stringify({ htmlContent }),
            });

            if (!response.ok) {
                throw new Error(`Backend PDF generation failed with status ${response.status}`);
            }

            const blob = await response.blob();
            downloadBlob(blob, getExportFileName('pdf'));
        } catch (error) {
            console.warn('Backend PDF failed, using client-side fallback:', error);
            try {
                await generateClientPdf();
            } catch (fallbackError) {
                console.error('Client-side PDF export error:', fallbackError);
                alert('Failed to generate PDF. Please try again.');
            }
        }
    };

    const handleDownloadTXT = () => {
        const lines = [
            resumeData.personalInfo.fullName || 'Your Name',
            `${resumeData.personalInfo.email || ''} ${resumeData.personalInfo.phone || ''}`.trim(),
            resumeData.personalInfo.location || '',
            '',
            'SUMMARY',
            resumeData.personalInfo.summary || '',
            '',
            'EXPERIENCE',
            ...resumeData.experience.map((exp) => `${exp.position} | ${exp.company} | ${exp.startDate} - ${exp.endDate}\n${exp.description}`),
            '',
            'EDUCATION',
            ...resumeData.education.map((edu) => `${edu.degree} ${edu.field ? `in ${edu.field}` : ''} | ${edu.institution} | ${edu.startDate} - ${edu.endDate}`),
            '',
            'SKILLS',
            resumeData.skills.map((skill) => skill.name).join(', '),
        ].join('\n');

        const blob = new Blob([lines], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = getExportFileName('txt');
        document.body.appendChild(a);
        a.click();
        URL.revokeObjectURL(url);
        document.body.removeChild(a);
    };

    const handleDownloadDOC = () => {
        const resumeElement = document.querySelector('.resume-preview-container') || document.querySelector('.w-\\[8\\.5in\\]');
        if (!resumeElement) {
            alert('Resume preview not found');
            return;
        }

        const html = `
            <html>
            <head><meta charset="utf-8"></head>
            <body>${resumeElement.innerHTML}</body>
            </html>
        `;

        const blob = new Blob(['\ufeff', html], { type: 'application/msword' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = getExportFileName('doc');
        document.body.appendChild(a);
        a.click();
        URL.revokeObjectURL(url);
        document.body.removeChild(a);
    };

    const handleDownloadByFormat = async (format) => {
        if (format === 'pdf') await handleDownloadPDF();
        if (format === 'txt') handleDownloadTXT();
        if (format === 'doc') handleDownloadDOC();
        setShowDownloadModal(false);
    };

    // ✨ PREMIUM FEATURE: AI Resume Score Calculator
    const calculateResumeScore = () => {
        let score = 0;
        const maxScore = 100;
        const keywordCoverage = getKeywordCoverage();

        // Personal Info checks
        if (resumeData.personalInfo.fullName) score += 10;
        if (resumeData.personalInfo.email) score += 5;
        if (resumeData.personalInfo.phone) score += 5;
        if (resumeData.personalInfo.summary && resumeData.personalInfo.summary.length > 100) score += 15;

        // Experience checks
        score += Math.min(resumeData.experience.length * 12, 30);
        resumeData.experience.forEach(exp => {
            if (exp.description && exp.description.length > 50) score += 3;
        });

        // Education checks
        score += Math.min(resumeData.education.length * 8, 16);

        // Skills checks
        score += Math.min(resumeData.skills.length * 2, 15);

        // Projects checks
        score += Math.min(resumeData.projects.length * 5, 10);

        // Strict keyword matching against JD
        if (jdText.trim()) {
            score += Math.round(keywordCoverage.coverage * 0.18);
            score -= Math.min(keywordCoverage.missing.length * 1.4, 24);
        }

        // Strict penalties for weak content quality
        const weakBullets = resumeData.experience.filter((exp) => (exp.description || '').length < 45).length;
        score -= Math.min(weakBullets * 3, 12);

        return Math.max(20, Math.min(score, maxScore));
    };

    // ✨ PREMIUM FEATURE: Optimize Bullet Points
    const optimizeBulletPoint = (text) => {
        const actionVerbs = ['Developed', 'Implemented', 'Designed', 'Led', 'Optimized', 'Built', 'Created', 'Managed', 'Improved', 'Engineered'];
        const metrics = [' by 25%', ' for 10K+ users', ' reducing load time by 40%', ' increasing efficiency', ' improving performance'];

        if (!text || text.length < 20) return text;

        // Start with action verb
        if (!actionVerbs.some(v => text.startsWith(v))) {
            const randomVerb = actionVerbs[Math.floor(Math.random() * actionVerbs.length)];
            text = randomVerb + ' ' + text.charAt(0).toLowerCase() + text.slice(1);
        }

        // Add quantifiable metric if missing
        if (!text.match(/\d+%|\d+\+|\d+/)) {
            const randomMetric = metrics[Math.floor(Math.random() * metrics.length)];
            text = text.trim().replace(/\.$/, '') + randomMetric + '.';
        }

        return text;
    };

    // ✨ PREMIUM FEATURE: Auto-Save
    useEffect(() => {
        const autoSaveInterval = setInterval(() => {
            localStorage.setItem('resumeDraft', JSON.stringify(resumeData));
        }, 30000); // Auto save every 30 seconds

        return () => clearInterval(autoSaveInterval);
    }, [resumeData]);

    // ✨ WOW FEATURE: Real-Time Resume Strength Indicator
    const getResumeStrength = () => {
        const score = calculateResumeScore();
        if (score >= 85) return { level: 'Excellent', color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200' };
        if (score >= 70) return { level: 'Good', color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200' };
        if (score >= 50) return { level: 'Fair', color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200' };
        return { level: 'Needs Work', color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200' };
    };

    // ✨ WOW FEATURE: Smart Suggestion Engine
    const getSuggestions = () => {
        const suggestions = [];
        if (!resumeData.personalInfo.summary || resumeData.personalInfo.summary.length < 100) {
            suggestions.push({ icon: '📝', text: 'Add a professional summary to stand out', action: 'Add Summary' });
        }
        if (resumeData.experience.length === 0) {
            suggestions.push({ icon: '💼', text: 'Add work experience to show your background', action: 'Add Experience' });
        }
        if (resumeData.skills.length < 5) {
            suggestions.push({ icon: '⚡', text: 'Add more skills to pass ATS filters', action: 'Add Skills' });
        }
        if (resumeData.projects.length === 0) {
            suggestions.push({ icon: '🚀', text: 'Include projects to demonstrate your work', action: 'Add Projects' });
        }
        return suggestions;
    };

    // Render active section form
    const renderForm = () => {
        const inputClass = "input-premium text-sm py-2.5";
        const labelClass = "block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5";

        switch (activeSection) {
            case 'personal':
                return (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className={labelClass}>Full Name</label>
                                <input
                                    type="text"
                                    value={resumeData.personalInfo.fullName}
                                    onChange={(e) => updatePersonalInfo('fullName', e.target.value)}
                                    className={inputClass}
                                    placeholder="John Doe"
                                />
                            </div>
                            <div>
                                <label className={labelClass}>Email</label>
                                <input
                                    type="email"
                                    value={resumeData.personalInfo.email}
                                    onChange={(e) => updatePersonalInfo('email', e.target.value)}
                                    className={inputClass}
                                    placeholder="john@example.com"
                                />
                            </div>
                            <div>
                                <label className={labelClass}>Phone</label>
                                <input
                                    type="tel"
                                    value={resumeData.personalInfo.phone}
                                    onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                                    className={inputClass}
                                    placeholder="+1 234 567 890"
                                />
                            </div>
                            <div>
                                <label className={labelClass}>Location</label>
                                <input
                                    type="text"
                                    value={resumeData.personalInfo.location}
                                    onChange={(e) => updatePersonalInfo('location', e.target.value)}
                                    className={inputClass}
                                    placeholder="City, State"
                                />
                            </div>
                            <div>
                                <label className={labelClass}>LinkedIn</label>
                                <input
                                    type="text"
                                    value={resumeData.personalInfo.linkedin}
                                    onChange={(e) => updatePersonalInfo('linkedin', e.target.value)}
                                    className={inputClass}
                                    placeholder="linkedin.com/in/username"
                                />
                            </div>
                            <div>
                                <label className={labelClass}>GitHub / Portfolio</label>
                                <input
                                    type="text"
                                    value={resumeData.personalInfo.github}
                                    onChange={(e) => updatePersonalInfo('github', e.target.value)}
                                    className={inputClass}
                                    placeholder="github.com/username"
                                />
                            </div>
                        </div>
                        <div>
                            <label className={labelClass}>Professional Summary</label>
                            <textarea
                                value={resumeData.personalInfo.summary}
                                onChange={(e) => updatePersonalInfo('summary', e.target.value)}
                                className={`${inputClass} h-32 resize-none`}
                                placeholder="Briefly describe your professional background and key achievements..."
                            />
                        </div>
                    </div>
                );
            case 'education':
                return (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                        {resumeData.education.map((edu) => (
                            <div key={edu.id} className="p-6 border border-slate-100 rounded-2xl relative group bg-slate-50/30">
                                <button
                                    onClick={() => removeEducation(edu.id)}
                                    className="absolute top-4 right-4 p-2 text-slate-300 hover:text-red-500 transition-colors bg-white rounded-lg shadow-sm opacity-0 group-hover:opacity-100"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
                                    <div className="md:col-span-2">
                                        <label className={labelClass}>Institution</label>
                                        <input
                                            type="text"
                                            value={edu.institution}
                                            onChange={(e) => updateEducation(edu.id, { institution: e.target.value })}
                                            className={inputClass}
                                            placeholder="University Name"
                                        />
                                    </div>
                                    <div>
                                        <label className={labelClass}>Degree</label>
                                        <input
                                            type="text"
                                            value={edu.degree}
                                            onChange={(e) => updateEducation(edu.id, { degree: e.target.value })}
                                            className={inputClass}
                                            placeholder="Bachelor of Science"
                                        />
                                    </div>
                                    <div>
                                        <label className={labelClass}>Field of Study</label>
                                        <input
                                            type="text"
                                            value={edu.field}
                                            onChange={(e) => updateEducation(edu.id, { field: e.target.value })}
                                            className={inputClass}
                                            placeholder="Computer Science"
                                        />
                                    </div>
                                    <div>
                                        <label className={labelClass}>Start Date</label>
                                        <input
                                            type="text"
                                            value={edu.startDate}
                                            onChange={(e) => updateEducation(edu.id, { startDate: e.target.value })}
                                            className={inputClass}
                                            placeholder="MM/YYYY"
                                        />
                                    </div>
                                    <div>
                                        <label className={labelClass}>End Date</label>
                                        <input
                                            type="text"
                                            value={edu.endDate}
                                            onChange={(e) => updateEducation(edu.id, { endDate: e.target.value })}
                                            className={inputClass}
                                            placeholder="MM/YYYY or Present"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                        <button
                            onClick={() => addEducation()}
                            className="w-full py-4 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 hover:border-brand-500 hover:text-brand-600 hover:bg-brand-50/30 transition-all flex items-center justify-center gap-2 font-bold text-sm"
                        >
                            <Plus className="w-4 h-4" />
                            Add Education
                        </button>
                    </div>
                );
            case 'experience':
                return (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                        {resumeData.experience.map((exp) => (
                            <div key={exp.id} className="p-6 border border-slate-100 rounded-2xl relative group bg-slate-50/30">
                                <button
                                    onClick={() => removeExperience(exp.id)}
                                    className="absolute top-4 right-4 p-2 text-slate-300 hover:text-red-500 transition-colors bg-white rounded-lg shadow-sm opacity-0 group-hover:opacity-100"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
                                    <div>
                                        <label className={labelClass}>Company</label>
                                        <input
                                            type="text"
                                            value={exp.company}
                                            onChange={(e) => updateExperience(exp.id, { company: e.target.value })}
                                            className={inputClass}
                                            placeholder="Company Name"
                                        />
                                    </div>
                                    <div>
                                        <label className={labelClass}>Position</label>
                                        <input
                                            type="text"
                                            value={exp.position}
                                            onChange={(e) => updateExperience(exp.id, { position: e.target.value })}
                                            className={inputClass}
                                            placeholder="Software Engineer"
                                        />
                                    </div>
                                    <div>
                                        <label className={labelClass}>Start Date</label>
                                        <input
                                            type="text"
                                            value={exp.startDate}
                                            onChange={(e) => updateExperience(exp.id, { startDate: e.target.value })}
                                            className={inputClass}
                                            placeholder="MM/YYYY"
                                        />
                                    </div>
                                    <div>
                                        <label className={labelClass}>End Date</label>
                                        <input
                                            type="text"
                                            value={exp.endDate}
                                            onChange={(e) => updateExperience(exp.id, { endDate: e.target.value })}
                                            className={inputClass}
                                            placeholder="MM/YYYY or Present"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className={labelClass}>Description</label>
                                        <textarea
                                            value={exp.description}
                                            onChange={(e) => updateExperience(exp.id, { description: e.target.value })}
                                            className={`${inputClass} h-32 resize-none`}
                                            placeholder="Describe your responsibilities and achievements..."
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                        <button
                            onClick={() => addExperience()}
                            className="w-full py-4 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 hover:border-brand-500 hover:text-brand-600 hover:bg-brand-50/30 transition-all flex items-center justify-center gap-2 font-bold text-sm"
                        >
                            <Plus className="w-4 h-4" />
                            Add Experience
                        </button>
                    </div>
                );
            case 'skills':
                return (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <div className="flex flex-wrap gap-2">
                            {resumeData.skills.map((skill) => (
                                <div key={skill.id} className="group flex items-center gap-2 bg-slate-50 text-slate-600 px-3 py-1.5 rounded-xl border border-slate-100 hover:bg-slate-100 transition-colors">
                                    <span className="text-sm font-semibold">{skill.name}</span>
                                    <button
                                        onClick={() => removeSkill(skill.id)}
                                        className="text-slate-300 hover:text-red-500 transition-colors"
                                    >
                                        <Trash className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            ))}
                        </div>
                        <div className="flex gap-2">
                            <input
                                id="skill-input"
                                type="text"
                                className={inputClass}
                                placeholder="Add a skill (e.g. React, Python)"
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        addSkill({ name: e.target.value, category: 'Technical' });
                                        e.target.value = '';
                                    }
                                }}
                            />
                            <button
                                onClick={() => {
                                    const input = document.getElementById('skill-input');
                                    if (input.value) {
                                        addSkill({ name: input.value, category: 'Technical' });
                                        input.value = '';
                                    }
                                }}
                                className="btn-premium-primary py-2 px-6 text-sm"
                            >
                                Add
                            </button>
                        </div>
                    </div>
                );
            case 'projects':
                return (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                        {resumeData.projects.map((proj) => (
                            <div key={proj.id} className="p-6 border border-slate-100 rounded-2xl relative group bg-slate-50/30">
                                <button
                                    onClick={() => removeProject(proj.id)}
                                    className="absolute top-4 right-4 p-2 text-slate-300 hover:text-red-500 transition-colors bg-white rounded-lg shadow-sm opacity-0 group-hover:opacity-100"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
                                    <div className="md:col-span-2">
                                        <label className={labelClass}>Project Name</label>
                                        <input
                                            type="text"
                                            value={proj.name}
                                            onChange={(e) => updateProject(proj.id, { name: e.target.value })}
                                            className={inputClass}
                                            placeholder="Project Name"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className={labelClass}>Description</label>
                                        <textarea
                                            value={proj.description}
                                            onChange={(e) => updateProject(proj.id, { description: e.target.value })}
                                            className={`${inputClass} h-32 resize-none`}
                                            placeholder="Describe your project and your contributions..."
                                        />
                                    </div>
                                    <div>
                                        <label className={labelClass}>Technologies (comma separated)</label>
                                        <input
                                            type="text"
                                            value={Array.isArray(proj.technologies) ? proj.technologies.join(', ') : proj.technologies}
                                            onChange={(e) => updateProject(proj.id, { technologies: e.target.value.split(',').map(s => s.trim()) })}
                                            className={inputClass}
                                            placeholder="React, Node.js, Tailwind"
                                        />
                                    </div>
                                    <div>
                                        <label className={labelClass}>Link</label>
                                        <input
                                            type="text"
                                            value={proj.link}
                                            onChange={(e) => updateProject(proj.id, { link: e.target.value })}
                                            className={inputClass}
                                            placeholder="https://github.com/..."
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                        <button
                            onClick={() => addProject()}
                            className="w-full py-4 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 hover:border-brand-500 hover:text-brand-600 hover:bg-brand-50/30 transition-all flex items-center justify-center gap-2 font-bold text-sm"
                        >
                            <Plus className="w-4 h-4" />
                            Add Project
                        </button>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col overflow-hidden font-sans">
            {/* Top Bar */}
            <div className="bg-white border-b border-slate-100 h-16 flex items-center justify-between px-6 shrink-0 relative z-20 shadow-sm">
                <div className="flex items-center gap-6">
                    <button
                        onClick={() => navigate('/templates')}
                        className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors font-semibold text-sm group"
                    >
                        <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                        <span>Back</span>
                    </button>
                    <div className="w-px h-6 bg-slate-100 hidden md:block" />
                    <div className="flex items-center gap-2.5">
                        <div className="p-1.5 bg-slate-900 rounded-lg shadow-premium">
                            <Sparkles className="w-3.5 h-3.5 text-white" />
                        </div>
                        <h1 className="font-display font-bold text-slate-900 tracking-tight hidden md:block">
                            Resume Forge <span className="brand-text-gradient">Pro</span>
                        </h1>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button className="hidden md:flex items-center gap-2 px-4 py-2 text-slate-500 hover:text-slate-900 transition-colors font-semibold text-sm">
                        <Save className="w-4 h-4" />
                        <span>Draft Saved</span>
                    </button>
                    <button onClick={() => setShowDownloadModal(true)} className="btn-premium-primary py-2 px-6 text-sm flex items-center gap-2">
                        <Download className="w-4 h-4" />
                        <span>Download</span>
                    </button>
                </div>
            </div>

            <div className="flex flex-1 overflow-hidden">
                {/* Left Sidebar - Navigation */}
                <div className="w-20 md:w-64 bg-white border-r border-slate-100 flex flex-col shrink-0">
                    <div className="flex-1 py-6 px-3 space-y-1 overflow-y-auto no-scrollbar">
                        {sections.map((section) => (
                            <button
                                key={section.id}
                                onClick={() => setActiveSection(section.id)}
                                className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ${activeSection === section.id
                                    ? 'bg-slate-900 text-white shadow-premium'
                                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                                    }`}
                            >
                                <div className="shrink-0">{section.icon}</div>
                                <span className="hidden md:block font-bold text-sm tracking-tight">{section.label}</span>
                            </button>
                        ))}
                    </div>

                    <div className="p-4 border-t border-slate-100">
                        <div className="bg-slate-50 rounded-2xl p-4 hidden md:block border border-slate-100">
                            <div className="flex items-center gap-2 text-brand-600 mb-2">
                                <Sparkles className="w-4 h-4" />
                                <span className="text-[10px] font-black uppercase tracking-widest">AI Powerup</span>
                            </div>
                            <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                                Paste a job description to optimize your resume with AI.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 flex overflow-hidden">
                    {/* Editor Pane */}
                    <div className="flex-1 overflow-y-auto bg-white/50 px-6 py-10 md:px-12">
                        <div className="max-w-2xl mx-auto space-y-10">
                            {/* ✨ Resume Strength Indicator */}
                            <div className={`rounded-2xl p-4 border ${getResumeStrength().border} ${getResumeStrength().bg}`}>
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-3">
                                        <Sparkles className="w-5 h-5 text-slate-500" />
                                        <span className="font-semibold text-slate-900">Resume Strength</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className={`font-bold text-lg ${getResumeStrength().color}`}>
                                            {calculateResumeScore()}%
                                        </span>
                                        <span className={`text-sm font-semibold ${getResumeStrength().color}`}>
                                            {getResumeStrength().level}
                                        </span>
                                    </div>
                                </div>

                                {/* Animated Progress Bar */}
                                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full rounded-full transition-all duration-1000 ease-out ${calculateResumeScore() >= 70 ? 'bg-emerald-500' :
                                            calculateResumeScore() >= 50 ? 'bg-amber-500' : 'bg-red-500'
                                            }`}
                                        style={{ width: `${calculateResumeScore()}%` }}
                                    />
                                </div>

                                {/* Smart Suggestions */}
                                {getSuggestions().length > 0 && (
                                    <div className="mt-4 space-y-2">
                                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Suggestions</p>
                                        {getSuggestions().map((suggestion, idx) => (
                                            <div key={idx} className="flex items-center gap-3 p-2 rounded-lg bg-white/60">
                                                <span className="text-lg">{suggestion.icon}</span>
                                                <span className="text-sm text-slate-700 font-medium">{suggestion.text}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="flex items-center justify-between mt-6">
                                <div>
                                    <h2 className="text-3xl font-display font-bold text-slate-900 mb-2">
                                        {sections.find(s => s.id === activeSection)?.label}
                                    </h2>
                                    <p className="text-sm text-slate-500 font-medium">
                                        Complete your profile to build a winning resume.
                                    </p>
                                </div>
                            </div>

                            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-premium">
                                {renderForm()}
                            </div>

                            {/* AI Integration Section */}
                            <div className="bg-slate-900 rounded-[2rem] p-8 text-white relative overflow-hidden shadow-2xl">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-600/10 rounded-full blur-[80px]" />
                                <div className="relative z-10">
                                    <div className="flex items-center gap-2 text-brand-400 mb-6">
                                        <Sparkles className="w-5 h-5" />
                                        <span className="text-xs font-black uppercase tracking-widest">AI Match Assistant</span>
                                    </div>
                                    <div className="space-y-6">
                                        <textarea
                                            value={jdText}
                                            onChange={(e) => setJdText(e.target.value)}
                                            className="w-full h-32 bg-white/5 border border-white/10 rounded-2xl p-4 text-sm text-slate-300 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-brand-500/50 transition-all resize-none"
                                            placeholder="Paste job description here..."
                                        />
                                        <div className="flex flex-wrap gap-3">
                                            <button
                                                onClick={handleAnalyzeJD}
                                                className="bg-brand-600 hover:bg-brand-500 text-white font-bold py-3 px-6 rounded-xl text-sm transition-all flex items-center gap-2 shadow-xl shadow-brand-900/20"
                                            >
                                                Analyze JD
                                            </button>
                                            <button
                                                onClick={handleOptimizeResume}
                                                className="bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-6 rounded-xl text-sm transition-all border border-white/10"
                                            >
                                                Optimize with AI
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Preview Pane - Desktop Only */}
                    <div className="hidden xl:flex w-[600px] bg-slate-200 border-l border-slate-300 overflow-hidden flex-col">
                        <div className="h-12 bg-slate-300/50 flex items-center justify-between px-6 shrink-0 border-b border-slate-300/50">
                            <div className="flex items-center gap-2">
                                <Eye className="w-4 h-4 text-slate-500" />
                                <span className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Live Preview</span>
                            </div>
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-slate-400/30" />
                                <div className="w-3 h-3 rounded-full bg-slate-400/30" />
                                <div className="w-3 h-3 rounded-full bg-slate-400/30" />
                            </div>
                        </div>
                        <div className="flex-1 overflow-y-auto p-12 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:20px_20px] flex justify-center">
                            <div className="w-[8.5in] h-fit bg-white shadow-2xl origin-top scale-[0.7] -mt-16" data-resume-export="true">
                                <ResumePreview />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="fixed -left-[9999px] top-0 z-[-1] opacity-0 pointer-events-none" aria-hidden="true">
                <div className="w-[8.5in] h-fit bg-white" data-resume-export="true">
                    <ResumePreview />
                </div>
            </div>

            {showDownloadModal && (
                <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 p-6">
                        <h3 className="text-lg font-bold text-slate-900 mb-2">Choose download format</h3>
                        <p className="text-sm text-slate-500 mb-5">Select the format you want to export for this resume.</p>

                        <div className="space-y-3">
                            <button onClick={() => handleDownloadByFormat('pdf')} className="w-full text-left px-4 py-3 rounded-xl border border-slate-200 hover:border-slate-400 hover:bg-slate-50 transition-all">
                                <span className="font-semibold text-slate-900">PDF</span>
                                <p className="text-xs text-slate-500 mt-1">Best for job applications and consistent formatting.</p>
                            </button>
                            <button onClick={() => handleDownloadByFormat('doc')} className="w-full text-left px-4 py-3 rounded-xl border border-slate-200 hover:border-slate-400 hover:bg-slate-50 transition-all">
                                <span className="font-semibold text-slate-900">DOC</span>
                                <p className="text-xs text-slate-500 mt-1">Editable document for quick manual changes.</p>
                            </button>
                            <button onClick={() => handleDownloadByFormat('txt')} className="w-full text-left px-4 py-3 rounded-xl border border-slate-200 hover:border-slate-400 hover:bg-slate-50 transition-all">
                                <span className="font-semibold text-slate-900">TXT</span>
                                <p className="text-xs text-slate-500 mt-1">Plain-text ATS-focused export.</p>
                            </button>
                        </div>

                        <button
                            onClick={() => setShowDownloadModal(false)}
                            className="mt-5 w-full py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ResumeBuilderPage;
