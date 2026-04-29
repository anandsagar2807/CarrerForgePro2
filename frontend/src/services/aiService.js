import api from './api';

export const aiService = {
  async analyzeJD(jdText) {
    const response = await api.post('/ai/analyze-jd', { jdText });
    return response.data;
  },

  async rewriteBullet(bullet, keyword) {
    const response = await api.post('/ai/rewrite', { bullet, keyword });
    return response.data;
  },

  async getATSScore(resumeText, jdText) {
    const response = await api.post('/ai/ats-score', { resumeText, jdText });
    return response.data;
  },

  async generateCoverLetter(resumeText, jdText) {
    const response = await api.post('/ai/cover-letter', { resumeText, jdText });
    return response.data;
  },
};