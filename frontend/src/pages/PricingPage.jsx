import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Sparkles, Shield, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Pricing from '../components/Pricing';
import Navbar from '../components/Navbar';

const PricingPage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#020617] text-white font-sans overflow-x-hidden">
            {/* Premium Animated background gradients */}
            <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
                <div className="absolute -top-40 left-[-8rem] h-[35rem] w-[35rem] rounded-full bg-blue-600/10 blur-[150px] animate-pulse" />
                <div className="absolute top-1/3 right-[-10rem] h-[40rem] w-[40rem] rounded-full bg-indigo-600/10 blur-[160px] animate-pulse" style={{ animationDelay: '1.5s' }} />
                <div className="absolute bottom-0 left-1/4 h-[30rem] w-[30rem] rounded-full bg-violet-600/10 blur-[140px] animate-pulse" style={{ animationDelay: '3s' }} />
            </div>

            <Navbar isDark={true} />

            {/* Hero Section */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="relative z-10 max-w-5xl mx-auto text-center pt-32 pb-16 px-6"
            >
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-500/10 border border-blue-500/20 rounded-full mb-8 backdrop-blur-md"
                >
                    <Shield className="w-4 h-4 text-blue-400" />
                    <span className="text-sm font-bold text-blue-100">30-Day Money-Back Guarantee</span>
                </motion.div>

                <h1 className="text-5xl md:text-6xl lg:text-8xl font-extrabold text-white mb-8 tracking-tight">
                    Premium Plans for{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-400 animate-gradient-x">
                        Top Professionals
                    </span>
                </h1>
                <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
                    Unlock the full power of <span className="text-white font-medium">Gemini 2.0</span> optimized resumes and landing your dream job with ease.
                </p>

                {/* Trust indicators */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="flex flex-wrap items-center justify-center gap-10 mt-12"
                >
                    {[
                        { icon: <Zap className="w-5 h-5" />, text: "Instant AI Optimization" },
                        { icon: <Shield className="w-5 h-5" />, text: "ATS-Grade Templates" },
                        { icon: <Sparkles className="w-5 h-5" />, text: "24/7 AI Career Coach" }
                    ].map((item, i) => (
                        <div key={i} className="flex items-center gap-3 text-slate-300">
                            <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center border border-white/10">
                                <div className="text-blue-400">{item.icon}</div>
                            </div>
                            <span className="text-sm font-semibold tracking-wide uppercase">{item.text}</span>
                        </div>
                    ))}
                </motion.div>
            </motion.div>

            {/* Pricing Component */}
            <div className="relative z-10 py-12">
                <Pricing />
            </div>

            {/* FAQ Section */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="relative z-10 max-w-4xl mx-auto px-6 pb-32 pt-20"
            >
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Got Questions?
                    </h2>
                    <p className="text-slate-400">Everything you need to know about Zaalima Forge Pro</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {[
                        {
                            q: 'How does the AI work?',
                            a: 'We use Gemini 2.0 to semantically analyze your resume and the target JD, identifying critical gaps and automatically optimizing your content for ATS algorithms.'
                        },
                        {
                            q: 'Can I cancel anytime?',
                            a: 'Yes! No long-term contracts. You can cancel your subscription with a single click from your dashboard at any time.'
                        },
                        {
                            q: 'Is my data secure?',
                            a: 'Absolutely. We use bank-level encryption to protect your personal information and never share your resume data with third parties.'
                        },
                        {
                            q: 'Do you offer student discounts?',
                            a: 'Yes, students get 50% off the Pro plan. Contact our support team with your student ID to receive a discount code.'
                        }
                    ].map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-white/20 transition-all duration-500 group"
                        >
                            <h3 className="font-bold text-white mb-4 text-xl group-hover:text-blue-400 transition-colors">{faq.q}</h3>
                            <p className="text-slate-400 leading-relaxed text-sm">{faq.a}</p>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Bottom CTA */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative z-10 text-center pb-32 px-6"
            >
                <div className="relative bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[3rem] p-12 lg:p-20 max-w-5xl mx-auto overflow-hidden shadow-2xl shadow-blue-500/20">
                    <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
                    <div className="relative z-10">
                        <h3 className="text-4xl lg:text-5xl font-extrabold text-white mb-6">Ready to upgrade your career?</h3>
                        <p className="text-blue-100 mb-10 text-lg max-w-2xl mx-auto">Join 50,000+ professionals who have already landed their dream jobs using Zaalima Forge Pro.</p>
                        <button
                            onClick={() => navigate('/sign-up')}
                            className="inline-flex items-center gap-3 px-10 py-5 bg-white text-blue-600 font-extrabold rounded-2xl hover:scale-105 transition-all duration-300 shadow-xl"
                        >
                            Get Started Now
                            <ArrowLeft className="w-5 h-5 rotate-180" />
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default PricingPage;
