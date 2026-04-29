import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, Home, Send, Loader2, Sparkles, FileText, Search, LayoutGrid, Bot, User, Trash2 } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useResume } from '../context/ResumeContext';

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

const SYSTEM_PROMPT = `You are ResumeForge AI Assistant, an expert career advisor and resume writing assistant. You help users with resume writing, ATS optimization, interview prep, career guidance, cover letters, and skill development.

IMPORTANT RULES:
- Write like a friendly human career advisor, not a bot
- Never use asterisks (*) or markdown formatting in your responses
- Use natural conversational language
- Be concise, actionable, and warm
- Use line breaks for readability, but no special formatting characters
- Speak directly to the user as if you're having a conversation`;

const suggestedQuestions = [
  "How can I make my resume stand out?",
  "What are the most important ATS keywords?",
  "How do I write a strong summary?",
  "Tips for describing work experience?",
  "How to handle employment gaps?",
  "What skills should I highlight?",
];

const ChatPage = () => {
  const { resumeData } = useResume();
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hi! I'm your ResumeForge AI Assistant. I can help with resume writing, ATS optimization, interview prep, and career advice. What would you like to know?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Only scroll to bottom of messages, not to top of page
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [messages]);

  const sendMessage = async (text = input) => {
    if (!text.trim() || isLoading) return;
    const userMessage = { role: 'user', content: text.trim() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const resumeContext = resumeData?.personalInfo?.fullName
        ? `\n\nUser's resume: Name: ${resumeData.personalInfo.fullName}, Skills: ${resumeData.skills?.map(s => s.name).join(', ') || 'N/A'}, Experience: ${resumeData.experience?.map(e => `${e.position} at ${e.company}`).join(', ') || 'N/A'}`
        : '';

      if (GROQ_API_KEY) {
        const apiMessages = [
          { role: 'system', content: SYSTEM_PROMPT + resumeContext },
          ...messages.filter(m => m.role === 'user' || m.role === 'assistant').slice(-10),
          userMessage
        ];
        const response = await fetch(GROQ_API_URL, {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${GROQ_API_KEY}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({ model: 'llama-3.3-70b-versatile', messages: apiMessages, temperature: 0.7, max_tokens: 1000 })
        });
        if (!response.ok) throw new Error(`API error: ${response.status}`);
        const data = await response.json();
        let aiResponse = data.choices[0]?.message?.content || 'Sorry, I could not generate a response.';
        // Remove asterisks and markdown formatting
        aiResponse = aiResponse.replace(/\*\*/g, '').replace(/\*/g, '').replace(/#{1,6}\s/g, '');
        setMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: "I'd be happy to help! Please configure the VITE_GROQ_API_KEY in your .env file to enable AI-powered responses.\n\nIn the meantime, here are some quick tips:\n\n1. Tailor your resume to each job\n2. Use action verbs for bullet points\n3. Quantify achievements with numbers\n4. Keep it concise - 1-2 pages\n5. Use ATS-friendly formatting" }]);
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' }]);
    } finally { setIsLoading(false); }
  };

  const handleKeyDown = (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } };
  const clearChat = () => setMessages([{ role: 'assistant', content: "Chat cleared! How can I help you?" }]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#f4f0e8] via-[#fbf9f5] to-[#e8edf8]">
      <Navbar />
      <div className="bg-white/60 backdrop-blur-sm border-b border-[#e9dfcf]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-sm">
            <Link to="/" className="flex items-center gap-1.5 text-slate-500 hover:text-[#7d5f3f] transition-colors"><Home className="h-4 w-4" />Home</Link>
            <span className="text-slate-300">/</span>
            <span className="text-[#7d5f3f] font-semibold">AI Assistant</span>
          </nav>
        </div>
      </div>
      <div className="bg-white/80 backdrop-blur-md border-b border-[#e9dfcf] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3 flex-wrap">
              <Link to="/templates" className="flex items-center gap-2 bg-slate-100 text-slate-500 px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-slate-200 transition-colors"><LayoutGrid className="h-4 w-4" />Templates</Link>
              <Link to="/analyze" className="flex items-center gap-2 bg-slate-100 text-slate-500 px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-slate-200 transition-colors"><Search className="h-4 w-4" />ATS Analysis</Link>
              <Link to="/cover-letter" className="flex items-center gap-2 bg-slate-100 text-slate-500 px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-slate-200 transition-colors"><FileText className="h-4 w-4" />Cover Letter</Link>
            </div>
            <div className="flex items-center gap-2 bg-[#7d5f3f]/10 text-[#7d5f3f] px-3 py-1.5 rounded-lg text-sm font-semibold"><MessageSquare className="h-4 w-4" />AI Assistant</div>
          </div>
        </div>
      </div>

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 flex items-center gap-2"><Sparkles className="h-7 w-7 text-[#7d5f3f]" />AI Career Assistant</h1>
            <p className="text-slate-600 text-sm mt-1">Powered by Groq AI — Get personalized resume & career advice</p>
          </div>
          <button onClick={clearChat} className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 text-slate-500 rounded-lg text-xs font-medium hover:bg-slate-200 transition-colors"><Trash2 className="h-3.5 w-3.5" />Clear</button>
        </div>

        <div className="flex-1 bg-white/90 rounded-2xl border border-[#e8dcc8] shadow-lg shadow-slate-200/50 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-auto p-6 space-y-4" style={{ maxHeight: 'calc(100vh - 380px)' }}>
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.role === 'assistant' && <div className="flex-shrink-0 w-8 h-8 bg-[#7d5f3f]/10 rounded-full flex items-center justify-center"><Bot className="h-4 w-4 text-[#7d5f3f]" /></div>}
                <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${msg.role === 'user' ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-br-md' : 'bg-slate-100 text-slate-700 rounded-bl-md'}`}>
                  <div className="whitespace-pre-wrap">{msg.content}</div>
                </div>
                {msg.role === 'user' && <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center"><User className="h-4 w-4 text-white" /></div>}
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-[#7d5f3f]/10 rounded-full flex items-center justify-center"><Bot className="h-4 w-4 text-[#7d5f3f]" /></div>
                <div className="bg-slate-100 px-4 py-3 rounded-2xl rounded-bl-md"><Loader2 className="h-4 w-4 animate-spin text-slate-400" /></div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {messages.length <= 1 && (
            <div className="px-6 pb-4">
              <p className="text-xs font-medium text-slate-500 mb-2">Try asking:</p>
              <div className="flex flex-wrap gap-2">
                {suggestedQuestions.map((q, i) => (
                  <button key={i} onClick={() => sendMessage(q)} className="px-3 py-1.5 bg-slate-50 border border-slate-200 text-slate-600 rounded-lg text-xs font-medium hover:bg-slate-100 hover:border-[#7d5f3f] hover:text-[#7d5f3f] transition-all">{q}</button>
                ))}
              </div>
            </div>
          )}

          <div className="border-t border-[#e8dcc8] p-4">
            <div className="flex items-center gap-3">
              <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleKeyDown} placeholder="Ask about resumes, ATS, interviews, careers..." className="flex-1 px-4 py-3 border border-[#dfd2be] rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-sm" disabled={isLoading} />
              <button onClick={() => sendMessage()} disabled={isLoading || !input.trim()} className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md"><Send className="h-5 w-5" /></button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ChatPage;