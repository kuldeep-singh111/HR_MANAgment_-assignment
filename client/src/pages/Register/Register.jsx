import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import "./Register.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";



const Registration = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const navigate = useNavigate();


    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const validate = () => {
        const newErrors = {};

        if (formData.name.trim().length < 4) {
            newErrors.name = "Full name must be at least 4 characters long.";
        }

        const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.test(formData.email)) {
            newErrors.email = "Please enter a valid email.";
        }

        if (formData.password.length < 8) {
            newErrors.password = "Password must be at least 8 characters long.";
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            try {
                // const res = await axios.post("http://localhost:9000/register", formData,
                const res = await axios.post("https://hr-managment-assignment.onrender.com/register", formData,
                    {
                        withCredentials: true,
                        headers: {
                            "Content-Type": "application/json",
                        },
                    });

                setFormData(" ")
                alert("Registration successful!");
                navigate("/login")

            } catch (err) {
                console.log("error", err.response?.data || err.message)
                alert(err.response?.data?.message || "Something went wrong.");
            }
        };

    }

    const handleShowPassword = (field) => {
        if (field === 'password') {
            setShowPassword(true);
            setTimeout(() => setShowPassword(false), 1000);
        } else {
            setShowConfirmPassword(true);
            setTimeout(() => setShowConfirmPassword(false), 1000);
        }
    };

    return (
        <div className="r-wrapper">
            <header className="r-header">
                <img src="/images/Logo.png" alt="Logo" className="r-logo-img" />
            </header>

            <main className="r-container">
                <div className="r-card">
                    <div className="r-left-section">
                        <img
                            src="/images/r-image.png"
                            alt="Dashboard Preview"
                            className="r-dashboard-image"
                        />
                        <div className="r-description">
                            <h3>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod</h3>
                            <p>
                                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                                veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                                commodo consequat.
                            </p>
                        </div>
                    </div>

                    <div className="r-right-section">
                        <h2 className="r-title">Welcome to Dashboard</h2>
                        <form className="r-form" onSubmit={handleSubmit} noValidate>
                            <label>
                                Full name*
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Full name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                                {errors.name && <span className="r-error">{errors.name}</span>}
                            </label>
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
                                {errors.email && <span className="r-error">{errors.email}</span>}
                            </label>
                            <label className="r-password-label">
                                Password*
                                <div className="r-password-wrapper">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        placeholder="Password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                    <FaEye className="r-eye-icon" onClick={() => handleShowPassword('password')} />
                                </div>
                                {errors.password && <span className="r-error">{errors.password}</span>}
                            </label>
                            <label className="r-password-label">
                                Confirm Password*
                                <div className="r-password-wrapper">
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        name="confirmPassword"
                                        placeholder="Confirm Password"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        required
                                    />
                                    <FaEye className="r-eye-icon" onClick={() => handleShowPassword('confirm')} />
                                </div>
                                {errors.confirmPassword && (
                                    <span className="r-error">{errors.confirmPassword}</span>
                                )}
                            </label>
                            <button type="submit" className="r-register-button">Register</button>
                        </form>
                        <p className="r-login-link">
                            Already have an account? <a href="/login">Login</a>
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Registration;
