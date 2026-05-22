import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Star, TrendingUp, Users, Search } from 'lucide-react';

const TemplatePageHeader = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="relative overflow-hidden pt-12 pb-20">
      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-8"
          >
            <div className="inline-flex items-center gap-2 px-5 py-2 bg-blue-500/10 backdrop-blur-md border border-blue-500/20 rounded-full">
              <Sparkles className="h-4 w-4 text-blue-400" />
              <span className="text-sm font-bold text-blue-100 uppercase tracking-widest">Premium Collection</span>
            </div>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-black mb-8 leading-[1.1] tracking-tight text-white"
          >
            Elevate Your Career with <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-400">
              Designer Templates
            </span>
          </motion.h1>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-2xl mx-auto relative group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000" />
            <div className="relative">
              <input
                type="text"
                placeholder="Search templates (e.g. Modern, Creative, ATS)..."
                className="w-full pl-14 pr-6 py-5 bg-[#0f172a] border border-white/10 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder:text-slate-500 shadow-2xl transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="absolute left-5 top-1/2 transform -translate-y-1/2">
                <Search className="w-6 h-6 text-slate-500 group-hover:text-blue-400 transition-colors" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default TemplatePageHeader;
