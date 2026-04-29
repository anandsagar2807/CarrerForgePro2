import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import InterviewPrep from '../components/InterviewPrep';
import { Briefcase, MessageSquare, Sparkles } from 'lucide-react';

const InterviewPrepPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#f4f0e8]">
      <Navbar />
      <main className="flex-1 py-12">
        <InterviewPrep />
      </main>
      <Footer />
    </div>
  );
};

export default InterviewPrepPage;
