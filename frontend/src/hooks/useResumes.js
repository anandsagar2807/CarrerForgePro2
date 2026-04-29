import { useState, useEffect, useCallback } from 'react';
import { resumeService } from '../services/resumeService';

export const useResumes = () => {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchResumes = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await resumeService.getResumes();
      setResumes(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch resumes');
    } finally {
      setLoading(false);
    }
  }, []);

  const saveResume = useCallback(async (resumeData) => {
    setLoading(true);
    setError(null);
    try {
      const data = await resumeService.saveResume(resumeData);
      setResumes((prev) => [data, ...prev]);
      return data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save resume');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteResume = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      await resumeService.deleteResume(id);
      setResumes((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete resume');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchResumes();
  }, [fetchResumes]);

  return {
    resumes,
    loading,
    error,
    fetchResumes,
    saveResume,
    deleteResume,
  };
};