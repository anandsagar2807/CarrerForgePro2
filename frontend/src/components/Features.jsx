import React from 'react';
import { motion } from 'framer-motion';
import { Search, FileCheck, Target, Download, Shield, Zap, Layout, MessageCircle } from 'lucide-react';

const features = [
  {
    icon: <Search className="h-5 w-5" />,
    title: 'ATS Optimization',
    description: 'Our AI ensures your resume passes applicant tracking systems used by Fortune 500 companies.',
    color: 'bg-primary-50 text-primary-600',
  },
  {
    icon: <Zap className="h-5 w-5" />,
    title: 'AI-Powered Writing',
    description: 'Get intelligent suggestions for bullet points and descriptions based on your target role.',
    color: 'bg-accent-50 text-accent-600',
  },
  {
    icon: <FileCheck className="h-5 w-5" />,
    title: 'Smart Templates',
    description: 'Professional, recruiter-approved templates optimized for readability and impact.',
    color: 'bg-green-50 text-green-600',
  },
  {
    icon: <Target className="h-5 w-5" />,
    title: 'Job Matching',
    description: 'Tailor your resume to specific job descriptions with keyword optimization.',
    color: 'bg-orange-50 text-orange-600',
  },
  {
    icon: <Download className="h-5 w-5" />,
    title: 'One-Click Export',
    description: 'Download your resume in PDF, Word, or share via a unique public link.',
    color: 'bg-blue-50 text-blue-600',
  },
  {
    icon: <Shield className="h-5 w-5" />,
    title: 'Privacy First',
    description: 'Your data is encrypted and never shared. Full control over your information.',
    color: 'bg-purple-50 text-purple-600',
  },
];

const Features = () => {
  return (
    <section id="features" className="py-16 md:py-24">
      <div className="section-container">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary-50 text-primary-700 rounded-full text-sm font-medium mb-4"
          >
            Features
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-dark mb-4"
          >
            Everything you need to land your dream job
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-stone-600"
          >
            Our platform combines cutting-edge AI with proven resume strategies to help you stand out.
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="rounded-2xl p-6 group border border-[#e9dcc8] bg-white/80 shadow-[0_10px_26px_rgba(64,54,39,0.07)] hover:shadow-[0_18px_30px_rgba(64,54,39,0.12)]"
            >
              <div className={`w-12 h-12 ${feature.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-dark mb-2">{feature.title}</h3>
              <p className="text-stone-600 text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
