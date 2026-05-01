import React from 'react';
import { Navigate } from 'react-router-dom';

/**
 * ProtectedRoute - Checks localStorage for user and role.
 * Redirects to /login if no user or role mismatch.
 */
const ProtectedRoute = ({ children, allowedRoles }) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');

    if (!user || !token) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
