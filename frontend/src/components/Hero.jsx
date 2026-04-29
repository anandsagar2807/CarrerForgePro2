import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, CheckCircle, TrendingUp, Star, Users, Zap, Target, Shield } from 'lucide-react';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-12 md:pb-24">
      {/* Animated gradient background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-gradient-to-tr from-amber-400/20 to-orange-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="section-container relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Top Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200/50 rounded-full backdrop-blur-sm">
              <Sparkles className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                #1 AI-Powered Resume Builder
              </span>
              <div className="flex items-center gap-1 ml-2 px-2 py-0.5 bg-amber-100 rounded-full">
                <Star className="h-3 w-3 text-amber-600 fill-amber-600" />
                <span className="text-xs font-bold text-amber-700">4.9/5</span>
              </div>
            </div>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-center mb-6 leading-tight"
          >
            <span className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent">
              Land Your Dream Job with
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              AI-Powered Resumes
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-slate-600 text-center max-w-3xl mx-auto mb-8 leading-relaxed"
          >
            Create ATS-optimized resumes in minutes with our AI assistant.
            <span className="font-semibold text-slate-900"> Join 50,000+ professionals</span> who landed interviews at top companies.
          </motion.p>

          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap justify-center items-center gap-6 md:gap-8 mb-10"
          >
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 border-2 border-white" />
                ))}
              </div>
              <div className="text-sm">
                <span className="font-bold text-slate-900">50,000+</span>
                <span className="text-slate-600"> users</span>
              </div>
            </div>
            <div className="h-4 w-px bg-slate-300" />
            <div className="flex items-center gap-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="h-4 w-4 text-amber-400 fill-amber-400" />
                ))}
              </div>
              <span className="text-sm font-bold text-slate-900">4.9/5</span>
              <span className="text-sm text-slate-600">(2,847 reviews)</span>
            </div>
            <div className="h-4 w-px bg-slate-300" />
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <span className="text-sm">
                <span className="font-bold text-slate-900">92% ATS</span>
                <span className="text-slate-600"> pass rate</span>
              </span>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <button
              onClick={() => navigate('/templates')}
              className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl shadow-lg shadow-blue-500/50 hover:shadow-xl hover:shadow-blue-500/60 transition-all duration-300 hover:scale-105 flex items-center gap-2"
            >
              <Sparkles className="h-5 w-5" />
              Build My Resume Now
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => navigate('/analyze')}
              className="px-8 py-4 bg-white text-slate-900 font-bold rounded-xl border-2 border-slate-200 hover:border-blue-600 hover:bg-blue-50 transition-all duration-300 flex items-center gap-2 shadow-sm"
            >
              <Target className="h-5 w-5 text-blue-600" />
              Check ATS Score
            </button>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-wrap justify-center items-center gap-6 text-sm text-slate-600"
          >
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="font-medium">No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-blue-600" />
              <span className="font-medium">100% Privacy Protected</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-amber-600" />
              <span className="font-medium">Ready in 5 minutes</span>
            </div>
          </motion.div>

          {/* Hero Visual */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-16 relative"
          >
            {/* Main Dashboard Preview */}
            <div className="relative mx-auto max-w-5xl">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-3xl blur-3xl" />
              <div className="relative bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-200/50 overflow-hidden">
                {/* Browser Header */}
                <div className="bg-gradient-to-r from-slate-100 to-slate-50 px-4 py-3 border-b border-slate-200 flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                  <div className="flex-1 flex justify-center">
                    <div className="px-4 py-1 bg-white rounded-lg text-xs text-slate-500 font-medium border border-slate-200">
                      resumeforge.pro/builder
                    </div>
                  </div>
                </div>

                {/* Dashboard Content */}
                <div className="p-6 md:p-8 bg-gradient-to-br from-slate-50 to-white">
                  <div className="grid md:grid-cols-3 gap-6">
                    {/* Resume Preview */}
                    <div className="md:col-span-2">
                      <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
                        <div className="flex justify-between items-start mb-6">
                          <div>
                            <h3 className="text-xl font-bold text-slate-900 mb-1">Alex Johnson</h3>
                            <p className="text-sm text-blue-600 font-semibold">Senior Software Engineer</p>
                          </div>
                          <div className="text-xs text-slate-500 text-right">
                            alex.johnson@email.com<br />
                            San Francisco, CA
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Experience</h4>
                            <div className="space-y-2">
                              <div className="h-2 bg-slate-100 rounded-full w-full" />
                              <div className="h-2 bg-slate-100 rounded-full w-11/12" />
                              <div className="h-2 bg-slate-100 rounded-full w-4/5" />
                            </div>
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Skills</h4>
                            <div className="flex flex-wrap gap-2">
                              <div className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">React</div>
                              <div className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">Node.js</div>
                              <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">AWS</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* ATS Score Card */}
                    <div className="space-y-4">
                      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-5 border border-green-200">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xs font-bold text-slate-700 uppercase">ATS Score</span>
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        </div>
                        <div className="text-4xl font-bold text-green-600 mb-2">94%</div>
                        <div className="h-2 bg-green-200 rounded-full overflow-hidden mb-2">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "94%" }}
                            transition={{ duration: 1.5, delay: 1 }}
                            className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                          />
                        </div>
                        <p className="text-xs text-slate-600 font-medium">Excellent! Ready for top companies</p>
                      </div>

                      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
                        <div className="flex items-center gap-2 mb-2">
                          <Sparkles className="h-4 w-4 text-blue-600" />
                          <span className="text-xs font-bold text-slate-700">AI Suggestions</span>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-start gap-2">
                            <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-xs text-slate-600">Keywords optimized</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-xs text-slate-600">Format ATS-friendly</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 1.2 }}
                className="absolute -left-4 top-1/4 bg-white rounded-xl shadow-xl border border-slate-200 p-4 hidden lg:block"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 font-medium">Interview Rate</div>
                    <div className="text-lg font-bold text-slate-900">+48%</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 1.4 }}
                className="absolute -right-4 bottom-1/4 bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-xl shadow-xl p-4 hidden lg:block"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="h-4 w-4" />
                  <span className="text-xs font-bold">AI Powered</span>
                </div>
                <p className="text-xs opacity-90">Smart keyword matching</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
