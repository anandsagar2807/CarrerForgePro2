import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Brain,
  Target,
  Zap,
  Sparkles,
  TrendingUp,
  ArrowRight,
  CheckCircle,
  Star,
  Shield,
  Clock
} from 'lucide-react';
import Navbar from '../components/Navbar';

const AIToolCard = ({ tool, index }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="group relative h-full"
    >
      {/* Premium badge for featured tools */}
      {tool.featured && (
        <div className="absolute -top-3 -right-3 z-10">
          <div className="px-4 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-[0_10px_20px_rgba(37,99,235,0.3)] flex items-center gap-1.5">
            <Sparkles className="w-3 h-3" />
            Premium
          </div>
        </div>
      )}

      <div className="relative h-full bg-slate-900/50 backdrop-blur-xl rounded-[2.5rem] p-10 border border-white/10 hover:border-blue-500/50 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(37,99,235,0.15)] flex flex-col">
        {/* Icon */}
        <div className={`w-20 h-20 bg-gradient-to-br ${tool.gradient} rounded-3xl flex items-center justify-center mb-8 shadow-2xl group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500`}>
          <tool.icon className="w-10 h-10 text-white" />
        </div>

        {/* Content */}
        <h3 className="text-3xl font-black text-white mb-4 tracking-tight group-hover:text-blue-400 transition-colors duration-300">{tool.title}</h3>
        <p className="text-slate-400 font-medium leading-relaxed mb-8 flex-grow">{tool.description}</p>

        {/* Features */}
        <ul className="space-y-4 mb-10">
          {tool.features.map((feature, i) => (
            <li key={i} className="flex items-start gap-3 text-sm font-bold text-slate-300 group-hover:text-white transition-colors">
              <div className="w-5 h-5 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mt-0.5">
                <CheckCircle className="w-3 h-3 text-blue-400" />
              </div>
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate(tool.path)}
          className="w-full py-5 px-8 bg-white/5 hover:bg-blue-600 text-white font-black text-sm rounded-2xl border border-white/10 hover:border-blue-500 transition-all duration-500 flex items-center justify-center gap-3 shadow-xl hover:shadow-blue-500/30 group/btn"
        >
          {tool.cta}
          <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-300" />
        </motion.button>

        {/* Stats */}
        {tool.stats && (
          <div className="mt-8 pt-8 border-t border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                <Clock className="w-4 h-4 text-slate-500" />
              </div>
              <span className="text-xs font-black uppercase tracking-widest text-slate-500">{tool.stats.time}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-widest text-blue-400">{tool.stats.improvement}</span>
              <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-blue-400" />
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

const AIDashboard = () => {
  const navigate = useNavigate();

  const aiTools = [
    {
      icon: Brain,
      title: 'Brutal Honest Review',
      description: 'Get a no-nonsense review from a senior hiring manager. Discover exactly why your resume might get rejected.',
      gradient: 'from-red-600 to-red-800',
      features: [
        'Simulates FAANG hiring manager',
        'Identifies rejection reasons',
        'Spots red flags instantly',
      ],
      path: '/ai-tools/brutal-review',
      cta: 'Get Brutal Review',
      featured: true,
      stats: { time: '30s analysis', improvement: '4x visibility' }
    },
    {
      icon: Target,
      title: 'ATS Optimizer',
      description: 'Analyze your resume against a specific job description and get targeted keyword suggestions.',
      gradient: 'from-blue-600 to-indigo-700',
      features: [
        'Job-specific optimization',
        'Keyword gap analysis',
        'ATS compatibility score',
      ],
      path: '/ai-tools/ats-optimizer',
      cta: 'Optimize for ATS',
      featured: true,
      stats: { time: '1min setup', improvement: '90%+ ATS score' }
    },
    {
      icon: Zap,
      title: 'Bullet Point Transformer',
      description: 'Turn boring bullet points into high-impact, achievement-oriented statements using the XYZ formula.',
      gradient: 'from-amber-500 to-orange-600',
      features: [
        'XYZ achievement formula',
        'Strong action verbs',
        'Quantified results focus',
      ],
      path: '/ai-tools/bullet-transformer',
      cta: 'Transform Bullets',
      stats: { time: 'Instant rewrite', improvement: 'Better impact' }
    },
    {
      icon: Sparkles,
      title: 'Industry Tone Match',
      description: 'Adapt your resume tone to specific industries like Tech, Finance, or Creative.',
      gradient: 'from-purple-600 to-violet-800',
      features: [
        'Industry-specific vocabulary',
        'Cultural fit optimization',
        'Professional tone adjustment',
      ],
      path: '/ai-tools/industry-tone',
      cta: 'Match Tone',
      stats: { time: 'Custom profiles', improvement: 'Better cultural fit' }
    },
    {
      icon: CheckCircle,
      title: 'Final Polish Review',
      description: 'The ultimate pre-submission checklist and AI verification of your entire resume.',
      gradient: 'from-emerald-600 to-teal-800',
      features: [
        'Grammar & spell check',
        'Consistency verification',
        'Final quality score',
      ],
      path: '/ai-tools/final-polish',
      cta: 'Start Final Polish',
      stats: { time: 'Complete audit', improvement: 'Zero errors' }
    },
    {
      icon: TrendingUp,
      title: 'Interview Question Generator',
      description: 'Get tailored interview questions based on your resume and target job role.',
      gradient: 'from-blue-500 to-cyan-600',
      features: [
        'Personalized questions',
        'Behavioral & Technical',
        'Answer frameworks',
      ],
      path: '/interview-prep',
      cta: 'Generate Questions',
      stats: { time: 'Mock interview', improvement: 'High confidence' }
    }
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-blue-500/30 overflow-x-hidden">
      {/* Premium Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-600/10 rounded-full blur-[120px]" />
      </div>

      <Navbar isDark={true} />

      <main className="pt-32 pb-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-5 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full mb-8"
            >
              <Brain className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-bold text-blue-100 uppercase tracking-widest">AI Command Center</span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter"
            >
              Elite AI <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Career Tools</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-slate-400 font-medium"
            >
              Harness the power of Gemini 2.0 to transform your professional profile and dominate the job market.
            </motion.p>
          </div>

          {/* Tools Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {aiTools.map((tool, index) => (
              <AIToolCard key={tool.title} tool={tool} index={index} />
            ))}
          </div>

          {/* Bottom Trust Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-32 p-12 lg:p-20 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[3rem] relative overflow-hidden text-center"
          >
            <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-blue-600 to-indigo-600" />
            <div className="relative z-10">
              <Shield className="w-16 h-16 text-blue-400 mx-auto mb-8" />
              <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight">Enterprise-Grade Privacy</h2>
              <p className="text-xl text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed">
                Your data is never used to train models. We employ industry-standard encryption to keep your professional journey private and secure.
              </p>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default AIDashboard;
