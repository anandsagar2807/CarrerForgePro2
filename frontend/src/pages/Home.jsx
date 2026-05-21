import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Features from '../components/Features';
import HowItWorks from '../components/HowItWorks';
import Testimonials from '../components/Testimonials';
import Pricing from '../components/Pricing';
import FAQ from '../components/FAQ';
import PremiumFooter from '../components/PremiumFooter';
import {
  ArrowRight, Check, Sparkles, Star, Play, Zap, Shield,
  TrendingUp, Award, Clock, Users, FileText, ChevronRight, Brain, Target
} from 'lucide-react';

// ============================================
// PREMIUM ENTERPRISE SAAS LANDING PAGE
// ============================================

// Animated Background with Gradient Mesh
const AnimatedBackground = () => (
  <div className="absolute inset-0 overflow-hidden">
    {/* Base gradient */}
    <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50/30" />

    {/* Subtle mesh gradient - no animated orbs */}
    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-blue-100/40 to-blue-200/20 rounded-full blur-3xl" />
    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-blue-50/30 to-slate-100/20 rounded-full blur-3xl" />

    {/* Subtle grid pattern */}
    <div
      className="absolute inset-0 opacity-[0.02]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1h98v98H1z' fill='none' stroke='%231e40af' stroke-width='0.5'/%3E%3C/svg%3E")`,
      }}
    />
  </div>
);

// Trusted By Logos
const TrustedBy = () => {
  const companies = ['Google', 'Microsoft', 'Amazon', 'Meta', 'Apple', 'Netflix', 'Spotify'];

  return (
    <section className="py-12 border-y border-slate-100 bg-slate-50/50">
      <div className="section-container">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-sm font-semibold text-slate-400 uppercase tracking-wider mb-8"
        >
          Trusted by professionals from leading companies
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap items-center justify-center gap-8 md:gap-16"
        >
          {companies.map((company, i) => (
            <motion.span
              key={company}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.4 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ opacity: 0.8 }}
              className="text-xl md:text-2xl font-bold text-slate-800 transition-all cursor-default"
            >
              {company}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// Premium Product Showcase
const ProductShowcase = () => {
  const navigate = useNavigate();

  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-full">
              <Play className="w-4 h-4 text-blue-700" />
              <span className="text-sm font-bold text-blue-900">See It In Action</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
              Create stunning resumes
              <br />
              <span className="text-blue-800">
                in minutes, not hours
              </span>
            </h2>

            <p className="text-xl text-slate-600 leading-relaxed">
              Our intuitive builder, combined with AI-powered suggestions,
              makes creating a professional resume faster than ever before.
            </p>

            <ul className="space-y-4">
              {[
                { icon: Zap, text: 'AI writes your bullet points' },
                { icon: Clock, text: 'Build in under 10 minutes' },
                { icon: Award, text: 'Recruiter-approved templates' },
              ].map((item, i) => (
                <motion.li
                  key={item.text}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-700 to-blue-900 rounded-xl flex items-center justify-center shadow-md">
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-lg font-semibold text-slate-700">{item.text}</span>
                </motion.li>
              ))}
            </ul>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/sign-up')}
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-700 to-blue-900 text-white font-bold rounded-2xl hover:shadow-xl transition-all shadow-lg"
            >
              Try Builder Free
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>

          {/* Right: Product Preview */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-200/30 to-blue-300/20 rounded-3xl blur-2xl" />
            <div className="relative bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
              {/* Mock UI Header */}
              <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex items-center gap-3">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="flex-1 text-center text-sm font-medium text-slate-400">
                  CareerForge Pro Editor
                </div>
              </div>

              {/* Mock Content */}
              <div className="p-8 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-700 to-blue-900 rounded-2xl flex items-center justify-center text-white font-bold text-xl">
                    JD
                  </div>
                  <div className="flex-1">
                    <div className="h-6 bg-slate-100 rounded w-48 mb-2" />
                    <div className="h-4 bg-slate-100 rounded w-32" />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="h-3 bg-slate-100 rounded w-full" />
                  <div className="h-3 bg-slate-100 rounded w-11/12" />
                  <div className="h-3 bg-slate-100 rounded w-10/12" />
                </div>

                <div className="flex gap-2">
                  {['React', 'TypeScript', 'Node.js'].map((tag) => (
                    <span key={tag} className="px-3 py-1.5 bg-blue-50 text-blue-700 text-xs font-semibold rounded-lg">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* AI Suggestion Popup */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className="bg-blue-50 border border-blue-200 rounded-xl p-4 shadow-lg"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-700 to-blue-900 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900 mb-1">AI Suggestion</p>
                      <p className="text-sm text-slate-600">"Led cross-functional team of 8 engineers to deliver product 2 weeks ahead of schedule"</p>
                      <div className="flex gap-2 mt-3">
                        <button className="px-3 py-1 bg-blue-700 text-white text-xs font-semibold rounded-lg">Apply</button>
                        <button className="px-3 py-1 text-slate-500 text-xs font-semibold">Dismiss</button>
                      </div>
                    </div>
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

// Stats Bar
const StatsBar = () => {
  const stats = [
    { value: '50K+', label: 'Active Users', icon: Users },
    { value: '120K+', label: 'Resumes Created', icon: FileText },
    { value: '4.9', label: 'Average Rating', icon: Star },
    { value: '98%', label: 'ATS Success Rate', icon: TrendingUp },
  ];

  return (
    <section className="py-16 relative">
      <div className="section-container">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-8 lg:p-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-50 rounded-2xl mb-4">
                  <stat.icon className="w-7 h-7 text-blue-700" />
                </div>
                <p className="text-4xl font-bold text-slate-900 mb-1">{stat.value}</p>
                <p className="text-sm font-medium text-slate-500">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Floating Resume Preview Card
const FloatingResumeCard = () => (
  <motion.div
    initial={{ opacity: 0, y: 40, rotateX: 15 }}
    animate={{ opacity: 1, y: 0, rotateX: 0 }}
    transition={{ duration: 1, delay: 0.3, type: "spring", stiffness: 100 }}
    whileHover={{ y: -10, rotateX: 5, scale: 1.02 }}
    className="relative"
  >
    <div className="absolute -inset-4 bg-gradient-to-r from-blue-200/40 to-blue-300/30 rounded-3xl blur-2xl" />

    <div className="relative bg-white/95 backdrop-blur-xl p-8 rounded-3xl shadow-xl border border-slate-200">
      <div className="flex items-center gap-5 mb-8">
        <div className="relative">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-700 to-blue-900 rounded-2xl flex items-center justify-center text-xl font-bold text-white shadow-lg">
            JD
          </div>
          <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-green-500 rounded-full border-2 border-white flex items-center justify-center shadow-lg">
            <Check className="w-4 h-4 text-white" />
          </div>
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900">Jessica Davidson</h3>
          <p className="text-sm font-medium text-blue-800">
            Engineering Manager
          </p>
        </div>
      </div>

      <div className="space-y-5">
        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Experience</p>
            <span className="text-xs font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full">8+ Years</span>
          </div>
          <div className="space-y-2">
            {['100%', '92%', '85%'].map((width, i) => (
              <div key={i} className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width }}
                  transition={{ duration: 1, delay: 0.8 + i * 0.1 }}
                  className={`h-full rounded-full ${i === 0 ? 'bg-gradient-to-r from-blue-700 to-blue-800' :
                    i === 1 ? 'bg-gradient-to-r from-blue-600 to-blue-700' :
                      'bg-gradient-to-r from-blue-500 to-blue-600'
                    }`}
                />
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Skills</p>
          <div className="flex flex-wrap gap-2">
            {['Product Strategy', 'React', 'Figma', 'Agile', 'Leadership'].map((skill, i) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 1.1 + i * 0.1 }}
                className="px-3 py-1.5 bg-slate-50 text-slate-700 text-xs font-semibold rounded-lg border border-slate-200 shadow-sm"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
          <p className="text-xs font-medium text-slate-500">Updated today</p>
        </div>
        <div className="flex items-center gap-1">
          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
          <span className="text-sm font-bold text-slate-700">4.9</span>
        </div>
      </div>
    </div>

    {/* Floating badge */}
    <motion.div
      initial={{ opacity: 0, x: 30, scale: 0.8 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 0.5, delay: 1.5 }}
      className="absolute -right-6 top-12 bg-white rounded-2xl shadow-2xl border border-slate-100 p-4"
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-700 to-blue-900 rounded-xl flex items-center justify-center shadow-lg">
          <TrendingUp className="w-5 h-5 text-white" />
        </div>
        <div>
          <p className="text-lg font-bold text-slate-900">+47%</p>
          <p className="text-xs text-slate-500 font-medium">Interview rate</p>
        </div>
      </div>
    </motion.div>
  </motion.div>
);

// Benefit Pill
const BenefitPill = ({ text }) => (
  <div className="flex items-center gap-2 px-4 py-2 bg-white/70 backdrop-blur-sm rounded-full border border-slate-200/60 shadow-sm">
    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
      <Check className="w-3 h-3 text-green-600" />
    </div>
    <span className="text-sm font-semibold text-slate-700">{text}</span>
  </div>
);

// AI Tools CTA Section
const AIToolsCTA = () => {
  const navigate = useNavigate();

  const tools = [
    { icon: Brain, title: 'Brutal Honest Review', color: 'from-red-600 to-red-800' },
    { icon: Target, title: 'ATS Optimizer', color: 'from-blue-700 to-blue-900' },
    { icon: Zap, title: 'Bullet Transformer', color: 'from-yellow-600 to-orange-700' },
    { icon: Sparkles, title: 'Industry Tone Match', color: 'from-purple-600 to-purple-800' },
    { icon: TrendingUp, title: 'Final Polish', color: 'from-green-600 to-green-800' },
  ];

  return (
    <section className="py-24 lg:py-32 relative overflow-hidden bg-gradient-to-br from-slate-900 to-blue-900">
      {/* Background effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
      </div>

      <div className="section-container relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 border border-blue-400/30 rounded-full mb-6"
          >
            <Sparkles className="w-4 h-4 text-blue-300" />
            <span className="text-sm font-bold text-blue-100">5 Advanced AI Tools</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight"
          >
            Transform Your Resume with
            <br />
            AI-Powered Intelligence
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-300 leading-relaxed"
          >
            Get brutally honest feedback, optimize for ATS, transform bullet points, match industry tone, and polish to perfection.
          </motion.p>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-12">
          {tools.map((tool, index) => (
            <motion.div
              key={tool.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center hover:bg-white/15 transition-all"
            >
              <div className={`w-12 h-12 bg-gradient-to-br ${tool.color} rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg`}>
                <tool.icon className="w-6 h-6 text-white" />
              </div>
              <p className="text-sm font-semibold text-white">{tool.title}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/sign-up')}
            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-slate-900 font-bold rounded-2xl hover:bg-slate-100 transition-all duration-300 shadow-xl"
          >
            Explore AI Tools
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

// Main Home Component
const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white font-sans overflow-x-hidden">
      <Navbar />

      <main>
        {/* HERO SECTION */}
        <section className="relative min-h-screen flex items-center pt-20 pb-24 overflow-hidden">
          <AnimatedBackground />

          <div className="section-container relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
              {/* Left: Content */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="space-y-8"
              >
                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-full shadow-sm"
                >
                  <Sparkles className="w-4 h-4 text-blue-700" />
                  <span className="text-sm font-bold text-blue-900">
                    AI-Powered Resume Builder
                  </span>
                </motion.div>

                {/* Headline */}
                <div className="space-y-4">
                  <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold text-slate-900 leading-[1.05] tracking-tight">
                    Build a resume that{' '}
                    <span className="text-blue-800">
                      gets callbacks
                    </span>
                  </h1>
                  <p className="text-xl text-slate-600 max-w-xl leading-relaxed">
                    Professional AI-powered tools to create resumes that stand out and get results.
                  </p>
                </div>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.button
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate('/sign-up')}
                    className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-700 to-blue-900 text-white text-base font-bold rounded-2xl shadow-xl shadow-blue-900/20 transition-all duration-300"
                  >
                    Start Building Free
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate('/ai-tools/ats-optimizer')}
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-slate-700 text-base font-semibold rounded-2xl border-2 border-slate-200 hover:border-green-600 hover:bg-green-50 transition-all duration-300"
                  >
                    <Shield className="w-5 h-5 text-green-600" />
                    Check ATS Score — Free
                  </motion.button>
                </div>

                {/* Benefits */}
                <div className="flex flex-wrap gap-3">
                  {['No credit card', 'Free templates', 'ATS-optimized'].map((text) => (
                    <BenefitPill key={text} text={text} />
                  ))}
                </div>

                {/* Trust */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="pt-6 border-t border-slate-200/60"
                >
                  <div className="flex items-center gap-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    ))}
                    <span className="ml-2 text-sm font-bold text-slate-900">4.9/5</span>
                    <span className="text-sm text-slate-500">from 50,000+ users</span>
                  </div>
                </motion.div>
              </motion.div>

              {/* Right: Resume Card */}
              <div className="relative lg:pl-8">
                <FloatingResumeCard />
              </div>
            </div>
          </div>
        </section>

        {/* TRUSTED BY */}
        <TrustedBy />

        {/* FEATURES */}
        <section id="features" className="py-24 lg:py-32">
          <div className="section-container">
            <Features />
          </div>
        </section>

        {/* AI TOOLS CTA */}
        <AIToolsCTA />

        {/* PRODUCT SHOWCASE */}
        <ProductShowcase />

        {/* HOW IT WORKS */}
        <HowItWorks />

        {/* STATS */}
        <StatsBar />

        {/* TESTIMONIALS */}
        <Testimonials />

        {/* PRICING */}
        <Pricing />

        {/* FAQ */}
        <FAQ />
      </main>

      {/* PREMIUM FOOTER */}
      <PremiumFooter />
    </div>
  );
};

export default Home;
