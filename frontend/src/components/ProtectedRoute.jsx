import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { getCurrentUser } from '../services/authService';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { state, dispatch } = useContext(AuthContext);
    const [loading, setLoading] = useState(true); // Local loading state
    const [error, setError] = useState(null); // Local error state

    useEffect(() => {
        const fetchUser = async () => {
            try {
                await getCurrentUser(); // Fetch the current user
                setLoading(false);
            } catch (err) {
                setError(err);
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
        return <Navigate to="/forbidden" replace />; // Redirect if role is not allowed
    }

    return children; // Render the protected component
};

export default ProtectedRoute;
