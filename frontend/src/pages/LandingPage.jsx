import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import TrustIndicators from '../components/TrustIndicators';
import FeatureGrid from '../components/FeatureGrid';
import HowItWorks from '../components/HowItWorks';
import Footer from '../components/Footer';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans overflow-x-hidden">
      {/* Premium Animated background gradients */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 left-[-8rem] h-[35rem] w-[35rem] rounded-full bg-blue-600/10 blur-[150px] animate-pulse" />
        <div className="absolute top-1/3 right-[-10rem] h-[40rem] w-[40rem] rounded-full bg-indigo-600/10 blur-[160px] animate-pulse" style={{ animationDelay: '1.5s' }} />
        <div className="absolute bottom-0 left-1/4 h-[30rem] w-[30rem] rounded-full bg-violet-600/10 blur-[140px] animate-pulse" style={{ animationDelay: '3s' }} />
        
        {/* Decorative Grid */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      </div>

      <Navbar isDark={true} />
      <main className="relative">
        <Hero />
        <TrustIndicators />
        <FeatureGrid />
        <HowItWorks />
      </main>
    </div>
  );
};

export default LandingPage;