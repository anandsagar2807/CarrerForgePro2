import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/react';
import { ArrowRight, TrendingUp, Star } from 'lucide-react';

const Hero = () => {
  const navigate = useNavigate();
  const { isSignedIn } = useUser();

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      <div className="section-container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center py-12 lg:py-20">

          {/* Left Column - Content */}
          <div className="flex flex-col justify-center text-left">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full mb-8 w-fit backdrop-blur-sm"
            >
              <span className="text-sm font-semibold text-blue-400">
                #1 AI-Powered Resume Builder
              </span>
              <div className="flex items-center gap-1 ml-2 px-2 py-0.5 bg-blue-500/20 rounded-full border border-blue-400/30">
                <Star className="h-3 w-3 text-blue-400 fill-blue-400" />
                <span className="text-xs font-bold text-blue-100">4.9/5</span>
              </div>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-[1.1] tracking-tight"
            >
              Master the ATS with{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-400 animate-gradient-x">
                Precision AI.
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl md:text-2xl text-slate-400 mb-10 leading-relaxed max-w-2xl"
            >
              Build high-impact, ATS-optimized resumes in seconds. Powered by <span className="text-white font-medium">Gemini 2.0</span> to decode job descriptions and match your skills perfectly.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-5 mb-12"
            >
              <button
                onClick={() => navigate(isSignedIn ? '/templates' : '/sign-up')}
                className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-blue-600 text-white font-bold rounded-xl overflow-hidden transition-all duration-300 hover:bg-blue-500 hover:scale-[1.02] active:scale-95 shadow-[0_0_20px_rgba(37,99,235,0.4)]"
              >
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-400/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                Start Building Now
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => navigate('/analyze')}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white/5 text-white font-semibold rounded-xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-md"
              >
                <TrendingUp className="h-5 w-5 text-blue-400" />
                Check ATS Score
              </button>
            </motion.div>

            {/* Trust Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="flex flex-wrap items-center gap-8 text-slate-500 border-t border-white/5 pt-8"
            >
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-white">50k+</span>
                <span className="text-sm">Active Users</span>
              </div>
              <div className="w-px h-8 bg-white/10" />
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-white">92%</span>
                <span className="text-sm">Success Rate</span>
              </div>
              <div className="w-px h-8 bg-white/10" />
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-white">24/7</span>
                <span className="text-sm">AI Support</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Product Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            {/* Glow effect behind the mockup */}
            <div className="absolute -inset-4 bg-blue-500/20 rounded-[2.5rem] blur-3xl" />
            
            <div className="relative bg-[#0f172a] rounded-3xl shadow-2xl border border-white/10 overflow-hidden backdrop-blur-xl">
              {/* Browser Header */}
              <div className="bg-white/5 px-6 py-4 border-b border-white/10 flex items-center justify-between">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/50" />
                </div>
                <div className="flex items-center gap-2 px-4 py-1.5 bg-white/5 rounded-full border border-white/10 text-[10px] text-blue-400 font-medium uppercase tracking-widest">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                  AI Optimization Active
                </div>
              </div>

              {/* Resume Content Mockup */}
              <div className="p-8 space-y-8">
                <div className="flex justify-between items-start">
                  <div className="space-y-3">
                    <div className="h-8 w-48 bg-white/10 rounded-lg animate-pulse" />
                    <div className="h-4 w-32 bg-blue-400/20 rounded-md" />
                  </div>
                  <div className="h-12 w-12 bg-white/5 rounded-full border border-white/10" />
                </div>

                <div className="space-y-4">
                  <div className="h-4 w-24 bg-white/20 rounded-md" />
                  <div className="space-y-3">
                    <div className="h-3 w-full bg-white/5 rounded-full" />
                    <div className="h-3 w-full bg-white/5 rounded-full" />
                    <div className="h-3 w-3/4 bg-white/5 rounded-full" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                    <div className="text-[10px] text-slate-500 uppercase mb-2">ATS Score</div>
                    <div className="text-3xl font-bold text-blue-400">98%</div>
                  </div>
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                    <div className="text-[10px] text-slate-500 uppercase mb-2">Keywords</div>
                    <div className="text-3xl font-bold text-indigo-400">24+</div>
                  </div>
                </div>

                {/* AI Floating Suggestion */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute bottom-12 -left-12 p-4 bg-blue-600 rounded-2xl shadow-2xl border border-blue-400/30 flex items-center gap-3 backdrop-blur-lg"
                >
                  <div className="h-10 w-10 bg-white/20 rounded-xl flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Bullet Optimized!</div>
                    <div className="text-[10px] text-blue-100 opacity-80">XYZ formula applied</div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;