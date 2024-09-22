import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Dashboard = () => {
    const navigate = useNavigate();
    const { dispatch, state } = useContext(AuthContext);

    const { user, loading } = state; // Destructure user and loading state

    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove token from local storage
        dispatch({ type: 'LOGOUT' });
        navigate('/login');
    };

    useEffect(() => {
        if (!loading && !user) {
            navigate('/login'); // Redirect to login if not authenticated
        }
    }, [loading, user, navigate]); // Dependencies to watch

    if (loading) {
        return <div>Loading...</div>; // Show loading state
    }

    const role = user ? user.role : null; // Check user role

    return (
        <>
            <div>
                {role === "admin" ? "Admin Dashboard" : role === "staff" ? "Staff Dashboard" : "User Dashboard"}
            </div>
            <button onClick={handleLogout}>Log out</button>
        </>
    );
};

export default Dashboard;
