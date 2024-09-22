import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Dashboard = () => {
    const navigate = useNavigate();
    const { dispatch, state } = useContext(AuthContext);

    // Check if user exists and destructure role
    const role = state.user ? state.user.role : null;

    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove token from local storage
        dispatch({ type: 'LOGOUT' });
        navigate('/login');
    };

    return (
        <>
            <div>
                {role === "admin" ? "Admin Dashboard" : "User Dashboard"}
            </div>
            <button onClick={handleLogout}>Log out</button>
        </>
    );
};

export default Dashboard;
