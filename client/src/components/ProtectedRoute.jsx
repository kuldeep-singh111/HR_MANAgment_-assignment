import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const ProtectedRoute = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {

                // await axios.get("http://localhost:9000/auth/check", {
                await axios.get("https://hr-managment-assignment.onrender.com/auth/check", {
                    withCredentials: true,
                });
                setIsAuthenticated(true);
            } catch (err) {
                setIsAuthenticated(false);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    if (loading) return <div>Loading...</div>;

    return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
