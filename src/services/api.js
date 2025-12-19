const API_URL = import.meta.env.PROD
    ? 'https://your-backend.vercel.app/api'  // TODO: Replace with your actual Vercel backend URL after deployment
    : 'http://localhost:5002/api';

const api = axios.create({
    baseURL: API_URL
});

// Add token to all requests
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;
