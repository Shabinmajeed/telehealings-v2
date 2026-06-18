import axios from 'axios';

const API_BASE_URL = __DEV__
  ? 'http://localhost:5172'
  : 'https://telehealings-api.onrender.com';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Attach auth token
api.interceptors.request.use((config) => {
  try {
    const token = localStorage.getItem('auth_token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
  } catch { /* ignore */ }
  return config;
});

// Handle 401
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      try { localStorage.removeItem('auth_token'); } catch { /* ignore */ }
    }
    return Promise.reject(err);
  },
);

export default api;
export { API_BASE_URL };
