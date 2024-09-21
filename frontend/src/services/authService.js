import axiosInstance from '../axios.js'

export const register = async (userData) => {
    const response = await axiosInstance.post('/auth/register', userData);
    return response.data;
};

export const login = async (userData) => {
    const response = await axiosInstance.post('/auth/login', userData);
    return response.data;
};
