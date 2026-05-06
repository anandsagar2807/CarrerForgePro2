import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Users, Loader2, Zap, ArrowLeft, ArrowRight, Sparkles, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const InterviewPrepPage = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [company, setCompany] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [questions, setQuestions] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeQuestion, setActiveQuestion] = useState(0);

  const generateQuestions = async () => {
    if (!jobTitle) return;
    setIsGenerating(true);
    try {
      const response = await fetch('http://localhost:5000/api/ai/interview-questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobTitle, company, jobDescription })
      });
      const data = await response.json();
      setQuestions(data.questions || []);
      setActiveQuestion(0);
    } catch (error) {
      console.error('Error:', error);
    } finally { setIsGenerating(false); }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-blue-500/30 overflow-x-hidden">
      {/* Premium Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-600/10 rounded-full blur-[120px]" />
      </div>

      <Navbar isDark={true} />

      <main className="pt-32 pb-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-5 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full mb-8"
            >
              <Users className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-bold text-blue-100 uppercase tracking-widest">AI Interview Coach</span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter"
            >
              Mock <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Interviews</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-slate-400 font-medium"
            >
              Prepare for elite roles with AI-generated questions tailored to your target position and company culture.
            </motion.p>
          </div>

          <div className="grid lg:grid-cols-5 gap-12 items-start">
            {/* Input Side */}
            <div className="lg:col-span-2 space-y-8">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-10 shadow-2xl"
              >
                <div className="space-y-8">
                  <div className="space-y-4">
                    <label className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">Target Role</label>
                    <input
                      type="text"
                      placeholder="e.g. Senior Product Designer"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
                      value={jobTitle}
                      onChange={(e) => setJobTitle(e.target.value)}
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">Company (Optional)</label>
                    <input
                      type="text"
                      placeholder="e.g. Apple"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">Job Description (Optional)</label>
                    <textarea
                      rows={4}
                      placeholder="Paste job requirements for more accurate questions..."
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                      value={jobDescription}
                      onChange={(e) => setJobDescription(e.target.value)}
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={generateQuestions}
                    disabled={isGenerating || !jobTitle}
                    className="w-full py-5 bg-gradient-to-r from-blue-600 to-indigo-600 disabled:from-slate-700 disabled:to-slate-800 text-white font-black rounded-2xl shadow-xl shadow-blue-500/20 flex items-center justify-center gap-3 transition-all"
                  >
                    {isGenerating ? (
                      <Loader2 className="w-6 h-6 animate-spin" />
                    ) : (
                      <>
                        <Zap size={20} />
                        Start Mock Interview
                      </>
                    )}
                  </motion.button>
                </div>
              </motion.div>
            </div>

            {/* Questions Side */}
            <div className="lg:col-span-3">
              {questions.length > 0 ? (
                <div className="space-y-8">
                  {/* Progress bar */}
                  <div className="bg-white/5 rounded-full h-2 overflow-hidden border border-white/5">
                    <motion.div
                      className="bg-blue-600 h-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${((activeQuestion + 1) / questions.length) * 100}%` }}
                    />
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeQuestion}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-12 shadow-2xl relative min-h-[400px] flex flex-col justify-center"
                    >
                      <div className="absolute top-10 left-12">
                        <span className="text-5xl font-black text-blue-600/20">Q{activeQuestion + 1}</span>
                      </div>
                      
                      <div className="relative z-10 space-y-8">
                        <div className="inline-flex px-4 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full text-[10px] font-black uppercase tracking-widest text-blue-400">
                          {questions[activeQuestion].type} Question
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                          {questions[activeQuestion].question}
                        </h2>
                        <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                          <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-3 flex items-center gap-2">
                            <Sparkles size={14} className="text-blue-400" />
                            Coach's Tip
                          </p>
                          <p className="text-slate-400 italic font-medium">
                            {questions[activeQuestion].tip}
                          </p>
                        </div>
                      </div>

                      <div className="mt-12 flex items-center justify-between pt-10 border-t border-white/5">
                        <button
                          onClick={() => setActiveQuestion(prev => Math.max(0, prev - 1))}
                          disabled={activeQuestion === 0}
                          className="p-4 text-slate-500 hover:text-white disabled:opacity-20 transition-colors"
                        >
                          <ArrowLeft size={24} />
                        </button>
                        <span className="text-xs font-black uppercase tracking-widest text-slate-500">
                          Question {activeQuestion + 1} of {questions.length}
                        </span>
                        <button
                          onClick={() => setActiveQuestion(prev => Math.min(questions.length - 1, prev + 1))}
                          disabled={activeQuestion === questions.length - 1}
                          className="p-4 text-slate-500 hover:text-white disabled:opacity-20 transition-colors"
                        >
                          <ArrowRight size={24} />
                        </button>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-20 shadow-2xl h-full flex flex-col items-center justify-center text-center space-y-8 opacity-40"
                >
                  <div className="w-24 h-24 rounded-[2rem] border-2 border-dashed border-slate-500 flex items-center justify-center">
                    <TrendingUp size={40} className="text-slate-500" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-white mb-4">Elite Interview Simulation</h2>
                    <p className="text-slate-400 max-w-sm font-medium">
                      Enter your target role to generate a professional mock interview session powered by Gemini 2.0.
                    </p>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default InterviewPrepPage;
