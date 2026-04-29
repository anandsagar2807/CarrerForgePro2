import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Features from '../components/Features';
import HowItWorks from '../components/HowItWorks';
import Footer from '../components/Footer';
import { ArrowRight, Check } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="relative bg-stone-50 pt-16 pb-20 lg:pt-24 lg:pb-32">
          <div className="section-container">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                <h1 className="text-4xl lg:text-5xl font-semibold text-stone-900 leading-tight text-balance">
                  Build a resume that gets callbacks
                </h1>

                <p className="text-lg text-stone-500 max-w-lg leading-relaxed">
                  Clean, simple tools to help you create resumes that work. No AI gimmicks, no sign-up required.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    onClick={() => navigate('/builder')}
                    className="btn-primary px-6 py-3 text-base"
                  >
                    Start building
                    <ArrowRight className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => navigate('/analyze')}
                    className="btn-secondary px-6 py-3 text-base"
                  >
                    Analyze existing resume
                  </button>
                </div>

                {/* Benefits */}
                <div className="flex flex-wrap gap-x-6 gap-y-2 pt-4">
                  {[
                    'ATS-friendly output',
                    'PDF export included',
                    'No account required',
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-sm text-stone-500">
                      <Check className="w-4 h-4 text-accent-600" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Right Content - Resume Preview */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <div className="bg-white p-6 rounded-2xl shadow-md border border-stone-100">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 bg-stone-100 rounded-xl flex items-center justify-center text-lg font-semibold text-stone-600">
                      JD
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-stone-900">Jessica Davidson</h3>
                      <p className="text-sm text-accent-600">Engineering Manager</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <p className="text-xs font-medium text-stone-400 uppercase tracking-wide mb-2">Experience</p>
                      <div className="space-y-1.5">
                        <div className="h-1.5 bg-stone-100 rounded-full w-full" />
                        <div className="h-1.5 bg-stone-100 rounded-full w-11/12" />
                        <div className="h-1.5 bg-stone-100 rounded-full w-10/12" />
                      </div>
                    </div>

                    <div>
                      <p className="text-xs font-medium text-stone-400 uppercase tracking-wide mb-2">Skills</p>
                      <div className="flex flex-wrap gap-1.5">
                        {['Product Strategy', 'React', 'Figma', 'Agile'].map((skill) => (
                          <span
                            key={skill}
                            className="px-2 py-0.5 bg-stone-50 text-stone-600 text-xs font-medium rounded border border-stone-100"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 pt-4 border-t border-stone-50">
                    <p className="text-xs text-stone-400">Last updated 3 days ago</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20">
          <div className="section-container">
            <div className="bg-stone-50 rounded-2xl p-8 lg:p-12">
              <Features />
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 bg-stone-50">
          <div className="section-container">
            <HowItWorks />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;