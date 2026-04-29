import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Sparkles, Home, Loader2, Copy, Download, MessageSquare, Search, LayoutGrid, CheckCircle } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useResume } from '../context/ResumeContext';

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

const CoverLetterPage = () => {
  const { resumeData } = useResume();
  const [jobDescription, setJobDescription] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [tone, setTone] = useState('professional');
  const [coverLetter, setCoverLetter] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const tones = ['professional', 'conversational', 'enthusiastic', 'concise'];

  const generateCoverLetter = async () => {
    if (!jobDescription.trim() || !jobTitle.trim()) return;
    setIsGenerating(true);
    try {
      const resumeText = [
        resumeData.personalInfo.fullName,
        resumeData.personalInfo.summary,
        ...resumeData.experience.map(e => `${e.position} at ${e.company}: ${e.description}`),
        ...resumeData.skills.map(s => s.name),
        ...resumeData.education.map(e => `${e.degree} in ${e.field} from ${e.institution}`),
      ].join('. ');

      if (GROQ_API_KEY) {
        const response = await fetch(GROQ_API_URL, {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${GROQ_API_KEY}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({
            model: 'llama-3.1-70b-versatile',
            messages: [
              { role: 'system', content: `You are an expert cover letter writer. Generate a compelling ${tone} cover letter. Be tailored to the role, highlight relevant experience, show enthusiasm. 3-4 paragraphs. Return ONLY the cover letter text.` },
              { role: 'user', content: `My Resume: ${resumeText}\n\nJob Title: ${jobTitle}\nCompany: ${companyName || 'the company'}\nJob Description: ${jobDescription}\n\nGenerate a ${tone} cover letter.` }
            ],
            temperature: 0.7, max_tokens: 1500
          })
        });
        if (!response.ok) throw new Error(`API error: ${response.status}`);
        const data = await response.json();
        setCoverLetter(data.choices[0]?.message?.content || 'Failed to generate.');
      } else {
        setCoverLetter(`Dear Hiring Manager,\n\nI am writing to express my strong interest in the ${jobTitle} position at ${companyName || 'your company'}. With my background in ${resumeData.skills.slice(0, 3).map(s => s.name).join(', ')} and experience as ${resumeData.experience[0]?.position || 'a professional'}, I am confident I would be a valuable addition to your team.\n\n${resumeData.personalInfo.summary || 'My professional experience has equipped me with the skills necessary to excel in this role.'}\n\nI would welcome the opportunity to discuss how my qualifications can contribute to ${companyName || 'your company'}'s continued success.\n\nBest regards,\n${resumeData.personalInfo.fullName || 'Your Name'}`);
      }
    } catch (error) {
      console.error('Error:', error);
      setCoverLetter('Failed to generate cover letter. Please try again.');
    } finally { setIsGenerating(false); }
  };

  const copyToClipboard = () => { navigator.clipboard.writeText(coverLetter); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  const downloadCoverLetter = () => { const blob = new Blob([coverLetter], { type: 'text/plain' }); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = `cover-letter-${companyName || 'draft'}.txt`; a.click(); URL.revokeObjectURL(url); };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#f4f0e8] via-[#fbf9f5] to-[#e8edf8]">
      <Navbar />
      <div className="bg-white/60 backdrop-blur-sm border-b border-[#e9dfcf]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-sm">
            <Link to="/" className="flex items-center gap-1.5 text-slate-500 hover:text-[#7d5f3f] transition-colors"><Home className="h-4 w-4" />Home</Link>
            <span className="text-slate-300">/</span>
            <span className="text-[#7d5f3f] font-semibold">Cover Letter Generator</span>
          </nav>
        </div>
      </div>
      <div className="bg-white/80 backdrop-blur-md border-b border-[#e9dfcf] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3 flex-wrap">
              <Link to="/templates" className="flex items-center gap-2 bg-slate-100 text-slate-500 px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-slate-200 transition-colors"><LayoutGrid className="h-4 w-4" />Templates</Link>
              <Link to="/analyze" className="flex items-center gap-2 bg-slate-100 text-slate-500 px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-slate-200 transition-colors"><Search className="h-4 w-4" />ATS Analysis</Link>
              <div className="flex items-center gap-2 bg-[#7d5f3f]/10 text-[#7d5f3f] px-3 py-1.5 rounded-lg text-sm font-semibold"><FileText className="h-4 w-4" />Cover Letter</div>
            </div>
            <Link to="/chat" className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-[#7d5f3f] transition-colors px-3 py-2 rounded-lg hover:bg-[#7d5f3f]/5"><MessageSquare className="h-4 w-4" />AI Assistant</Link>
          </div>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-[#7d5f3f]/10 text-[#7d5f3f] px-4 py-2 rounded-full text-sm font-semibold mb-4"><Sparkles className="h-4 w-4" />AI-Powered</div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">Cover Letter Generator</h1>
          <p className="text-slate-600 max-w-2xl mx-auto">Generate a tailored, professional cover letter using your resume data and the job description.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-white/90 rounded-2xl p-6 border border-[#e8dcc8] shadow-lg shadow-slate-200/50">
              <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2"><FileText className="h-5 w-5 text-[#7d5f3f]" />Job Details</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Job Title *</label>
                  <input type="text" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} placeholder="e.g. Senior Software Engineer" className="w-full px-4 py-2.5 border border-[#dfd2be] rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Company Name</label>
                  <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="e.g. Google" className="w-full px-4 py-2.5 border border-[#dfd2be] rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Job Description *</label>
                  <textarea value={jobDescription} onChange={(e) => setJobDescription(e.target.value)} placeholder="Paste the job description here..." rows={6} className="w-full px-4 py-2.5 border border-[#dfd2be] rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-sm resize-none" />
                </div>
              </div>
            </div>
            <div className="bg-white/90 rounded-2xl p-6 border border-[#e8dcc8] shadow-lg shadow-slate-200/50">
              <h2 className="text-lg font-bold text-slate-900 mb-4">Tone</h2>
              <div className="grid grid-cols-2 gap-3">
                {tones.map((t) => (
                  <button key={t} onClick={() => setTone(t)} className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${tone === t ? 'bg-[#7d5f3f] text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            <button onClick={generateCoverLetter} disabled={isGenerating || !jobTitle.trim() || !jobDescription.trim()} className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3.5 px-6 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed">
              {isGenerating ? <><Loader2 className="h-5 w-5 animate-spin" />Generating...</> : <><Sparkles className="h-5 w-5" />Generate Cover Letter</>}
            </button>
          </div>

          <div className="space-y-4">
            <div className="bg-white/90 rounded-2xl p-6 border border-[#e8dcc8] shadow-lg shadow-slate-200/50 min-h-[400px] flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-slate-900">Your Cover Letter</h2>
                {coverLetter && (
                  <div className="flex items-center gap-2">
                    <button onClick={copyToClipboard} className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 text-slate-600 rounded-lg text-xs font-medium hover:bg-slate-200 transition-colors">
                      {copied ? <CheckCircle className="h-3.5 w-3.5 text-green-500" /> : <Copy className="h-3.5 w-3.5" />}{copied ? 'Copied!' : 'Copy'}
                    </button>
                    <button onClick={downloadCoverLetter} className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 text-slate-600 rounded-lg text-xs font-medium hover:bg-slate-200 transition-colors">
                      <Download className="h-3.5 w-3.5" />Download
                    </button>
                  </div>
                )}
              </div>
              {coverLetter ? (
                <div className="flex-1 whitespace-pre-wrap text-sm text-slate-700 leading-relaxed overflow-auto">{coverLetter}</div>
              ) : (
                <div className="flex-1 flex items-center justify-center text-slate-400 text-sm">Your generated cover letter will appear here</div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CoverLetterPage;