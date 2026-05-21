import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, Loader2, Eye, Download, Star, CheckCircle, RefreshCw } from 'lucide-react';
import { groqTemplatesService, templateStyles } from '../services/groqTemplates';

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

const templateCategories = [
    { id: 'minimalist', label: 'Minimalist', color: 'from-slate-600 to-slate-800' },
    { id: 'modern', label: 'Modern Pro', color: 'from-blue-600 to-indigo-600' },
    { id: 'professional', label: 'Corporate Elite', color: 'from-emerald-600 to-teal-600' },
    { id: 'creative', label: 'Creative Flow', color: 'from-purple-600 to-pink-600' },
    { id: 'ats', label: 'ATS Optimizer', color: 'from-green-600 to-lime-600' },
    { id: 'tech', label: 'Tech Lead', color: 'from-cyan-600 to-blue-600' },
    { id: 'executive', label: 'Executive Suite', color: 'from-amber-600 to-orange-600' },
    { id: 'compact', label: 'Space Saver', color: 'from-rose-600 to-red-600' },
];

const SkeletonCard = () => (
    <div className="bg-white rounded-2xl border border-slate-200/60 overflow-hidden shadow-luxury">
        <div className="aspect-[3/4] bg-gradient-to-br from-slate-100 to-slate-50 relative">
            <div className="absolute inset-0 animate-shimmer opacity-60" />
            <div className="p-6 space-y-4">
                <div className="h-3 bg-slate-200 rounded-full w-3/4" />
                <div className="h-2 bg-slate-200 rounded-full w-1/2" />
                <div className="space-y-2 mt-6">
                    <div className="h-2 bg-slate-200 rounded-full w-full" />
                    <div className="h-2 bg-slate-200 rounded-full w-11/12" />
                    <div className="h-2 bg-slate-200 rounded-full w-4/5" />
                </div>
                <div className="flex gap-2 mt-4">
                    <div className="h-5 w-16 bg-slate-200 rounded-full" />
                    <div className="h-5 w-20 bg-slate-200 rounded-full" />
                    <div className="h-5 w-14 bg-slate-200 rounded-full" />
                </div>
                <div className="space-y-2 mt-4">
                    <div className="h-2 bg-slate-200 rounded-full w-full" />
                    <div className="h-2 bg-slate-200 rounded-full w-5/6" />
                </div>
            </div>
        </div>
        <div className="p-5 space-y-3">
            <div className="h-4 bg-slate-200 rounded-full w-2/3" />
            <div className="h-3 bg-slate-200 rounded-full w-full" />
            <div className="h-3 bg-slate-200 rounded-full w-4/5" />
        </div>
    </div>
);

