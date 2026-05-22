import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles, Target, Zap,
  LayoutGrid, MessageSquare, TrendingUp,
  ArrowRight
} from 'lucide-react';

const FeatureGrid = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Sparkles className="h-7 w-7" />,
      title: "Gemini 2.0 Engine",
      description: "Harness the power of Google's latest model to generate high-impact, professional resume content automatically.",
      gradient: "from-blue-500 to-indigo-600",
      badge: "State of the Art"
    },
    {
      icon: <Target className="h-7 w-7" />,
      title: "ATS Precision Match",
      description: "Our proprietary algorithm analyzes your resume against target JDs with 99.9% accuracy in keyword extraction.",
      gradient: "from-indigo-500 to-violet-600",
      badge: "Industry Standard"
    },
    {
      icon: <Zap className="h-7 w-7" />,
      title: "XYZ Rewrite Logic",
      description: "Automatically transform generic bullet points into achievement-oriented statements using the proven XYZ formula.",
      gradient: "from-violet-500 to-purple-600",
      badge: "Proven Success"
    },
    {
      icon: <LayoutGrid className="h-7 w-7" />,
      title: "Designer Templates",
      description: "Choose from a curated collection of modern, recruiter-approved templates designed for every career stage.",
      gradient: "from-blue-400 to-indigo-500",
      badge: "8+ Layouts"
    },
    {
      icon: <MessageSquare className="h-7 w-7" />,
      title: "24/7 AI Career Coach",
      description: "Get instant advice on interview prep, salary negotiation, and career strategy from your personal AI assistant.",
      gradient: "from-indigo-400 to-violet-500",
      badge: "Live Support"
    },
    {
      icon: <TrendingUp className="h-7 w-7" />,
      title: "Real-time Scoring",
      description: "Watch your ATS score improve in real-time as you edit. Get proactive suggestions for critical missing skills.",
      gradient: "from-violet-400 to-purple-500",
      badge: "Smart Sync"
    }
  ];

  return (
    <section id="powerful-features" className="py-24 lg:py-40 relative">
      <div className="section-container relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 lg:mb-32">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-xs font-bold uppercase tracking-widest text-blue-400 mb-8"
          >
            <Zap className="h-3.5 w-3.5" />
            Cutting-Edge Capabilities
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl lg:text-7xl font-black text-white mb-8 tracking-tight"
          >
            Engineered for <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-400">
              Maximum Impact.
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl text-slate-400 leading-relaxed font-medium"
          >
            Stop guessing what recruiters want. Our AI-driven platform provides the tools you need to stand out in the most competitive job markets.
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-white/5 rounded-[2.5rem] p-10 border border-white/10 hover:border-white/20 transition-all duration-500 backdrop-blur-xl"
            >
              {/* Icon */}
              <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center text-white mb-10 shadow-2xl group-hover:scale-110 transition-transform duration-500`}>
                {feature.icon}
              </div>

              {/* Badge */}
              <div className="mb-4">
                <span className="text-[10px] font-black uppercase tracking-widest text-blue-400 bg-blue-400/10 px-3 py-1 rounded-md">
                  {feature.badge}
                </span>
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold text-white mb-4 tracking-tight group-hover:text-blue-400 transition-colors">{feature.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed font-medium">{feature.description}</p>
              
              {/* Bottom Decoration */}
              <div className="absolute bottom-10 right-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <ArrowRight className="h-6 w-6 text-blue-500" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureGrid;