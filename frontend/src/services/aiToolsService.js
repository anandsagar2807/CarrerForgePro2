import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Brutal Honest Review
export const getBrutalHonestReview = async (resumeText) => {
  const response = await axios.post(`${API_URL}/ai/advanced/brutal-review`, {
    resumeText
  });
  return response.data;
};

// JD Analysis Agent
export const analyzeJD = async (jdText) => {
  const response = await axios.post(`${API_URL}/ai/analyze-jd`, {
    jdText
  });
  return response.data;
};

// ATS Optimizer
export const optimizeForATS = async (resumeText, jobDescription) => {
  const response = await axios.post(`${API_URL}/ai/advanced/ats-optimizer`, {
    resumeText,
    jobDescription
  });
  return response.data;
};

// Bullet Point Transformer
export const transformBullets = async (bullets, jobContext = '') => {
  const response = await axios.post(`${API_URL}/ai/advanced/transform-bullets`, {
    bullets,
    jobContext
  });
  return response.data;
};

// Industry Tone Match
export const matchIndustryTone = async (resumeText, targetCompanies, targetRole) => {
  const response = await axios.post(`${API_URL}/ai/advanced/industry-tone`, {
    resumeText,
    targetCompanies,
    targetRole
  });
  return response.data;
};

// Final Polish Review
export const getFinalPolishReview = async (resumeText) => {
  const response = await axios.post(`${API_URL}/ai/advanced/final-polish`, {
    resumeText
  });
  return response.data;
};

// Parse PDF/DOCX Resume
export const parseResumeFile = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await axios.post(`${API_URL}/resume/parse`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
};

// Export Resume
export const exportResume = async (resumeData, format = 'pdf') => {
  const response = await axios.post(`${API_URL}/resume/export`, {
    resumeData,
    format
  }, {
    responseType: 'blob'
  });
  return response.data;
};
