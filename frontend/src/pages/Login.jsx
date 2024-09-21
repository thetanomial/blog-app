import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { login, register } from '../services/authService';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const { dispatch } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault();
        const userData = { email, password };
        try {
            const data = await login(userData);
            localStorage.setItem('token', data.token); // Save token to local storage
            dispatch({ type: 'LOGIN_SUCCESS', payload: data });
            navigate('/'); // Redirect to the protected route
        } catch (error) {
            console.error(error);
        }
    };
    

    return (
        <form onSubmit={handleLogin}>
            <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="Email" 
                required 
            />
            <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="Password" 
                required 
            />
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;
