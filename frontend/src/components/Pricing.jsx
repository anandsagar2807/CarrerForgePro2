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
      'ATS Score Checker — Free',
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
      'All 15+ premium templates',
      'Advanced AI writing assistant',
      'Unlimited PDF exports',
      'Full ATS optimization',
      'Cover letter generator',
      'LinkedIn integration',
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
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-blue-700 to-blue-900 text-white text-xs font-bold rounded-full shadow-lg">
            <Sparkles className="w-3.5 h-3.5" />
            Most Popular
          </div>
        </div>
      )}

      <div className={`relative bg-white rounded-3xl p-8 border-2 ${plan.popular ? 'border-blue-200 shadow-xl' : 'border-slate-200 shadow-lg'} hover:shadow-xl transition-all duration-300 h-full flex flex-col`}>
        {/* Plan header */}
        <div className="mb-8">
          <div className={`w-12 h-12 bg-gradient-to-br ${plan.gradient} rounded-2xl flex items-center justify-center mb-4 shadow-lg`}>
            <span className="text-white font-bold text-lg">{plan.name[0]}</span>
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-2">{plan.name}</h3>
          <p className="text-slate-500 text-sm">{plan.description}</p>
        </div>

        {/* Price */}
        <div className="mb-8">
          <div className="flex items-baseline gap-1">
            <span className="text-5xl font-bold text-slate-900">{plan.price}</span>
            <span className="text-slate-500 font-medium">{plan.period}</span>
          </div>
        </div>

        {/* Features */}
        <ul className="space-y-4 mb-8 flex-grow">
          {plan.features.map((feature, i) => (
            <li key={i} className="flex items-start gap-3">
              <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${plan.gradient} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                <Check className="w-3 h-3 text-white" />
              </div>
              <span className="text-slate-600 text-sm">{feature}</span>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <motion.button
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate('/templates')}
          className={`w-full py-4 px-6 rounded-2xl font-bold text-base transition-all duration-300 flex items-center justify-center gap-2 group/btn ${plan.popular
            ? 'bg-gradient-to-r from-blue-700 to-blue-900 text-white shadow-lg hover:shadow-xl'
            : 'bg-slate-100 text-slate-900 hover:bg-slate-200'
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
    <section id="pricing" className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl -translate-x-1/2" />
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl translate-x-1/2" />

      <div className="section-container relative">
        {/* Pricing Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 items-center max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <PricingCard key={plan.name} plan={plan} index={index} />
          ))}
        </div>

        {/* Trust note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-slate-400 text-sm mt-12"
        >
          30-day money-back guarantee • No credit card required for free plan
        </motion.p>
      </div>
    </section>
  );
};

export default Pricing;
