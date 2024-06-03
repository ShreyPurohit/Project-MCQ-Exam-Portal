import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import ErrorPageComponent from './ErrorPage';


interface ProtectedRouteProps {
    children: React.ReactNode;
    requiredRole: string;
}

const getCookie = (name: string): string | null => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift() ?? null;
    return null;
};

const ProtectedRouteComponent: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
    const location = useLocation();
    const token = getCookie('jwt');

    if (!token) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    try {
        const decoded: any = jwtDecode(token);
        const role = decoded.user.role;

        if (requiredRole !== role) {
            return <ErrorPageComponent />;
        }

        return <>{children}</>;
    } catch (error) {
        console.error('Error decoding token:', error);
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
};

export default ProtectedRouteComponent;