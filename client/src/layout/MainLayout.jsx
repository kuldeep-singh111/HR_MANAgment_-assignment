import React, { useState } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import Header from "../components/Header/Header";
import { Outlet } from "react-router-dom";
import "./l.css"

const MainLayout = () => {

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleToggleSidebar = () => {
        setIsSidebarOpen(true);
    };

    const handleCloseSidebar = () => {
        setIsSidebarOpen(false);
    };

    return (
        <div style={{ display: "flex", height: "100vh" }}>
            <Sidebar isOpen={isSidebarOpen} onClose={handleCloseSidebar} />
            <div style={{ flex: 1, background: "#f8f8f8" }}>
                <div className="h-wrapper">
                    <Header onToggleSidebar={handleToggleSidebar} />
                </div>
                <Outlet />
            </div>
        </div>
    );
};

export default MainLayout;
