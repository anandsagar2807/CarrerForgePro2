import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Sparkles, Shield, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Pricing from '../components/Pricing';

const PricingPage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-100/20 to-purple-100/20 rounded-full blur-3xl" />

            {/* Header */}
            <div className="bg-white/90 backdrop-blur-md border-b border-slate-200/50 sticky top-0 z-50 shadow-sm">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-all duration-300 hover:gap-3"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span className="text-sm font-semibold">Back to Home</span>
                    </button>
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                            <Sparkles className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold text-slate-900">
                            CareerForge <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Pro</span>
                        </span>
                    </div>
                    <div className="w-24" /> {/* Spacer for centering */}
                </div>
            </div>

            {/* Hero Section */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="relative z-10 max-w-4xl mx-auto text-center pt-24 pb-12 px-6"
            >
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200/50 rounded-full mb-8 shadow-sm"
                >
                    <Shield className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-bold text-slate-700">30-Day Money-Back Guarantee</span>
                </motion.div>

                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 mb-6 tracking-tight">
                    Choose Your{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800">
                        Perfect Plan
                    </span>
                </h1>
                <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
                    Start free and unlock powerful features as you grow. No hidden fees, cancel anytime.
                </p>

                {/* Trust indicators */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="flex items-center justify-center gap-8 mt-10"
                >
                    {[
                        { icon: <Zap className="w-5 h-5" />, text: "No credit card" },
                        { icon: <Shield className="w-5 h-5" />, text: "Secure & safe" },
                        { icon: <Sparkles className="w-5 h-5" />, text: "Cancel anytime" }
                    ].map((item, i) => (
                        <div key={i} className="flex items-center gap-2 text-slate-600">
                            <div className="text-blue-600">{item.icon}</div>
                            <span className="text-sm font-medium">{item.text}</span>
                        </div>
                    ))}
                </motion.div>
            </motion.div>

            {/* Pricing Component */}
            <div className="relative z-10">
                <Pricing />
            </div>

            {/* FAQ Section */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="relative z-10 max-w-3xl mx-auto px-6 pb-32 pt-16"
            >
                <div className="text-center mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full mb-6"
                    >
                        <Sparkles className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-bold text-slate-700">FAQ</span>
                    </motion.div>
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                        Frequently Asked Questions
                    </h2>
                </div>

                <div className="space-y-4">
                    {[
                        {
                            q: 'Can I try Pro features before paying?',
                            a: 'Yes! You get a 7-day free trial of Pro features when you sign up. No credit card required.'
                        },
                        {
                            q: 'What happens when my free trial ends?',
                            a: 'Your account will automatically switch to the Free plan. You won\'t be charged unless you choose to upgrade.'
                        },
                        {
                            q: 'Can I cancel my subscription anytime?',
                            a: 'Absolutely. You can cancel anytime from your account settings. No questions asked.'
                        },
                        {
                            q: 'Is there a discount for annual billing?',
                            a: 'Yes! Save 20% when you choose annual billing on the Pro plan. That\'s just $9.60/month.'
                        },
                        {
                            q: 'Do you offer refunds?',
                            a: 'We offer a 30-day money-back guarantee on all paid plans. If you\'re not satisfied, contact us for a full refund.'
                        }
                    ].map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50 shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                            <h3 className="font-bold text-slate-900 mb-3 text-lg">{faq.q}</h3>
                            <p className="text-slate-600 leading-relaxed">{faq.a}</p>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Bottom CTA */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative z-10 text-center pb-24"
            >
                <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 rounded-3xl p-12 max-w-4xl mx-auto mx-6 shadow-2xl">
                    <h3 className="text-3xl font-bold text-white mb-4">Ready to build your dream resume?</h3>
                    <p className="text-blue-100 mb-8 text-lg">Join thousands of professionals who trust CareerForge Pro</p>
                    <button
                        onClick={() => navigate('/sign-up')}
                        className="inline-flex items-center gap-3 px-8 py-4 bg-white text-slate-900 font-bold rounded-2xl hover:bg-slate-100 transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                        Get Started Free
                        <ArrowLeft className="w-5 h-5 rotate-180" />
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default PricingPage;
