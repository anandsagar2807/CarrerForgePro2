import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
    FileText, GraduationCap, Briefcase, Code, Award, 
    Download, Sparkles, Eye, Loader, ChevronLeft, Save 
} from 'lucide-react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useResume } from '../context/ResumeContext';
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
    } = useResume();

    const [activeSection, setActiveSection] = useState('personal');
    const [jdText, setJdText] = useState(resumeData.jobDescription || '');
    const [showDownloadModal, setShowDownloadModal] = useState(false);
    const [aiAnalysis, setAiAnalysis] = useState(null);
    const [analyzingStrength, setAnalyzingStrength] = useState(false);
    const [isExporting, setIsExporting] = useState(false);

    useEffect(() => {
        if (templateId && templateId !== selectedTemplate) {
            setTemplate(templateId);
        }
    }, [templateId, selectedTemplate, setTemplate]);

    // Dynamic AI Resume Strength Analysis
    useEffect(() => {
        const analyzeStrength = async () => {
            setAnalyzingStrength(true);
            try {
                const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
                const resumeText = getResumeCorpus();
                const response = await axios.post(`${API_BASE_URL}/ai/calculate-ats`, {
                    resumeText,
                    jdText: jdText
                });

                if (response.status === 200) {
                    setAiAnalysis(response.data);
                }
            } catch (error) {
                console.error('Failed to analyze resume strength:', error);
            } finally {
                setAnalyzingStrength(false);
            }
        };

        const timeoutId = setTimeout(() => {
            if (resumeData.personalInfo.fullName || resumeData.experience.length > 0) {
                analyzeStrength();
            }
        }, 2000);

        return () => clearTimeout(timeoutId);
    }, [resumeData, jdText]);

    const getResumeCorpus = () => {
        const { personalInfo, experience, education, skills, projects } = resumeData;
        return `
            ${personalInfo.fullName} ${personalInfo.title} ${personalInfo.summary}
            ${experience.map(e => `${e.position} ${e.company} ${e.description}`).join(' ')}
            ${education.map(e => `${e.degree} ${e.school}`).join(' ')}
            ${skills.map(s => s.name).join(' ')}
            ${projects.map(p => `${p.name} ${p.description}`).join(' ')}
        `;
    };

    const getDisplayScore = () => aiAnalysis?.score || aiAnalysis?.overallScore || 0;

    const getResumeStrength = () => {
        const score = getDisplayScore();
        if (score >= 85) return { level: 'Elite', color: 'text-blue-400', levelClass: 'bg-blue-500/20' };
        if (score >= 70) return { level: 'Strong', color: 'text-indigo-400', levelClass: 'bg-indigo-500/20' };
        if (score >= 50) return { level: 'Average', color: 'text-yellow-400', levelClass: 'bg-yellow-500/20' };
        return { level: 'Basic', color: 'text-red-400', levelClass: 'bg-red-500/20' };
    };

    const getSuggestions = () => {
        if (!aiAnalysis) return [];
        return aiAnalysis.suggestions || [];
    };

    const sections = [
        { id: 'personal', label: 'Personal', icon: <FileText className="w-4 h-4" /> },
        { id: 'education', label: 'Education', icon: <GraduationCap className="w-4 h-4" /> },
        { id: 'experience', label: 'Experience', icon: <Briefcase className="w-4 h-4" /> },
        { id: 'skills', label: 'Skills', icon: <Code className="w-4 h-4" /> },
        { id: 'projects', label: 'Projects', icon: <Award className="w-4 h-4" /> },
    ];

    const handleAnalyzeJD = async () => {
        if (!jdText.trim()) return;
        setAnalyzingStrength(true);
        try {
            const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
            const response = await axios.post(`${API_BASE_URL}/ai/analyze-jd`, { jdText });
            setAiAnalysis(prev => ({ ...prev, ...response.data }));
            setJobDescription(jdText);
            alert('JD Analyzed! Optimization ready.');
        } catch (error) {
            console.error('JD Analysis failed:', error);
        } finally {
            setAnalyzingStrength(false);
        }
    };

    const handleRewriteXYZ = async (id) => {
        const exp = resumeData.experience.find(e => e.id === id);
        if (!exp || !exp.description) return;
        
        setAnalyzingStrength(true);
        try {
            const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
            const response = await axios.post(`${API_BASE_URL}/ai/rewrite`, {
                bullet: exp.description,
                keyword: jdText ? '' : '' // Logic for extracting keywords can be added
            });
            
            if (response.data.rewritten) {
                updateExperience(id, { ...exp, description: response.data.rewritten });
            }
        } catch (error) {
            console.error('Rewrite failed:', error);
        } finally {
            setAnalyzingStrength(false);
        }
    };

    const handleExportPDF = async () => {
        setIsExporting(true);
        try {
            const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
            const resumeElement = document.querySelector('[data-resume-export="true"]');
            const htmlContent = `
                <html>
                <head>
                    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
                    <style>
                        body { background: white; width: 8.5in; margin: 0; padding: 0; }
                        @page { size: letter; margin: 0; }
                    </style>
                </head>
                <body>
                    ${resumeElement.innerHTML}
                </body>
                </html>
            `;

            const response = await axios.post(`${API_BASE_URL}/resumes/pdf`, 
                { htmlContent },
                { responseType: 'blob' }
            );
            
            const blob = new Blob([response.data], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'resume.pdf');
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error('PDF Export failed:', error);
            alert('Failed to generate professional PDF.');
        } finally {
            setIsExporting(false);
        }
    };

    const renderForm = () => {
        const inputClass = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all";
        const labelClass = "text-xs font-black text-slate-500 uppercase tracking-widest mb-2 block";

        switch (activeSection) {
            case 'personal':
                return (
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className={labelClass}>Full Name</label>
                            <input 
                                type="text" 
                                value={resumeData.personalInfo.fullName} 
                                onChange={(e) => updatePersonalInfo({ fullName: e.target.value })}
                                className={inputClass}
                                placeholder="John Doe"
                            />
                        </div>
                        <div>
                            <label className={labelClass}>Job Title</label>
                            <input 
                                type="text" 
                                value={resumeData.personalInfo.title} 
                                onChange={(e) => updatePersonalInfo({ title: e.target.value })}
                                className={inputClass}
                                placeholder="Senior Software Engineer"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className={labelClass}>Summary</label>
                            <textarea 
                                value={resumeData.personalInfo.summary} 
                                onChange={(e) => updatePersonalInfo({ summary: e.target.value })}
                                className={`${inputClass} h-32 resize-none`}
                                placeholder="Tell us about your professional background..."
                            />
                        </div>
                    </div>
                );
            case 'experience':
                return (
                    <div className="space-y-8">
                        {resumeData.experience.map((exp) => (
                            <div key={exp.id} className="p-6 bg-white/5 rounded-2xl border border-white/10 space-y-4">
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className={labelClass}>Position</label>
                                        <input 
                                            type="text" 
                                            value={exp.position} 
                                            onChange={(e) => updateExperience(exp.id, { position: e.target.value })}
                                            className={inputClass}
                                        />
                                    </div>
                                    <div>
                                        <label className={labelClass}>Company</label>
                                        <input 
                                            type="text" 
                                            value={exp.company} 
                                            onChange={(e) => updateExperience(exp.id, { company: e.target.value })}
                                            className={inputClass}
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <div className="flex justify-between items-center mb-1.5">
                                            <label className={labelClass}>Description / Achievements</label>
                                            <button 
                                                onClick={() => handleRewriteXYZ(exp.id)}
                                                className="text-[10px] font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors"
                                            >
                                                <Sparkles className="w-3 h-3" />
                                                AI XYZ Rewrite
                                            </button>
                                        </div>
                                        <textarea
                                            value={exp.description}
                                            onChange={(e) => updateExperience(exp.id, { description: e.target.value })}
                                            className={`${inputClass} h-32 resize-none`}
                                            placeholder="Describe your achievements..."
                                        />
                                    </div>
                                </div>
                                <button 
                                    onClick={() => removeExperience(exp.id)}
                                    className="text-xs font-bold text-red-400 hover:text-red-500 transition-colors"
                                >
                                    Remove Experience
                                </button>
                            </div>
                        ))}
                        <button 
                            onClick={addExperience}
                            className="w-full py-4 border-2 border-dashed border-white/10 rounded-2xl text-slate-400 font-bold hover:border-blue-500/50 hover:text-white transition-all"
                        >
                            + Add Experience
                        </button>
                    </div>
                );
            case 'skills':
                return (
                    <div className="space-y-6">
                        <div className="flex flex-wrap gap-3">
                            {resumeData.skills.map((skill) => (
                                <div key={skill.id} className="group flex items-center gap-2 bg-blue-600/20 text-blue-400 px-4 py-2 rounded-xl border border-blue-500/30">
                                    <span className="text-sm font-bold">{skill.name}</span>
                                    <button onClick={() => removeSkill(skill.id)} className="hover:text-white">
                                        <X className="w-3 h-3" />
                                    </button>
                                </div>
                            ))}
                        </div>
                        <div className="relative">
                            <input 
                                type="text" 
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && e.target.value.trim()) {
                                        addSkill(e.target.value.trim());
                                        e.target.value = '';
                                    }
                                }}
                                className={inputClass}
                                placeholder="Add a skill and press Enter..."
                            />
                        </div>
                    </div>
                );
            default:
                return <div className="text-slate-500 text-center py-10 font-bold uppercase tracking-widest text-xs">Section content coming soon...</div>;
        }
    };

    return (
        <div className="min-h-screen bg-[#020617] text-white flex flex-col overflow-hidden font-sans">
            {/* Premium Animated background gradients */}
            <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
                <div className="absolute -top-40 left-[-8rem] h-[35rem] w-[35rem] rounded-full bg-blue-600/5 blur-[150px] animate-pulse" />
                <div className="absolute top-1/3 right-[-10rem] h-[40rem] w-[40rem] rounded-full bg-indigo-600/5 blur-[160px] animate-pulse" style={{ animationDelay: '1.5s' }} />
            </div>

            {/* Top Bar */}
            <div className="bg-[#020617]/80 backdrop-blur-xl border-b border-white/5 h-20 flex items-center justify-between px-8 shrink-0 relative z-20 shadow-2xl">
                <div className="flex items-center gap-8">
                    <button
                        onClick={() => navigate('/templates')}
                        className="flex items-center gap-2 text-slate-400 hover:text-white transition-all duration-300 font-bold text-sm group"
                    >
                        <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        <span>All Templates</span>
                    </button>
                    <div className="w-px h-8 bg-white/10 hidden md:block" />
                    <div className="flex items-center gap-3">
                        <img src="/logo.png" alt="Logo" className="h-9 w-auto" />
                        <h1 className="text-xl font-black tracking-tight hidden md:block">
                            Zaalima<span className="text-blue-500">Forge</span> <span className="text-[10px] uppercase bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded ml-1 tracking-widest font-black">Pro</span>
                        </h1>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <button 
                        onClick={() => setShowDownloadModal(true)} 
                        disabled={isExporting}
                        className="bg-blue-600 text-white font-black py-3 px-8 rounded-2xl text-sm flex items-center gap-3 hover:bg-blue-500 hover:shadow-[0_0_30px_rgba(37,99,235,0.4)] transition-all active:scale-95 disabled:opacity-50"
                    >
                        {isExporting ? <Loader className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                        <span>Export Resume</span>
                    </button>
                </div>
            </div>

            <div className="flex flex-1 overflow-hidden relative z-10">
                <div className="flex-1 flex overflow-hidden">
                    {/* Editor Pane */}
                    <div className="w-full lg:w-[55%] overflow-y-auto px-8 py-12 md:px-16 scrollbar-hide">
                        <div className="max-w-4xl mx-auto space-y-12">
                            {/* Strength Indicator */}
                            <div className="bg-white/5 backdrop-blur-2xl rounded-[2.5rem] p-10 border border-white/10 shadow-2xl relative overflow-hidden group">
                                <div className="flex items-center justify-between mb-8">
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-14 bg-blue-600/20 rounded-2xl flex items-center justify-center border border-blue-500/30">
                                            <Sparkles className="w-7 h-7 text-blue-400" />
                                        </div>
                                        <div>
                                            <span className="text-2xl font-black text-white block tracking-tight">ATS Performance</span>
                                            <span className="text-sm text-slate-400 font-bold uppercase tracking-widest">Real-time Analysis</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <span className={`text-6xl font-black tracking-tighter ${getResumeStrength().color}`}>
                                            {getDisplayScore()}%
                                        </span>
                                    </div>
                                </div>
                                <div className="w-full h-4 bg-white/5 rounded-full overflow-hidden border border-white/5">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${getDisplayScore()}%` }}
                                        transition={{ duration: 1.5 }}
                                        className={`h-full rounded-full ${getDisplayScore() >= 70 ? 'bg-blue-500' : 'bg-red-500'}`}
                                    />
                                </div>
                            </div>

                            {/* Section Nav */}
                            <div className="bg-white/5 backdrop-blur-xl rounded-[2rem] p-3 border border-white/5 sticky top-0 z-30">
                                <div className="flex items-center justify-center gap-3">
                                    {sections.map((section) => (
                                        <button
                                            key={section.id}
                                            onClick={() => setActiveSection(section.id)}
                                            className={`flex items-center gap-3 px-6 py-4 rounded-2xl transition-all duration-500 ${activeSection === section.id
                                                ? 'bg-blue-600 text-white shadow-lg'
                                                : 'text-slate-400 hover:text-white'
                                                }`}
                                        >
                                            {section.icon}
                                            <span className="font-black text-xs uppercase tracking-widest hidden sm:block">{section.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-white/5 backdrop-blur-2xl rounded-[2.5rem] p-10 border border-white/5">
                                {renderForm()}
                            </div>
                        </div>
                    </div>

                    {/* Preview Pane */}
                    <div className="hidden lg:flex w-[45%] bg-[#0f172a]/50 backdrop-blur-sm border-l border-white/5 overflow-hidden flex-col">
                        <div className="h-20 bg-white/5 flex items-center justify-between px-8 border-b border-white/5">
                            <span className="text-sm font-black text-white uppercase tracking-widest">Live Render</span>
                        </div>
                        <div className="flex-1 overflow-y-auto p-12 bg-[#020617] flex items-start justify-center scrollbar-hide">
                            <div className="w-[8.5in] h-fit bg-white shadow-2xl origin-top scale-[0.85]" data-resume-export="true">
                                <ResumePreview />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {showDownloadModal && (
                <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="w-full max-w-md bg-white rounded-2xl p-6">
                        <h3 className="text-lg font-bold text-slate-900 mb-4">Export Options</h3>
                        <div className="space-y-3">
                            <button onClick={handleExportPDF} className="w-full text-left px-4 py-3 rounded-xl border border-slate-200 hover:bg-slate-50 transition-all">
                                <span className="font-bold text-slate-900">Premium PDF</span>
                                <p className="text-xs text-slate-500">Pixel-perfect, ATS-optimized layout.</p>
                            </button>
                        </div>
                        <button onClick={() => setShowDownloadModal(false)} className="mt-5 w-full py-2.5 text-slate-600 hover:underline">Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ResumeBuilderPage;