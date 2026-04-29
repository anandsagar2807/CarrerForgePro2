import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import TrustIndicators from '../components/TrustIndicators';
import ProblemSolution from '../components/ProblemSolution';
import FeatureGrid from '../components/FeatureGrid';
import HowItWorks from '../components/HowItWorks';
import Footer from '../components/Footer';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white text-dark font-sans overflow-x-hidden">
      {/* Animated background gradients */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 left-[-8rem] h-[28rem] w-[28rem] rounded-full bg-blue-400/20 blur-[130px] animate-pulse" />
        <div className="absolute top-1/3 right-[-10rem] h-[30rem] w-[30rem] rounded-full bg-purple-400/20 blur-[140px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-0 left-1/4 h-[25rem] w-[25rem] rounded-full bg-pink-400/20 blur-[130px] animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <Navbar />
      <main className="relative">
        <Hero />
        <TrustIndicators />
        <ProblemSolution />
        <FeatureGrid />
        <HowItWorks />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;