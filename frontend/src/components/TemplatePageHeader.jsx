import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Star, TrendingUp, Users, Search } from 'lucide-react';

const TemplatePageHeader = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 text-white">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full">
              <Sparkles className="h-4 w-4 text-yellow-300" />
              <span className="text-sm font-semibold">8 Professional Templates</span>
              <div className="flex items-center gap-1 ml-2 px-2 py-0.5 bg-yellow-400/20 rounded-full">
                <Star className="h-3 w-3 text-yellow-300 fill-yellow-300" />
                <span className="text-xs font-bold">Premium Quality</span>
              </div>
            </div>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight"
          >
            <span className="bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-300 bg-clip-text text-transparent">
              Choose Your Perfect
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
              Resume Template
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto mb-8 leading-relaxed"
          >
            Professional, ATS-optimized templates designed by experts.
            <span className="font-semibold text-white"> Trusted by 50,000+ job seekers</span> worldwide.
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap justify-center items-center gap-6 md:gap-8 mb-10"
          >
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-300" />
              <span className="text-sm">
                <span className="font-bold text-white">50,000+</span>
                <span className="text-blue-200"> users</span>
              </span>
            </div>
            <div className="h-4 w-px bg-white/30" />
            <div className="flex items-center gap-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-300 fill-yellow-300" />
                ))}
              </div>
              <span className="text-sm font-bold text-white">4.9/5</span>
            </div>
            <div className="h-4 w-px bg-white/30" />
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-300" />
              <span className="text-sm">
                <span className="font-bold text-white">92% ATS</span>
                <span className="text-blue-200"> pass rate</span>
              </span>
            </div>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="max-w-xl mx-auto"
          >
            <div className="relative">
              <input
                type="text"
                placeholder="Search templates by name or style..."
                className="w-full pl-12 pr-4 py-4 bg-white/95 backdrop-blur-sm border-2 border-white/30 rounded-2xl focus:ring-2 focus:ring-blue-400 focus:border-transparent text-slate-900 placeholder:text-slate-500 shadow-xl"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                <Search className="w-5 h-5 text-slate-400" />
              </div>
            </div>
          </motion.div>

          {/* Quick Tips */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-8 flex flex-wrap justify-center gap-4 text-sm text-blue-200"
          >
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-blue-300 rounded-full"></span>
              ATS-Friendly
            </span>
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-purple-300 rounded-full"></span>
              AI-Powered Content
            </span>
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-pink-300 rounded-full"></span>
              Instant Download
            </span>
          </motion.div>
        </div>
      </div>

      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          <path d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z" fill="url(#paint0_linear)" fillOpacity="0.2"/>
          <defs>
            <linearGradient id="paint0_linear" x1="720" y1="0" x2="720" y2="120" gradientUnits="userSpaceOnUse">
              <stop stopColor="white" stopOpacity="0.3"/>
              <stop offset="1" stopColor="white" stopOpacity="0"/>
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
};

export default TemplatePageHeader;
