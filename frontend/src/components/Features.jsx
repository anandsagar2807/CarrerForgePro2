import React from 'react';
import { motion } from 'framer-motion';
import { Search, FileCheck, Target, Download, Shield, Zap, Sparkles, Wand2, Clock, Lock, Palette, Globe } from 'lucide-react';

const features = [
  {
    icon: Wand2,
    title: 'AI-Powered Writing',
    description: 'Generate compelling bullet points and descriptions tailored to your target role using advanced AI.',
    gradient: 'from-blue-700 to-blue-900',
    bgGradient: 'from-blue-50 to-blue-100',
  },
  {
    icon: Search,
    title: 'ATS Optimization',
    description: 'Pass applicant tracking systems with AI-powered keyword optimization and formatting.',
    gradient: 'from-blue-700 to-blue-900',
    bgGradient: 'from-blue-50 to-blue-100',
  },
  {
    icon: Palette,
    title: 'Premium Templates',
    description: 'Choose from 15+ professionally designed, recruiter-approved templates for any industry.',
    gradient: 'from-blue-700 to-blue-900',
    bgGradient: 'from-blue-50 to-blue-100',
  },
  {
    icon: Target,
    title: 'Smart Job Matching',
    description: 'Upload job descriptions and get instant suggestions to tailor your resume perfectly.',
    gradient: 'from-blue-700 to-blue-900',
    bgGradient: 'from-blue-50 to-blue-100',
  },
  {
    icon: Download,
    title: 'Multi-Format Export',
    description: 'Download as PDF, Word, or share via a unique public link. ATS-friendly formats guaranteed.',
    gradient: 'from-blue-700 to-blue-900',
    bgGradient: 'from-blue-50 to-blue-100',
  },
];

const FeatureCard = ({ feature, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="group relative"
  >
    <div className="relative h-full bg-white/5 backdrop-blur-xl rounded-[2rem] p-8 border border-white/10 shadow-sm hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 hover:-translate-y-2 hover:border-blue-500/30">
      {/* Icon container */}
      <div className={`w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-blue-500/20 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500`}>
        <feature.icon className="w-8 h-8 text-white" />
      </div>

      {/* Content */}
      <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">
        {feature.title}
      </h3>
      <p className="text-slate-400 leading-relaxed font-medium">
        {feature.description}
      </p>
    </div>
  </motion.div>
);

const Features = () => {
  return (
    <section id="features" className="py-24 lg:py-32 relative bg-[#020617]">
      <div className="section-container relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            id="powerful-features"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-5 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full mb-8"
          >
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-bold text-blue-100 uppercase tracking-widest">
              Powerful Features
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter"
          >
            Everything you need to
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
              land your dream job
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-400 font-medium"
          >
            Our AI-driven platform provides all the tools necessary to create a 
            high-impact resume that resonates with recruiters.
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
