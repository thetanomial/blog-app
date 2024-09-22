import axios from 'axios';

// Create axios instance
const instance = axios.create({
    baseURL: 'http://localhost:8000/api/v1', // Your API base URL
});

// Add a request interceptor to include the token if available
instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); // Assuming you store the token in localStorage
        if (token) {
            config.headers.Authorization = `Bearer ${token}`; // Add token to Authorization header
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default instance;
