import React, { useState } from 'react';
import { Briefcase, Building, FileText, Lightbulb, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

const InterviewPrep = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [company, setCompany] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);

  const generateQuestions = async () => {
    if (!jobTitle) {
      alert('Please enter a job title');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/ai/interview-questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobTitle, company, jobDescription }),
      });
      const data = await response.json();
      setQuestions(data.questions || []);
    } catch (error) {
      console.error('Failed to generate questions:', error);
      alert('Failed to generate questions. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'behavioral':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'technical':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'situational':
        return 'bg-green-50 text-green-700 border-green-200';
      default:
        return 'bg-stone-50 text-stone-700 border-stone-200';
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-dark mb-3">Interview Preparation Assistant</h2>
        <p className="text-stone-600">Get AI-generated interview questions tailored to your target role</p>
      </div>

      <div className="card p-6 mb-8">
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-dark mb-3">
              <Briefcase size={18} className="text-primary" />
              Job Title *
            </label>
            <input
              type="text"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              placeholder="e.g., Senior Software Engineer"
              className="input-field"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-dark mb-3">
              <Building size={18} className="text-accent" />
              Company (Optional)
            </label>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="e.g., Google, Microsoft"
              className="input-field"
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="flex items-center gap-2 text-sm font-semibold text-dark mb-3">
            <FileText size={18} className="text-green-600" />
            Job Description (Optional)
          </label>
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste the job description for more tailored questions..."
            className="input-field min-h-[120px] resize-none"
          />
        </div>

        <button
          onClick={generateQuestions}
          disabled={loading}
          className="btn-primary w-full py-3"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
              Generating Questions...
            </>
          ) : (
            <>
              <Lightbulb size={20} />
              Generate Interview Questions
            </>
          )}
        </button>
      </div>

      {questions.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <h3 className="text-2xl font-bold text-dark mb-6">Your Interview Questions</h3>
          {questions.map((q, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="card p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex items-start gap-3 flex-1">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-semibold">
                    {idx + 1}
                  </div>
                  <div className="flex-1">
                    <p className="text-lg font-medium text-dark mb-2">{q.question}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium border capitalize ${getTypeColor(q.type)}`}>
                  {q.type}
                </span>
              </div>
              {q.tip && (
                <div className="ml-11 mt-3 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <div className="flex items-start gap-2">
                    <MessageSquare size={16} className="text-amber-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-amber-900 mb-1">Answer Tip:</p>
                      <p className="text-sm text-amber-800">{q.tip}</p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      )}

      {questions.length === 0 && !loading && (
        <div className="text-center py-12">
          <Lightbulb size={48} className="text-stone-300 mx-auto mb-4" />
          <p className="text-stone-500">Enter a job title to generate interview questions</p>
        </div>
      )}
    </div>
  );
};

export default InterviewPrep;
