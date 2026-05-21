import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Product Manager at Google',
    avatar: 'SC',
    quote: 'CareerForge Pro helped me land interviews at 3 FAANG companies. The AI suggestions were spot-on and saved me hours of editing.',
    rating: 5,
    gradient: 'from-blue-700 to-blue-900'
  },
  {
    name: 'Marcus Johnson',
    role: 'Software Engineer at Microsoft',
    avatar: 'MJ',
    quote: 'The ATS optimization feature is incredible. I went from zero callbacks to 5 interviews in just two weeks. Best investment in my career.',
    rating: 5,
    gradient: 'from-blue-700 to-blue-900'
  },
  {
    name: 'Emily Rodriguez',
    role: 'Marketing Director at Meta',
    avatar: 'ER',
    quote: 'Finally, a resume builder that understands modern hiring. The templates are stunning and the AI writing assistant is a game-changer.',
    rating: 5,
    gradient: 'from-blue-700 to-blue-900'
  },
  {
    name: 'David Kim',
    role: 'Data Scientist at Amazon',
    avatar: 'DK',
    quote: 'I was skeptical at first, but the results speak for themselves. 40% more interview callbacks after using CareerForge Pro.',
    rating: 5,
    gradient: 'from-blue-700 to-blue-900'
  },
  {
    name: 'Lisa Thompson',
    role: 'UX Designer at Apple',
    avatar: 'LT',
    quote: 'The design quality is exceptional. My resume finally matches the caliber of my portfolio. Worth every penny.',
    rating: 5,
    gradient: 'from-blue-700 to-blue-900'
  },
  {
    name: 'James Wilson',
    role: 'VP Engineering at Stripe',
    avatar: 'JW',
    quote: 'We recommend CareerForge Pro to all our candidates. The quality and professionalism is unmatched in the market.',
    rating: 5,
    gradient: 'from-blue-700 to-blue-900'
  }
];

const TestimonialCard = ({ testimonial, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="group relative"
  >
    <div className="relative bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 h-full">
      {/* Quote icon */}
      <div className="absolute top-6 right-6 w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center">
        <Quote className="w-5 h-5 text-slate-300" />
      </div>

      {/* Stars */}
      <div className="flex items-center gap-1 mb-6">
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
        ))}
      </div>

      {/* Quote text */}
      <p className="text-slate-600 leading-relaxed mb-8 text-base">
        "{testimonial.quote}"
      </p>

      {/* Author */}
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 bg-gradient-to-br ${testimonial.gradient} rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-md`}>
          {testimonial.avatar}
        </div>
        <div>
          <p className="font-semibold text-slate-900">{testimonial.name}</p>
          <p className="text-sm text-slate-500">{testimonial.role}</p>
        </div>
      </div>
    </div>
  </motion.div>
);

const Testimonials = () => {
  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      <div className="section-container">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-200 rounded-full mb-6"
          >
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <span className="text-sm font-semibold text-slate-700">Trusted by 50,000+ professionals</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 tracking-tight"
          >
            Loved by job seekers
            <br />
            <span className="text-blue-800">
              worldwide
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-500"
          >
            See what professionals are saying about their experience with CareerForge Pro
          </motion.p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={testimonial.name} testimonial={testimonial} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
