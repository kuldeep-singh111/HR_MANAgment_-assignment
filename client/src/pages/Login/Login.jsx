import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import "./Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";




const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:9000/login", formData, {
                withCredentials: true
            })

            const user = response.data.user;

            console.log(user)

            if (response.status === 200 && user) {
                localStorage.setItem("user", JSON.stringify(user));
                navigate("/");
            }
        } catch (error) {
            alert(error.response?.data?.message || "Login failed. Please try again");

        }

    };

    const handleShowPassword = () => {
        setShowPassword(true);
        setTimeout(() => setShowPassword(false), 1000);
    };

    return (
        <div className="l-wrapper">
            <header className="l-header">
                <img src="/images/Logo.png" alt="Logo" className="l-logo-img" />
            </header>

            <main className="l-container">
                <div className="l-card">
                    <div className="l-left-section">
                        <img
                            src="/images/r-image.png"
                            alt="Preview"
                            className="l-dashboard-image"
                        />
                        <div className="l-description">
                            <h3>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h3>
                            <p>
                                Tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                                veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            </p>
                        </div>
                    </div>

                    <div className="l-right-section">
                        <h2 className="l-title">Welcome to Dashboard</h2>
                        <form className="l-form" onSubmit={handleSubmit} noValidate>
                            <label>
                                Email Address*
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email Address"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </label>
                            <label className="l-password-label">
                                Password*
                                <div className="l-password-wrapper">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        placeholder="Password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                    <FaEye className="l-eye-icon" onClick={handleShowPassword} />
                                </div>
                            </label>
                            {error && <span className="l-error">{error}</span>}
                            <button type="submit" className="l-login-button">Login</button>
                        </form>
                        <p className="l-register-link">
                            Don’t have an account? <a href="/register">Register</a>
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Login;
