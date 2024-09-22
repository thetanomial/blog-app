import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { getCurrentUser, login } from '../services/authService'; 
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
    const { state,dispatch } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        const userData = { email, password };
        setLoading(true);

        try {
            const data = await login(userData);
            localStorage.setItem('token', data.token); // Save token to local storage
            
            // Dispatch login success action
            dispatch({ type: 'LOGIN_SUCCESS', payload: userData });
            const currentUser = await getCurrentUser(); // Fetch the current user
            dispatch({ type: 'SET_USER', payload: currentUser });
            toast.success("Login successful");

            // Redirect to home page

            if (currentUser.role==="admin"){
                navigate("/admin-dashboard")
            }else if(currentUser.role==="user"){


                navigate("/")
            }else{
                navigate("/forbidden")
            }
        } catch (error) {
            if (error.code === "ERR_NETWORK") {
                toast.error("Cannot connect to the backend server. Please make sure the server is running.");
            } else {
                console.log(error);
                if (error.response && error.response.data.errors) {
                    error.response.data.errors.forEach(err => {
                        toast.error(err.msg);
                    });
                } else if (error.response && error.response.data.msg) {
                    toast.error(error.response.data.msg);
                } else {
                    toast.error("An unexpected error occurred.");
                }
            }
        } finally {
            setLoading(false);
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
                <button type="submit" className="form-button" disabled={loading}>Login</button>
                {loading && <p>Loading...</p>}
            </form>
        </div>
    );
};

export default Login;
