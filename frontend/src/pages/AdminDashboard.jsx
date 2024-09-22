import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import useLogout from '../hooks/useLogout';

const Dashboard = () => {
    const navigate = useNavigate();
    const { dispatch, state } = useContext(AuthContext);

    const { user, loading } = state; // Destructure user and loading state

    const logout = useLogout()

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
            <h1>Admin Dashboard</h1>
            <button onClick={logout}>Log out</button>
        </>
    );
};

export default Dashboard;
