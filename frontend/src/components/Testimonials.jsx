import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Product Manager at Google',
    avatar: 'SC',
    quote: 'ResumeForge Pro helped me land interviews at 3 FAANG companies. The AI suggestions were spot-on and saved me hours of editing.',
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
    quote: 'I was skeptical at first, but the results speak for themselves. 40% more interview callbacks after using ResumeForge Pro.',
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
    quote: 'We recommend ResumeForge Pro to all our candidates. The quality and professionalism is unmatched in the market.',
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
    <div className="relative bg-white/5 backdrop-blur-xl rounded-[2.5rem] p-10 border border-white/10 shadow-sm hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 h-full hover:-translate-y-2 hover:border-blue-500/30">
      {/* Quote icon */}
      <div className="absolute top-8 right-10 w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/5">
        <Quote className="w-6 h-6 text-blue-500/50" />
      </div>

      {/* Stars */}
      <div className="flex items-center gap-1.5 mb-8">
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
        ))}
      </div>

      {/* Quote text */}
      <p className="text-slate-300 leading-relaxed mb-10 text-lg font-medium italic">
        "{testimonial.quote}"
      </p>

      {/* Author */}
      <div className="flex items-center gap-5 pt-8 border-t border-white/5">
        <div className={`w-14 h-14 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center text-white font-black text-lg shadow-xl shadow-blue-500/20`}>
          {testimonial.avatar}
        </div>
        <div>
          <p className="font-bold text-white text-lg tracking-tight">{testimonial.name}</p>
          <p className="text-sm font-bold text-blue-400/80 uppercase tracking-widest">{testimonial.role}</p>
        </div>
      </div>
    </div>
  </motion.div>
);

const Testimonials = () => {
  return (
    <section className="py-24 lg:py-32 relative overflow-hidden bg-[#020617]">
      <div className="section-container relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-5 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full mb-8"
          >
            <Star className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-bold text-blue-100 uppercase tracking-widest">User Success Stories</span>
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter">
            Trusted by <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">50,000+</span> professionals
          </h2>
          <p className="text-xl text-slate-400 font-medium">
            See how ResumeForge Pro is helping job seekers land their dream roles at top companies worldwide.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
