import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { setAuthToken } from '../features/authSlice';
import { useAppDispatch } from '../hooks/useAppDispatch';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            dispatch(setAuthToken(token));
        } else {
            navigate('/login');
        }
    }, [dispatch, navigate]);

    return <>{children}</>;
};

export default ProtectedRoute;
