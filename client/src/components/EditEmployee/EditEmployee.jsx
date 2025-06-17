import React, { useState, useEffect } from "react";
import "./EditEmployee.css";

const positions = ["Intern", "Full Time", "Junior", "Senior", "Team Lead"];

const EditEmployee = ({ employee, onClose, onSave }) => {
    const formatDate = (date) => {
        const d = new Date(date);
        if (isNaN(d.getTime())) return "";
        return d.toISOString().split("T")[0];
    };

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        position: "",
        department: "",
        dateOfJoining: "",
    });

    useEffect(() => {
        if (employee) {
            setFormData({
                fullName: employee.fullName || "",
                email: employee.email || "",
                phone: employee.phone || "",
                position: employee.position || "",
                department: employee.department || "",
                dateOfJoining: formatDate(employee.dateOfJoining || new Date()),
            });
        }
    }, [employee]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`http://localhost:9000/editemployee/${employee._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(formData),
            });

            if (!res.ok) {
                throw new Error("Failed to update employee");
            }

            const updatedEmployee = await res.json();
            onSave(updatedEmployee); // ✅ Callback to refresh list
            onClose(); // ✅ Close modal
        } catch (error) {
            console.error("Error updating employee:", error);
        }
    };

    return (
        <div className="edit-modal-overlay">
            <div className="edit-modal">
                <div className="edit-modal-header">
                    <h3>Edit Employee Details</h3>
                    <span onClick={onClose} className="close-btn">&times;</span>
                </div>
                <form className="edit-modal-form" onSubmit={handleSubmit}>
                    <div className="edit-row">
                        <div className="edit-group">
                            <label>Full Name*</label>
                            <input
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="edit-group">
                            <label>Email Address*</label>
                            <input
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="edit-row">
                        <div className="edit-group">
                            <label>Phone Number*</label>
                            <input
                                name="phone"
                                type="tel"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="edit-group">
                            <label>Department*</label>
                            <input
                                name="department"
                                value={formData.department}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="edit-row">
                        <div className="edit-group">
                            <label>Position*</label>
                            <select
                                name="position"
                                value={formData.position}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select Position</option>
                                {positions.map((pos) => (
                                    <option key={pos} value={pos}>
                                        {pos}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="edit-group">
                            <label>Date of Joining*</label>
                            <input
                                type="date"
                                name="dateOfJoining"
                                value={formData.dateOfJoining}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="edit-btn-row">
                        <button type="submit">Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditEmployee;
