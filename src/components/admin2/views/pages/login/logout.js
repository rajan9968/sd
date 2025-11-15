import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Logout() {
    const navigate = useNavigate();

    useEffect(() => {
        // ✅ Remove token from localStorage
        localStorage.removeItem('token');

        // (optional) remove other user-related data if stored
        localStorage.removeItem('user');

        // ✅ Redirect to login page or home after logout
        navigate('/admin');
    }, [navigate]);

    return <div>Logging out...</div>;
}
