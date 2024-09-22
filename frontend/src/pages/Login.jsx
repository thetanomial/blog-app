import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { login } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
    const { dispatch } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        const userData = { email, password };
        try {
            const data = await login(userData);
            localStorage.setItem('token', data.token); // Save token to local storage
            dispatch({ type: 'LOGIN_SUCCESS', payload: data });
            toast.success("Login successful")
            navigate('/'); // Redirect to the protected route
        } catch (error) {

            if (error.code == "ERR_NETWORK"){
               return toast.error("Cannot connect to the backend server. Please make sure, the server is running.")
            }
            console.log(error)
            if (error.response && error.response.data.errors) {
                error.response.data.errors.forEach(err => {
                    toast.error(err.msg); // Display each error message in the toast
                });
            } else if (error.response && error.response.data.msg) {
                // Display single error message if no errors array exists
                toast.error(error.response.data.msg);
            } else {
                toast.error("An unexpected error occurred.");
            }
        }
    };

    return (
        <div className="login-container">
            <form className="form" onSubmit={handleLogin} noValidate>
                <h2 className="form-title">Login</h2>
                <div className="form-group">
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        placeholder="Email" 
                        className="form-input" 
                        required 
                    />
                </div>
                <div className="form-group">
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        placeholder="Password" 
                        className="form-input" 
                        required 
                    />
                </div>
                <button type="submit" className="form-button">Login</button>
            </form>
        </div>
    );
};

export default Login;
