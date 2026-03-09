import axios from 'axios';

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
});

/**
 * Upload resume PDF and get analysis.
 * @param {string} role
 * @param {File} file
 * @returns {Promise<object>}
 */
export const analyzeResume = async (role, file) => {
    const formData = new FormData();
    formData.append('role', role);
    formData.append('resume', file);

    const res = await API.post('/api/analyze', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res.data;
};

/**
 * Re-analyze with a different role using cached resume text.
 * @param {string} role
 * @param {string} resumeText - Previously extracted text
 * @returns {Promise<object>}
 */
export const reanalyzeResume = async (role, resumeText) => {
    const res = await API.post('/api/reanalyze', { role, resumeText });
    return res.data;
};
