import api from './api';

export const resumeService = {
  async getResumes() {
    const response = await api.get('/resume');
    return response.data;
  },

  async getResume(id) {
    const response = await api.get(`/resume/${id}`);
    return response.data;
  },

  async saveResume(resumeData) {
    const response = await api.post('/resume', resumeData);
    return response.data;
  },

  async updateResume(id, resumeData) {
    const response = await api.put(`/resume/${id}`, resumeData);
    return response.data;
  },

  async deleteResume(id) {
    const response = await api.delete(`/resume/${id}`);
    return response.data;
  },

  async generatePDF(htmlContent) {
    const response = await api.post('/resume/pdf', { htmlContent }, {
      responseType: 'blob',
    });
    return response.data;
  },
};