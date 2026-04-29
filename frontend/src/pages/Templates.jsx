import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import TemplateCard from '../components/TemplateCard';
import FilterBar from '../components/FilterBar';
import { templateData } from '../types/resumeTypes';
import { Search, Sparkles, ChevronLeft } from 'lucide-react';

const Templates = () => {
    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState('All Templates');
    const [searchQuery, setSearchQuery] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);

    const categories = [
        'All Templates', 'Simple', 'Modern', 'One Column', 'With Photo', 'Professional', 'ATS'
    ];

    const steps = [
        { number: 1, label: 'Choose Template', active: true },
        { number: 2, label: 'Enter Details', active: false },
        { number: 3, label: 'Download Resume', active: false },
    ];

    // ✨ GROQ AI Dynamic Template Search
    const searchTemplatesAI = async () => {
        if (!searchQuery.trim()) return;
        setIsGenerating(true);
        
        try {
            // GROQ API Integration will generate custom templates
            // Simulating AI template matching
            const keywords = searchQuery.toLowerCase().split(' ');
            
            const matchedTemplates = templateData.filter(t => 
                keywords.some(k => 
                    t.name.toLowerCase().includes(k) || 
                    t.description.toLowerCase().includes(k) ||
                    t.category.toLowerCase().includes(k)
                )
            );

            // Add AI generated template recommendation
            if (matchedTemplates.length === 0) {
                alert(`✨ AI recommends creating a custom template for: ${searchQuery}`);
            }
            
        } catch (error) {
            console.error('AI Search error:', error);
        } finally {
            setIsGenerating(false);
        }
    };

    const filteredTemplates = selectedCategory === 'All Templates' 
        ? templateData 
        : templateData.filter(t => t.category.toLowerCase().includes(selectedCategory.toLowerCase()));

    return (
        <div className="min-h-screen bg-background font-sans">
            {/* Fixed Header */}
            <div className="bg-white/95 backdrop-blur-xl border-b border-slate-100 fixed top-0 left-0 right-0 z-50">
                <div className="section-container h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <h2 className="font-bold text-lg text-slate-900">Resume Templates</h2>
                        <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 text-xs font-semibold rounded-full">
                            {templateData.length} Templates
                        </span>
                    </div>
                    <button 
                        onClick={() => navigate('/')}
                        className="text-sm text-slate-500 hover:text-slate-900 transition-colors font-medium"
                    >
                        Go Home
                    </button>
                </div>
            </div>

            <Navbar />
            
            {/* Premium Navigation Bar */}
            <div className="bg-white/80 backdrop-blur-xl border-b border-stone-100 sticky top-16 z-40">
                <div className="section-container py-4 flex items-center justify-between">
                    <button 
                        onClick={() => navigate(-1)} 
                        className="flex items-center gap-2 text-stone-500 hover:text-stone-900 transition-colors"
                    >
                        <ChevronLeft className="w-5 h-5" />
                        <span className="text-sm font-medium">Back</span>
                    </button>
                    
                    {/* AI Search Bar */}
                    <div className="flex-1 max-w-xl mx-8">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                            <input
                                type="text"
                                placeholder="🔮 Search templates with AI..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && searchTemplatesAI()}
                                className="w-full pl-12 pr-12 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 transition-all"
                            />
                            <button 
                                onClick={searchTemplatesAI}
                                disabled={isGenerating}
                                className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg text-white transition-all hover:shadow-lg"
                            >
                                <Sparkles className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <main className="section-container py-12 md:py-20 mt-20">
                {/* Step Indicator */}
                <div className="flex items-center justify-center mb-12">
                    <div className="flex items-center gap-4 bg-white px-6 py-3 rounded-xl shadow-sm border border-stone-100">
                        {steps.map((step, idx) => (
                            <React.Fragment key={step.number}>
                                <div className="flex items-center gap-2.5">
                                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold ${
                                        step.active ? 'bg-primary text-white' : 'bg-stone-100 text-stone-400'
                                    }`}>
                                        {step.number}
                                    </div>
                                    <span className={`text-sm font-medium ${
                                        step.active ? 'text-dark' : 'text-stone-400'
                                    }`}>
                                        {step.label}
                                    </span>
                                </div>
                                {idx < steps.length - 1 && (
                                    <div className="w-8 h-px bg-stone-200 mx-1" />
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </div>

                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-4xl font-bold text-dark mb-3">
                        Choose Your Template
                    </h1>
                    <p className="text-stone-600 max-w-xl mx-auto">
                        Professional, ATS-friendly templates designed to help you land your dream job.
                    </p>
                </div>

                {/* Filter Bar */}
                <FilterBar 
                    categories={categories} 
                    selectedCategory={selectedCategory} 
                    onSelect={setSelectedCategory} 
                />

                {/* Template Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredTemplates.map((template) => (
                        <TemplateCard key={template.id} template={template} />
                    ))}
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Templates;
