import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { getCurrentUser } from '../services/authService';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { state, dispatch } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const currentUser = await getCurrentUser(); // Fetch the current user
                dispatch({ type: 'SET_USER', payload: currentUser }); // Update the state with the current user
            } catch (err) {
                setError(err);
                localStorage.removeItem('token'); // Clear token on error
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [dispatch]);

    if (loading) {
        return <div>Loading...</div>; // Show loading state
    }

    if (!state.isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    const userRole = state.user ? state.user.role : null;
    if (allowedRoles && !allowedRoles.includes(userRole)) {
        localStorage.removeItem('token'); // Remove token if access is forbidden
        return <Navigate to="/forbidden" replace />;
    }

    return children; // Render the protected component
};

export default ProtectedRoute;
