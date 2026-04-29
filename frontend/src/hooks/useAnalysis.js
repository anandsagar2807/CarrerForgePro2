import { useState, useCallback } from 'react';
import { aiService } from '../services/aiService';

export const useAnalysis = () => {
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState([]);

  const analyzeJD = useCallback(async (jdText) => {
    setAnalyzing(true);
    setError(null);
    try {
      const data = await aiService.analyzeJD(jdText);
      setResults(data);
      setHistory((prev) => [{
        id: Date.now(),
        type: 'jd-analysis',
        jdText: jdText.slice(0, 100) + '...',
        results: data,
        timestamp: new Date().toISOString(),
      }, ...prev.slice(0, 9)]);
      return data;
    } catch (err) {
      const message = err.response?.data?.message || 'Analysis failed';
      setError(message);
      throw new Error(message);
    } finally {
      setAnalyzing(false);
    }
  }, []);

  const getATSScore = useCallback(async (resumeText, jdText) => {
    setAnalyzing(true);
    setError(null);
    try {
      const data = await aiService.getATSScore(resumeText, jdText);
      setResults(data);
      setHistory((prev) => [{
        id: Date.now(),
        type: 'ats-score',
        score: data.score,
        missingKeywords: data.missingKeywords,
        timestamp: new Date().toISOString(),
      }, ...prev.slice(0, 9)]);
      return data;
    } catch (err) {
      const message = err.response?.data?.message || 'ATS scoring failed';
      setError(message);
      throw new Error(message);
    } finally {
      setAnalyzing(false);
    }
  }, []);

  const rewriteBullet = useCallback(async (bullet, keyword) => {
    setAnalyzing(true);
    setError(null);
    try {
      const data = await aiService.rewriteBullet(bullet, keyword);
      return data;
    } catch (err) {
      const message = err.response?.data?.message || 'Rewrite failed';
      setError(message);
      throw new Error(message);
    } finally {
      setAnalyzing(false);
    }
  }, []);

  const clearResults = useCallback(() => {
    setResults(null);
    setError(null);
  }, []);

  return {
    analyzing,
    results,
    error,
    history,
    analyzeJD,
    getATSScore,
    rewriteBullet,
    clearResults,
  };
};