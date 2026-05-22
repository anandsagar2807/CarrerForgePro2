import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Filter, Check, Sparkles, Eye, X, ChevronLeft, ChevronRight,
  Loader2, Grid, LayoutGrid, Star, Zap, Briefcase, User, Code,
  Home, ArrowRight, MessageSquare, FileText, Search, BarChart3
} from 'lucide-react';
import groqTemplatesService, { templateStyles } from '../services/groqTemplates';
import { useResume } from '../context/ResumeContext';
import Navbar from '../components/Navbar';
import TemplatePageHeader from '../components/TemplatePageHeader';
import TemplateComparison from '../components/TemplateComparison';
import TemplateCustomizationModal from '../components/TemplateCustomizationModal';
import {
  MinimalistTemplate, ModernTemplate, ProfessionalTemplate, CreativeTemplate,
  CompactTemplate, ExecutiveTemplate, ATSTemplate, TechTemplate
} from '../components/templates';

const templateComponents = {
  minimalist: MinimalistTemplate,
  modern: ModernTemplate,
  professional: ProfessionalTemplate,
  creative: CreativeTemplate,
  compact: CompactTemplate,
  executive: ExecutiveTemplate,
  ats: ATSTemplate,
  tech: TechTemplate
};

const TemplatesPage = () => {
  const navigate = useNavigate();
  const { setTemplate, updateResumeData } = useResume();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [previewTemplate, setPreviewTemplate] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRouting, setIsRouting] = useState(false);
  const [resumeData, setResumeData] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [showComparison, setShowComparison] = useState(false);
  const [showCustomizationModal, setShowCustomizationModal] = useState(false);
  const [selectedTemplateForCustomization, setSelectedTemplateForCustomization] = useState(null);

  const categories = [
    { id: 'all', label: 'All Templates', count: 8, icon: LayoutGrid },
    { id: 'Simple', label: 'Minimalist', count: 1, icon: User },
    { id: 'Modern', label: 'Modern', count: 1, icon: Grid },
    { id: 'Professional', label: 'Professional', count: 1, icon: Briefcase },
    { id: 'Creative', label: 'Creative', count: 1, icon: Zap },
    { id: 'Compact', label: 'Compact', count: 1, icon: Filter },
    { id: 'Executive', label: 'Executive', count: 1, icon: Star },
    { id: 'ATS', label: 'ATS-Friendly', count: 1, icon: Check },
    { id: 'Tech', label: 'Developer', count: 1, icon: Code },
  ];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Mock resume data for preview
      setResumeData({
        personalInfo: {
          fullName: 'Alex Morgan',
          title: 'Senior Product Designer',
          email: 'alex.morgan@design.com',
          phone: '(555) 123-4567',
          location: 'San Francisco, CA',
          summary: 'Innovation-driven Product Designer with 8+ years of experience in creating user-centric digital experiences for global SaaS companies.'
        },
        experience: [
          {
            company: 'DesignFlow Inc.',
            position: 'Lead UI/UX Designer',
            startDate: '2020-01',
            endDate: 'Present',
            description: 'Leading a team of 12 designers to revolutionize the design system and user experience across 3 core products.'
          }
        ],
        education: [
          {
            school: 'Rhode Island School of Design',
            degree: 'BFA in Graphic Design',
            startDate: '2012-09',
            endDate: '2016-05'
          }
        ],
        skills: [{ name: 'Figma' }, { name: 'React' }, { name: 'Product Strategy' }, { name: 'User Research' }],
        projects: []
      });
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const filteredTemplates = useMemo(() => {
    return Object.values(templateStyles).filter(template => {
      const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
      const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleUseTemplate = (templateId) => {
    setIsRouting(true);
    setTemplate(templateId);
    setTimeout(() => {
      navigate(`/builder/${templateId}`);
    }, 800);
  };

  const openPreview = (templateId) => {
    setPreviewTemplate(templateId);
  };

  const closePreview = () => {
    setPreviewTemplate(null);
  };

  const handleCustomGenerate = (data) => {
    // This would ideally call an AI service to populate parts of the resume
    console.log('Generating with customization:', data);
    setShowCustomizationModal(false);
    handleUseTemplate(selectedTemplateForCustomization);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-10 w-10 animate-spin text-blue-500 mx-auto mb-6" />
          <p className="text-slate-400 font-medium tracking-wide">Loading Premium Templates...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#020617] text-white overflow-x-hidden">
      {/* Premium Animated background gradients */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 left-[-8rem] h-[35rem] w-[35rem] rounded-full bg-blue-600/10 blur-[150px] animate-pulse" />
        <div className="absolute bottom-0 right-[-10rem] h-[40rem] w-[40rem] rounded-full bg-indigo-600/10 blur-[160px] animate-pulse" style={{ animationDelay: '1.5s' }} />
      </div>

      <Navbar isDark={true} />

      <main className="flex-1 pt-24">
        <TemplatePageHeader searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        <div className="max-w-7xl mx-auto px-6 lg:px-12 pb-32">
          {/* Category Filter */}
          <div className="flex items-center gap-4 overflow-x-auto no-scrollbar pb-12 mb-12 border-b border-white/5">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2.5 px-6 py-3.5 rounded-2xl transition-all duration-500 whitespace-nowrap border ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 border-blue-500 text-white shadow-[0_0_30px_rgba(37,99,235,0.4)] scale-105'
                    : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                <category.icon size={18} />
                <span className="text-sm font-bold">{category.label}</span>
                <span className={`text-[10px] font-black px-2 py-0.5 rounded-md ${
                  selectedCategory === category.id ? 'bg-white/20 text-white' : 'bg-white/5 text-slate-500'
                }`}>
                  {category.count}
                </span>
              </button>
            ))}
          </div>

          {/* Templates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
            <AnimatePresence mode='popLayout'>
              {filteredTemplates.map((template) => (
                <TemplateCard 
                  key={template.id} 
                  template={{...template, TemplateComponent: templateComponents[template.id]}} 
                  resumeData={resumeData}
                  onPreview={openPreview}
                  onSelect={handleUseTemplate}
                  isSelected={selectedTemplate === template.id}
                  onSelectChange={setSelectedTemplate}
                />
              ))}
            </AnimatePresence>
          </div>

          {filteredTemplates.length === 0 && (
            <div className="text-center py-40 bg-white/5 rounded-[3rem] border border-dashed border-white/10">
              <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mx-auto mb-8">
                <Search className="w-10 h-10 text-slate-500" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">No matching templates found</h3>
              <p className="text-slate-400 font-medium">Try adjusting your search or category filter.</p>
              <button 
                onClick={() => {setSelectedCategory('all'); setSearchQuery('');}}
                className="mt-8 text-blue-400 font-bold hover:text-blue-300 transition-colors"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </main>

      {isRouting && (
        <div className="fixed inset-0 z-50 bg-[#020617]/80 backdrop-blur-xl flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-blue-500 mx-auto mb-6" />
            <p className="text-white font-black tracking-widest uppercase text-xs">Launching Builder Experience...</p>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      <AnimatePresence>
        {previewTemplate && (
          <PreviewModal
            templateId={previewTemplate}
            resumeData={resumeData}
            onClose={closePreview}
            onUse={handleUseTemplate}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

// Internal Template Card Component
const TemplateCard = ({ template, resumeData, onPreview, onSelect, isSelected, onSelectChange }) => {
  const TemplateComponent = template.TemplateComponent;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`group relative bg-white/5 rounded-[2.5rem] overflow-hidden border transition-all duration-500 cursor-pointer ${isSelected
        ? 'border-blue-500 shadow-[0_0_40px_rgba(37,99,235,0.2)]'
        : 'border-white/10 hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(37,99,235,0.1)]'
        }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelectChange(template.id)}
    >
      <div className="absolute top-6 right-6 z-10">
        <span className="px-3 py-1 bg-blue-500/20 backdrop-blur-md text-blue-400 text-[10px] font-black uppercase tracking-widest rounded-lg border border-blue-500/30 flex items-center gap-1.5">
          <Star className="h-3 w-3 fill-current" />
          Premium
        </span>
      </div>

      <div className="aspect-[3/4] bg-slate-900/50 relative overflow-hidden flex items-center justify-center p-8">
        {TemplateComponent && resumeData ? (
          <div className="w-full h-full bg-[#0f172a] rounded-xl border border-white/5 shadow-2xl overflow-hidden p-4 origin-top scale-[0.6] group-hover:scale-[0.65] transition-transform duration-700">
             <TemplateComponent data={resumeData} scale={1} isPreview />
          </div>
        ) : (
          <div className="w-full h-full bg-[#0f172a] rounded-xl border border-white/5 animate-pulse" />
        )}

        <div className={`absolute inset-0 bg-blue-600/20 backdrop-blur-sm flex flex-col items-center justify-center gap-4 transition-all duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'
          }`}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPreview(template.id);
            }}
            className="flex items-center gap-2 bg-white text-[#020617] font-black py-4 px-8 rounded-2xl text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-2xl"
          >
            <Eye className="h-4 w-4" />
            Full Preview
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect(template.id);
            }}
            className="flex items-center gap-2 bg-blue-600 text-white font-black py-4 px-8 rounded-2xl text-xs uppercase tracking-widest hover:bg-blue-500 hover:scale-105 transition-all shadow-2xl"
          >
            <Sparkles className="h-4 w-4" />
            Use Template
          </button>
        </div>
      </div>

      <div className="p-8">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-blue-400 transition-colors">{template.name}</h3>
          <span className="px-2.5 py-1 bg-white/5 text-slate-500 text-[9px] font-black uppercase tracking-widest rounded-md border border-white/5">
            {template.layout}
          </span>
        </div>
        <p className="text-slate-400 text-sm mb-6 line-clamp-2 leading-relaxed font-medium">{template.description}</p>

        <div className="flex flex-wrap gap-2">
          {template.sections.slice(0, 3).map((section, idx) => (
            <span key={idx} className="px-3 py-1 bg-blue-500/5 text-blue-400 text-[10px] font-bold rounded-lg border border-blue-500/10">
              {section}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// Preview Modal Component
const PreviewModal = ({ templateId, resumeData, onClose, onUse }) => {
  const TemplateComponent = templateComponents[templateId];
  const templateInfo = templateStyles.find(t => t.id === templateId);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
    >
      <div className="absolute inset-0 bg-[#020617]/90 backdrop-blur-xl" onClick={onClose} />
      
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="relative bg-[#0f172a] w-full max-w-6xl h-[90vh] rounded-[3rem] shadow-2xl border border-white/10 overflow-hidden flex flex-col md:flex-row"
      >
        <button
          onClick={onClose}
          className="absolute top-8 right-8 z-20 p-3 bg-white/5 hover:bg-white/10 rounded-2xl text-slate-400 hover:text-white transition-all border border-white/10"
        >
          <X size={24} />
        </button>

        <div className="flex-1 overflow-y-auto p-12 md:p-20 bg-[#020617] flex items-start justify-center scrollbar-hide">
          <div className="w-full max-w-[800px] bg-white shadow-2xl rounded-sm overflow-hidden">
            {TemplateComponent && <TemplateComponent data={resumeData} scale={1} isPreview />}
          </div>
        </div>

        <div className="w-full md:w-96 p-12 bg-white/5 backdrop-blur-md border-l border-white/10 flex flex-col justify-between">
          <div>
            <div className="w-16 h-16 bg-blue-600/20 rounded-2xl flex items-center justify-center mb-8 border border-blue-500/30">
              <Sparkles className="w-8 h-8 text-blue-400" />
            </div>
            <h2 className="text-3xl font-black text-white mb-4 tracking-tight">{templateInfo?.name}</h2>
            <p className="text-slate-400 font-medium leading-relaxed mb-8">{templateInfo?.description}</p>
            
            <div className="space-y-6">
              <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Key Features</h4>
              <ul className="space-y-4">
                {templateInfo?.sections.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-slate-300 font-bold">
                    <div className="w-5 h-5 bg-blue-600/20 rounded-lg flex items-center justify-center">
                      <Check className="w-3 h-3 text-blue-400" />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-12 space-y-4">
            <button
              onClick={() => onUse(templateId)}
              className="w-full py-5 bg-blue-600 text-white font-black rounded-2xl text-sm uppercase tracking-widest hover:bg-blue-500 shadow-[0_0_30px_rgba(37,99,235,0.4)] transition-all active:scale-95"
            >
              Use This Template
            </button>
            <button
              onClick={onClose}
              className="w-full py-5 bg-white/5 text-slate-400 font-black rounded-2xl text-sm uppercase tracking-widest hover:bg-white/10 transition-all border border-white/5"
            >
              Close Preview
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TemplatesPage;