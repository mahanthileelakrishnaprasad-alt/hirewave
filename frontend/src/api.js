import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
const api = axios.create({ baseURL: API_BASE });

export const getJobs = (params) => api.get('/jobs/', { params });
export const getJob = (id) => api.get(`/jobs/${id}/`);
export const createJob = (data) => api.post('/jobs/post/', data);
export const getStats = () => api.get('/jobs/stats/');