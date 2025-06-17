import React, { useEffect, useState } from "react";
import { FaSearch, FaUserCircle, FaEllipsisV } from "react-icons/fa";
import "./Attendance.css";

import axios from "axios";

const Attendance = () => {
    const [employees, setEmployees] = useState([]);
    const [statusFilter, setStatusFilter] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    const fetchEmployees = async () => {
        try {
            const res = await axios.get("http://localhost:9000/employees", { withCredentials: true });
            const employeesData = res.data;

            const attendanceRes = await axios.get("http://localhost:9000/attendance/today", { withCredentials: true });

            const attendanceMap = {};
            attendanceRes.data.forEach(att => {
                attendanceMap[att.employee] = att.status;
            });

            const merged = employeesData.map(emp => ({
                ...emp,
                status: attendanceMap[emp._id] || ""
            }));

            setEmployees(merged);
        } catch (err) {
            console.error("Error fetching data", err);
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    const handleStatusChange = async (id, newStatus) => {
        try {
            await axios.put(`http://localhost:9000/attendance/${id}`, { status: newStatus }, { withCredentials: true });
            fetchEmployees();
        } catch (err) {
            console.error("Failed to update status", err);
        }
    };

    const filtered = employees.filter(emp => {
        const matchStatus = statusFilter ? emp.status === statusFilter : true;
        const matchSearch = emp.fullName?.toLowerCase().includes(searchTerm.toLowerCase());
        return matchStatus && matchSearch;
    });

    return (
        <div className="attendance-wrapper">


            <div className="attendance-top-bar">
                <select
                    className="attendance-select"
                    value={statusFilter}
                    onChange={e => setStatusFilter(e.target.value)}
                >
                    <option value="">Status</option>
                    <option value="Present">Present</option>
                    <option value="Absent">Absent</option>
                </select>

                <div className="attendance-search-box">
                    <FaSearch className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="attendance-table-container">
                <table className="attendance-table">
                    <thead>
                        <tr>
                            <th>Profile</th>
                            <th>Employee Name</th>
                            <th>Position</th>
                            <th>Department</th>
                            <th>Task</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.length === 0 ? (
                            <tr>
                                <td colSpan="7" style={{ textAlign: "center", padding: "20px" }}>
                                    No employees found.
                                </td>
                            </tr>
                        ) : (
                            filtered.map(emp => (
                                <tr key={emp._id}>
                                    <td><FaUserCircle size={24} /></td>
                                    <td>{emp.fullName}</td>
                                    <td>{emp.position}</td>
                                    <td>{emp.department}</td>
                                    <td>Developed Margo API</td>
                                    <td>
                                        <select
                                            value={emp.status}
                                            onChange={e => handleStatusChange(emp._id, e.target.value)}
                                            className={`status-dropdown ${emp.status?.toLowerCase()}`}
                                        >
                                            <option value="">Mark</option>
                                            <option value="Present">Present</option>
                                            <option value="Absent">Absent</option>
                                        </select>
                                    </td>
                                    <td><FaEllipsisV className="action-icon" /></td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Attendance;
