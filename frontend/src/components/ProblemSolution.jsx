import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle, Sparkles, Target, Zap, TrendingUp, Shield, Award } from 'lucide-react';

const ProblemSolution = () => {
  const problems = [
    {
      icon: <AlertTriangle className="h-6 w-6" />,
      title: "Resumes Get Rejected by ATS",
      description: "90% of resumes never reach human eyes due to poor ATS optimization",
      color: "from-red-500 to-orange-500"
    },
    {
      icon: <AlertTriangle className="h-6 w-6" />,
      title: "Missing Keywords",
      description: "Generic resumes lack job-specific keywords that recruiters search for",
      color: "from-orange-500 to-amber-500"
    },
    {
      icon: <AlertTriangle className="h-6 w-6" />,
      title: "Poor Formatting",
      description: "Complex designs and tables confuse ATS systems and get auto-rejected",
      color: "from-amber-500 to-yellow-500"
    },
    {
      icon: <AlertTriangle className="h-6 w-6" />,
      title: "Weak Impact Statements",
      description: "Vague descriptions fail to showcase achievements and quantifiable results",
      color: "from-yellow-500 to-red-500"
    }
  ];

  const solutions = [
    {
      icon: <Target className="h-6 w-6" />,
      title: "AI-Powered ATS Optimization",
      description: "Our AI analyzes job descriptions and optimizes your resume for 95%+ ATS pass rate",
      stat: "95%",
      statLabel: "ATS Pass Rate",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: "Smart Keyword Matching",
      description: "Automatically identifies and integrates critical keywords from job postings",
      stat: "10x",
      statLabel: "More Keywords",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "ATS-Friendly Templates",
      description: "Pre-tested templates that work perfectly with all major ATS systems",
      stat: "100%",
      statLabel: "Compatible",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: "Impact-Driven Content",
      description: "AI rewrites bullet points using proven formulas that highlight achievements",
      stat: "3x",
      statLabel: "More Impact",
      color: "from-indigo-500 to-blue-500"
    }
  ];

  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50 to-white" />
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-400 rounded-full blur-3xl" />
      </div>

      <div className="section-container relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 border border-red-200 rounded-full text-sm font-semibold text-red-700 mb-6"
          >
            <AlertTriangle className="h-4 w-4" />
            The Problem
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-slate-900 mb-6"
          >
            Why Most Resumes <span className="text-red-600">Fail</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-600"
          >
            Traditional resumes face critical challenges in today's automated hiring process
          </motion.p>
        </div>

        {/* Problems Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 border-2 border-red-100 hover:border-red-300 transition-all duration-300 hover:shadow-lg"
            >
              <div className={`w-12 h-12 bg-gradient-to-br ${problem.color} rounded-xl flex items-center justify-center text-white mb-4`}>
                {problem.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">{problem.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{problem.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="flex items-center justify-center mb-24"
        >
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-xl">
              <Zap className="h-10 w-10 text-white" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full blur-xl opacity-50 animate-pulse" />
          </div>
        </motion.div>

        {/* Solution Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-full text-sm font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6"
          >
            <Sparkles className="h-4 w-4 text-blue-600" />
            The Solution
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-slate-900 mb-6"
          >
            How AI <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Solves It</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-600"
          >
            Our AI-powered platform eliminates every obstacle between you and your dream job
          </motion.p>
        </div>

        {/* Solutions Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {solutions.map((solution, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-white rounded-2xl p-6 border-2 border-slate-100 hover:border-blue-300 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
            >
              {/* Gradient overlay on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${solution.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`} />

              <div className="relative">
                <div className={`w-12 h-12 bg-gradient-to-br ${solution.color} rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {solution.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{solution.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">{solution.description}</p>

                {/* Stat Badge */}
                <div className={`inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r ${solution.color} rounded-full`}>
                  <span className="text-lg font-bold text-white">{solution.stat}</span>
                  <span className="text-xs font-medium text-white/90">{solution.statLabel}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-full">
            <TrendingUp className="h-5 w-5 text-green-600" />
            <span className="text-sm font-semibold text-slate-700">
              <span className="text-green-600">92% of users</span> get more interview calls within 2 weeks
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemSolution;
