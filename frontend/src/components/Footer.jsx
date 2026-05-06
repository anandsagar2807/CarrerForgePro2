import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#020617] border-t border-white/5 pt-24 pb-12">
      <div className="section-container">
        {/* Top Section */}
        <div className="grid lg:grid-cols-4 gap-12 lg:gap-20 mb-20">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-8 group">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000" />
                <img src="/logo.png" alt="Logo" className="relative h-10 w-auto" />
              </div>
              <span className="text-2xl font-black text-white tracking-tight">
                Zaalima<span className="text-blue-500">Forge</span>
              </span>
            </Link>
            <p className="text-slate-400 text-lg font-medium mb-10 max-w-md leading-relaxed">
              The world's most advanced AI-powered career platform. Engineered for professionals who demand excellence.
            </p>
            
            {/* Newsletter */}
            <div className="relative max-w-sm">
              <input 
                type="email" 
                placeholder="Join our elite community"
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
              />
              <button className="absolute right-2 top-2 bottom-2 px-4 bg-blue-600 text-white rounded-xl hover:bg-blue-500 transition-colors">
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 gap-12">
            <div>
              <h4 className="text-xs font-black text-white uppercase tracking-[0.2em] mb-8">Platform</h4>
              <ul className="space-y-4">
                {['Templates', 'ATS Checker', 'AI Chat', 'Pricing'].map(item => (
                  <li key={item}>
                    <Link to="#" className="text-slate-500 hover:text-blue-400 font-bold text-sm transition-colors">{item}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-black text-white uppercase tracking-[0.2em] mb-8">Legal</h4>
              <ul className="space-y-4">
                {['Privacy', 'Terms', 'Cookies', 'Security'].map(item => (
                  <li key={item}>
                    <Link to="#" className="text-slate-500 hover:text-blue-400 font-bold text-sm transition-colors">{item}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-xs font-black text-slate-600 uppercase tracking-widest">
            © {currentYear} Zaalima Forge Pro. All rights reserved.
          </p>
          <div className="flex gap-8">
            {['Twitter', 'LinkedIn', 'GitHub'].map(social => (
              <a key={social} href="#" className="text-slate-600 hover:text-white transition-colors">
                <span className="text-xs font-black uppercase tracking-widest">{social}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;