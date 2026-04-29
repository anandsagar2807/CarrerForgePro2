import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ChevronRight, ChevronLeft, Check, User, Briefcase,
    GraduationCap, FileText, Sparkles, ArrowRight,
    Loader2, X, Info, AlertCircle, Lightbulb
} from 'lucide-react';

const GuidedBuilderWizard = ({ onClose, onComplete }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState({
        personalInfo: { name: '', email: '', phone: '', location: '' },
        experience: [],
        education: [],
        skills: [],
        summary: ''
    });

    const steps = [
        { id: 0, title: 'Personal Info', icon: User, description: 'Tell us about yourself' },
        { id: 1, title: 'Experience', icon: Briefcase, description: 'Add your work history' },
        { id: 2, title: 'Education', icon: GraduationCap, description: 'Your academic background' },
        { id: 3, title: 'Skills', icon: Sparkles, description: 'What you\'re good at' },
        { id: 4, title: 'Summary', icon: FileText, description: 'Professional overview' },
    ];

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            onComplete(formData);
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleSkip = () => {
        handleNext();
    };

    const StepContent = () => {
        switch (currentStep) {
            case 0:
                return (
                    <div className="space-y-6">
                        <div className="glass-card p-6 rounded-xl">
                            <h3 className="text-lg font-semibold text-stone-900 mb-4 flex items-center gap-2">
                                <User className="w-5 h-5 text-blue-500" />
                                Personal Information
                            </h3>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-stone-700">Full Name *</label>
                                    <input
                                        type="text"
                                        value={formData.personalInfo.name}
                                        onChange={(e) => setFormData(prev => ({
                                            ...prev,
                                            personalInfo: { ...prev.personalInfo, name: e.target.value }
                                        }))}
                                        className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-stone-700">Email Address *</label>
                                    <input
                                        type="email"
                                        value={formData.personalInfo.email}
                                        onChange={(e) => setFormData(prev => ({
                                            ...prev,
                                            personalInfo: { ...prev.personalInfo, email: e.target.value }
                                        }))}
                                        className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="john.doe@email.com"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-stone-700">Phone Number</label>
                                    <input
                                        type="tel"
                                        value={formData.personalInfo.phone}
                                        onChange={(e) => setFormData(prev => ({
                                            ...prev,
                                            personalInfo: { ...prev.personalInfo, phone: e.target.value }
                                        }))}
                                        className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="(123) 456-7890"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-stone-700">Location</label>
                                    <input
                                        type="text"
                                        value={formData.personalInfo.location}
                                        onChange={(e) => setFormData(prev => ({
                                            ...prev,
                                            personalInfo: { ...prev.personalInfo, location: e.target.value }
                                        }))}
                                        className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="San Francisco, CA"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="glass-card p-6 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50">
                            <div className="flex items-start gap-3">
                                <Lightbulb className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                                <div>
                                    <h4 className="font-semibold text-stone-900 mb-1">Pro Tips</h4>
                                    <ul className="text-sm text-stone-600 space-y-1">
                                        <li>• Use your full legal name as it appears on documents</li>
                                        <li>• Include a professional email address</li>
                                        <li>• Add your current location for job matching</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 1:
                return (
                    <div className="space-y-6">
                        <div className="glass-card p-6 rounded-xl">
                            <h3 className="text-lg font-semibold text-stone-900 mb-4 flex items-center gap-2">
                                <Briefcase className="w-5 h-5 text-blue-500" />
                                Work Experience
                            </h3>
                            <div className="space-y-4">
                                {formData.experience.map((exp, index) => (
                                    <div key={index} className="p-4 border border-stone-200 rounded-xl bg-stone-50/50">
                                        <div className="flex items-center justify-between mb-3">
                                            <h4 className="font-semibold text-stone-900">Position {index + 1}</h4>
                                            {formData.experience.length > 1 && (
                                                <button
                                                    onClick={() => setFormData(prev => ({
                                                        ...prev,
                                                        experience: prev.experience.filter((_, i) => i !== index)
                                                    }))}
                                                    className="p-1 hover:bg-red-100 rounded-lg transition-colors"
                                                >
                                                    <X className="w-4 h-4 text-red-500" />
                                                </button>
                                            )}
                                        </div>
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-stone-700">Job Title *</label>
                                                <input
                                                    type="text"
                                                    value={exp.title}
                                                    onChange={(e) => setFormData(prev => ({
                                                        ...prev,
                                                        experience: prev.experience.map((item, i) =>
                                                            i === index ? { ...item, title: e.target.value } : item
                                                        )
                                                    }))}
                                                    className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                    placeholder="Senior Software Engineer"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-stone-700">Company *</label>
                                                <input
                                                    type="text"
                                                    value={exp.company}
                                                    onChange={(e) => setFormData(prev => ({
                                                        ...prev,
                                                        experience: prev.experience.map((item, i) =>
                                                            i === index ? { ...item, company: e.target.value } : item
                                                        )
                                                    }))}
                                                    className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                    placeholder="TechCorp Inc."
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-stone-700">Description</label>
                                            <textarea
                                                value={exp.description}
                                                onChange={(e) => setFormData(prev => ({
                                                    ...prev,
                                                    experience: prev.experience.map((item, i) =>
                                                        i === index ? { ...item, description: e.target.value } : item
                                                    )
                                                }))}
                                                className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-24 resize-none"
                                                placeholder="Describe your responsibilities and achievements..."
                                            />
                                        </div>
                                    </div>
                                ))}
                                <button
                                    onClick={() => setFormData(prev => ({
                                        ...prev,
                                        experience: [...prev.experience, { title: '', company: '', description: '' }]
                                    }))}
                                    className="w-full py-3 border-2 border-dashed border-stone-300 rounded-xl text-stone-600 hover:border-blue-400 hover:text-blue-600 transition-colors flex items-center justify-center gap-2"
                                >
                                    <Briefcase className="w-4 h-4" />
                                    Add Another Position
                                </button>
                            </div>
                        </div>
                    </div>
                );

            case 2:
                return (
                    <div className="space-y-6">
                        <div className="glass-card p-6 rounded-xl">
                            <h3 className="text-lg font-semibold text-stone-900 mb-4 flex items-center gap-2">
                                <GraduationCap className="w-5 h-5 text-blue-500" />
                                Education
                            </h3>
                            <div className="space-y-4">
                                {formData.education.map((edu, index) => (
                                    <div key={index} className="p-4 border border-stone-200 rounded-xl bg-stone-50/50">
                                        <div className="flex items-center justify-between mb-3">
                                            <h4 className="font-semibold text-stone-900">Education {index + 1}</h4>
                                            {formData.education.length > 1 && (
                                                <button
                                                    onClick={() => setFormData(prev => ({
                                                        ...prev,
                                                        education: prev.education.filter((_, i) => i !== index)
                                                    }))}
                                                    className="p-1 hover:bg-red-100 rounded-lg transition-colors"
                                                >
                                                    <X className="w-4 h-4 text-red-500" />
                                                </button>
                                            )}
                                        </div>
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-stone-700">Institution *</label>
                                                <input
                                                    type="text"
                                                    value={edu.institution}
                                                    onChange={(e) => setFormData(prev => ({
                                                        ...prev,
                                                        education: prev.education.map((item, i) =>
                                                            i === index ? { ...item, institution: e.target.value } : item
                                                        )
                                                    }))}
                                                    className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                    placeholder="University of Technology"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-stone-700">Degree *</label>
                                                <input
                                                    type="text"
                                                    value={edu.degree}
                                                    onChange={(e) => setFormData(prev => ({
                                                        ...prev,
                                                        education: prev.education.map((item, i) =>
                                                            i === index ? { ...item, degree: e.target.value } : item
                                                        )
                                                    }))}
                                                    className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                    placeholder="Bachelor of Science"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-stone-700">Field of Study</label>
                                            <input
                                                type="text"
                                                value={edu.field}
                                                onChange={(e) => setFormData(prev => ({
                                                    ...prev,
                                                    education: prev.education.map((item, i) =>
                                                        i === index ? { ...item, field: e.target.value } : item
                                                    )
                                                }))}
                                                className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                placeholder="Computer Science"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-stone-700">Graduation Year</label>
                                            <input
                                                type="text"
                                                value={edu.year}
                                                onChange={(e) => setFormData(prev => ({
                                                    ...prev,
                                                    education: prev.education.map((item, i) =>
                                                        i === index ? { ...item, year: e.target.value } : item
                                                    )
                                                }))}
                                                className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                placeholder="2020"
                                            />
                                        </div>
                                    </div>
                                ))}
                                <button
                                    onClick={() => setFormData(prev => ({
                                        ...prev,
                                        education: [...prev.education, { institution: '', degree: '', field: '', year: '' }]
                                    }))}
                                    className="w-full py-3 border-2 border-dashed border-stone-300 rounded-xl text-stone-600 hover:border-blue-400 hover:text-blue-600 transition-colors flex items-center justify-center gap-2"
                                >
                                    <GraduationCap className="w-4 h-4" />
                                    Add Another Education
                                </button>
                            </div>
                        </div>
                    </div>
                );

            case 3:
                return (
                    <div className="space-y-6">
                        <div className="glass-card p-6 rounded-xl">
                            <h3 className="text-lg font-semibold text-stone-900 mb-4 flex items-center gap-2">
                                <Sparkles className="w-5 h-5 text-blue-500" />
                                Skills
                            </h3>
                            <div className="space-y-4">
                                {formData.skills.map((skill, index) => (
                                    <div key={index} className="flex gap-3">
                                        <input
                                            type="text"
                                            value={skill.name}
                                            onChange={(e) => setFormData(prev => ({
                                                ...prev,
                                                skills: prev.skills.map((item, i) =>
                                                    i === index ? { ...item, name: e.target.value } : item
                                                )
                                            }))}
                                            className="flex-1 px-4 py-3 border border-stone-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="React, Node.js, AWS..."
                                        />
                                        {formData.skills.length > 1 && (
                                            <button
                                                onClick={() => setFormData(prev => ({
                                                    ...prev,
                                                    skills: prev.skills.filter((_, i) => i !== index)
                                                }))}
                                                className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                                            >
                                                <X className="w-4 h-4 text-red-500" />
                                            </button>
                                        )}
                                    </div>
                                ))}
                                <button
                                    onClick={() => setFormData(prev => ({
                                        ...prev,
                                        skills: [...prev.skills, { name: '' }]
                                    }))}
                                    className="w-full py-3 border-2 border-dashed border-stone-300 rounded-xl text-stone-600 hover:border-blue-400 hover:text-blue-600 transition-colors flex items-center justify-center gap-2"
                                >
                                    <Sparkles className="w-4 h-4" />
                                    Add Another Skill
                                </button>
                            </div>
                        </div>
                    </div>
                );

            case 4:
                return (
                    <div className="space-y-6">
                        <div className="glass-card p-6 rounded-xl">
                            <h3 className="text-lg font-semibold text-stone-900 mb-4 flex items-center gap-2">
                                <FileText className="w-5 h-5 text-blue-500" />
                                Professional Summary
                            </h3>
                            <div className="space-y-4">
                                <label className="text-sm font-medium text-stone-700">Summary *</label>
                                <textarea
                                    value={formData.summary}
                                    onChange={(e) => setFormData(prev => ({
                                        ...prev,
                                        summary: e.target.value
                                    }))}
                                    className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-40 resize-none"
                                    placeholder="Write a compelling 2-3 sentence summary of your professional background and key achievements..."
                                />
                                <div className="text-sm text-stone-500">
                                    {formData.summary.length} / 500 characters
                                </div>
                            </div>
                        </div>

                        <div className="glass-card p-6 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50">
                            <div className="flex items-start gap-3">
                                <Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                                <div>
                                    <h4 className="font-semibold text-stone-900 mb-1">Summary Tips</h4>
                                    <ul className="text-sm text-stone-600 space-y-1">
                                        <li>• Keep it concise (2-3 sentences)</li>
                                        <li>• Highlight your most relevant experience</li>
                                        <li>• Include key achievements and metrics</li>
                                        <li>• Tailor it to your target role</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    const isStepComplete = (step) => {
        switch (step) {
            case 0:
                return formData.personalInfo.name && formData.personalInfo.email;
            case 1:
                return formData.experience.length > 0 && formData.experience.every(exp => exp.title && exp.company);
            case 2:
                return formData.education.length > 0 && formData.education.every(edu => edu.institution && edu.degree);
            case 3:
                return formData.skills.length > 0 && formData.skills.every(skill => skill.name);
            case 4:
                return formData.summary.length >= 50;
            default:
                return false;
        }
    };

    return (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="glass-modal rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col"
            >
                {/* Header */}
                <div className="p-6 border-b border-white/30 flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-stone-900">Guided Resume Builder</h2>
                        <p className="text-stone-600 mt-1">Step-by-step wizard to create your perfect resume</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-stone-100 rounded-lg transition-colors"
                    >
                        <X className="w-5 h-5 text-stone-500" />
                    </button>
                </div>

                {/* Progress Steps */}
                <div className="px-6 py-4 border-b border-white/30">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            {steps.map((step, index) => {
                                const StepIcon = step.icon;
                                const isCompleted = index < currentStep;
                                const isCurrent = index === currentStep;

                                return (
                                    <div key={step.id} className="flex items-center gap-2">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isCompleted ? 'bg-green-500' : isCurrent ? 'bg-blue-500' : 'bg-stone-200'
                                            }`}>
                                            {isCompleted ? (
                                                <Check className="w-4 h-4 text-white" />
                                            ) : isCurrent ? (
                                                <StepIcon className="w-4 h-4 text-white" />
                                            ) : (
                                                <span className="text-xs text-stone-500">{index + 1}</span>
                                            )}
                                        </div>
                                        <span className={`text-sm font-medium ${isCurrent ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-stone-400'
                                            }`}>
                                            {step.title}
                                        </span>
                                        {index < steps.length - 1 && (
                                            <ChevronRight className="w-4 h-4 text-stone-300" />
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                        <div className="text-sm text-stone-500">
                            Step {currentStep + 1} of {steps.length}
                        </div>
                    </div>
                </div>

                {/* Step Content */}
                <div className="flex-1 overflow-auto p-6">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentStep}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="max-w-3xl mx-auto"
                        >
                            <StepContent />
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Footer Actions */}
                <div className="p-6 border-t border-white/30 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        {currentStep > 0 && (
                            <button
                                onClick={handleBack}
                                className="flex items-center gap-2 px-4 py-2.5 border border-stone-200 text-stone-700 rounded-lg hover:bg-stone-50 transition-colors"
                            >
                                <ChevronLeft className="w-4 h-4" />
                                Back
                            </button>
                        )}
                        <button
                            onClick={handleSkip}
                            className="flex items-center gap-2 px-4 py-2.5 text-stone-600 hover:text-stone-800 transition-colors"
                        >
                            Skip for Now
                        </button>
                    </div>
                    <button
                        onClick={handleNext}
                        disabled={!isStepComplete(currentStep)}
                        className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all disabled:opacity-50 disabled:pointer-events-none"
                    >
                        {currentStep === steps.length - 1 ? (
                            <>
                                <Sparkles className="w-4 h-4" />
                                Complete Resume
                            </>
                        ) : (
                            <>
                                Next Step
                                <ArrowRight className="w-4 h-4" />
                            </>
                        )}
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default GuidedBuilderWizard;