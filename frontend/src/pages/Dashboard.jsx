import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import useLogout from '../hooks/useLogout';

const Dashboard = () => {
    const navigate = useNavigate();
    const { dispatch, state } = useContext(AuthContext);
    const logout = useLogout()

    const { user, loading } = state; // Destructure user and loading state

    

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
            <h1>Current User details :  </h1>
            <p>{JSON.stringify(user)}</p>
            <button onClick={logout}>Log out</button>
            <button onClick={()=>navigate('my-posts')}>My Posts</button>
            <button onClick={()=>navigate('add-post')}>Add Post</button>
        </>
    );
};

export default Dashboard;
