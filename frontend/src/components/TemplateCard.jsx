import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Sparkles, CheckCircle2 } from 'lucide-react';

const TemplateCard = ({ template, isSelected, onSelectChange }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.5 }}
      onClick={() => navigate(`/builder/${template.id}`)}
      className="group relative flex flex-col bg-slate-900/50 rounded-[2.5rem] border border-white/10 overflow-hidden cursor-pointer backdrop-blur-xl transition-all duration-500 hover:border-blue-500/50 hover:shadow-[0_20px_50px_rgba(37,99,235,0.15)]"
    >
      {/* Premium Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Template Preview Section */}
      <div className="aspect-[3/4] relative overflow-hidden bg-slate-950">
        {/* Animated Background Mesh for Preview */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(37,99,235,0.1),transparent_70%)]" />
        </div>

        {/* Simplified preview or placeholder */}
        <div className="absolute inset-0 flex items-center justify-center p-8">
           <div className="w-full h-full bg-[#0f172a] rounded-xl border border-white/5 shadow-2xl overflow-hidden p-6 space-y-6 transform group-hover:scale-[1.02] transition-transform duration-500">
              <div className="flex justify-between items-start">
                <div className="space-y-3">
                  <div className="h-5 w-32 bg-white/10 rounded-full" />
                  <div className="h-2 w-20 bg-blue-400/20 rounded-full" />
                </div>
                <div className="h-10 w-10 bg-white/5 rounded-2xl flex items-center justify-center">
                  <Star className="w-5 h-5 text-blue-500/50" />
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="h-2 w-full bg-white/5 rounded-full" />
                <div className="h-2 w-11/12 bg-white/5 rounded-full" />
                <div className="h-2 w-4/5 bg-white/5 rounded-full" />
              </div>

              <div className="pt-4 space-y-3">
                <div className="h-2 w-1/2 bg-white/10 rounded-full" />
                <div className="grid grid-cols-3 gap-2">
                  <div className="h-8 bg-white/5 rounded-xl" />
                  <div className="h-8 bg-white/5 rounded-xl" />
                  <div className="h-8 bg-white/5 rounded-xl" />
                </div>
              </div>

              {/* Fake Content Lines */}
              <div className="space-y-2 pt-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500/30 mt-1" />
                    <div className="h-1.5 flex-1 bg-white/5 rounded-full" />
                  </div>
                ))}
              </div>
           </div>
        </div>

        {/* Floating Badge */}
        {template.premium && (
          <div className="absolute top-6 right-6 z-10">
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg">
              <Sparkles className="w-3 h-3" />
              Premium
            </div>
          </div>
        )}

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-[#020617]/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center gap-4">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold text-sm flex items-center gap-3 shadow-[0_20px_40px_rgba(37,99,235,0.3)] transform translate-y-8 group-hover:translate-y-0 transition-all duration-500"
          >
            Start Building
            <ArrowRight className="h-5 w-5" />
          </motion.div>
          <div className="text-white/60 text-xs font-bold uppercase tracking-widest translate-y-8 group-hover:translate-y-0 transition-all duration-500 delay-75">
            Free Preview Included
          </div>
        </div>
      </div>

      <div className="p-8 relative">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-white text-2xl tracking-tight group-hover:text-blue-400 transition-colors duration-300">
            {template.name}
          </h3>
          <div className="flex items-center gap-1 text-blue-400">
            <CheckCircle2 className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase tracking-widest">ATS Ready</span>
          </div>
        </div>
        <p className="text-sm text-slate-400 line-clamp-2 leading-relaxed font-medium mb-6">
          {template.description}
        </p>
        
        {/* Template Tags/Features */}
        <div className="flex flex-wrap gap-2">
          {['Modern', 'Professional', 'Minimalist'].slice(0, 2).map((tag) => (
            <span key={tag} className="text-[10px] font-bold px-3 py-1.5 bg-white/5 text-slate-400 rounded-lg border border-white/5">
              {tag}
            </span>
          ))}
          <span className="text-[10px] font-bold px-3 py-1.5 bg-blue-500/10 text-blue-400 rounded-lg border border-blue-500/10">
            +3 more
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default TemplateCard;