const TemplatePreviewCard = ({ template, data, index }) => {
    const navigate = useNavigate();
    const [isHovered, setIsHovered] = useState(false);

    const skills = data?.skills?.technical?.slice(0, 4) || ['React', 'Node.js', 'Python', 'AWS'];
    const name = data?.personalInfo?.name || 'Alexandra Chen';
    const title = data?.personalInfo?.title || 'Senior Professional';
    const summarySnippet = data?.summary?.substring(0, 80) || 'Product leader with 8+ years of experience scaling B2B SaaS products...';

    return (
        <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group relative bg-white rounded-2xl border border-slate-200/60 overflow-hidden shadow-luxury hover:shadow-luxury-lg transition-all duration-500 cursor-pointer"
            onClick={() => navigate(`/builder/${template.id}`)}
        >
            {/* Premium Badge */}
            {template.premium && (
                <div className="absolute top-3 right-3 z-20">
                    <div className="badge-premium flex items-center gap-1">
                        <Star className="h-3 w-3" />
                        Premium
                    </div>
                </div>
            )}

            {/* Template Preview */}
            <div className="aspect-[3/4] relative overflow-hidden bg-gradient-to-br from-slate-50 to-white">
                <AnimatePresence mode="wait">
                    {isHovered ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-slate-800/90 to-slate-900/90 flex flex-col items-center justify-center gap-4 z-10"
                        >
                            <motion.button
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.1 }}
                                onClick={() => navigate(`/builder/${template.id}`)}
                                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
                            >
                                <Eye className="h-4 w-4" />
                                Use Template
                            </motion.button>
                            <motion.button
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="px-6 py-3 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-all flex items-center gap-2"
                            >
                                <Download className="h-4 w-4" />
                                Preview
                            </motion.button>
                        </motion.div>
                    ) : null}
                </AnimatePresence>

                {/* Mini Resume Preview */}
                <div className="p-5 text-[7px] leading-tight space-y-3 h-full">
                    {/* Header */}
                    <div className="flex justify-between items-start pb-2 border-b border-slate-200">
                        <div>
                            <h4 className="font-bold text-slate-900 text-[9px]">{name}</h4>
                            <p className="text-blue-600 font-semibold text-[7px]">{title}</p>
                        </div>
                        <div className="text-[6px] text-slate-400 text-right">
                            <div>alex@email.com</div>
                            <div>San Francisco, CA</div>
                        </div>
                    </div>

                    {/* Summary */}
                    <div>
                        <p className="font-bold text-slate-500 text-[6px] uppercase tracking-wider mb-1">Profile</p>
                        <p className="text-slate-600 text-[6px]">{summarySnippet}...</p>
                    </div>

                    {/* Experience */}
                    <div>
                        <p className="font-bold text-slate-500 text-[6px] uppercase tracking-wider mb-1">Experience</p>
                        <div className="space-y-1.5">
                            {(data?.experience?.slice(0, 2) || []).map((exp, i) => (
                                <div key={i}>
                                    <p className="font-semibold text-slate-800 text-[7px]">{exp?.title || 'Senior PM'} — {exp?.company || 'Linear'}</p>
                                    <div className="h-1 bg-slate-100 rounded-full w-full mt-0.5" />
                                    <div className="h-1 bg-slate-100 rounded-full w-11/12 mt-0.5" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Skills */}
                    <div>
                        <p className="font-bold text-slate-500 text-[6px] uppercase tracking-wider mb-1">Skills</p>
                        <div className="flex flex-wrap gap-1">
                            {skills.map((skill, i) => (
                                <span key={i} className="px-1.5 py-0.5 bg-blue-50 text-blue-700 rounded text-[6px] font-medium">{skill}</span>
                            ))}
                        </div>
                    </div>

                    {/* Education */}
                    <div>
                        <p className="font-bold text-slate-500 text-[6px] uppercase tracking-wider mb-1">Education</p>
                        <div className="h-1 bg-slate-100 rounded-full w-3/4" />
                    </div>
                </div>
            </div>

            {/* Card Footer */}
            <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-slate-900 text-sm">{template.name}</h3>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${template.premium ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                        {template.premium ? 'Premium' : 'Free'}
                    </span>
                </div>
                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-3">{template.description}</p>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                    <CheckCircle className="h-3 w-3 text-green-500" />
                    ATS-Friendly
                    <span className="mx-1">•</span>
                    <span>{template.layout}</span>
                </div>
            </div>
        </motion.div>
    );
};

