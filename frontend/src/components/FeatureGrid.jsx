import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles, Target, FileCheck, Zap,
  LayoutGrid, MessageSquare, FileText, TrendingUp,
  CheckCircle, ArrowRight, Star
} from 'lucide-react';

const FeatureGrid = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Sparkles className="h-8 w-8" />,
      title: "AI Resume Builder",
      description: "Create professional resumes in minutes with AI-powered content generation and smart suggestions",
      benefits: ["Auto-complete sections", "Smart formatting", "Industry templates"],
      gradient: "from-blue-600 to-cyan-600",
      bgGradient: "from-blue-50 to-cyan-50",
      action: () => navigate('/templates'),
      actionText: "Start Building",
      badge: "Most Popular",
      badgeColor: "bg-blue-600"
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: "ATS Score Checker",
      description: "Analyze your resume against job descriptions and get instant ATS compatibility scores",
      benefits: ["Real-time scoring", "Keyword analysis", "Improvement tips"],
      gradient: "from-purple-600 to-pink-600",
      bgGradient: "from-purple-50 to-pink-50",
      action: () => navigate('/analyze'),
      actionText: "Check Score",
      badge: "Free",
      badgeColor: "bg-green-600"
    },
    {
      icon: <FileCheck className="h-8 w-8" />,
      title: "JD Matching",
      description: "Match your resume to specific job descriptions with AI-powered keyword optimization",
      benefits: ["Smart matching", "Gap analysis", "Tailored content"],
      gradient: "from-green-600 to-emerald-600",
      bgGradient: "from-green-50 to-emerald-50",
      action: () => navigate('/analyze'),
      actionText: "Try Matching",
      badge: "AI Powered",
      badgeColor: "bg-purple-600"
    },
    {
      icon: <LayoutGrid className="h-8 w-8" />,
      title: "Premium Templates",
      description: "Choose from 8+ ATS-optimized templates designed by professional recruiters",
      benefits: ["8+ templates", "Fully customizable", "ATS-friendly"],
      gradient: "from-orange-600 to-red-600",
      bgGradient: "from-orange-50 to-red-50",
      action: () => navigate('/templates'),
      actionText: "View Templates",
      badge: "8+ Designs",
      badgeColor: "bg-orange-600"
    },
    {
      icon: <MessageSquare className="h-8 w-8" />,
      title: "AI Career Assistant",
      description: "Get personalized career advice, resume tips, and interview preparation from our AI",
      benefits: ["24/7 available", "Expert advice", "Personalized tips"],
      gradient: "from-indigo-600 to-blue-600",
      bgGradient: "from-indigo-50 to-blue-50",
      action: () => navigate('/chat'),
      actionText: "Chat Now",
      badge: "New",
      badgeColor: "bg-indigo-600"
    },
    {
      icon: <FileText className="h-8 w-8" />,
      title: "Cover Letter Generator",
      description: "Generate compelling cover letters tailored to each job application in seconds",
      benefits: ["AI-generated", "Job-specific", "Multiple tones"],
      gradient: "from-pink-600 to-rose-600",
      bgGradient: "from-pink-50 to-rose-50",
      action: () => navigate('/cover-letter'),
      actionText: "Generate Letter",
      badge: "Time Saver",
      badgeColor: "bg-pink-600"
    }
  ];

  return (
    <section className="py-20 md:py-32 relative overflow-hidden bg-gradient-to-b from-white to-slate-50">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-blue-400 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-purple-400 rounded-full blur-3xl" />
      </div>

      <div className="section-container relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-full text-sm font-semibold mb-6"
          >
            <Zap className="h-4 w-4 text-blue-600" />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Powerful Features
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-slate-900 mb-6"
          >
            Everything You Need to
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Land Your Dream Job
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-600"
          >
            All-in-one platform with AI-powered tools to create, optimize, and perfect your resume
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-white rounded-2xl p-8 border-2 border-slate-100 hover:border-transparent hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              {/* Gradient border on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300 -z-10 blur-sm`} />

              {/* Badge */}
              <div className="absolute -top-3 -right-3">
                <div className={`${feature.badgeColor} text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg`}>
                  {feature.badge}
                </div>
              </div>

              {/* Icon */}
              <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                {feature.icon}
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
              <p className="text-slate-600 mb-6 leading-relaxed">{feature.description}</p>

              {/* Benefits */}
              <div className="space-y-2 mb-6">
                {feature.benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                    <span className="text-sm text-slate-700">{benefit}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <button
                onClick={feature.action}
                className={`w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r ${feature.gradient} text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 group-hover:scale-105`}
              >
                {feature.actionText}
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          ))}
        </div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-8 md:p-12 text-white shadow-2xl"
        >
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">50K+</div>
              <div className="text-blue-100 font-medium">Active Users</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">92%</div>
              <div className="text-blue-100 font-medium">ATS Pass Rate</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">4.9/5</div>
              <div className="text-blue-100 font-medium flex items-center justify-center gap-1">
                Rating
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              </div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">5min</div>
              <div className="text-blue-100 font-medium">Avg. Build Time</div>
            </div>
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <button
            onClick={() => navigate('/templates')}
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl shadow-lg shadow-blue-500/50 hover:shadow-xl hover:shadow-blue-500/60 transition-all duration-300 hover:scale-105"
          >
            <Sparkles className="h-5 w-5" />
            Get Started for Free
            <ArrowRight className="h-5 w-5" />
          </button>
          <p className="text-sm text-slate-600 mt-4">No credit card required • Free forever</p>
        </motion.div>
      </div>
    </section>
  );
};

export default FeatureGrid;
