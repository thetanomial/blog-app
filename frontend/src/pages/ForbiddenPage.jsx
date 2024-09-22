// ForbiddenPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ForbiddenPage = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1); // Navigate back to the previous page
    };

    return (
        <div className="forbidden-container">
            <h1 className="forbidden-title">403 Forbidden</h1>
            <p className="forbidden-message">You do not have permission to access this page.</p>
            <button className="forbidden-button" onClick={handleGoBack}>
                Go Back
            </button>
        </div>
    );
};

export default ForbiddenPage;
