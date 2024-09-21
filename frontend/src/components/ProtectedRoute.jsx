import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { state } = useContext(AuthContext);

    if (state.loading) {
        return <div>Loading...</div>; // Show loading state
    }

    if (!state.isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;

