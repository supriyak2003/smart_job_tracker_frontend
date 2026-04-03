import axios from 'axios';

// Use the production backend URL on Render
const API_URL = 'https://smart-job-tracker-backend-e5tm.onrender.com/api';

const api = axios.create({
  baseURL: API_URL,
});

// Add a request interceptor to add token
api.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
