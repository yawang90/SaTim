import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const LoggedInRoute = ({ children }) => {
    const { isLoggedIn } = useAuth();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (isLoggedIn !== undefined) {
            setLoading(false);
        }
    }, [isLoggedIn]);

    if (loading) return null;

    return isLoggedIn ? children : <Navigate to="/" />;
};

export default LoggedInRoute;
