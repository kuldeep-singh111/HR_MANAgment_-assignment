import React, { useState } from "react";
import { FaUserCircle, FaChevronDown, FaBars } from "react-icons/fa";
import "./Header.css";
import { useLocation } from "react-router-dom";

const Header = ({ onToggleSidebar }) => {
    const [showProfileDropdown, setShowProfileDropdown] = useState(false);
    const location = useLocation();

    // 100% used mind..... after one chai ...

    const getTitleFromPath = (path) => {
        const map = {
            "/": "Candidates",
            "/candidates": "Candidates",
            "/employees": "Employees",
            "/attendance": "Attendance",
            "/leaves": "Leaves",

        };
        return map[path] || "Page";
    };

    const pageTitle = getTitleFromPath(location.pathname);

    const toggleProfileDropdown = () => {
        setShowProfileDropdown(!showProfileDropdown);
    };

    return (
        <div className="c-top-bar">

            <div className="sidebar-toggle-icon" onClick={onToggleSidebar}>
                <FaBars size={20} />
            </div>

            <div className="c-title">{pageTitle}</div>

            <div className="c-profile" onClick={toggleProfileDropdown}>
                <FaUserCircle className="c-profile-icon" size={24} />
                <FaChevronDown className="c-dropdown-icon" size={14} />
                {showProfileDropdown && (
                    <div className="c-dropdown-menu">
                        <div className="c-dropdown-item">Edit Profile</div>
                        <div className="c-dropdown-item">Change Password</div>
                        <div className="c-dropdown-item">Manage Notifications</div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Header;
