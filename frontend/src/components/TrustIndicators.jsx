import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Award, CheckCircle, Users } from 'lucide-react';

const TrustIndicators = () => {
  const stats = [
    {
      icon: <Users className="h-6 w-6" />,
      value: "50,000+",
      label: "Active Users",
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
    <section className="py-24 lg:py-40 relative">
      <div className="section-container relative z-10">
        {/* Stats Section */}
        <div className="mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-6xl font-black text-white mb-4 tracking-tight">
              Trusted by <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400">50,000+</span> Professionals
            </h2>
            <p className="text-lg text-slate-400 font-bold uppercase tracking-widest">Industry-leading performance metrics</p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-xl rounded-[2.5rem] p-10 text-center border border-white/10 hover:border-white/20 transition-all duration-500 group"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center text-white mx-auto mb-8 shadow-2xl group-hover:scale-110 transition-transform duration-500`}>
                  {stat.icon}
                </div>
                <div className="text-4xl lg:text-5xl font-black text-white mb-2 tracking-tighter">{stat.value}</div>
                <div className="text-xs font-black text-slate-500 uppercase tracking-widest">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Trusted By Companies */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="bg-white/5 backdrop-blur-xl rounded-[3rem] p-12 lg:p-20 border border-white/10"
        >
          <p className="text-center text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-12">
            Zaalima Forge users work at leading tech giants
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12 lg:gap-20 opacity-30 hover:opacity-100 transition-all duration-700">
            {companies.map((company, index) => (
              <motion.img
                key={index}
                initial={{ opacity: 0, filter: 'grayscale(100%)' }}
                whileInView={{ opacity: 1, filter: 'grayscale(100%) brightness(200%)' }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                src={company.logo}
                alt={company.name}
                className="h-6 lg:h-8 w-auto object-contain transition-all duration-500"
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustIndicators;