import React, { useEffect, useState } from "react";
import { FaSearch, FaUserCircle } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import "./Employees.css";
import axios from "axios";
import EditEmployee from "../../components/EditEmployee/EditEmployee";

const positions = ["Intern", "Full Time", "Senior", "Junior", "Team Lead"];

const Employees = () => {
    const [employees, setEmployees] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedPosition, setSelectedPosition] = useState("");
    const [openActionId, setOpenActionId] = useState(null);
    const [editingEmployee, setEditingEmployee] = useState(null);

    const fetchEmployees = async () => {
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            if (!user || !user._id) {
                console.error("User not found in localStorage");
                return;
            }

            // const res = await axios.get(`http://localhost:9000/getemployees/${user._id}`, {
            //     withCredentials: true,
            // });

            const res = await axios.get(`https://hr-managment-assignment.onrender.com/getemployees/${user._id}`, {
                withCredentials: true,
            });
            setEmployees(res.data);
        } catch (err) {
            console.error("Failed to fetch employees", err);
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    const handleDelete = async (id) => {
        try {
            // await axios.delete(`http://localhost:9000/deleteemployee/${id}`, {
            //     withCredentials: true,
            // });

            await axios.delete(`https://hr-managment-assignment.onrender.com/deleteemployee/${id}`, {
                withCredentials: true,
            });
            setEmployees((prev) => prev.filter((emp) => emp._id !== id));
        } catch (err) {
            console.error("Failed to delete employee", err);
        }
    };

    const handleEdit = (employee) => {
        setEditingEmployee(employee);
    };

    const toggleActionMenu = (id) => {
        setOpenActionId((prev) => (prev === id ? null : id));
    };

    const filteredEmployees = employees.filter((emp) => {
        const nameMatch = emp?.fullName?.toLowerCase().includes(searchTerm.toLowerCase());
        const positionMatch = selectedPosition ? emp.position === selectedPosition : true;
        return nameMatch && positionMatch;
    });

    return (
        <div className="e-wrapper">


            <div className="e-top-bar">
                <div className="e-search-filter">
                    <select
                        className="e-select"
                        value={selectedPosition}
                        onChange={(e) => setSelectedPosition(e.target.value)}
                    >
                        <option value="">Position</option>
                        {positions.map((pos) => (
                            <option key={pos} value={pos}>{pos}</option>
                        ))}
                    </select>
                    <div className="e-search-box">
                        <FaSearch className="e-search-icon" />
                        <input
                            type="text"
                            placeholder="Search"
                            className="e-search-input"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="e-table-container">
                <table className="e-table">
                    <thead>
                        <tr>
                            <th>Profile</th>
                            <th>Employee Name</th>
                            <th>Email Address</th>
                            <th>Phone Number</th>
                            <th>Position</th>
                            <th>Department</th>
                            <th>Date of Joining</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredEmployees.length > 0 ? (
                            filteredEmployees.map((emp) => (
                                <tr key={emp._id}>
                                    <td><FaUserCircle size={24} /></td>
                                    <td>{emp.fullName}</td>
                                    <td>{emp.email}</td>
                                    <td>{emp.phone}</td>
                                    <td>{emp.position}</td>
                                    <td>{emp.department}</td>
                                    <td>{emp.dateOfJoining}</td>
                                    <td className="e-actions">
                                        <div className="e-action-wrapper">
                                            <BsThreeDotsVertical
                                                className="e-action-icon"
                                                onClick={() => toggleActionMenu(emp._id)}
                                            />
                                            {openActionId === emp._id && (
                                                <div className="e-action-menu">
                                                    <button onClick={() => handleEdit(emp)}>Edit</button>
                                                    <button onClick={() => handleDelete(emp._id)}>Delete</button>
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="8" className="no-data">No employees found.</td>
                            </tr>
                        )}
                        {editingEmployee && (
                            <EditEmployee
                                employee={editingEmployee}
                                onClose={() => setEditingEmployee(null)}
                                onSave={() => {
                                    fetchEmployees();           // Refresh table
                                    setEditingEmployee(null);   // Close modal
                                }}
                            />
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Employees;
