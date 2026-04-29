import React, { useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useResume } from '../context/ResumeContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Upload, Sparkles, CheckCircle, AlertCircle, TrendingUp, ArrowRight, BarChart3, Target, Zap, Shield, Clock, Award, FileText, Users, Briefcase, GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';

const Analyze = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { resumeData, setJobDescription } = useResume();
    const templateFromQuery = searchParams.get('template') || resumeData.selectedTemplate || 'modern';

    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [score, setScore] = useState(0);
    const [jobDescription, setJobDescriptionInput] = useState(resumeData.jobDescription || '');
    const [uploadedFile, setUploadedFile] = useState(null);
    const fileInputRef = React.useRef(null);
    const [analysis, setAnalysis] = useState({
        foundKeywords: [],
        missingKeywords: [],
        strictness: 'High',
        sectionScores: {
            skills: 0,
            experience: 0,
            education: 0,
            keywords: 0
        },
        strengths: [],
        weaknesses: [],
        suggestions: [],
        industryBenchmark: 0,
        industryName: '',
        industryAverage: 0,
        topPercentile: false,
        atsCompliance: false
    });

    const resumeText = useMemo(() => {
        const parts = [
            resumeData.personalInfo.fullName,
            resumeData.personalInfo.summary,
            ...resumeData.skills.map((s) => s.name),
            ...resumeData.experience.map((e) => `${e.position} ${e.company} ${e.description}`),
            ...resumeData.projects.map((p) => `${p.name} ${p.description} ${(p.technologies || []).join(' ')}`),
        ];
        return parts.join(' ').toLowerCase();
    }, [resumeData]);

    const extractKeywords = (text) => {
        const stopWords = new Set(['and', 'the', 'for', 'with', 'from', 'your', 'that', 'this', 'will', 'are', 'you', 'our', 'into']);
        return Array.from(new Set(
            text
                .toLowerCase()
                .replace(/[^a-z0-9\s+#/.()-]/g, ' ')
                .split(/\s+/)
                .filter((word) => word.length > 2 && !stopWords.has(word))
        ));
    };

    const extractSkills = (text) => {
        const skillPatterns = [
            /(?:proficient in|expertise in|experience with|knowledge of|skills in)\s+([^.,]+)/gi,
            /(?:javascript|python|java|c\+\+|react|node\.?js|aws|docker|kubernetes|sql|nosql|typescript|angular|vue)/gi
        ];

        const skills = new Set();
        skillPatterns.forEach(pattern => {
            const matches = text.match(pattern);
            if (matches) {
                matches.forEach(match => skills.add(match.toLowerCase()));
            }
        });

        return Array.from(skills);
    };

    const calculateExperienceMatch = (jdText, resumeExp) => {
        const yearsPattern = /(\d+)\s*(?:years?|yrs?)/gi;
        const jdMatches = jdText.match(yearsPattern);
        const jdYears = jdMatches ? Math.max(...jdMatches.map(m => parseInt(m))) : 0;

        const resumeYears = resumeExp.length * 2; // Approximate 2 years per position

        if (jdYears === 0) return 100;
        if (resumeYears >= jdYears) return 100;
        return Math.round((resumeYears / jdYears) * 100);
    };

    const detectIndustry = (text) => {
        const industryKeywords = {
            'Technology': ['software', 'developer', 'engineer', 'programming', 'coding', 'javascript', 'python', 'react', 'node', 'full stack', 'frontend', 'backend', 'devops', 'cloud', 'aws', 'azure', 'data', 'machine learning', 'ai', 'artificial intelligence', 'cybersecurity', 'database', 'api', 'web', 'mobile', 'app'],
            'Healthcare': ['medical', 'healthcare', 'nurse', 'doctor', 'physician', 'hospital', 'clinic', 'patient', 'pharmaceutical', 'biotech', 'clinical', 'health', 'medicine', 'surgery', 'therapy', 'diagnosis', 'treatment'],
            'Finance': ['finance', 'financial', 'accounting', 'investment', 'banking', 'trading', 'stock', 'portfolio', 'audit', 'tax', 'budget', 'analyst', 'wealth', 'insurance', 'credit', 'risk', 'compliance'],
            'Marketing': ['marketing', 'digital marketing', 'seo', 'sem', 'social media', 'content', 'brand', 'advertising', 'campaign', 'pr', 'public relations', 'growth', 'analytics', 'email', 'copywriting', 'creative'],
            'Sales': ['sales', 'business development', 'revenue', 'quota', 'pipeline', 'customer', 'client', 'account', 'negotiation', 'closing', 'prospecting', 'b2b', 'b2c', 'territory', 'commission'],
            'Human Resources': ['hr', 'human resources', 'recruiting', 'recruitment', 'talent', 'hiring', 'onboarding', 'training', 'compensation', 'benefits', 'employee', 'performance', 'culture', 'diversity'],
            'Operations': ['operations', 'supply chain', 'logistics', 'procurement', 'inventory', 'warehouse', 'manufacturing', 'production', 'quality', 'lean', 'six sigma', 'process', 'efficiency'],
            'Design': ['design', 'ux', 'ui', 'user experience', 'user interface', 'graphic', 'visual', 'creative', 'branding', 'product design', 'interaction', 'wireframe', 'prototype', 'figma', 'sketch'],
            'Education': ['education', 'teaching', 'teacher', 'professor', 'instructor', 'curriculum', 'learning', 'academic', 'school', 'university', 'college', 'student', 'training', 'e-learning'],
            'Legal': ['legal', 'law', 'attorney', 'lawyer', 'counsel', 'compliance', 'regulatory', 'contract', 'litigation', 'corporate', 'intellectual property', 'paralegal', 'jurisprudence']
        };

        const lowerText = text.toLowerCase();
        let bestMatch = 'General';
        let maxMatches = 0;

        for (const [industry, keywords] of Object.entries(industryKeywords)) {
            const matches = keywords.filter(keyword => lowerText.includes(keyword)).length;
            if (matches > maxMatches) {
                maxMatches = matches;
                bestMatch = industry;
            }
        }

        return bestMatch;
    };

    const getIndustryBenchmark = (industry) => {
        const benchmarks = {
            'Technology': { average: 68, topPercentile: 85 },
            'Healthcare': { average: 72, topPercentile: 88 },
            'Finance': { average: 70, topPercentile: 86 },
            'Marketing': { average: 65, topPercentile: 82 },
            'Sales': { average: 63, topPercentile: 80 },
            'Human Resources': { average: 67, topPercentile: 84 },
            'Operations': { average: 66, topPercentile: 83 },
            'Design': { average: 64, topPercentile: 81 },
            'Education': { average: 69, topPercentile: 85 },
            'Legal': { average: 71, topPercentile: 87 },
            'General': { average: 65, topPercentile: 82 }
        };

        return benchmarks[industry] || benchmarks['General'];
    };

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
            const maxSize = 5 * 1024 * 1024; // 5MB

            if (!validTypes.includes(file.type)) {
                alert('Please upload a PDF or DOCX file');
                return;
            }

            if (file.size > maxSize) {
                alert('File size must be less than 5MB');
                return;
            }

            setUploadedFile(file);
        }
    };

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleAnalyze = () => {
        if (!jobDescription.trim()) return;

        setIsAnalyzing(true);
        setTimeout(() => {
            const jdKeywords = extractKeywords(jobDescription);
            const jdSkills = extractSkills(jobDescription);
            const criticalKeywords = jdKeywords.slice(0, 30);

            const found = criticalKeywords.filter((keyword) => resumeText.includes(keyword));
            const missing = criticalKeywords.filter((keyword) => !resumeText.includes(keyword));

            const foundSkills = jdSkills.filter((skill) => resumeText.includes(skill.toLowerCase()));
            const missingSkills = jdSkills.filter((skill) => !resumeText.includes(skill.toLowerCase()));

            const base = 100;
            const missingPenalty = missing.length * 2.8;
            const missingSkillsPenalty = missingSkills.length * 5;
            const shortSummaryPenalty = (resumeData.personalInfo.summary || '').length < 80 ? 8 : 0;
            const lowExperiencePenalty = resumeData.experience.length < 2 ? 7 : 0;
            const lowSkillsPenalty = resumeData.skills.length < 8 ? 6 : 0;

            const experienceMatch = calculateExperienceMatch(jobDescription, resumeData.experience);
            const experienceScore = Math.round(experienceMatch * 0.3);

            const strictScore = Math.max(28, Math.round(base - missingPenalty - missingSkillsPenalty - shortSummaryPenalty - lowExperiencePenalty - lowSkillsPenalty));
            const finalScore = Math.min(100, Math.round((strictScore + experienceScore) / 1.3));

            const sectionScores = {
                skills: Math.max(40, 100 - (missingSkills.length * 10)),
                experience: experienceMatch,
                education: resumeData.edducation?.length > 0 ? 100 : 60,
                keywords: Math.max(30, 100 - (missing.length * 5))
            };

            const strengths = [];
            if (found.length > 15) strengths.push('Strong keyword matching');
            if (resumeData.experience.length >= 2) strengths.push('Adequate work experience');
            if (resumeData.skills.length >= 8) strengths.push('Good skill diversity');
            if ((resumeData.personalInfo.summary || '').length >= 80) strengths.push('Well-written summary');

            const weaknesses = [];
            if (missing.length > 10) weaknesses.push('Missing critical keywords');
            if (missingSkills.length > 0) weaknesses.push('Missing required skills');
            if (resumeData.experience.length < 2) weaknesses.push('Limited work experience');
            if ((resumeData.personalInfo.summary || '').length < 80) weaknesses.push('Summary needs improvement');

            const suggestions = [];
            if (missing.length > 0) suggestions.push(`Add these keywords: ${missing.slice(0, 5).join(', ')}`);
            if (missingSkills.length > 0) suggestions.push(`Develop these skills: ${missingSkills.slice(0, 3).join(', ')}`);
            if (resumeData.experience.length < 2) suggestions.push('Add more relevant work experience');
            if ((resumeData.personalInfo.summary || '').length < 80) suggestions.push('Expand your professional summary');

            const detectedIndustry = detectIndustry(jobDescription);
            const benchmarkData = getIndustryBenchmark(detectedIndustry);

            setAnalysis({
                foundKeywords: found.slice(0, 15),
                missingKeywords: missing.slice(0, 15),
                missingSkills: missingSkills.slice(0, 10),
                strictness: 'High',
                sectionScores,
                strengths,
                weaknesses,
                suggestions,
                industryBenchmark: benchmarkData.average,
                industryName: detectedIndustry,
                industryAverage: benchmarkData.average,
                topPercentile: finalScore >= benchmarkData.topPercentile,
                atsCompliance: missing.length < 10 && missingSkills.length < 3
            });
            setJobDescription(jobDescription);
            setScore(finalScore);
            setIsAnalyzing(false);
            setShowResults(true);
        }, 2500);
    };

    const handleContinueToBuilder = () => {
        navigate(`/builder/${templateFromQuery}`);
    };

    const getScoreColor = (score) => {
        if (score >= 80) return 'text-green-600';
        if (score >= 60) return 'text-amber-600';
        return 'text-red-600';
    };

    const getScoreBgColor = (score) => {
        if (score >= 80) return 'bg-green-500';
        if (score >= 60) return 'bg-amber-500';
        return 'bg-red-500';
    };

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#f4f0e8] via-[#f8f6f2] to-[#e5ecfa] font-sans">
            <Navbar />

            <main className="section-container max-w-6xl py-12 md:py-20">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100">
                        <Zap className="h-4 w-4 text-blue-600" />
                        <span className="text-sm font-semibold text-blue-700">Premium Resume Analyzer</span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-dark mb-3">
                        Advanced ATS Resume Scanner
                    </h1>
                    <p className="text-stone-600 max-w-2xl mx-auto">
                        Get detailed analysis of your resume against job descriptions with skill gap analysis, industry benchmarks, and actionable improvement suggestions.
                    </p>
                    <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-card text-xs font-semibold text-slate-600">
                        <Target className="h-3.5 w-3.5" />
                        Template selected: <span className="text-[#7d5f3f] uppercase">{templateFromQuery}</span>
                    </div>
                </div>

                <div className="grid gap-8">
                    {/* Input Card with Premium Glass Effect */}
                    <div className="glass-card-premium p-8 md:p-10 rounded-2xl">
                        <div className="grid md:grid-cols-2 gap-8">
                            {/* Upload Section */}
                            <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <FileText className="w-4 h-4 text-blue-600" />
                                    <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider">
                                        Your Resume
                                    </label>
                                </div>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept=".pdf,.docx"
                                    onChange={handleFileUpload}
                                    className="hidden"
                                />
                                <div
                                    onClick={handleUploadClick}
                                    className="border-2 border-dashed border-white/40 rounded-2xl p-8 text-center hover:border-blue-400 hover:bg-blue-50/20 transition-all cursor-pointer group glass-light"
                                >
                                    <Upload className="w-10 h-10 text-stone-300 mx-auto mb-3 group-hover:text-blue-500 transition-colors" />
                                    {uploadedFile ? (
                                        <>
                                            <p className="text-sm font-medium text-green-600">✓ {uploadedFile.name}</p>
                                            <p className="text-xs text-stone-400 mt-1">{(uploadedFile.size / 1024).toFixed(2)} KB</p>
                                        </>
                                    ) : (
                                        <>
                                            <p className="text-sm font-medium text-stone-600">Click to upload or drag & drop</p>
                                            <p className="text-xs text-stone-400 mt-1">PDF, DOCX (Max 5MB)</p>
                                        </>
                                    )}
                                    <div className="mt-4 text-xs text-stone-500">
                                        Currently using: <span className="font-semibold">{templateFromQuery} template</span>
                                    </div>
                                </div>
                            </div>

                            {/* JD Section */}
                            <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <Briefcase className="w-4 h-4 text-blue-600" />
                                    <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider">
                                        Job Description
                                    </label>
                                </div>
                                <textarea
                                    className="input-field h-44 resize-none glass-light border-white/30"
                                    placeholder="Paste the target job description here for detailed analysis..."
                                    value={jobDescription}
                                    onChange={(e) => setJobDescriptionInput(e.target.value)}
                                />
                                <div className="text-xs text-stone-500 flex items-center gap-1">
                                    <Sparkles className="h-3 w-3" />
                                    We'll analyze skills, experience requirements, keywords, and ATS compatibility
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={handleAnalyze}
                            disabled={isAnalyzing}
                            className={`w-full mt-8 btn-primary py-3.5 text-base rounded-xl ${isAnalyzing ? 'opacity-70 pointer-events-none' : ''}`}
                        >
                            {isAnalyzing ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                                    Advanced Analysis in Progress...
                                </>
                            ) : (
                                <>
                                    <Sparkles className="h-4 w-4 mr-2" />
                                    Run Advanced Analysis
                                </>
                            )}
                        </button>
                    </div>

                    {/* Results Section */}
                    {showResults && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="glass-card-premium p-8 md:p-10 rounded-2xl"
                        >
                            <div className="flex flex-col md:flex-row items-center gap-8 mb-10">
                                {/* Score Circle with Premium Styling */}
                                <div className="relative w-40 h-40 flex-shrink-0">
                                    <svg className="w-full h-full transform -rotate-90">
                                        <circle
                                            cx="80"
                                            cy="80"
                                            r="72"
                                            fill="transparent"
                                            stroke="#f3f4f6"
                                            strokeWidth="10"
                                        />
                                        <circle
                                            cx="80"
                                            cy="80"
                                            r="72"
                                            fill="transparent"
                                            stroke={score >= 80 ? "#10b981" : score >= 60 ? "#f59e0b" : "#ef4444"}
                                            strokeWidth="10"
                                            strokeDasharray={452}
                                            strokeDashoffset={452 - (452 * score) / 100}
                                            strokeLinecap="round"
                                            className="transition-all duration-1000 ease-out"
                                        />
                                    </svg>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                                        <span className={`text-4xl font-bold ${getScoreColor(score)}`}>{score}%</span>
                                        <span className="text-[10px] font-medium text-stone-500 uppercase">Match Score</span>
                                        <div className="mt-2 flex items-center gap-1">
                                            <Shield className="h-3 w-3 text-blue-500" />
                                            <span className="text-xs text-stone-500">ATS: {analysis.atsCompliance ? 'Compliant' : 'Needs Work'}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex-1 text-center md:text-left space-y-4">
                                    <h3 className="text-2xl font-bold text-dark">Advanced Analysis Complete</h3>
                                    <p className="text-stone-600">
                                        Your resume has been analyzed against the job description with industry benchmarks and detailed section scoring.
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 px-3 py-1.5 rounded-full text-xs font-medium">
                                            <TrendingUp className="w-3.5 h-3.5" />
                                            Strictness: {analysis.strictness}
                                        </div>
                                        <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-purple-50 to-pink-50 text-purple-700 px-3 py-1.5 rounded-full text-xs font-medium">
                                            <Briefcase className="w-3.5 h-3.5" />
                                            Industry: {analysis.industryName}
                                        </div>
                                        <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 px-3 py-1.5 rounded-full text-xs font-medium">
                                            <Users className="w-3.5 h-3.5" />
                                            Industry Avg: {analysis.industryAverage}%
                                        </div>
                                        {analysis.topPercentile && (
                                            <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-50 to-yellow-50 text-amber-700 px-3 py-1.5 rounded-full text-xs font-medium">
                                                <Award className="w-3.5 h-3.5" />
                                                Top Percentile
                                            </div>
                                        )}
                                        <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-50 to-orange-50 text-amber-700 px-3 py-1.5 rounded-full text-xs font-medium">
                                            <Clock className="w-3.5 h-3.5" />
                                            Analysis Time: 2.5s
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Section Scores */}
                            <div className="mb-10">
                                <h4 className="flex items-center gap-2 text-lg font-semibold text-dark mb-6">
                                    <BarChart3 className="w-5 h-5 text-blue-600" />
                                    Section Breakdown
                                </h4>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {Object.entries(analysis.sectionScores).map(([section, sectionScore]) => (
                                        <div key={section} className="glass-card p-4 rounded-xl">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-xs font-semibold text-stone-500 uppercase">
                                                    {section}
                                                </span>
                                                <span className={`text-sm font-bold ${getScoreColor(sectionScore)}`}>
                                                    {sectionScore}%
                                                </span>
                                            </div>
                                            <div className="h-2 bg-stone-100 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full rounded-full ${getScoreBgColor(sectionScore)}`}
                                                    style={{ width: `${sectionScore}%` }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Strengths & Weaknesses */}
                            <div className="grid md:grid-cols-2 gap-6 mb-8">
                                <div className="space-y-4">
                                    <h4 className="flex items-center gap-2 text-sm font-semibold text-dark">
                                        <Award className="w-4 h-4 text-green-500" />
                                        Strengths
                                    </h4>
                                    <div className="space-y-2">
                                        {analysis.strengths.map((strength, idx) => (
                                            <div key={idx} className="flex items-center gap-2 p-3 bg-green-50/50 rounded-lg border border-green-100">
                                                <CheckCircle className="w-4 h-4 text-green-500" />
                                                <span className="text-sm text-stone-700">{strength}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h4 className="flex items-center gap-2 text-sm font-semibold text-dark">
                                        <AlertCircle className="w-4 h-4 text-amber-500" />
                                        Areas for Improvement
                                    </h4>
                                    <div className="space-y-2">
                                        {analysis.weaknesses.map((weakness, idx) => (
                                            <div key={idx} className="flex items-center gap-2 p-3 bg-amber-50/50 rounded-lg border border-amber-100">
                                                <AlertCircle className="w-4 h-4 text-amber-500" />
                                                <span className="text-sm text-stone-700">{weakness}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Keywords Grid */}
                            <div className="grid md:grid-cols-2 gap-6 pt-6 border-t border-white/30">
                                <div className="space-y-3">
                                    <h4 className="flex items-center gap-2 text-sm font-semibold text-dark">
                                        <CheckCircle className="w-4 h-4 text-green-500" />
                                        Found Keywords ({analysis.foundKeywords.length})
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {analysis.foundKeywords.map(word => (
                                            <span key={word} className="bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 px-2.5 py-1 rounded-lg text-xs font-medium border border-green-100">{word}</span>
                                        ))}
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <h4 className="flex items-center gap-2 text-sm font-semibold text-dark">
                                        <AlertCircle className="w-4 h-4 text-amber-500" />
                                        Missing Keywords ({analysis.missingKeywords.length})
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {analysis.missingKeywords.map(word => (
                                            <span key={word} className="bg-gradient-to-r from-amber-50 to-orange-50 text-amber-700 px-2.5 py-1 rounded-lg text-xs font-medium border border-amber-100">{word}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Suggestions */}
                            <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100 flex flex-col md:flex-row items-center justify-between gap-4">
                                <div className="flex-1">
                                    <h5 className="font-semibold text-blue-900 mb-1 text-sm">Actionable Recommendations</h5>
                                    <ul className="text-blue-700 text-sm list-disc pl-4">
                                        {analysis.suggestions.slice(0, 3).map((suggestion, idx) => (
                                            <li key={idx} className="mb-1">{suggestion}</li>
                                        ))}
                                    </ul>
                                </div>
                                <button onClick={handleContinueToBuilder} className="btn-primary text-sm whitespace-nowrap rounded-xl">
                                    Continue To Builder
                                    <ArrowRight className="h-4 w-4 ml-1" />
                                </button>
                            </div>
                        </motion.div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Analyze;