const DynamicTemplateShowcase = () => {
    const navigate = useNavigate();
    const sectionRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    const [templates, setTemplates] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadedCount, setLoadedCount] = useState(0);
    const [activeCategory, setActiveCategory] = useState(null);
    const [error, setError] = useState(null);
    const hasInitialized = useRef(false);

    // Scroll-triggered initialization using IntersectionObserver
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !hasInitialized.current) {
                        setIsVisible(true);
                        hasInitialized.current = true;
                        loadInitialTemplates();
                    }
                });
            },
            { threshold: 0.15, rootMargin: '100px' }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const loadInitialTemplates = async () => {
        setLoading(true);
        setError(null);

        try {
            // First, show static template cards immediately
            const staticTemplates = Object.values(templateStyles);
            setTemplates(staticTemplates.map(t => ({ ...t, data: null })));
            setLoadedCount(staticTemplates.length);

            // Then, progressively fetch AI-generated content for each template
            if (GROQ_API_KEY) {
                for (let i = 0; i < staticTemplates.length; i++) {
                    try {
                        const data = await groqTemplatesService.generateTemplateContent(staticTemplates[i].id, {
                            jobTitle: staticTemplates[i].category === 'Technical' ? 'Senior Software Engineer' :
                                staticTemplates[i].category === 'Executive' ? 'VP of Engineering' :
                                    staticTemplates[i].category === 'Creative' ? 'Creative Director' :
                                        staticTemplates[i].category === 'Professional' ? 'Senior Product Manager' :
                                            'Senior Professional',
                            industry: staticTemplates[i].category === 'Technical' ? 'Technology' :
                                staticTemplates[i].category === 'Creative' ? 'Design & Media' :
                                    'Business & Technology',
                            experience: '5-8 years'
                        });

                        setTemplates(prev => {
                            const updated = [...prev];
                            updated[i] = { ...updated[i], data };
                            return updated;
                        });
                    } catch (err) {
                        // Keep template with default data if API fails for one
                        console.log(`Template ${staticTemplates[i].id} using default data`);
                    }
                }
            } else {
                // No API key - use default data for all templates
                const defaultData = groqTemplatesService.getDefaultData();
                setTemplates(prev => prev.map(t => ({ ...t, data: defaultData })));
            }
        } catch (err) {
            console.error('Template loading error:', err);
            setError('Failed to load templates. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const refreshTemplates = useCallback(async () => {
        if (loading) return;
        setLoading(true);
        setError(null);

        try {
            if (GROQ_API_KEY) {
                const category = activeCategory || 'all';
                const jobTitle = category === 'tech' ? 'Senior Software Engineer' :
                    category === 'executive' ? 'VP of Engineering' :
                        category === 'creative' ? 'Creative Director' :
                            category === 'professional' ? 'Senior Product Manager' :
                                'Senior Professional';

                const templatesToRefresh = activeCategory
                    ? templates.filter(t => t.id === activeCategory)
                    : templates;

                for (let i = 0; i < templatesToRefresh.length; i++) {
                    const data = await groqTemplatesService.generateTemplateContent(templatesToRefresh[i].id, {
                        jobTitle,
                        industry: 'Technology',
                        experience: '5-8 years',
                        customRequirements: 'Make it unique and different from previous versions'
                    });

                    setTemplates(prev => {
                        const idx = prev.findIndex(t => t.id === templatesToRefresh[i].id);
                        if (idx !== -1) {
                            const updated = [...prev];
                            updated[idx] = { ...updated[idx], data };
                            return updated;
                        }
                        return prev;
                    });
                }
            }
        } catch (err) {
            setError('Refresh failed. Using cached data.');
        } finally {
            setLoading(false);
        }
    }, [loading, activeCategory, templates]);

    return (
        <section ref={sectionRef} id="templates" className="py-24 md:py-32 relative overflow-hidden bg-gradient-to-b from-white via-slate-50/30 to-white">
            {/* Premium Background Mesh */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-400/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-400/10 rounded-full blur-3xl" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-400/5 rounded-full blur-3xl" />
            </div>

            <div className="section-container relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="text-center max-w-3xl mx-auto mb-12"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200/60 rounded-full text-sm font-semibold mb-6 shadow-sm">
                        <Sparkles className="h-4 w-4 text-blue-600" />
                        <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            AI-Powered Templates
                        </span>
                    </div>

                    <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight" style={{ fontFamily: "'Poppins', 'Inter', sans-serif" }}>
                        Premium Resume Templates
                        <br />
                        <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                            Generated by AI
                        </span>
                    </h2>

                    <p className="text-lg text-slate-600 leading-relaxed">
                        Scroll down to watch our AI dynamically generate personalized resume templates.
                        Each template is crafted in real-time using advanced AI technology.
                    </p>
                </motion.div>

                {/* Category Filter */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="flex flex-wrap justify-center gap-3 mb-12"
                >
                    <button
                        onClick={() => setActiveCategory(null)}
                        className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${!activeCategory ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30' : 'bg-white text-slate-600 border border-slate-200 hover:border-blue-300 hover:bg-blue-50'}`}
                    >
                        All Templates
                    </button>
                    {templateCategories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id)}
                            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${activeCategory === cat.id ? `bg-gradient-to-r ${cat.color} text-white shadow-lg` : 'bg-white text-slate-600 border border-slate-200 hover:border-blue-300 hover:bg-blue-50'}`}
                        >
                            {cat.label}
                        </button>
                    ))}
                </motion.div>

                {/* Refresh Button */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isVisible ? { opacity: 1 } : {}}
                    transition={{ delay: 0.3 }}
                    className="flex justify-center mb-8"
                >
                    <button
                        onClick={refreshTemplates}
                        disabled={loading}
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all duration-300 disabled:opacity-50 shadow-sm"
                    >
                        <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                        {loading ? 'Generating...' : 'Regenerate with AI'}
                    </button>
                </motion.div>

                {/* Error Message */}
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8 text-center text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3 max-w-md mx-auto"
                    >
                        {error}
                    </motion.div>
                )}

                {/* Template Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {loading && templates.length === 0
                        ? Array.from({ length: 8 }).map((_, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: i * 0.05 }}
                            >
                                <SkeletonCard />
                            </motion.div>
                        ))
                        : templates
                            .filter(t => !activeCategory || t.id === activeCategory)
                            .map((template, index) => (
                                <TemplatePreviewCard
                                    key={template.id}
                                    template={template}
                                    data={template.data}
                                    index={index}
                                />
                            ))
                    }
                </div>

                {/* Loading indicator for progressive loading */}
                {loading && templates.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-8 text-center"
                    >
                        <div className="inline-flex items-center gap-3 px-6 py-3 bg-blue-50 border border-blue-200 rounded-xl">
                            <Loader2 className="h-5 w-5 text-blue-600 animate-spin" />
                            <span className="text-sm font-semibold text-blue-700">AI is generating personalized content...</span>
                        </div>
                    </motion.div>
                )}

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="mt-16 text-center"
                >
                    <button
                        onClick={() => navigate('/templates')}
                        className="btn-luxury inline-flex items-center gap-3 text-base"
                    >
                        View All Templates
                        <ArrowRight className="h-5 w-5" />
                    </button>
                    <p className="text-sm text-slate-500 mt-4">8+ ATS-optimized templates • Free to start • No credit card required</p>
                </motion.div>
            </div>
        </section>
    );
};

export default DynamicTemplateShowcase;