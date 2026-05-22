import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Twitter, Linkedin, Github, ArrowRight, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const footerLinks = {
  product: [
    { name: 'Features', href: '/#features' },
    { name: 'Templates', href: '/templates' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'FAQ', href: '/#faq' },
  ],
  tools: [
    { name: 'Resume Builder', href: '/builder' },
    { name: 'Resume Analyzer', href: '/analyze' },
    { name: 'Cover Letter', href: '/cover-letter' },
    { name: 'Interview Prep', href: '/interview-prep' },
  ],
  company: [
    { name: 'About', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Careers', href: '/careers' },
    { name: 'Press Kit', href: '/press' },
  ],
  legal: [
    { name: 'Privacy', href: '/privacy' },
    { name: 'Terms', href: '/terms' },
    { name: 'Security', href: '/security' },
    { name: 'Cookies', href: '/cookies' },
  ],
};

const socialLinks = [
  { name: 'Twitter', icon: Twitter, href: '#' },
  { name: 'LinkedIn', icon: Linkedin, href: '#' },
  { name: 'GitHub', icon: Github, href: '#' },
  { name: 'Email', icon: Mail, href: 'mailto:support@resumeforge.pro' },
];

const PremiumFooter = () => {
  return (
    <footer className="bg-[#020617] border-t border-white/5">
      {/* CTA Section */}
      <div className="section-container py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-[3rem] p-12 lg:p-20 overflow-hidden"
        >
          {/* Background decoration */}
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute top-0 right-0 w-[50%] h-[100%] bg-blue-600 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 left-0 w-[50%] h-[100%] bg-indigo-600 rounded-full blur-[120px]" />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-white mb-8 tracking-tighter">
              Ready to land your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">dream job?</span>
            </h2>
            <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto font-medium">
              Join 50,000+ professionals who have transformed their careers with Zaalima Resume Forge Pro.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group inline-flex items-center gap-3 px-10 py-5 bg-white text-slate-900 font-black rounded-2xl hover:bg-blue-50 transition-all duration-300 shadow-2xl"
              >
                Get Started Free
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </motion.button>
              <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">
                No credit card required
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Main Footer Content */}
      <div className="section-container py-20">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-12 lg:gap-16">
          {/* Brand Column */}
          <div className="col-span-2">
            <Link to="/" className="inline-flex items-center gap-3 mb-8 group">
              <div className="p-1.5 bg-white/5 rounded-xl border border-white/10 group-hover:border-blue-500/50 transition-colors">
                <img src="/logo.png" alt="ResumeForge Pro" className="h-8 w-auto" />
              </div>
              <span className="text-2xl font-black text-white tracking-tighter">
                Zaalima<span className="text-blue-500">Forge</span>
              </span>
            </Link>
            <p className="text-slate-400 text-base leading-relaxed mb-8 max-w-xs font-medium">
              Next-generation AI resume builder trusted by elite professionals. Elevate your career with precision AI.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  whileHover={{ y: -4, scale: 1.1 }}
                  href={social.href}
                  className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-slate-400 hover:text-white hover:border-blue-500/50 transition-all shadow-lg"
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="col-span-1">
              <h3 className="text-white font-black uppercase tracking-[0.2em] text-xs mb-8">{title}</h3>
              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-slate-400 hover:text-blue-400 text-sm font-bold transition-colors duration-300"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-24 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-500 text-sm font-bold tracking-wide">
            © 2026 Zaalima Resume Forge Pro. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-slate-500 text-sm font-bold tracking-wide">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" />
            <span>for professionals</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default PremiumFooter;
