import axiosInstance from '../axios.js'

export const register = async (userData) => {
    const response = await axiosInstance.post('/auth/register', userData);
    return response.data;
};

export const login = async (userData) => {
    const response = await axiosInstance.post('/auth/login', userData);
    return response.data;
};


// Get current user
export const getCurrentUser = async () => {
    const response = await axiosInstance.get('/auth/user');
    console.log(response) // Assuming /auth/user endpoint gives current user details
    return response.data;
};