import React from 'react';
import { motion } from 'framer-motion';
import { Users, TrendingUp, Award, Clock, Star } from 'lucide-react';

const stats = [
  {
    icon: <Users className="h-5 w-5" />,
    value: '50k+',
    label: 'Active Users',
    description: 'Professionals trust our platform',
    color: 'bg-primary-50 text-primary-600',
  },
  {
    icon: <TrendingUp className="h-5 w-5" />,
    value: '48%',
    label: 'Interview Boost',
    description: 'Average increase in responses',
    color: 'bg-green-50 text-green-600',
  },
  {
    icon: <Award className="h-5 w-5" />,
    value: '12%',
    label: 'Salary Increase',
    description: 'Reported by our users',
    color: 'bg-accent-50 text-accent-600',
  },
  {
    icon: <Clock className="h-5 w-5" />,
    value: '5 min',
    label: 'Avg. Creation',
    description: 'From start to finished resume',
    color: 'bg-orange-50 text-orange-600',
  },
];

const companies = [
  { name: 'Google', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg' },
  { name: 'Microsoft', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg' },
  { name: 'Amazon', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg' },
  { name: 'Meta', logo: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg' },
];

const SocialProof = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="section-container">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="rounded-2xl border border-[#eadfcd] bg-white/75 backdrop-blur-sm p-6 text-center shadow-[0_10px_25px_rgba(70,57,38,0.07)]"
            >
              <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                {stat.icon}
              </div>
              <div className="text-3xl font-bold text-dark mb-1">{stat.value}</div>
              <div className="text-sm font-medium text-stone-600 mb-1">{stat.label}</div>
              <div className="text-xs text-stone-500">{stat.description}</div>
            </motion.div>
          ))}
        </div>

        {/* Trusted By */}
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-stone-500 mb-8 uppercase tracking-wider">
            Trusted by professionals at leading companies
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            {companies.map((company, index) => (
              <motion.img
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                src={company.logo}
                alt={company.name}
                className="h-6 md:h-8 w-auto object-contain"
              />
            ))}
          </div>
        </div>

        {/* Testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white/85 rounded-3xl shadow-[0_16px_45px_rgba(56,46,32,0.1)] border border-[#ecdfcb] p-8 md:p-12 backdrop-blur-sm"
        >
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl overflow-hidden flex-shrink-0 border-4 border-stone-100">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400"
                alt="Sarah Chen"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 text-center md:text-left">
              <div className="flex justify-center md:justify-start gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <svg key={i} className="w-5 h-5 text-amber-400 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <p className="text-lg md:text-xl text-stone-700 italic mb-6 leading-relaxed">
                "The AI optimization was a game-changer. I went from sending 50+ resumes with zero replies to getting 3 interview invites in my first week."
              </p>
              <div>
                <div className="font-semibold text-dark">Sarah Chen</div>
                <div className="text-sm text-stone-500">Senior Product Designer at Google</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SocialProof;
