import React, { createContext, useEffect, useReducer } from 'react';
import AuthReducer from './AuthReducer';
import {jwtDecode} from 'jwt-decode';
import { getCurrentUser } from '../services/authService';

const initialState = {
    user: null,
    token: null,
    isAuthenticated: false,
    loading: true,
};

export const AuthContext = createContext(initialState);

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, initialState);

    useEffect(() => {
        const initializeAuth = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                await handleToken(token);
            }
            dispatch({ type: 'SET_LOADING', payload: false });
        };

        initializeAuth();
    }, []);

    const handleToken = async (token) => {
        const decoded = jwtDecode(token);
        const isExpired = decoded.exp * 1000 < Date.now();

        if (!isExpired) {
            dispatch({ type: 'LOGIN_SUCCESS', payload: token });
            await fetchCurrentUser();
        } else {
            localStorage.removeItem('token'); // Remove expired token
        }
    };

    const fetchCurrentUser = async () => {
        try {
            const currentUser = await getCurrentUser();
            dispatch({ type: 'SET_USER', payload: currentUser });
        } catch (error) {
            console.error('Failed to fetch current user:', error);
        }
    };

    return (
        <AuthContext.Provider value={{ state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};
