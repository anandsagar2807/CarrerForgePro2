import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { LayoutTemplate, Edit3, Download, ArrowRight, Sparkles } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: <LayoutTemplate className="h-6 w-6" />,
    title: 'Choose a Template',
    description: 'Browse our collection of professional, ATS-friendly templates designed for your industry.',
    gradient: 'from-blue-700 to-blue-900'
  },
  {
    number: '02',
    icon: <Edit3 className="h-6 w-6" />,
    title: 'Add Your Content',
    description: 'Fill in your details with AI-powered suggestions to highlight your achievements.',
    gradient: 'from-blue-700 to-blue-900'
  },
  {
    number: '03',
    icon: <Download className="h-6 w-6" />,
    title: 'Download & Apply',
    description: 'Export your polished resume and start landing interviews at your dream company.',
    gradient: 'from-blue-700 to-blue-900'
  },
];

const HowItWorks = () => {
  const navigate = useNavigate();

  return (
    <section id="how-it-works" className="py-24 lg:py-40 relative">
      <div className="section-container relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-24 lg:mb-32">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-xs font-bold uppercase tracking-widest text-blue-400 mb-8"
          >
            <Sparkles className="h-3.5 w-3.5" />
            The Zaalima Method
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl lg:text-7xl font-black text-white mb-8 tracking-tight"
          >
            Zero to Hired in <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400">
              3 Simple Phases.
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl text-slate-400 font-medium"
          >
            Our streamlined workflow removes the friction from career advancement.
          </motion.p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 relative mb-24 lg:mb-32">
          {/* Connection lines */}
          <div className="hidden md:block absolute top-20 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative text-center group"
            >
              <div className={`inline-flex items-center justify-center w-24 h-24 bg-white/5 border border-white/10 text-blue-400 rounded-3xl shadow-2xl mb-10 relative z-10 group-hover:scale-110 group-hover:border-blue-500/50 transition-all duration-500 backdrop-blur-xl`}>
                {step.icon}
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-[#020617] border border-white/10 rounded-full flex items-center justify-center text-xs font-black text-white shadow-2xl group-hover:border-blue-500 transition-colors">
                  {step.number}
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 tracking-tight group-hover:text-blue-400 transition-colors">{step.title}</h3>
              <p className="text-slate-400 leading-relaxed max-w-xs mx-auto text-sm font-medium">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <button
            onClick={() => navigate('/templates')}
            className="inline-flex items-center gap-3 px-10 py-5 bg-blue-600 text-white font-black rounded-2xl shadow-[0_0_30px_rgba(37,99,235,0.4)] hover:bg-blue-500 hover:scale-105 transition-all duration-500"
          >
            Get Started Now
            <ArrowRight className="h-5 w-5" />
          </button>
          <p className="text-xs font-black text-slate-500 uppercase tracking-widest mt-6">No credit card required • Free forever</p>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
