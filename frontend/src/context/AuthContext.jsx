import React, { createContext, useEffect, useReducer } from 'react';
import AuthReducer from './AuthReducer'; // Create this file next
import {jwtDecode} from 'jwt-decode'

const initialState = {
    user: null,
    token: null,
    isAuthenticated: false,
    loading: true, // Add loading state
};

export const AuthContext = createContext(initialState);

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, initialState);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decoded = jwtDecode(token);
            const isExpired = decoded.exp * 1000 < Date.now();
            if (!isExpired) {
                dispatch({ type: 'LOGIN_SUCCESS', payload: token });
            } else {
                localStorage.removeItem('token'); // Remove expired token
            }
        }
        dispatch({ type: 'SET_LOADING', payload: false }); // Set loading to false after check
    }, []);

    

    return (
        <AuthContext.Provider value={{ state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};
