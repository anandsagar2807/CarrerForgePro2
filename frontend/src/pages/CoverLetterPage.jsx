import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Sparkles, Home, Loader2, Copy, Download, MessageSquare, Search, LayoutGrid, CheckCircle, Shield, Target } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import { useResume } from '../context/ResumeContext';

const CoverLetterPage = () => {
  console.log('CoverLetterPage mounting');
  const { resumeData } = useResume();
  console.log('Resume Data:', resumeData);
  const [jobDescription, setJobDescription] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [tone, setTone] = useState('professional');
  const [coverLetter, setCoverLetter] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const tones = [
    { id: 'professional', label: 'Professional', icon: Shield },
    { id: 'conversational', label: 'Conversational', icon: MessageSquare },
    { id: 'enthusiastic', label: 'Enthusiastic', icon: Sparkles },
    { id: 'concise', label: 'Concise', icon: Target },
  ];

  const generateCoverLetter = async () => {
    console.log('Generating cover letter...');
    if (!jobDescription.trim() || !jobTitle.trim()) return;
    setIsGenerating(true);
    try {
      const resumeText = JSON.stringify(resumeData);
      
      const response = await fetch('http://localhost:5000/api/ai/cover-letter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeText, jdText: jobDescription, tone })
      });
      
      const data = await response.json();
      console.log('API Response:', data);
      setCoverLetter(data.coverLetter || data);
    } catch (error) {
      console.error('Error generating cover letter:', error);
      setCoverLetter('Failed to generate cover letter. Please try again.');
    } finally { setIsGenerating(false); }
  };

  const copyToClipboard = () => { navigator.clipboard.writeText(coverLetter); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  const downloadCoverLetter = () => { const blob = new Blob([coverLetter], { type: 'text/plain' }); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = `cover-letter-${companyName || 'draft'}.txt`; a.click(); URL.revokeObjectURL(url); };

  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-blue-500/30 overflow-x-hidden">
      {/* Premium Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-600/10 rounded-full blur-[120px]" />
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
              <FileText className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-bold text-blue-100 uppercase tracking-widest">AI Letter Architect</span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter"
            >
              Tailored <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Cover Letters</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-slate-400 font-medium"
            >
              Generate high-conversion cover letters that perfectly align your experience with any job description.
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
                    <label className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">Job Title</label>
                    <input
                      type="text"
                      placeholder="e.g. Senior Software Engineer"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
                      value={jobTitle}
                      onChange={(e) => setJobTitle(e.target.value)}
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">Company Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Google"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">Job Description</label>
                    <textarea
                      rows={6}
                      placeholder="Paste the job description here for best results..."
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                      value={jobDescription}
                      onChange={(e) => setJobDescription(e.target.value)}
                    />
                  </div>

                  <div className="space-y-4">
                    <label className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">Letter Tone</label>
                    <div className="grid grid-cols-2 gap-3">
                      {tones.map((t) => (
                        <button
                          key={t.id}
                          onClick={() => setTone(t.id)}
                          className={`flex items-center gap-2 px-4 py-3 rounded-xl border transition-all duration-300 ${
                            tone === t.id
                              ? 'bg-blue-600 border-blue-500 text-white shadow-lg'
                              : 'bg-white/5 border-white/10 text-slate-400 hover:border-white/20'
                          }`}
                        >
                          <t.icon size={16} />
                          <span className="text-xs font-bold">{t.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={generateCoverLetter}
                    disabled={isGenerating || !jobTitle || !jobDescription}
                    className="w-full py-5 bg-gradient-to-r from-blue-600 to-indigo-600 disabled:from-slate-700 disabled:to-slate-800 text-white font-black rounded-2xl shadow-xl shadow-blue-500/20 flex items-center justify-center gap-3 transition-all"
                  >
                    {isGenerating ? (
                      <Loader2 className="w-6 h-6 animate-spin" />
                    ) : (
                      <>
                        <Sparkles size={20} />
                        Generate Masterpiece
                      </>
                    )}
                  </motion.button>
                </div>
              </motion.div>
            </div>

            {/* Output Side */}
            <div className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-1 shadow-2xl overflow-hidden h-full min-h-[600px] flex flex-col"
              >
                <div className="bg-white/5 border-b border-white/10 px-8 py-6 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-red-500/50" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                    <div className="w-3 h-3 rounded-full bg-green-500/50" />
                  </div>
                  <div className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Cover Letter Preview</div>
                  <div className="flex items-center gap-4">
                    {coverLetter && (
                      <>
                        <button onClick={copyToClipboard} className="text-slate-400 hover:text-white transition-colors">
                          {copied ? <CheckCircle size={18} className="text-green-400" /> : <Copy size={18} />}
                        </button>
                        <button onClick={downloadCoverLetter} className="text-slate-400 hover:text-white transition-colors">
                          <Download size={18} />
                        </button>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex-grow p-10 overflow-y-auto custom-scrollbar">
                  {coverLetter ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-slate-300 font-medium leading-[1.8] whitespace-pre-wrap text-lg"
                    >
                      {coverLetter}
                    </motion.div>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-center space-y-6 opacity-40">
                      <div className="w-20 h-20 rounded-3xl border-2 border-dashed border-slate-500 flex items-center justify-center">
                        <FileText size={32} className="text-slate-500" />
                      </div>
                      <div>
                        <p className="text-xl font-bold text-white mb-2">Ready to Build</p>
                        <p className="text-slate-400 max-w-xs mx-auto">Fill in the job details and let AI architect your next big opportunity.</p>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CoverLetterPage;