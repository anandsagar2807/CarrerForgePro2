import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/react';
import {
  ArrowRight,
  Sparkles,
  Check,
  Bot,
  Cpu,
  ShieldCheck,
  Target,
  TrendingUp,
  Star,
  Users,
  Award,
  Clock,
} from 'lucide-react';

import Navbar from '../components/Navbar';
import Features from '../components/Features';
import HowItWorks from '../components/HowItWorks';
import Testimonials from '../components/Testimonials';
import Pricing from '../components/Pricing';
import FAQ from '../components/FAQ';
import PremiumFooter from '../components/PremiumFooter';

/* ─── Animation Variants ─── */
const badgeVariants = {
  hidden: { opacity: 0, y: 14, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const floatVariants = {
  animate: { y: [-6, 6, -6], transition: { duration: 6, repeat: Infinity, ease: 'easeInOut' } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const staggerChild = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

/* ─── Hero Section (inline) ─── */
const HeroSection = () => {
  const navigate = useNavigate();
  const { isSignedIn } = useUser();
  const ctaHref = isSignedIn ? '/analyze' : '/sign-up';

  return (
    <section className="relative overflow-hidden min-h-[calc(100svh-80px)] flex items-center bg-[#F8FAFC]">
      {/* Background orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 left-[-10%] h-[38rem] w-[38rem] rounded-full bg-[#7C3AED]/15 blur-[110px]" />
        <div className="absolute top-1/4 right-[-16%] h-[34rem] w-[34rem] rounded-full bg-[#4F46E5]/15 blur-[115px]" />
        <div className="absolute bottom-[-20%] left-1/3 h-[26rem] w-[26rem] rounded-full bg-[#22c55e]/10 blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(15,23,42,.35) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,23,42,.35) 1px, transparent 1px)',
            backgroundSize: '44px 44px',
          }}
        />
      </div>

      <div className="relative z-10 section-container w-full">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center py-12 lg:py-0">
          {/* LEFT — Copy */}
          <div className="relative">
            <motion.div
              variants={badgeVariants}
              initial="hidden"
              animate="visible"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 border border-slate-200/60 backdrop-blur-md shadow-sm"
            >
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-[#7C3AED]/20 to-[#4F46E5]/20 border border-[#7C3AED]/20">
                <Sparkles className="h-4 w-4 text-[#7C3AED]" />
              </span>
              <span className="text-sm font-extrabold tracking-tight bg-gradient-to-r from-[#7C3AED] to-[#4F46E5] bg-clip-text text-transparent">
                #1 AI Resume Platform
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="mt-6 text-5xl sm:text-6xl lg:text-7xl font-extrabold text-[#0F172A] leading-[1.02] tracking-tight"
            >
              Land Your Dream Job{' '}
              <span className="relative inline-block">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] via-[#4F46E5] to-[#7C3AED]">
                  Faster
                </span>
              </span>{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F46E5] to-[#7C3AED]">
                with AI
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.06 }}
              className="mt-5 text-[15px] sm:text-base lg:text-lg text-[#475569] leading-relaxed max-w-xl"
            >
              Create ATS-ready resumes with precision AI. From keyword alignment to impact-first bullet
              suggestions — CareerForge Pro helps you ship job-ready resumes in minutes.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.12 }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate(ctaHref)}
                className="group inline-flex items-center gap-2.5 px-7 py-4 bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] text-white font-bold rounded-2xl shadow-lg shadow-[#4F46E5]/25 hover:shadow-xl hover:shadow-[#7C3AED]/30 transition-all duration-300"
              >
                Get Started Free
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/ai-tools/ats-optimizer')}
                className="inline-flex items-center gap-2.5 px-7 py-4 bg-white/70 backdrop-blur-md border border-[#22C55E]/30 text-slate-700 font-bold rounded-2xl hover:bg-white hover:shadow-md hover:shadow-[#22C55E]/20 transition-all duration-300"
              >
                <ShieldCheck className="h-4 w-4 text-[#22C55E]" />
                Check ATS Score — Free
              </motion.button>
            </motion.div>

            {/* Trust micro-bar */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.18 }}
              className="mt-8 flex items-center gap-6 text-sm text-[#64748B]"
            >
              <div className="flex items-center gap-1.5">
                <Check className="h-4 w-4 text-[#22C55E]" />
                <span className="font-medium">No credit card</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="h-4 w-4 text-[#22C55E]" />
                <span className="font-medium">ATS-friendly</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="h-4 w-4 text-[#22C55E]" />
                <span className="font-medium">50k+ users</span>
              </div>
            </motion.div>

            {/* ATS Score Preview Card */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.22 }}
              className="bg-white/70 backdrop-blur-sm rounded-2xl border border-slate-200/60 p-5 shadow-sm mt-6"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-3xl font-extrabold text-[#22C55E] leading-none">94%</div>
                  <div className="text-[11px] font-semibold text-[#64748B] mt-0.5">ATS Match Score</div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-extrabold text-[#22C55E] leading-none">Top 10%</div>
                  <div className="text-[11px] font-semibold text-[#64748B] mt-0.5">vs. Other Applicants</div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-200/60 flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-[#22C55E]" />
                <span className="text-[12px] font-semibold text-[#475569]">
                  Your resume is <span className="text-[#22C55E]">above average</span> for this role
                </span>
              </div>
            </motion.div>
          </div>

          {/* RIGHT — Interactive Resume Card */}
          <div className="relative lg:pl-8">
            <motion.div variants={floatVariants} animate="animate" className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-[#7C3AED]/20 to-[#4F46E5]/20 rounded-3xl blur-2xl" />
              <div className="relative bg-white/95 backdrop-blur-xl p-8 rounded-3xl shadow-xl border border-slate-200">
                {/* Profile header */}
                <div className="flex items-center gap-5 mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#7C3AED] to-[#4F46E5] rounded-2xl flex items-center justify-center text-xl font-bold text-white shadow-lg">
                    JD
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#0F172A]">Jessica Davidson</h3>
                    <p className="text-sm font-medium text-[#7C3AED]">Engineering Manager</p>
                  </div>
                </div>

                {/* Experience bars */}
                <div className="space-y-5">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wider">
                        Experience
                      </p>
                      <span className="text-xs font-bold text-[#22C55E] bg-[#22C55E]/10 px-3 py-1 rounded-full">
                        8+ Years
                      </span>
                    </div>
                    <div className="space-y-2">
                      {['100%', '92%', '85%'].map((width, i) => (
                        <div key={i} className="h-2.5 bg-[#F8FAFC] rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width }}
                            transition={{ duration: 1, delay: 0.8 + i * 0.1 }}
                            className="h-full rounded-full bg-gradient-to-r from-[#7C3AED] to-[#4F46E5]"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Skills */}
                  <div>
                    <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-3">
                      Skills
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {['Product Strategy', 'React', 'Figma', 'Agile', 'Leadership'].map((skill, i) => (
                        <motion.span
                          key={skill}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: 1.1 + i * 0.1 }}
                          className="px-3 py-1.5 bg-[#F8FAFC] text-[#475569] text-xs font-semibold rounded-lg border border-[#E2E8F0]/60 shadow-sm"
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="mt-6 pt-5 border-t border-[#E2E8F0]/60 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 bg-[#22C55E] rounded-full animate-pulse" />
                    <p className="text-xs font-medium text-[#475569]">Updated today</p>
                  </div>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-4 h-4 text-[#EAB308] fill-[#EAB308]" />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Floating AI badge */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.4, duration: 0.5 }}
              className="absolute -right-4 top-8 bg-white rounded-2xl shadow-lg border border-slate-200/60 p-4 flex items-center gap-3"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-[#7C3AED] to-[#4F46E5] rounded-xl flex items-center justify-center">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#0F172A]">AI Optimized</p>
                <p className="text-[10px] text-[#64748B]">3 improvements applied</p>
              </div>
            </motion.div>

            {/* Floating ATS badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.6, duration: 0.5 }}
              className="absolute -left-4 bottom-12 bg-white rounded-2xl shadow-lg border border-slate-200/60 p-4 flex items-center gap-3"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-[#22C55E] to-[#16A34A] rounded-xl flex items-center justify-center">
                <ShieldCheck className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#0F172A]">ATS Passed</p>
                <p className="text-[10px] text-[#64748B]">All keywords matched</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ─── Trusted-By Logos Bar ─── */
const trustedCompanies = [
  'Google',
  'Microsoft',
  'Amazon',
  'Meta',
  'Apple',
  'Stripe',
  'Netflix',
  'Spotify',
];

const TrustedByBar = () => (
  <section className="py-12 bg-white border-b border-slate-100">
    <div className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-8">
          Trusted by professionals at leading companies
        </p>
        <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-4">
          {trustedCompanies.map((company, i) => (
            <motion.span
              key={company}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="text-lg font-bold text-slate-300 tracking-tight hover:text-slate-500 transition-colors duration-300"
            >
              {company}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </div>
  </section>
);

/* ─── Stats Bar ─── */
const statsData = [
  { icon: Users, value: '50k+', label: 'Active Users', color: 'from-[#4F46E5] to-[#7C3AED]' },
  { icon: TrendingUp, value: '48%', label: 'Interview Boost', color: 'from-[#22C55E] to-[#16A34A]' },
  { icon: Award, value: '95%', label: 'ATS Pass Rate', color: 'from-[#7C3AED] to-[#4F46E5]' },
  { icon: Clock, value: '5 min', label: 'Avg. Creation Time', color: 'from-[#EAB308] to-[#CA8A04]' },
];

const StatsBar = () => (
  <section className="py-16 bg-slate-50">
    <div className="section-container">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {statsData.map((stat) => (
          <motion.div
            key={stat.label}
            variants={staggerChild}
            className="bg-white rounded-2xl border border-slate-200/60 p-6 text-center shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
          >
            <div
              className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center mx-auto mb-4 shadow-md`}
            >
              <stat.icon className="h-5 w-5 text-white" />
            </div>
            <div className="text-3xl font-extrabold text-[#0F172A] mb-1">{stat.value}</div>
            <div className="text-sm font-medium text-[#64748B]">{stat.label}</div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

/* ─── AI Tools CTA Section ─── */
const aiTools = [
  {
    icon: Bot,
    title: 'AI Resume Writer',
    description: 'Generate compelling, role-specific bullet points and summaries with advanced AI.',
    gradient: 'from-[#7C3AED] to-[#4F46E5]',
  },
  {
    icon: Target,
    title: 'Smart Job Matching',
    description: 'Upload a job description and get instant keyword alignment suggestions.',
    gradient: 'from-[#4F46E5] to-[#7C3AED]',
  },
  {
    icon: Cpu,
    title: 'ATS Score Checker',
    description: 'Real-time scoring against 50+ ATS filters — completely free, no signup required.',
    gradient: 'from-[#22C55E] to-[#16A34A]',
  },
  {
    icon: ShieldCheck,
    title: 'Privacy-First Design',
    description: 'Your data is encrypted end-to-end. We never share or sell your personal information.',
    gradient: 'from-[#EAB308] to-[#CA8A04]',
  },
];

const AIToolsCTA = () => {
  const navigate = useNavigate();
  const { isSignedIn } = useUser();

  return (
    <section className="py-24 lg:py-32 bg-white relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#7C3AED]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#4F46E5]/5 rounded-full blur-3xl" />
      </div>

      <div className="section-container relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#7C3AED]/5 border border-[#7C3AED]/20 rounded-full mb-6"
          >
            <Bot className="w-4 h-4 text-[#7C3AED]" />
            <span className="text-sm font-bold text-[#7C3AED]">AI-Powered Tools</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-6 tracking-tight"
          >
            Supercharge Your Resume
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] to-[#4F46E5]">
              with AI Intelligence
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-[#64748B]"
          >
            Our suite of AI tools analyzes, optimizes, and perfects your resume so you can focus on what
            matters — landing interviews.
          </motion.p>
        </div>

        {/* Tools Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {aiTools.map((tool) => (
            <motion.div
              key={tool.title}
              variants={staggerChild}
              className="group relative bg-white rounded-2xl border border-slate-200/60 p-7 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div
                className={`w-14 h-14 bg-gradient-to-br ${tool.gradient} rounded-xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-105 transition-transform duration-300`}
              >
                <tool.icon className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-lg font-bold text-[#0F172A] mb-2">{tool.title}</h3>
              <p className="text-sm text-[#64748B] leading-relaxed">{tool.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <motion.button
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate(isSignedIn ? '/analyze' : '/sign-up')}
            className="group inline-flex items-center gap-2.5 px-7 py-4 bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] text-white font-bold rounded-2xl shadow-lg shadow-[#4F46E5]/25 hover:shadow-xl transition-all duration-300"
          >
            Try AI Tools Free
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

/* ─── ATS Score Preview Section ─── */
const ATSScorePreview = () => {
  const navigate = useNavigate();

  return (
    <section className="py-24 lg:py-32 bg-slate-50 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#22C55E]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#16A34A]/5 rounded-full blur-3xl" />
      </div>

      <div className="section-container relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#22C55E]/10 border border-[#22C55E]/20 rounded-full mb-6"
          >
            <ShieldCheck className="w-4 h-4 text-[#22C55E]" />
            <span className="text-sm font-bold text-[#22C55E]">Free ATS Score Checker</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-6 tracking-tight"
          >
            Check Your ATS Score
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#22C55E] to-[#16A34A]">
              — Completely Free
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-[#64748B]"
          >
            Instantly analyze how well your resume matches any job description. Get your ATS compatibility
            score, keyword analysis, and actionable suggestions — no signup required.
          </motion.p>
        </div>

        {/* ATS Score Visual Cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-6"
        >
          {/* Score Card */}
          <motion.div
            variants={staggerChild}
            className="group relative bg-white rounded-2xl border border-slate-200/60 p-7 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <div className="w-14 h-14 bg-gradient-to-br from-[#22C55E] to-[#16A34A] rounded-xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-105 transition-transform duration-300">
              <Target className="h-7 w-7 text-white" />
            </div>
            <h3 className="text-lg font-bold text-[#0F172A] mb-2">ATS Compatibility Score</h3>
            <p className="text-sm text-[#64748B] leading-relaxed">
              Get a detailed percentage score showing how well your resume aligns with the job description
              and ATS requirements.
            </p>
            <div className="mt-4 pt-4 border-t border-slate-200/60">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-[#64748B]">Sample Score</span>
                <span className="text-xs font-bold text-[#22C55E]">94%</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#22C55E] to-[#16A34A]"
                  style={{ width: '94%' }}
                />
              </div>
            </div>
          </motion.div>

          {/* Keywords Card */}
          <motion.div
            variants={staggerChild}
            className="group relative bg-white rounded-2xl border border-slate-200/60 p-7 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <div className="w-14 h-14 bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] rounded-xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-105 transition-transform duration-300">
              <Cpu className="h-7 w-7 text-white" />
            </div>
            <h3 className="text-lg font-bold text-[#0F172A] mb-2">Keyword Analysis</h3>
            <p className="text-sm text-[#64748B] leading-relaxed">
              See exactly which keywords are found and which are missing from your resume, with importance
              levels and context.
            </p>
            <div className="mt-4 pt-4 border-t border-slate-200/60 flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-green-50 text-green-700 text-xs font-semibold rounded-full border border-green-200">
                React ✓
              </span>
              <span className="px-2 py-1 bg-green-50 text-green-700 text-xs font-semibold rounded-full border border-green-200">
                Leadership ✓
              </span>
              <span className="px-2 py-1 bg-red-50 text-red-700 text-xs font-semibold rounded-full border border-red-200">
                Agile ✗
              </span>
              <span className="px-2 py-1 bg-red-50 text-red-700 text-xs font-semibold rounded-full border border-red-200">
                Kubernetes ✗
              </span>
            </div>
          </motion.div>

          {/* Suggestions Card */}
          <motion.div
            variants={staggerChild}
            className="group relative bg-white rounded-2xl border border-slate-200/60 p-7 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <div className="w-14 h-14 bg-gradient-to-br from-[#7C3AED] to-[#4F46E5] rounded-xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-105 transition-transform duration-300">
              <TrendingUp className="h-7 w-7 text-white" />
            </div>
            <h3 className="text-lg font-bold text-[#0F172A] mb-2">Actionable Suggestions</h3>
            <p className="text-sm text-[#64748B] leading-relaxed">
              Get specific, prioritized recommendations to improve your resume's ATS compatibility and
              stand out to recruiters.
            </p>
            <div className="mt-4 pt-4 border-t border-slate-200/60 space-y-2">
              <div className="flex items-center gap-2">
                <Check className="h-3.5 w-3.5 text-[#22C55E]" />
                <span className="text-xs text-[#475569]">Add "Agile methodology" to skills</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-3.5 w-3.5 text-[#22C55E]" />
                <span className="text-xs text-[#475569]">Include leadership metrics</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-3.5 w-3.5 text-[#22C55E]" />
                <span className="text-xs text-[#475569]">Quantify impact statements</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <motion.button
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/ai-tools/ats-optimizer')}
            className="group inline-flex items-center gap-2.5 px-7 py-4 bg-gradient-to-r from-[#22C55E] to-[#16A34A] text-white font-bold rounded-2xl shadow-lg shadow-[#22C55E]/25 hover:shadow-xl transition-all duration-300"
          >
            Check ATS Score — Free
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>
          <p className="mt-3 text-sm text-[#64748B]">
            No credit card · No signup required · Instant results
          </p>
        </motion.div>
      </div>
    </section>
  );
};

/* ─── LandingPage ─── */
const LandingPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="min-h-screen bg-white text-dark font-sans overflow-x-hidden">
      {/* Ambient background blobs */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 left-[-8rem] h-[28rem] w-[28rem] rounded-full bg-blue-400/20 blur-[130px]" />
        <div className="absolute top-1/3 right-[-10rem] h-[30rem] w-[30rem] rounded-full bg-purple-400/20 blur-[140px]" />
        <div className="absolute bottom-0 left-1/4 h-[25rem] w-[25rem] rounded-full bg-pink-400/20 blur-[130px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[40rem] w-[40rem] rounded-full bg-indigo-400/10 blur-[160px]" />
      </div>

      <Navbar />

      <main className="relative">
        {/* Hero */}
        <HeroSection />

        {/* Trusted By */}
        <TrustedByBar />

        {/* Stats */}
        <StatsBar />

        {/* Features */}
        <section id="powerful-features" className="py-24 lg:py-32 bg-white">
          <div className="section-container">
            <Features />
          </div>
        </section>

        {/* AI Tools CTA */}
        <AIToolsCTA />

        {/* ATS Score Preview */}
        <ATSScorePreview />

        {/* How It Works */}
        <HowItWorks />

        {/* Testimonials */}
        <Testimonials />

        {/* Pricing */}
        <Pricing />

        {/* FAQ */}
        <FAQ />
      </main>

      <PremiumFooter />
    </div>
  );
};

export default LandingPage;
