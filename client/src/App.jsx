import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import MainLayout from "./layout/MainLayout";
import ProtectedRoute from "./components/ProtectedRoute";

import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Candidates from "./pages/Candidates/Candidates";
import Employees from "./pages/Employees/Employees";
import Attendance from "./pages/Attendance/Attendance";
import Leaves from "./pages/Leaves/Leaves";
import LogOut from "./pages/LogOut/LogOut";

const App = () => {
  const [showLogout, setShowLogout] = useState(false);

  return (
    <Router>
      {showLogout && <LogoutModal />}
      <Routes>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<LogOut />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Candidates />} />
          <Route
            path="candidates"
            element={
              <ProtectedRoute>
                <Candidates />
              </ProtectedRoute>
            }
          />
          <Route
            path="employees"
            element={
              <ProtectedRoute>
                <Employees />
              </ProtectedRoute>
            }
          />
          <Route
            path="attendance"
            element={
              <ProtectedRoute>
                <Attendance />
              </ProtectedRoute>
            }
          />
          <Route
            path="leaves"
            element={
              <ProtectedRoute>
                <Leaves />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
