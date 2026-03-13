import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
});

// Add a request interceptor to include the auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authApi = {
  register: (data: any) => api.post('/auth/register', data),
  login: (data: any) => api.post('/auth/login', data),
  sendOtp: (email: string) => api.post('/auth/send-otp', { email }),
  verifyOtp: (email: string, otp: string) => api.post('/auth/verify-otp', { email, otp }),
};

export const resumeApi = {
  upload: (formData: FormData) => api.post('/resume/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  analyze: (resumeId: string) => api.post('/resume/analyze', { resumeId }),
};

export const skillsApi = {
  getGapAnalysis: () => api.get('/skills/gap-analysis'),
};

export const roadmapApi = {
  generate: (targetRole: string) => api.get('/roadmap/generate', { params: { targetRole } }),
};

export const interviewApi = {
  getQuestions: (role: string) => api.get('/interview/questions', { params: { role } }),
  evaluate: (interviewId: string, answers: any) => api.post('/interview/evaluate', { interviewId, answers }),
};

export const placementApi = {
  predict: () => api.get('/placement/predict'),
};

export default api;
