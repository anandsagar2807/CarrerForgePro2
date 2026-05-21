import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, TrendingUp, Award, CheckCircle, Users } from 'lucide-react';

const TrustIndicators = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Software Engineer at Google",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
      rating: 5,
      text: "I got 5 interview calls in just 2 weeks after using CareerForge! The ATS optimization really works. Highly recommend!",
      stat: "5 interviews",
      statLabel: "in 2 weeks"
    },
    {
      name: "Michael Chen",
      role: "Product Manager at Microsoft",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
      rating: 5,
      text: "The AI suggestions helped me highlight my achievements better. Landed my dream job with a 20% salary increase!",
      stat: "+20%",
      statLabel: "salary boost"
    },
    {
      name: "Emily Rodriguez",
      role: "Marketing Director at Amazon",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200",
      rating: 5,
      text: "Best resume builder I've used. The templates are professional and the ATS score checker is incredibly accurate.",
      stat: "94%",
      statLabel: "ATS score"
    },
    {
      name: "David Park",
      role: "Data Scientist at Meta",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
      rating: 5,
      text: "Created my resume in under 10 minutes. The AI-powered content generation saved me hours of work!",
      stat: "10 min",
      statLabel: "to complete"
    },
    {
      name: "Jessica Lee",
      role: "UX Designer at Apple",
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=200",
      rating: 5,
      text: "The keyword matching feature is brilliant. My resume now perfectly aligns with job descriptions.",
      stat: "100%",
      statLabel: "match rate"
    },
    {
      name: "Alex Thompson",
      role: "DevOps Engineer at Netflix",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200",
      rating: 5,
      text: "Finally, a resume builder that understands ATS systems. Got past the screening at every company I applied to!",
      stat: "100%",
      statLabel: "pass rate"
    }
  ];

  const stats = [
    {
      icon: <Users className="h-6 w-6" />,
      value: "50,000+",
      label: "Happy Users",
      color: "from-blue-600 to-cyan-600"
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      value: "92%",
      label: "ATS Success Rate",
      color: "from-green-600 to-emerald-600"
    },
    {
      icon: <Award className="h-6 w-6" />,
      value: "4.9/5",
      label: "Average Rating",
      color: "from-amber-600 to-orange-600"
    },
    {
      icon: <CheckCircle className="h-6 w-6" />,
      value: "2,847",
      label: "5-Star Reviews",
      color: "from-purple-600 to-pink-600"
    }
  ];

  const companies = [
    { name: "Google", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
    { name: "Microsoft", logo: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg" },
    { name: "Amazon", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
    { name: "Meta", logo: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg" },
    { name: "Apple", logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" },
    { name: "Netflix", logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" }
  ];

  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-400 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-400 rounded-full blur-3xl" />
      </div>

      <div className="section-container relative z-10">
        {/* Stats Section */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Trusted by <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">50,000+</span> Professionals
            </h2>
            <p className="text-lg text-slate-600">Join thousands who landed their dream jobs</p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 text-center border-2 border-slate-100 hover:border-transparent hover:shadow-xl transition-all duration-300"
              >
                <div className={`w-14 h-14 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center text-white mx-auto mb-4`}>
                  {stat.icon}
                </div>
                <div className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">{stat.value}</div>
                <div className="text-sm font-medium text-slate-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Trusted By Companies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <p className="text-center text-sm font-semibold text-slate-500 uppercase tracking-wider mb-8">
            Our users work at leading companies
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-60 hover:opacity-100 transition-opacity duration-500">
            {companies.map((company, index) => (
              <motion.img
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                src={company.logo}
                alt={company.name}
                className="h-6 md:h-8 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
              />
            ))}
          </div>
        </motion.div>

        {/* Testimonials Section */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 border border-amber-200 rounded-full text-sm font-semibold text-amber-700 mb-6">
              <Star className="h-4 w-4 fill-amber-600" />
              4.9/5 from 2,847 reviews
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              What Our Users Say
            </h2>
            <p className="text-lg text-slate-600">Real success stories from real people</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 border-2 border-slate-100 hover:border-blue-200 hover:shadow-xl transition-all duration-300 relative"
              >
                {/* Quote Icon */}
                <div className="absolute -top-3 -left-3 w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                  <Quote className="h-5 w-5 text-white" />
                </div>

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-slate-700 mb-6 leading-relaxed">{testimonial.text}</p>

                {/* Stat Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-full mb-6">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-bold text-green-700">{testimonial.stat}</span>
                  <span className="text-xs text-green-600">{testimonial.statLabel}</span>
                </div>

                {/* User Info */}
                <div className="flex items-center gap-3">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-slate-200"
                  />
                  <div>
                    <div className="font-semibold text-slate-900">{testimonial.name}</div>
                    <div className="text-sm text-slate-600">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Trust Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-6 px-8 py-4 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl">
            <CheckCircle className="h-8 w-8 text-green-600" />
            <div className="text-left">
              <div className="font-bold text-slate-900 text-lg">Join 50,000+ successful job seekers</div>
              <div className="text-sm text-slate-600">Start building your winning resume today</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustIndicators;
