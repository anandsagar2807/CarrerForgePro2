import React, { useState } from 'react';
import { Sparkles, FileText, Lightbulb, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const ResumeAnalyzer = () => {
  const [bulletPoint, setBulletPoint] = useState('');
  const [keyword, setKeyword] = useState('');
  const [loading, setLoading] = useState(false);
  const [rewritten, setRewritten] = useState('');

  const rewriteBullet = async () => {
    if (!bulletPoint) {
      alert('Please enter a bullet point');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/ai/rewrite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bullet: bulletPoint, keyword }),
      });
      const data = await response.json();
      setRewritten(data.rewritten);
    } catch (error) {
      console.error('Rewrite failed:', error);
      alert('Failed to rewrite. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-dark mb-3">AI Resume Bullet Rewriter</h2>
        <p className="text-stone-600">Transform your bullet points into impactful, ATS-optimized statements</p>
      </div>

      <div className="card p-6 mb-6">
        <label className="flex items-center gap-2 text-sm font-semibold text-dark mb-3">
          <FileText size={18} className="text-primary" />
          Your Bullet Point
        </label>
        <textarea
          value={bulletPoint}
          onChange={(e) => setBulletPoint(e.target.value)}
          placeholder="e.g., Worked on improving the website performance"
          className="input-field min-h-[120px] resize-none mb-4"
        />

        <label className="flex items-center gap-2 text-sm font-semibold text-dark mb-3">
          <Lightbulb size={18} className="text-accent" />
          Target Keyword (Optional)
        </label>
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="e.g., React, Leadership, Data Analysis"
          className="input-field mb-6"
        />

        <button
          onClick={rewriteBullet}
          disabled={loading}
          className="btn-primary w-full py-3"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
              Rewriting...
            </>
          ) : (
            <>
              <Sparkles size={20} />
              Rewrite with AI
            </>
          )}
        </button>
      </div>

      {rewritten && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card p-6 border-2 border-primary-100 bg-gradient-to-br from-primary-50/30 to-white"
        >
          <div className="flex items-center gap-2 mb-4">
            <Zap className="text-primary" size={20} />
            <h3 className="text-lg font-semibold text-dark">AI-Optimized Version</h3>
          </div>
          <p className="text-stone-800 leading-relaxed text-base">{rewritten}</p>
          <button
            onClick={() => {
              navigator.clipboard.writeText(rewritten);
              alert('Copied to clipboard!');
            }}
            className="btn-secondary mt-4"
          >
            Copy to Clipboard
          </button>
        </motion.div>
      )}

      <div className="mt-8 grid md:grid-cols-3 gap-4">
        <div className="card p-4 text-center">
          <div className="text-primary text-2xl font-bold mb-1">XYZ Formula</div>
          <p className="text-sm text-stone-600">Accomplished X, measured by Y, by doing Z</p>
        </div>
        <div className="card p-4 text-center">
          <div className="text-accent text-2xl font-bold mb-1">Action Verbs</div>
          <p className="text-sm text-stone-600">Strong, impactful language that stands out</p>
        </div>
        <div className="card p-4 text-center">
          <div className="text-green-600 text-2xl font-bold mb-1">Quantified</div>
          <p className="text-sm text-stone-600">Numbers and metrics that prove impact</p>
        </div>
      </div>
    </div>
  );
};

export default ResumeAnalyzer;
