import React from 'react';
import { motion } from 'framer-motion';
import { Check, Sparkles, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const plans = [
  {
    name: 'Free',
    description: 'Perfect for getting started',
    price: '$0',
    period: 'forever free',
    gradient: 'from-slate-600 to-slate-700',
    features: [
      '1 resume template',
      'Basic AI suggestions',
      'PDF export',
      'ATS scoring',
      'Email support',
    ],
    cta: 'Get Started',
    popular: false
  },
  {
    name: 'Pro',
    description: 'For serious job seekers',
    price: '$12',
    period: '/month',
    gradient: 'from-blue-700 to-blue-900',
    features: [
      'Unlimited resumes',
      'Cover letters generator',
      'Premium templates',
      'Advanced AI writing assistant',
      'Unlimited PDF exports',
      'Full ATS optimization',
      'Priority support',
      'Interview prep tools',
    ],
    cta: 'Start Free Trial',
    popular: true
  },
  {
    name: 'Enterprise',
    description: 'For teams and organizations',
    price: 'Custom',
    period: 'pricing',
    gradient: 'from-slate-700 to-slate-800',
    features: [
      'Everything in Pro',
      'Team collaboration',
      'Custom branding',
      'API access',
      'Dedicated account manager',
      'SSO & advanced security',
      'Analytics dashboard',
      'SLA guarantee',
    ],
    cta: 'Contact Sales',
    popular: false
  }
];

const PricingCard = ({ plan, index }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`relative group ${plan.popular ? 'lg:scale-105 lg:-my-4' : ''}`}
    >
      {/* Popular badge */}
      {plan.popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-blue-600 text-white text-xs font-bold rounded-full shadow-[0_0_20px_rgba(37,99,235,0.4)]">
            <Sparkles className="w-3.5 h-3.5" />
            Most Popular
          </div>
        </div>
      )}

      <div className={`relative bg-white/5 rounded-[2.5rem] p-10 border border-white/10 backdrop-blur-xl hover:border-white/20 transition-all duration-500 h-full flex flex-col group ${plan.popular ? 'shadow-[0_0_40px_rgba(37,99,235,0.1)]' : ''}`}>
        {/* Plan header */}
        <div className="mb-10">
          <div className={`w-14 h-14 bg-gradient-to-br ${plan.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-xl`}>
            <span className="text-white font-bold text-xl">{plan.name[0]}</span>
          </div>
          <h3 className="text-3xl font-bold text-white mb-2 tracking-tight">{plan.name}</h3>
          <p className="text-slate-400 text-sm font-medium">{plan.description}</p>
        </div>

        {/* Price */}
        <div className="mb-10">
          <div className="flex items-baseline gap-2">
            <span className="text-6xl font-extrabold text-white tracking-tighter">{plan.price}</span>
            <span className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">{plan.period}</span>
          </div>
        </div>

        {/* Features */}
        <ul className="space-y-5 mb-10 flex-grow">
          {plan.features.map((feature, i) => (
            <li key={i} className="flex items-start gap-4 group/item">
              <div className={`w-6 h-6 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover/item:border-blue-500/50 transition-colors`}>
                <Check className="w-3.5 h-3.5 text-blue-400" />
              </div>
              <span className="text-slate-300 text-[13px] font-medium leading-relaxed group-hover/item:text-white transition-colors">{feature}</span>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <motion.button
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate('/sign-up')}
          className={`w-full py-5 px-6 rounded-2xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 group/btn ${plan.popular
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20 hover:bg-blue-500 hover:shadow-blue-500/30'
              : 'bg-white/5 text-white border border-white/10 hover:bg-white/10 hover:border-white/20'
            }`}
        >
          {plan.cta}
          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
        </motion.button>
      </div>
    </motion.div>
  );
};

const Pricing = () => {
  return (
    <section id="pricing" className="py-24 lg:py-32 relative overflow-hidden bg-[#020617]">
      <div className="section-container relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-5 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full mb-8"
          >
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-bold text-blue-100 uppercase tracking-widest">Pricing Plans</span>
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter">
            Choose the perfect plan for <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">your career goals</span>
          </h2>
          <p className="text-xl text-slate-400 font-medium">
            Simple, transparent pricing that grows with you. No hidden fees.
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-10 items-stretch max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <PricingCard key={plan.name} plan={plan} index={index} />
          ))}
        </div>

        {/* Trust note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-slate-500 text-xs font-bold uppercase tracking-widest mt-16"
        >
          30-day money-back guarantee • No credit card required for free plan
        </motion.p>
      </div>
    </section>
  );
};

export default Pricing;
