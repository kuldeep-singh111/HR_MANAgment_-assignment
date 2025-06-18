import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./LogOut.css";

const LogOut = ({ onCancel }) => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            // await axios.post("http://localhost:9000/logout", {}, { withCredentials: true });
            await axios.post("https://hr-managment-assignment.onrender.com/logout", {}, { withCredentials: true });
            navigate("/login");
        } catch (error) {
            console.error("Logout failed:", error);
            alert("Logout failed. Please try again.");
        }
    };

    const CancelLogOUT = () => {
        navigate("/");
    }
    return (
        <div className="logout-modal-wrapper">
            <div className="logout-modal">
                <div className="logout-header">Log Out</div>
                <div className="logout-body">
                    <p>Are you sure you want to log out?</p>
                    <div className="logout-buttons">
                        <button className="cancel-btn" onClick={CancelLogOUT} >Cancel</button>
                        <button className="logout-btn" onClick={handleLogout}>Logout</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LogOut;
