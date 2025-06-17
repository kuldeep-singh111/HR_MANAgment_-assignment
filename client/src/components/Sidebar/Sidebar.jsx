import React from "react";
import {
    FaUserFriends,
    FaUserTie,
    FaCalendarAlt,
    FaUmbrellaBeach,
    FaSearch,
    FaSignOutAlt,
    FaTimes
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = ({ isOpen, onClose }) => {
    return (
        <aside className={`sidebar ${isOpen ? "sidebar-open" : ""}`}>

            <div className="sidebar-close-icon" onClick={onClose}>
                <FaTimes />
            </div>

            <div className="sidebar-logo">
                <img src="/images/Logo.png" alt="Logo" />
            </div>

            <div className="sidebar-search">
                <FaSearch className="sidebar-search-icon" />
                <input type="text" placeholder="Search" />
            </div>

            <div className="sidebar-section">
                <p className="sidebar-heading">Recruitment</p>
                <NavLink to="/candidates" className="sidebar-link">
                    <FaUserFriends /> Candidates
                </NavLink>
            </div>

            <div className="sidebar-section">
                <p className="sidebar-heading">Organization</p>
                <NavLink to="/employees" className="sidebar-link">
                    <FaUserTie /> Employees
                </NavLink>
                <NavLink to="/attendance" className="sidebar-link">
                    <FaCalendarAlt /> Attendance
                </NavLink>
                <NavLink to="/leaves" className="sidebar-link">
                    <FaUmbrellaBeach /> Leaves
                </NavLink>
            </div>

            <div className="sidebar-section">
                <p className="sidebar-heading">Others</p>
                <NavLink to="/logout" className="sidebar-link">
                    <FaSignOutAlt /> Logout
                </NavLink>
            </div>
        </aside>
    );
};

export default Sidebar;
